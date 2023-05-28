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

export const emailReservationRegister = async (datos) => {
  const { email, nombre, apellidos, corte, fecha, hora } = datos;

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
    subject: "Has reservado una cita",
    text: "Has reservado una cita",
    html: ` <p> Hola ${nombre}. ¡Acabas de realizar una reserva para un corte ${corte}!</p>
        <p>A continuación tienes la información de tu reserva:</p>
        <a> Nombre: ${nombre} ${apellidos}</a>
        <a> Tipo de corte: ${corte}</a>
        <a> El dia: ${fecha}</a>
        <a> A las: ${hora}</a>
        <br/>
        <a>Para modificar tu cita puedes acceder a tu perfil en el siguiente enlace</a>
        <a>o contactar con Fabincci al siguiente número: 999888777</a>
        <a href="${process.env.FRONTEND_URL}/profile">Ir a mi perfil</a>
        
        <p>Si no has hecho la reserva, puedes ignorar este mensaje.</p>

        `,
  });
};
