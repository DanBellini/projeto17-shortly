import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";
import { authRegisterSchema, authSingInSchema } from "../schemas/auth.schemas.js";
import { selectEmail, insertUser } from "../repositories/users.repositories.js";
import { insertSession } from "../repositories/sessions.repositories.js";

async function registerUser (req, res) {
    const {email, name, password, confirmPassword} = req.body;
    
    if(!confirmPassword) return res.status(422).send('"confirmPassword" must be [ref:password]');

    const validationSchema = authRegisterSchema.validate(req.body);

    if(validationSchema.error){
        return res.status(422).send(validationSchema.error.message);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const emailAlreadyRegistered = await selectEmail(email);

        if(emailAlreadyRegistered.rows.length) return res.sendStatus(409);

        await insertUser(name, email, passwordHash);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
    
};

async function singInUser (req, res) {

    const validationSchema = authSingInSchema.validate(req.body);

    if(validationSchema.error){
        return res.status(422).send(validationSchema.error.message);
    }

    const {email, password} = req.body;
    try {

        const user = await selectEmail(email);
        
        if(!user){
            return res.sendStatus(401);
        }

        const passwordIsValid = bcrypt.compareSync(password, user.rows[0].password);

        if(!passwordIsValid){
            return res.sendStatus(401);
        }
        const token = uuid();
        const userId = user.rows[0].id;
        await insertSession(token, userId);

        return res.status(200).send({token, name: user.rows[0].name})
    } catch (error) {
        res.status(500).send(error.message)
    }
};


export {singInUser, registerUser};