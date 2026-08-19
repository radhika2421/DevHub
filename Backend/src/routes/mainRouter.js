import express from 'express'
import userRouter from './userRouter.js';
import repoRouter from './repoRouter.js';
import issueRouter from './issueRouter.js';

const mainRouter=express.Router();

mainRouter.use("/user",userRouter);
mainRouter.use("/repo",repoRouter)
mainRouter.use("/issue",issueRouter)

export default mainRouter;