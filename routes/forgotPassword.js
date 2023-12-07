import Express from "express";
import { userModel } from "../db/model.js";
import jwt from "jsonwebtoken";
import { mailOptions,transporter } from "./mail.js";
import env from "dotenv";

env.config()

export const forgotPasswordRouter= Express.Router();

export let userMail=[];

forgotPasswordRouter.post('/', async(req, res) => {
const payload=req.body;
userMail=[];
userMail.push(payload.email);
try{
const userData= await userModel.findOne({email: payload.email});
if(userData){
    const verificationToken=jwt.sign({email:payload.email}, process.env.JWT_SECRET, {expiresIn:'5m'})
   
    const verificationLink= `${process.env.FE_URL}/resetPassword?verify=${verificationToken}`
    
    const trans={...mailOptions,to:payload.email, text:`Hi, please click the link below to confirm your account ${verificationLink}`}
    await transporter.sendMail(trans)
    res.status(200).send({msg:'your account has beed verified'});
} else{
    res.status(401).send({msg:'Email invalid'})
}
} catch(err){
    console.error(err);
}

})