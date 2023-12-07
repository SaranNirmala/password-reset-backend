import mongoose from 'mongoose';
import env from 'dotenv';

env.config()

const userName=process.env.USER_NAME || '';
const password=process.env.PASSWORD_DB || '';
const cluster= process.env.CLUSTER || '';
const dbName=process.env.DB_NAME || '';


// const localdb= 'mongodb://localhost:27017/Task-25';
const cloudUrl=`mongodb+srv://${userName}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`

const connectToDb = async() =>{  
   try{
   const db= mongoose.connect(cloudUrl)
   if(db){
    console.log('db connection established');
   } 
   } catch(err) {
    console.error('Error connecting', err);
    process.exit(1);
   }
}

export default connectToDb;
