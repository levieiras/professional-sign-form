import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const fields = [
      "nome", "email", "whatsapp", "tipo_logo",
      "modelo_escolhido", "imagem_logo", "imagem_referencia",
      "cor_principal", "texto_base", "cor_texto_base",
      "texto_interno", "cor_texto_interno",
    ];

    const data = Object.fromEntries(
      fields.map((key) => [key, formData.get(key) ?? ""])
    );

    const uploadFile = formData.get("upload");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = [];
    if (uploadFile && uploadFile.size > 0) {
      const buffer = Buffer.from(await uploadFile.arrayBuffer());
      attachments.push({ filename: uploadFile.name, content: buffer });
    }

    await transporter.sendMail({
      from: `"LE ART Solicitações" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "levieiras.art@gmail.com",
      subject: `Nova solicitação de logo — ${data.nome}`,
      html: buildEmailHtml(data),
      attachments,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      { error: "Falha ao enviar email. Tente novamente." },
      { status: 500 }
    );
  }
}

function colorSwatch(hex) {
  return `<span style="display:inline-block;width:14px;height:14px;background:${hex};border-radius:3px;border:1px solid #444;vertical-align:middle;margin-right:6px"></span>${hex}`;
}

function buildEmailHtml(data) {
  const rows = [
    ["Cliente", data.nome],
    ["Email", data.email],
    ["WhatsApp", data.whatsapp],
    ["Tipo de logo", data.tipo_logo === "economica" ? "Econômica" : "Customizada"],
    ...(data.tipo_logo === "economica"
      ? [["Modelo escolhido", `Modelo ${data.modelo_escolhido}`]]
      : [["Referência enviada", data.imagem_referencia || "(ver anexo)"]]),
    ["Imagem principal", `Imagem ${data.imagem_logo}`],
    ["Cor principal", colorSwatch(data.cor_principal)],
    ["Texto base", data.texto_base],
    ["Cor texto base", colorSwatch(data.cor_texto_base)],
    ["Texto interno", data.texto_interno],
    ["Cor texto interno", colorSwatch(data.cor_texto_interno)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;color:#888;white-space:nowrap;border-bottom:1px solid #222">${label}</td>
          <td style="padding:8px 12px;font-weight:500;border-bottom:1px solid #222">${value}</td>
        </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="background:#0a0a0a;color:#f0f0f0;font-family:sans-serif;padding:32px">
      <div style="max-width:560px;margin:0 auto">
        <div style="border-bottom:2px solid #D4AF37;padding-bottom:12px;margin-bottom:24px">
          <h2 style="margin:0;color:#D4AF37;letter-spacing:2px">LE ART</h2>
          <p style="margin:4px 0 0;color:#888;font-size:14px">Nova solicitação de logo</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#141414;border-radius:8px;overflow:hidden">
          ${tableRows}
        </table>
        ${data.tipo_logo === "customizada" ? '<p style="margin-top:16px;color:#888;font-size:13px">* Arquivo de referência enviado em anexo.</p>' : ""}
      </div>
    </body>
    </html>
  `;
}
