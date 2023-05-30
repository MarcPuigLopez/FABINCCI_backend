import express from "express";
const router = express.Router();

import {
  registerUser,
  authenticateUser,
  confirmUser,
  forgotPassword,
  matchToken,
  newPassword,
  profileUser,
  modifyUser,
} from "../controllers/userController.js";

import checkAuth from "../middleware/checkAuth.js";

// Register, Authentication and Confirmation routes
router.post("/", registerUser);
router.post("/login", authenticateUser);
router.get("/confirm/:token", confirmUser);
router.post("/reset-password", forgotPassword);
router.route("/reset-password/:token").get(matchToken).post(newPassword);

router.put("/profile", checkAuth, modifyUser);
router.get("/profile", checkAuth, profileUser);

export default router;
