import mongoose from "mongoose";
import { Schema } from "mongoose";
import { required } from "yargs";

const issueSchema=new Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        enum: ["open","closed"],
        default: "open",
    },
    repo:{
        type: Schema.Types.ObjectId,
        ref: "Repository",
        required: true
    },
});

const Issue=mongoose.model("Issue",issueSchema);

export default Issue;