import express from 'express';
import { forgotPasswordController, loginController, signupController } from '../controllers/authController.js';
import { isAdmin, requireLogin } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/forgot-password', forgotPasswordController);

router.get("/user-auth", requireLogin, (req, res) => {
    res.send({ ok: true });
});

router.get("/admin-auth", requireLogin, isAdmin, (req, res) => {
    res.send({ ok: true });
});

export default router;