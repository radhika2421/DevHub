import express from 'express'
import { createRepo, getAllRepos, getRepoDetailsById, getRepoDetailsByName, getReposForUser, updateRepo, deleteRepo, toggleVisibility, getIssuesForRepo} from '../controllers/repoController.js';

const repoRouter=express();

repoRouter.post("/createRepo",createRepo)
repoRouter.get("/allRepos",getAllRepos)
repoRouter.get("/getRepo/:id",getRepoDetailsById)
repoRouter.get("/getRepo/:name",getRepoDetailsByName)
repoRouter.get("/getRepo/:useId",getReposForUser)
repoRouter.put("/update/:id",updateRepo)
repoRouter.delete("/delete/:id",deleteRepo)
repoRouter.patch("/toggle/:id", toggleVisibility);
repoRouter.get("/issuesForRepo/:id", getIssuesForRepo);


export default repoRouter;