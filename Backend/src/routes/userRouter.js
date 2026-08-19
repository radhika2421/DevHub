import express from 'express'
import { getAllUsers, login, signup, getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.get("/all",getAllUsers);
userRouter.post("/login",login)
userRouter.post("/signup",signup)
userRouter.get("/getProfile/:id",getUserProfile)
userRouter.put("/update/:id",updateUserProfile)
userRouter.delete("/delete/:id",deleteUserProfile)

export default userRouter;