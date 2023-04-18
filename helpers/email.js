import nodemailer from "nodemailer";

export const emailRegister = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"Fabincci BarberShop" <admin@fabincci.com>',
    to: email,
    subject: "Confirma tu cuenta",
    text: "Confirma tu cuenta",
    html: ` <p> Hola ${nombre}. ¡Bienvenid@ al universo Fabincci!</p>
        <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/users/confirm/${token}">Confirmar cuenta</a>

        <p>Si no has creado esta cuenta, puedes ignorar este mensaje.</p>

        `,
  });
};

export const emailRecovery = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"Fabincci BarberShop" <admin@fabincci.com>',
    to: email,
    subject: "Recupera tu contraseña",
    text: "Recupera tu contraseña",
    html: ` <p> Hola ${nombre}. ¡Bienvenid@ al universo Fabincci!</p>
        <p>Para poder recuperar la contraseña, haz click en el enlace a continuación:</p>
        <a href="${process.env.FRONTEND_URL}/users/reset-password/${token}">Recuperar contraseña</a>

        <p>Si no has hecho la solicitud de cambiar la contraseña, puedes ignorar este mensaje.</p>

        `,
  });
};
