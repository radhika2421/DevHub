import mongoose from "mongoose";
import { Schema } from "mongoose";
import { required } from "yargs";

const repoSchema=new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
    },
    content:{
        type: String,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issues:{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Issue"
    },
    stars:{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Repository=mongoose.model("Repository",repoSchema);

export default Repository;