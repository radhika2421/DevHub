// to read input from console
import yargs from "yargs";
// utility that helps read args
import {hideBin} from "yargs/helpers"
import dotenv from "dotenv"

import initRepo from './src/controllers/init.js'
import add from './src/controllers/add.js'
import push from './src/controllers/push.js'
import pull from './src/controllers/pull.js'
import commit from './src/controllers/commit.js'
import revert from './src/controllers/revert.js'

dotenv.config();
// command and a description with parameter list and function
yargs(hideBin(process.argv))
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