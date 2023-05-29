import express from "express";
const router = express.Router();

import {
  getUserReservations,
  getMonthReservations,
  addReservation,
  modifyReservation,
} from "../controllers/reservationController.js";

import checkAuth from "../middleware/checkAuth.js";

// Post, get and put routes
router.post("/add", checkAuth, addReservation);
router.get("/user", checkAuth, getUserReservations);
router.get("/month/:fecha", checkAuth, getMonthReservations);
router.put("/modify", checkAuth, modifyReservation);
// router.delete("/delete/:id", checkAuth, deleteReservation);

export default router;
