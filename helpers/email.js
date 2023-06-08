import nodemailer from "nodemailer";

// Formato de fechas
import moment from "moment";

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
  const { email, nombre, apellidos, corte, fecha } = datos;

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
        <a> Nombre: ${nombre} ${apellidos} <br/></a>
        <a> Tipo de corte: ${corte} <br/></a>
        <a> El dia: ${moment(fecha).format("DD-MM-YYYY")} </a>
        <a> A las: ${moment(fecha).format("HH:mm")}</a>
        <br/>
        <a>Para modificar tu cita puedes acceder a tu perfil en el siguiente enlace</a>
        <a>o contactar con Fabincci al siguiente número: 999888777</a>
        <a href="${process.env.FRONTEND_URL}/profile">Ir a mi perfil</a>
        
        <p>Si no has hecho la reserva, puedes ignorar este mensaje.</p>

        `,
  });
};

export const emailReservationDelete = async (datos) => {
  const { email, nombre, fecha } = datos;

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
    subject: "Has cancelado tu cita",
    text: "Has cancelado tu cita",
    html: ` <p> Hola ${nombre}. ¡Acabas de cancelar tu reserva del dia ${moment(
      fecha
    ).format("DD-MM")}!</p>
        <p> Lamentamos que no puedas asistir a tu corte.</p>
        <p> A continuación tienes un link para hacer una nueva reserva:</p>
        <a href="${process.env.FRONTEND_URL}/profile">Ir a mi perfil</a>
        <br/>
        <a> ¡Esperamos verte pronto en FABINCCI!</a>

        `,
  });
};

export const emailAdminReservationRegister = async (datos) => {
  const { email, nombre, fecha } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"Fabincci BarberShop" <admin@fabincci.com>',
    to: email,
    subject: "Se ha cancelado tu cita",
    text: "Se ha cancelado tu cita",
    html: ` <p> Hola ${nombre}. ¡Se ha cancelado tu reserva del dia ${moment(
      fecha
    ).format("DD-MM")}!</p>
        <p> Por motivos personales se ha tenido que cancelar tu reserva, </br></p>
        <p> Lamentamos las moléstias.</p>
        <p> A continuación tienes un link para hacer una nueva reserva: </br></p>
        </br>
        <a href="${process.env.FRONTEND_URL}/profile">Ir a mi perfil</a>
        <br/>
        <a> ¡Esperamos verte pronto en FABINCCI!</a>

        `,
  });
};
