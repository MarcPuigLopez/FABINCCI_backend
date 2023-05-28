import express from "express";
const router = express.Router();

import {
  addReservation,
  getReservations,
  modifyReservation,
  profileUser,
} from "../controllers/reservationController.js";

import checkAuth from "../middleware/checkAuth.js";

// Post, get and put routes
router.post("/reservation", addReservation);
router.get("/reservations/:token", getReservations);
router.put("/reservation", modifyReservation);

export default router;
