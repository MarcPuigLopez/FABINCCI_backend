// Database models
import User from "../models/User.js";
import Reservation from "../models/Reservation.js";

// Email configuration
import {
  emailReservationRegister,
  emailReservationDelete,
  emailAdminReservationRegister,
} from "../helpers/email.js";

// Get reservations of a user
const getUserReservations = async (req, res) => {
  const _id = req.user._id;

  try {
    const userConfirm = await User.findById({ _id });

    // Comprobar si el user existe
    if (!userConfirm) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    const reservations = await Reservation.find({ user: _id });
    return res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};

// Get reservations of a month
const getMonthReservations = async (req, res) => {
  const { date } = req.params;
  const [year, month] = date.split("-");

  try {
    // Obtener dias del mes actual
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const reservations = await Reservation.find({
      date: {
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
  const { date } = req.body;
  const reservationExists = await Reservation.findOne({ date });

  if (reservationExists != null && reservationExists.confirmed) {
    const error = new Error("Este dia ya ha sido reservado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const reservation = new Reservation(req.body);
    reservation.confirmed = true;
    reservation.user = req.user._id;
    const reservationSaved = await reservation.save();
    res.json(reservationSaved);

    const user = await User.findById(req.user._id);
    // Enviar mail de confirmación
    emailReservationRegister({
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      date: reservationSaved.date,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};

const addAdminReservation = async (req, res) => {
  // Evitar registros duplicados
  const { date, user } = req.body;
  const reservationExists = await Reservation.findOne({ date });

  if (reservationExists != null && reservationExists.confirmed) {
    const error = new Error("Este dia ya ha sido reservado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const reservation = new Reservation(req.body);
    reservation.confirmed = true;
    reservation.user = user;
    const reservationSaved = await reservation.save();
    res.json(reservationSaved);

    const userData = await User.findById(user);
    // Enviar mail de confirmación
    emailAdminReservationRegister({
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      date: reservationSaved.date,
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
    name: user.name,
    lastName: user.lastName,
    date: reservation.date,
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
  addAdminReservation,
  modifyReservation,
  deleteReservation,
};
