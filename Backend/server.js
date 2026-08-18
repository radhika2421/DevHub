import express from "express"
// to read input from console
import yargs from "yargs";
// utility that helps read args
import {hideBin} from "yargs/helpers"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser";
import http from "http";
// for real time updates
import { Server } from "socket.io";
import mainRouter from './src/routes/mainRouter.js'

import { connectDB } from "./src/config/db.js";
import initRepo from './src/controllers/init.js'
import add from './src/controllers/add.js'
import push from './src/controllers/push.js'
import pull from './src/controllers/pull.js'
import commit from './src/controllers/commit.js'
import revert from './src/controllers/revert.js'

dotenv.config();

const app=express();

// command and a description with parameter list and function
yargs(hideBin(process.argv))
    .command('start','Start Server',await startServer())
    .command('init',"Initialize a new repository", {}, initRepo)
    .command('add <file>',"Add files to repository", (yargs)=>{
        yargs.positional("file",{
            describe: "Files to add to the staging area",
            type: "String"
        });
    }, (argv)=>{ // argv contains all the arguments that comes with the command like the file (path)
        add(argv.file)
    })
    .command('commit <message>',"Commit changes to repository", (yargs)=>{
        yargs.positional("message",{
            describe: "Commit message",
            type: "String"
        })
    }, (argv)=>{
        commit(argv.message);
    })
    .command('push',"Push commits to repository", {}, push)
    .command('pull',"Pull commits from repository", {}, pull)
    .command('revert <commitID>',"Revert back to an older commit", (yargs)=>{
        yargs.positional("commitID",{
            describe: "Commit ID to revert back to",
            type: "String"
        })
    }, (argv)=>{
        revert(argv.commitID);
    })
    .demandCommand(1,"You need to give at least one command") //requirement, command would work even wo this
    .help().argv;

    // Server creation
async function startServer(){
    app.use(bodyParser.json());
    app.use(express.json());

    const port=process.env.PORT || 3000;

    await connectDB().then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
    console.log("Could not connect to server :",err);
    })

    // not secure
    app.use(cors({
        //  * = we are accepting requests from all origins
        origin: "*"
    }))

    app.use('/api',mainRouter);

    // Socket
    const httpServer=http.createServer(app);
    const io=new Server(httpServer,{
        cors:{
            origin: "*",
            methods: ["GET","POST"]
        }
    });
    // anyone logged in will have access to this socket
    const user="test" //temp, will be updated by logged in user
    io.on("connection",(socket)=>{
        socket.on("joinRoom",(userID)=>{
            user=userIDl
            console.log("======")
            console.log(user)
            console.log("======")
            socket.join(userID)
        });
    })

    const db=mongoose.connection;
    db.once("open",async ()=>{
        console.log("CRUD operations called");
    })

    httpServer.listen(port,()=>{
        console.log(`Server started at port ${port}`);
    })
}