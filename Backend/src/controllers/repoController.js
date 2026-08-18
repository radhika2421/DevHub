export const createRepo =(req,res)=>{
    res.send("Created repo");
}
export const getAllRepos = (req,res)=>{
    res.send("All repos fetched");
}
export const getRepoDetailsById = (req,res)=>{
    res.send("Repo details by ID");
}
export const getRepoDetailsByName = (req,res)=>{
    res.send("Repo details By name");
}
export const getReposForUser = (req,res)=>{
    res.send("Repo for users");
}
export const updateRepo =(req,res)=>{
    res.send("Created repo");
}
export const deleteRepo =(req,res)=>{
    res.send("Deleted repo");
}
export const toggleVisibility =(req,res)=>{
    res.send("vis toggled");
}
export const getIssuesForRepo = (req,res)=>{
    res.send("Issues for repo");
}