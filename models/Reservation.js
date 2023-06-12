import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
      unique: true,
    },
    cutType: {
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

const Reservation = mongoose.model("Reservations", reservationSchema);
export default Reservation;
