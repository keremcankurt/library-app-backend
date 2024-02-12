import express from "express";
import { register, login } from "../controllers/auth";
import { checkEmailExists } from "../middlewares/database/databaseErrorHelpers";

const router = express.Router();

router.post("/register", register);
router.post(
  "/login",
  [checkEmailExists],
  login
);

export default router;
