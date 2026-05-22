import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const fields = [
      "nome", "email", "whatsapp", "tipo_logo",
      "modelo_escolhido", "imagem_referencia",
      "cor_objeto", "cor_principal", "texto_base", "cor_texto_base",
      "texto_interno", "tipo_texto_interno", "cor_texto_interno",
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
      from: `"Levieira's Solicitações" <${process.env.EMAIL_USER}>`,
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

const COLOR_NAMES = {
  "#FFFFFF": "Branco",
  "#F8F8F8": "Branco suave",
  "#1A1A1A": "Preto",
  "#000000": "Preto",
  "#6DC9A4": "Verde menta",
  "#D4AF37": "Dourado",
  "#F5F0E0": "Creme",
  "#1E3A5F": "Azul marinho",
  "#8B4513": "Marrom",
  "#C0392B": "Vermelho",
};

function colorLabel(hex) {
  if (!hex) return "—";
  const upper = hex.toUpperCase();
  const name = COLOR_NAMES[upper] ?? COLOR_NAMES[hex];
  return name ? `${name} <span style="color:#888">(${hex})</span>` : hex;
}

function colorSwatch(hex) {
  if (!hex) return "—";
  return `<span style="display:inline-flex;align-items:center;gap:6px">
    <span style="display:inline-block;width:16px;height:16px;background:${hex};border-radius:4px;border:1px solid #444;flex-shrink:0"></span>
    ${colorLabel(hex)}
  </span>`;
}

function row(label, value) {
  return `<tr>
    <td style="padding:10px 16px;color:#888;white-space:nowrap;border-bottom:1px solid #1e1e1e;font-size:13px;vertical-align:middle">${label}</td>
    <td style="padding:10px 16px;font-weight:500;border-bottom:1px solid #1e1e1e;font-size:13px;vertical-align:middle">${value}</td>
  </tr>`;
}

function sectionHeader(title) {
  return `<tr>
    <td colspan="2" style="padding:12px 16px 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6DC9A4;background:#111;border-bottom:1px solid #1e1e1e">${title}</td>
  </tr>`;
}

function buildEmailHtml(data) {
  const cleanModelo = data.modelo_escolhido
    ? data.modelo_escolhido.replace(/\.[^.]+$/, "").replace(/^\d+-/, "")
    : "";

  const tipoTextoLabel =
    data.tipo_texto_interno === "negativo"
      ? "Negativo — recortado na base, sem cor própria"
      : data.tipo_texto_interno === "positivo"
      ? "Positivo — texto com cor própria"
      : "—";

  const showCorTextoInterno =
    data.tipo_texto_interno !== "negativo" && data.cor_texto_interno;

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#0a0a0a;color:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:32px 16px;margin:0">
  <div style="max-width:580px;margin:0 auto">

    <!-- Header -->
    <div style="margin-bottom:28px;padding-bottom:16px;border-bottom:2px solid #6DC9A4">
      <h1 style="margin:0;color:#6DC9A4;font-size:22px;letter-spacing:3px;font-weight:700">LEVIEIRA'S</h1>
      <p style="margin:4px 0 0;color:#666;font-size:13px">Nova solicitação de logo recebida</p>
    </div>

    <!-- Tabela principal -->
    <table style="width:100%;border-collapse:collapse;background:#141414;border-radius:10px;overflow:hidden;border:1px solid #1e1e1e">

      ${sectionHeader("Dados do cliente")}
      ${row("Nome", data.nome)}
      ${row("E-mail", `<a href="mailto:${data.email}" style="color:#6DC9A4;text-decoration:none">${data.email}</a>`)}
      ${row("WhatsApp", data.whatsapp)}

      ${sectionHeader("Tipo de solicitação")}
      ${row("Tipo de logo", data.tipo_logo === "economica" ? "Econômica (modelo do catálogo)" : "Customizada (referência própria)")}
      ${data.tipo_logo === "economica" && cleanModelo ? row("Modelo escolhido", cleanModelo) : ""}
      ${data.tipo_logo === "customizada" ? row("Referência", "(arquivo enviado em anexo)") : ""}

      ${sectionHeader("Cores e textos")}
      ${row("Cor do logo", colorSwatch(data.cor_objeto))}
      ${row("Texto sobre a base", data.texto_base || "—")}
      ${row("Cor do texto sobre a base", colorSwatch(data.cor_texto_base))}
      ${row("Texto dentro da base", data.texto_interno || "—")}
      ${row("Tipo do texto interno", tipoTextoLabel)}
      ${showCorTextoInterno ? row("Cor do texto interno", colorSwatch(data.cor_texto_interno)) : ""}
      ${row("Cor da base", colorSwatch(data.cor_principal))}

    </table>

    <!-- Footer -->
    <p style="margin-top:20px;color:#444;font-size:12px;text-align:center">
      Solicitação enviada via formulário Levieira's
    </p>

  </div>
</body>
</html>`;
}

