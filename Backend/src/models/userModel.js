import mongoose from "mongoose";
import { Schema } from "mongoose";
import { required } from "yargs";

const userSchema=new Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
    repos:{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository"
    },
    following:{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    starredRepos:{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository"
    }
});

const User=mongoose.model("User",userSchema);

export default User;