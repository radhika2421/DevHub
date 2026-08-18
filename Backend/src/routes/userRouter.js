import express from 'express'
import { getAllUsers, login, signup, getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userController.js';

const userRouter=express();

userRouter.get("/allUsers",getAllUsers);
userRouter.post("/loginUser",login)
userRouter.post("/signupUser",signup)
userRouter.get("/getProfile/:id",getUserProfile)
userRouter.put("/update/:id",updateUserProfile)
userRouter.delete("/delete/:id",deleteUserProfile)

export default userRouter;