import express from 'express'
import { createIssue, getIssueById, getAllIssuesForRepo, updateIssueById, deleteIssueById } from '../controllers/issueController.js'; 

const issueRouter=express();

issueRouter.post("/create",createIssue)
issueRouter.get("/allIssues/:id",getAllIssuesForRepo)
issueRouter.get("/getIssue/:id",getIssueById)
issueRouter.put("/update/:id",updateIssueById)
issueRouter.delete("/delete/:id",deleteIssueById)

export default issueRouter;
