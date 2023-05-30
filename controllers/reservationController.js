// Database models
import User from "../models/User.js";
import Reservation from "../models/Reservation.js";

// Email configuration
import { emailReservationRegister, emailReservationDelete } from "../helpers/email.js";

// Get reservations of a user
const getUserReservations = async (req, res) => {
  const _id = req.user._id;

  try {
    const userConfirm = await User.findById({ _id });

    // Comprobar si el usuario existe
    if (!userConfirm) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    const reservations = await Reservation.find({ usuario: _id });
    console.log(reservations);
    return res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};

// Get reservations of a month
const getMonthReservations = async (req, res) => {
  const { fecha } = req.params;
  const [year, month, day] = fecha.split("-");

  try {
    // Obtener dias del mes actual
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const reservations = await Reservation.find({
      fecha: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    return res.json(reservations);
  } catch {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};

// Registrar una reserva
const addReservation = async (req, res) => {
  // Evitar registros duplicados
  const { fecha } = req.body;
  const reservationExists = await Reservation.findOne({ fecha });

  if (reservationExists != null && reservationExists.confirmed) {
    const error = new Error("Este dia ya ha sido reservado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const reservation = new Reservation(req.body);
    reservation.confirmed = true;
    reservation.usuario = req.user._id;
    const reservationSaved = await reservation.save();
    res.json({
      msg: "Reserva creada correctamente",
    });

    const user = await User.findById(req.user._id);
    // Enviar mail de confirmación
    emailReservationRegister({
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      fecha: reservationSaved.fecha,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};

const modifyReservation = async (req, res) => {};

const deleteReservation = async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.findById(id);

  if (!reservation) {
    const error = new Error("La reserva no existe");
    return res.status(404).json({ msg: error.message });
  }

  const user = await User.findById(req.user._id);
  emailReservationDelete({
    email: user.email,
    nombre: user.nombre,
    apellidos: user.apellidos,
    fecha: reservation.fecha,
  });

  try {
    await reservation.deleteOne();
    res.json({ msg: "Reserva eliminada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};

export {
  getUserReservations,
  getMonthReservations,
  addReservation,
  modifyReservation,
  deleteReservation,
};
