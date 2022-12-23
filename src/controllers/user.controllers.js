import bcrypt from "bcrypt";
import usersRepositories from "../repositories/users.repositories.js";
import urlsRepositories from "../repositories/urls.repositories.js";

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

async function takeUserWithId(req,res){
    const { id } = req.params;
    const userId = res.locals.user;

    if(id!=userId) return res.sendStatus(401);

    try {
        const userPromise = await usersRepositories.selectUserById(userId);
        const userName = userPromise.rows[0].name;

        const visitPromise = await urlsRepositories.selectSumVisitByUserId(id);
        const sumVisits = visitPromise.rows[0];

        const urlsPromise = await urlsRepositories.selectUrlByUserId(id);
        const listUrlsUser = urlsPromise.rows;

        const objectPromise = {
            id:id,
            name:userName,
            visitCount: sumVisits.sum || 0,
            shortednedUrls: listUrlsUser
        };
        
        res.send(objectPromise);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function listRanking(req,res){
    try {
        const promise = await urlsRepositories.selectUrlsRanking();
        console.log(promise)
        res.send(promise.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    };
};

export { registerUser, takeUserWithId, listRanking};