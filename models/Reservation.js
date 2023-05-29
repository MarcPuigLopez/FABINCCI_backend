import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
    },
    apellidos: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    fecha: {
      type: Date,
      required: true,
      trim: true,
      unique: true,
    },
    corte: {
      type: String,
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
