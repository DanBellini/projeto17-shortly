import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";
import { authRegisterSchema, authSingInSchema } from "../schemas/auth.schemas.js";
import { selectEmail, insertUser } from "../repositories/auth.repositories.js";

async function registerUser (req, res) {
    const validationSchema = authRegisterSchema.validate(req.body);

    if(validationSchema.error){
        return res.send(validationSchema.error.message).status(422);
    }

    const {email, name, password} = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const emailAlreadyRegistered = await selectEmail(email);

        if(emailAlreadyRegistered.rows.length) return res.sendStatus(409);

        await insertUser(name, email, passwordHash);

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
};

async function singInUser (req, res) {

};

export {singInUser, registerUser};