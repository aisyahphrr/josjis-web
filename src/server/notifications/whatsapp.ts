/**
 * WhatsApp wa.me Link Generator
 */

interface GenerateApprovalLinkParams {
  phone: string;
  businessName: string;
}

interface GenerateRejectionLinkParams {
  phone: string;
  businessName: string;
  reason: string;
}

export function generateApprovalLink({
  phone,
  businessName,
}: GenerateApprovalLinkParams): string | null {
  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) {
    console.warn("Invalid phone number format:", phone);
    return null;
  }

  const message = createApprovalMessage(businessName);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

export function generateRejectionLink({
  phone,
  businessName,
  reason,
}: GenerateRejectionLinkParams): string | null {
  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) {
    console.warn("Invalid phone number format:", phone);
    return null;
  }

  const message = createRejectionMessage(businessName, reason);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

// Keep the old functions for backward compatibility
export async function sendApprovalNotification({
  phone,
  businessName,
}: GenerateApprovalLinkParams): Promise<void> {
  try {
    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone) {
      console.warn("Invalid phone number format:", phone);
      return;
    }

    const message = createApprovalMessage(businessName);
    await sendWhatsAppMessage(formattedPhone, message);

    console.log(`[WhatsApp] Approval notification sent to ${formattedPhone}`);
  } catch (error) {
    console.error("[WhatsApp] Failed to send approval notification:", error);
  }
}

export async function sendRejectionNotification({
  phone,
  businessName,
  reason,
}: GenerateRejectionLinkParams): Promise<void> {
  try {
    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone) {
      console.warn("Invalid phone number format:", phone);
      return;
    }

    const message = createRejectionMessage(businessName, reason);
    await sendWhatsAppMessage(formattedPhone, message);

    console.log(`[WhatsApp] Rejection notification sent to ${formattedPhone}`);
  } catch (error) {
    console.error("[WhatsApp] Failed to send rejection notification:", error);
  }
}

function formatPhoneNumber(phone: string): string | null {
  let cleaned = phone.replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+62")) {
    return cleaned;
  }

  if (cleaned.startsWith("62")) {
    return "+" + cleaned;
  }

  if (cleaned.startsWith("0")) {
    return "+62" + cleaned.substring(1);
  }

  return null;
}

function createApprovalMessage(businessName: string): string {
  return `Halo ${businessName}! 🎉

Selamat! Pengajuan Anda untuk bergabung dengan SADAYA (Jelajahi Omset, Solusi, dan Industri Bogor) telah disetujui oleh admin.

✅ *Status:* Disetujui
📱 *Aplikasi:* Anda sekarang dapat login di aplikasi SADAYA
🎯 *Langkah Selanjutnya:* Mulai unggah produk dan jelajahi peluang penjualan baru!

Terima kasih telah menjadi bagian dari komunitas UMKM Bogor kami. Kami siap mendukung kesuksesan bisnis Anda! 💪

Jika ada pertanyaan, hubungi tim support kami. 🙏`;
}

function createRejectionMessage(businessName: string, reason: string): string {
  return `Halo ${businessName}! 👋

Terima kasih telah mendaftar di SADAYA (Jelajahi Omset, Solusi, dan Industri Bogor).

Sayangnya, pengajuan Anda belum bisa kami terima saat ini. Berikut alasannya:

📋 *Alasan Penolakan:*
${reason}

💡 *Solusi:*
Mohon perbaiki dokumen dan data bisnis Anda sesuai dengan petunjuk di atas, kemudian ajukan kembali melalui aplikasi SADAYA.

Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi tim support kami.

Terima kasih! 🙏`;
}

async function sendWhatsAppMessage(
  phone: string,
  message: string,
): Promise<void> {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const apiToken = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  // Development mode: log but don't fail
  if (!apiUrl || !apiToken || !phoneNumberId) {
    console.log(`[Mock WhatsApp] To: ${phone}`);
    console.log(`[Mock WhatsApp] Message:\n${message}`);
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: {
          preview_url: false,
          body: message,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`WhatsApp API error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    console.log(`[WhatsApp] Message sent successfully:`, result);
  } catch (error) {
    console.error("[WhatsApp] Error:", error);
    throw error;
  }
}
