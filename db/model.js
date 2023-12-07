import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    id:{
        type:'string',
        required: true
    },
    email : {
        type:'string',
        required: true
    },
    password : {
        type:'string',
        required: true
    }
})

export const userModel = mongoose.model('users', userSchema);