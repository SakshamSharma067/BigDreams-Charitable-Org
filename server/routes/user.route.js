import { Router } from 'express';
import { register, login, logout } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', isAuthenticated, logout);
userRouter.get('/is-auth', isAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

export default userRouter;
