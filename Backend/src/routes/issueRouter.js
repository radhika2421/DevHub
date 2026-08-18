import express from 'express'
import { getAllIssues } from '../controllers/issueController.js';

const issueRouter=express();

issueRouter.get("/allIssues",getAllIssues)
import express from 'express'
import { createIssue, getIssueById, getAllIssuesForRepo, updateIssueById, deleteIssueById } from '../controllers/issueController.js'; 

const repoRouter=express();

repoRouter.post("/create",createIssue)
repoRouter.get("/allIssues/:id",getAllIssuesForRepo)
repoRouter.get("/getIssue/:id",getIssueById)
repoRouter.put("/update/:id",updateIssueById)
repoRouter.delete("/delete/:id",deleteIssueById)

export default issueRouter;
