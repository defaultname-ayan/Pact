import { Router } from "express";
import { registerUser } from "../../controllers/auth/registerController";
import { loginUser } from "../../controllers/auth/loginController";
import authMiddleware from "../../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", authMiddleware, (req, res) => {
  res.json({
    user: req.user,
  });
});
export default router;
