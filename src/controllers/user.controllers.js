import bcrypt from "bcrypt";
import usersRepositories from "../repositories/users.repositories.js";

async function registerUser (req, res) {
    const {email, name, password, confirmPassword} = req.body;
    
    if(!confirmPassword) return res.status(422).send('"confirmPassword" must be [ref:password]');

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const emailAlreadyRegistered = await usersRepositories.selectEmail(email);

        if(emailAlreadyRegistered.rows.length) return res.sendStatus(409);

        await usersRepositories.insertUser(name, email, passwordHash);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
    
};

export { registerUser };