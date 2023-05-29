import express from "express";
const router = express.Router();

import {
  getUserReservations,
  getMonthReservations,
  addReservation,
  modifyReservation,
} from "../controllers/reservationController.js";

// Post, get and put routes
router.post("/", addReservation);
router.get("/user/:email", getUserReservations);
router.get("/month/:fecha", getMonthReservations);
router.put("/modify", modifyReservation);

export default router;
