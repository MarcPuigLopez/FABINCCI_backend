import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
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
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reserva", reservationSchema);
export default Reservation;
