import mongoose from "mongoose";
import bycrypt from "bcrypt";

const reservationSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: false,
      trim: true,
    },
    apellidos: {
      type: String,
      required: false,
    },
    fecha: {
      type: Date,
      required: true,
      trim: true,
      unique: true,
      min: "2023-01-01",
    },
    hora: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    corte: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reserva", reservationSchema);
export default Reservation;
