import Express from "express";
import { userModel } from "../db/model.js";
import bcrypt from 'bcrypt';

export const loginRouter= Express.Router();

loginRouter.post('/' , async(req, res) => {
    let payload=req.body;

    try {
        const userMail= await userModel.findOne({email : payload.email});

        if(userMail){
            bcrypt.compare(payload.password, userMail.password, async(err, data) =>{
             if(data){
                res.status(200).send(userMail.toObject());
             } else {
                res.status(401).send({msg:'login failed'});
             }
            })
        } else{
            res.status(403).send({msg:'User not Registered'});
        }
    
    } catch(err){
     console.error(err);
    }
})