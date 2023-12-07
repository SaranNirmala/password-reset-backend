import express from "express";
import env from 'dotenv';
import cors from 'cors';
import connectToDb from "./db/connection.js";
import { loginRouter } from "./routes/login.js";
import { registerRouter } from "./routes/register.js";
import { forgotPasswordRouter } from "./routes/forgotPassword.js";
import { resetPasswordRouter } from "./routes/resetPassword.js";

const app = express();

const port = process.env.PORT;
await connectToDb();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter)

app.use('/register',registerRouter)

app.use('/forgotPassword',forgotPasswordRouter)

app.use('/resetPassword', resetPasswordRouter)

app.get('/', (req, res) =>{
    res.send('Welcome')
})


app.listen(port, () => console.log('listening on port', port));