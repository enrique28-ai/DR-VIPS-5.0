// server/emailTemplates.js

// DR-VIPS palette
const brand = {
  name: "DR-VIPS",
  bgTop: "linear-gradient(135deg,#1e40af,#3b82f6)",
  cardBg: "#0b1220",
  text: "#e5e7eb",
  subtext: "#9aa4b2",
  accent: "#3b82f6",
  btnBg: "#0f172a",
  btnText: "#ffffff",
  codeBg: "#0f172a",
  border: "rgba(255,255,255,0.08)",
};

const normalizeLang = (lang = "en") => {
  const l = String(lang || "en").toLowerCase();
  const short = l.split(",")[0].trim().split("-")[0].split("_")[0];
  return ["en", "es"].includes(short) ? short : "en";
};

const COPY = {
  en: {
    footer: "This is an automated message. Please don’t reply to this email.",
    subjects: {
      verify: "Verify your account",
      welcome: "Welcome to DR-VIPS",
      resetReq: "Reset your password",
      resetOk: "Password Reset Successful",
    },
    verify: {
      title: "Verify your account",
      hi: "Hi,",
      codeLabel: "Your verification code is:",
      instructions: "Enter this code to complete your registration. The code expires in 15 minutes.",
      ignore: "If you didn’t create this account, you can safely ignore this message.",
    },
    resetReq: {
      title: "Reset your password",
      hi: "Hi,",
      p1: "We received a request to reset your password. If you didn’t request this, you can ignore this email.",
      btn: "Reset password",
      note: "This code expires in 15 minutes.",
    },
    resetOk: {
      title: "Password reset successful",
      hi: "Hi,",
      p1: "Your password has been updated successfully.",
      p2: "If you did not make this change, please reset your password immediately.",
    },
    welcome: {
      title: "Welcome to DR-VIPS",
      p1: "We’re excited to have you on",
      p2: "Your account is now active. You have access to a fast and modern workspace designed to optimize your daily activities.",
      tip: "Tip: Complete your profile to personalize your experience and start exploring the platform.",
      help: "Need help? We’re here for you.",
    },
    resetCode: {
      title: "Reset your password",
      hi: "Hi,",
      codeLabel: "Your password reset code is:",
      instructions: "Enter this code to continue. The code expires in 15 minutes.",
      ignore: "If you didn’t request this, you can ignore this email.",
    },
  },

  es: {
    footer: "Este es un mensaje automático. Por favor no respondas a este correo.",
    subjects: {
      verify: "Verifica tu cuenta",
      welcome: "Bienvenido/a a DR-VIPS",
      resetReq: "Restablece tu contraseña",
      resetOk: "Contraseña restablecida",
    },
    verify: {
      title: "Verifica tu cuenta",
      hi: "Hola,",
      codeLabel: "Tu código de verificación es:",
      instructions: "Ingresa este código para completar tu registro. El código expira en 15 minutos.",
      ignore: "Si tú no creaste esta cuenta, puedes ignorar este mensaje.",
    },
    resetReq: {
      title: "Restablece tu contraseña",
      hi: "Hola,",
      p1: "Recibimos una solicitud para restablecer tu contraseña. Si tú no la solicitaste, puedes ignorar este correo.",
      btn: "Restablecer contraseña",
      note: "Este codigo expira en 15 minutos.",
    },
    resetOk: {
      title: "Contraseña restablecida",
      hi: "Hola,",
      p1: "Tu contraseña se actualizó correctamente.",
      p2: "Si no realizaste este cambio, por favor restablece tu contraseña de inmediato.",
    },
    welcome: {
      title: "Bienvenido/a a DR-VIPS",
      p1: "Nos da gusto tenerte en",
      p2: "Tu cuenta ya está activa. Tienes acceso a un espacio de trabajo rápido y moderno diseñado para optimizar tus actividades diarias.",
      tip: "Tip: Completa tu perfil para personalizar tu experiencia y comenzar a explorar la plataforma.",
      help: "¿Necesitas ayuda? Aquí estamos para ti.",
    },
    resetCode: {
      title: "Restablece tu contraseña",
      hi: "Hola,",
      codeLabel: "Tu código para restablecer la contraseña es:",
      instructions: "Ingresa este código para continuar. El código expira en 15 minutos.",
      ignore: "Si tú no solicitaste esto, puedes ignorar este correo.",
    },
  },
};

const baseHead = `
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${brand.name}</title>
`;

const header = (title) => `
  <div style="padding:22px 24px;background:${brand.bgTop}">
    <div style="font-size:24px;line-height:1.2;color:#fff;font-weight:800;letter-spacing:.2px">
      <span style="display:inline-block;margin-right:8px">🩺</span>${brand.name}
    </div>
    <div style="margin-top:8px;font-size:14px;color:#e5efff;opacity:.9">${title}</div>
  </div>
`;

