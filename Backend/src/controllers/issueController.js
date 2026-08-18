export const createIssue =(req,res)=>{
    res.send("Created issue");
}
export const getIssueById = (req,res)=>{
    res.send("Issue details");
}
export const updateIssueById =(req,res)=>{
    res.send("Updated Issue");
}
export const deleteIssueById =(req,res)=>{
    res.send("Deleted Issue");
}
export const getAllIssuesForRepo = (req,res)=>{
    res.send("All issues for repo")
}