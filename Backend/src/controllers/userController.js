import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {MongoClient} from "mongodb";
import dotenv from "dotenv"

dotenv.config();
const uri=process.env.MONGODB_URI;

// establishes connection
let user;

async function connectUser() {
    if (!user) {
        user = new MongoClient(uri);
        await user.connect();
    }
}

export const signup = async (req,res)=>{
    // destructure user input from request
    const { username, email, password} = req.body;
    try {
        // connects app to mongodb to ensure connection exists
        await connectUser();
        // selecting db and collection
        const db = user.db("devhub");
        const usersCollection = db.collection("users");

        // check if user exists already
        const currUser = await usersCollection.findOne({ username });
        if (currUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // if new user
        // for hashing password
        const salt = await bcrypt.genSalt(10); // 10 = bcrypt cost factor of salt rounds
        const hashedPassword = await bcrypt.hash(password, salt); // password -> salt -> bcrypt -> hashed password

        // creating new user and inserting into mongodb
        const newUser = {
            username,
            email,
            password: hashedPassword,
            repos: [],
            following: [],
            starredRepos: [],
        };
        const result = await usersCollection.insertOne(newUser);

        // creating JWT
        // providing the registered user with a token to make sure they are authenticated
        const token = jwt.sign(
            { id: result.insertedId }, // PAYLOAD
            process.env.JWT_SECRET_KEY, // secret key to sign the jwt
            { expiresIn: "1h" } // expiration
        );
        res.json({ token, userId: result.insertedId }); // server sends json back to frontend
    }
    catch (err) {
        console.error("Error during signup : ", err.message);
        res.status(500).send("Server error");
    }
}

export const login = async (req,res)=>{
    const {email,password}=req.body;
    // Step 1: establish connection
    // Step 2: Check if credentials are correct and find user
    // Step 3: check if token is valid. If yes, extend duration else create new one
    try{
        await connectUser();
        const db=user.db("devhub");
        const usersCollection=db.collection("users");

        const currUser=await usersCollection.findOne({email});
        if(!currUser)
        {
            return res.status(400).json({message:"Invalid credentials!"});
        }

        const correctPassword=await bcrypt.compare(password,currUser.password);
        if(!correctPassword)
        {
            return res.status(400).json({message:"Invalid credentials!"});
        }

        const token=jwt.sign(
            {id:currUser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "1hr"}
        );
        res.json({token, userId:currUser._id});
    }
    catch(err){
        console.error("Error during login : ",err.message)
        res.status(500).json({message: "Server Error"});
    }
}

export const getAllUsers = (req,res)=>{
    res.send("All users fetched");
}

export const getUserProfile = (req,res)=>{
    res.send("User profile");
}

export const updateUserProfile = (req,res)=>{
    res.send("Updated user profile");
}

export const deleteUserProfile = (req,res)=>{
    res.send("Deleted user profile");
}