const footer = (lang) => {
  const L = normalizeLang(lang);
  return `
    <div style="text-align:center;margin-top:16px;color:${brand.subtext};font-size:12px">
      ${COPY[L].footer}
    </div>
  `;
};

const shell = (lang, title, inner) => {
  const L = normalizeLang(lang);
  return `
<!doctype html>
<html lang="${L}">
<head>${baseHead}</head>
<body style="margin:0;background:#0a0f1c;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0"
          style="width:100%;max-width:600px;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);background:${brand.cardBg};border:1px solid ${brand.border}">
          <tr><td>${header(title)}</td></tr>
          <tr>
            <td style="padding:24px 24px 28px;color:${brand.text};font-size:15px;line-height:1.6">
              ${inner}
              ${footer(L)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export const getEmailSubjects = (lang = "en") => {
  const L = normalizeLang(lang);
  return COPY[L].subjects;
};

export const getEmailTemplates = (lang = "en") => {
  const L = normalizeLang(lang);
  const c = COPY[L];

  return {
    VERIFICATION_EMAIL_TEMPLATE: shell(
      L,
      c.verify.title,
      `
      <p style="margin:0 0 8px">${c.verify.hi}</p>
      <p style="margin:0 0 16px">${c.verify.codeLabel}</p>
      <div style="text-align:center;margin:22px 0 18px">
        <span style="
          display:inline-block;
          background:${brand.codeBg};
          color:#fff;
          border:1px solid ${brand.border};
          letter-spacing:6px;
          font-weight:800;
          font-size:28px;
          padding:16px 24px;
          border-radius:12px;
          box-shadow:inset 0 0 0 1px rgba(255,255,255,.04);
        ">{verificationCode}</span>
      </div>
      <p style="margin:0 0 8px">${c.verify.instructions}</p>
      <p style="margin:0;color:${brand.subtext}">${c.verify.ignore}</p>
      `
    ),

   PASSWORD_RESET_CODE_TEMPLATE: shell(
  L,
  c.resetCode.title,
  `
  <p style="margin:0 0 8px">${c.resetCode.hi}</p>
  <p style="margin:0 0 16px">${c.resetCode.codeLabel}</p>

  <div style="text-align:center;margin:22px 0 18px">
    <span style="
      display:inline-block;
      background:${brand.codeBg};
      color:#fff;
      border:1px solid ${brand.border};
      letter-spacing:6px;
      font-weight:800;
      font-size:28px;
      padding:16px 24px;
      border-radius:12px;
      box-shadow:inset 0 0 0 1px rgba(255,255,255,.04);
    ">{resetCode}</span>
  </div>

  <p style="margin:0 0 8px">${c.resetCode.instructions}</p>
  <p style="margin:0;color:${brand.subtext}">${c.resetCode.ignore}</p>
  `
),


    PASSWORD_RESET_SUCCESS_TEMPLATE: shell(
      L,
      c.resetOk.title,
      `
      <p style="margin:0 0 8px">${c.resetOk.hi}</p>
      <p style="margin:0 0 10px">${c.resetOk.p1}</p>
      <p style="margin:0;color:${brand.subtext}">${c.resetOk.p2}</p>
      `
    ),

    WELCOME_EMAIL_TEMPLATE: shell(
      L,
      c.welcome.title,
      `
      <p style="margin:0 0 8px">${L === "es" ? "Hola" : "Hi"} <strong>{name}</strong>,</p>
      <p style="margin:0 0 12px">
        ${c.welcome.p1} <strong>${brand.name}</strong>. ${c.welcome.p2}
      </p>
      <div style="
        margin:18px 0 22px;padding:14px 16px;border:1px solid ${brand.border};
        border-radius:12px;background:rgba(255,255,255,.02);color:${brand.subtext}
      ">
        ${c.welcome.tip}
      </div>
      <p style="margin:0;color:${brand.subtext}">${c.welcome.help}</p>
      `
    ),
  };
};

// Back-compat (english defaults)
const EN = getEmailTemplates("en");
export const VERIFICATION_EMAIL_TEMPLATE = EN.VERIFICATION_EMAIL_TEMPLATE;
export const PASSWORD_RESET_CODE_TEMPLATE = EN.PASSWORD_RESET_CODE_TEMPLATE;
export const PASSWORD_RESET_SUCCESS_TEMPLATE = EN.PASSWORD_RESET_SUCCESS_TEMPLATE;
export const WELCOME_EMAIL_TEMPLATE = EN.WELCOME_EMAIL_TEMPLATE;
