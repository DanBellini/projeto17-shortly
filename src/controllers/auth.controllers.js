import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";
import usersRepositories from "../repositories/users.repositories.js";
import sessionsRepositories from "../repositories/sessions.repositories.js";


async function singInUser (req, res) {
    const {email, password} = req.body;

    try {
        const user = await usersRepositories.selectEmail(email);
        
        if(!user){
            return res.sendStatus(401);
        }

        const passwordIsValid = bcrypt.compareSync(password, user.rows[0].password);

        if(!passwordIsValid){
            return res.sendStatus(401);
        }

        const token = uuid();
        const userId = user.rows[0].id;
        await sessionsRepositories.insertSession(token, userId);

        return res.status(200).send(token);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export { singInUser };