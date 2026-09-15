import { NextRequest, NextResponse } from "next/server";
import { sendOrderWhatsAppNotification } from "@/lib/whatsapp";
import { initiateSTKPush } from "@/lib/mpesa";
import { formatOrderId } from "@/lib/utils";

interface OrderRequestBody {
  customer: { name: string; phone: string; county: string; town: string; address: string };
  items: { productId: string; name: string; color: string; size: string; quantity: number; price: number }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  sameDay: boolean;
}

export async function POST(req: NextRequest) {
  let body: OrderRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { customer, items, subtotal, shippingFee, total, sameDay } = body;

  if (!customer?.name || !customer?.phone || !customer?.address || !items?.length) {
    return NextResponse.json({ error: "Missing required order details" }, { status: 400 });
  }

  const orderId = formatOrderId();

  // Fire WhatsApp notification and M-Pesa STK push. Neither should block order
  // confirmation — there's no database here, so a WhatsApp message reaching the
  // shop owner IS the order record. If credentials aren't configured yet (fresh
  // clone of this starter), we log and continue rather than breaking checkout.
  const [whatsappResult, mpesaResult] = await Promise.allSettled([
    sendOrderWhatsAppNotification({ orderId, customer, items, subtotal, shippingFee, total, sameDay }),
    initiateSTKPush({ phone: customer.phone, amount: total, orderId }),
  ]);

  if (whatsappResult.status === "rejected") {
    console.error("WhatsApp notification error:", whatsappResult.reason);
  }
  if (mpesaResult.status === "rejected") {
    console.error("M-Pesa STK push error:", mpesaResult.reason);
  }

  return NextResponse.json({
    success: true,
    orderId,
    whatsappSent: whatsappResult.status === "fulfilled" && whatsappResult.value !== null,
    mpesaInitiated: mpesaResult.status === "fulfilled",
  });
}
