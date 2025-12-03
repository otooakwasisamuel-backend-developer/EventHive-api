import { Router } from "express";
import { isAuthenticated } from "../middlewares/authn.js";
import { loginUser, getProfile, registerUser } from "../controllers/user.js";

// Create router
const userRouter = Router();

// Define routes
userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser);

userRouter.get('/users/profile', isAuthenticated, getProfile);

// Export router
export default userRouter;