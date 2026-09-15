interface OrderItemForMessage {
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export async function sendOrderWhatsAppNotification({
  orderId,
  customer,
  items,
  subtotal,
  shippingFee,
  total,
  sameDay,
}: {
  orderId: string;
  customer: { name: string; phone: string; county: string; town: string; address: string };
  items: OrderItemForMessage[];
  subtotal: number;
  shippingFee: number;
  total: number;
  sameDay: boolean;
}) {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const ownerNumber = process.env.OWNER_WHATSAPP_NUMBER;

  if (!token || !phoneNumberId || !ownerNumber) {
    // Not configured — skip silently so checkout still succeeds locally/in dev.
    console.warn("WhatsApp notification skipped: missing WHATSAPP_* env vars");
    return null;
  }

  const itemLines = items
    .map((i) => `• ${i.name} — ${i.color}, Size ${i.size} x${i.quantity} — KSh ${i.price.toLocaleString("en-KE")}`)
    .join("\n");

  const message = `👠 NEW ORDER — The Tinnsrack

Order ID: ${orderId}

👤 Customer:
Name: ${customer.name}
Phone: ${customer.phone}
County: ${customer.county}, ${customer.town}
Address: ${customer.address}

🛍️ Items:
${itemLines}

💰 Subtotal: KSh ${subtotal.toLocaleString("en-KE")}
🚚 Delivery: KSh ${shippingFee.toLocaleString("en-KE")}${sameDay ? " (Same-day, Nairobi, ordered before 2PM)" : ""}
💳 Total: KSh ${total.toLocaleString("en-KE")}
📱 M-Pesa STK Push sent to ${customer.phone}

Luxury & classy shoes. Always. 👠
Shop F17, Beba Beba, Tom Mboya | 0768 008 365`;

  const res = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: ownerNumber,
      type: "text",
      text: { body: message },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("WhatsApp notification failed:", err);
    return null;
  }
  return res.json();
}
