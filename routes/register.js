import Express from "express";
import { userModel } from "../db/model.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";



export const registerRouter= Express.Router();

registerRouter.post('/', async(req, res) => {
   const payload=req.body;
    try{
        const userData= await userModel.findOne({email : payload.email});
        if(userData){
           res.status(409).send({msg:'User already exists'});
        } else {
            bcrypt.hash(payload.password, 10, async(err, data) => {
                if(err){
                    res.status(500).send({msg:'Something went wrong'});
                } else {
              const newUser= await userModel.create({...payload, password:data, id:v4()})
              res.status(200).send(newUser.toObject());
                }
            })
        }

    } catch(err){
     console.error(err);
    }

})