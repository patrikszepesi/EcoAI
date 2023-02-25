import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
  register,
  login,
  logout,
  currentUser,
} from "../controllers/auth";
import {predictImage} from "../controllers/predict";
import {getInference} from "../controllers/inference";


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.post("/predict", requireSignin, predictImage)
router.post("/inference", requireSignin, getInference);



module.exports = router;
