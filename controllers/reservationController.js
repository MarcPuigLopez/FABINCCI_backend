// Database models
import User from "../models/User.js";
import Reservation from "../models/Reservation.js";

// Email configuration
import { emailReservationRegister } from "../helpers/email.js";

// Get reservations of a month
const getReservations = async (req, res) => {
  const { email } = req;
  const userConfirm = await User.findOne({ email });

  // Comprobar si el usuario existe
  if (!userConfirm) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  const reservations = await Reservation.find(
    { email },
    (err, reservations) => {
      if (err) {
        return res.status(400).json({ msg: "Ha ocurrido un error" });
      } else {
        return res.json(reservations);
      }
    }
  );
};

// Registrar una reserva
const addReservation = async (req, res) => {
  // Evitar registros duplicados
  const { fecha, hora } = req.body;
  const reservationExists = await Reservation.findOne({ fecha, hora });

  if (!reservationExists.confirmed) {
    const error = new Error("Este dia ya ha sido reservado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const reservation = new Reservation(req.body);
    reservation.confirmed = true;
    const reservationSaved = await reservation.save();
    res.json({
      msg: "Reserva creada correctamente",
    });

    // Enviar mail de confirmación
    emailReservationRegister({
      email: reservationSaved.email,
      nombre: reservationSaved.nombre,
      apellidos: reservationSaved.apellidos,
      corte: reservationSaved.corte,
      fecha: reservationSaved.fecha,
      hora: reservationSaved.hora,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};

const modifyReservation = async (req, res) => {};

const profileUser = async (req, res) => {};

export { getReservations, addReservation, modifyReservation };
