import { NextRequest, NextResponse } from "next/server";

interface StkCallbackItem {
  Name: string;
  Value?: string | number;
}

interface StkCallbackBody {
  Body?: {
    stkCallback?: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: { Item: StkCallbackItem[] };
    };
  };
}

// This endpoint is only ever called by Safaricom's Daraja servers after an STK
// push completes — it does not accept or trust client-originated order state,
// and since this project has no database, there is nothing here for a forged
// request to corrupt. We simply log the result and (optionally) let the shop
// owner know payment came through.
export async function POST(req: NextRequest) {
  let body: StkCallbackBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid payload" }, { status: 400 });
  }

  const callback = body?.Body?.stkCallback;
  if (!callback) {
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Malformed callback" }, { status: 400 });
  }

  const { ResultCode, ResultDesc, CheckoutRequestID, MerchantRequestID } = callback;

  if (ResultCode === 0) {
    const items = callback.CallbackMetadata?.Item ?? [];
    const get = (name: string) => items.find((i) => i.Name === name)?.Value;
    console.log("M-Pesa payment successful:", {
      CheckoutRequestID,
      MerchantRequestID,
      amount: get("Amount"),
      receipt: get("MpesaReceiptNumber"),
      phone: get("PhoneNumber"),
      date: get("TransactionDate"),
    });

    const token = process.env.WHATSAPP_API_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const ownerNumber = process.env.OWNER_WHATSAPP_NUMBER;
    if (token && phoneNumberId && ownerNumber) {
      try {
        await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: ownerNumber,
            type: "text",
            text: {
              body: `✅ M-Pesa payment received — KSh ${get("Amount")} — Receipt ${get("MpesaReceiptNumber")}`,
            },
          }),
        });
      } catch (err) {
        console.error("Failed to send payment-confirmed WhatsApp message:", err);
      }
    }
  } else {
    console.log("M-Pesa payment failed or cancelled:", { CheckoutRequestID, ResultCode, ResultDesc });
  }

  // Safaricom expects a 200 with this shape to acknowledge receipt.
  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
