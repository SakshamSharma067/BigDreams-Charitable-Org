import { Router } from 'express';
import { 
    register, 
    login, 
    logout,
    isAuth,
    checkUser,
    upgradeToVolunteer
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const userRouter = Router();

// Public routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/check-user', checkUser);
userRouter.post('/upgrade-to-volunteer', upgradeToVolunteer);
userRouter.get('/logout', isAuthenticated, logout);
userRouter.get('/is-auth', isAuthenticated, isAuth);


export default userRouter;
