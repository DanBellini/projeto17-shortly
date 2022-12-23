import { selectUserById } from "../repositories/users.repositories.js";
import { selectSession } from "../repositories/sessions.repositories.js";

async function authSessionMiddleware(req, res, next){
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ","");

    if(!token){
        return res.status(401).send("Chave não encontrada, tente novamente!");
    }
    try {
        const session = await selectSession(token);

        if(!session.rows[0]){
            return res.status(401).send("Essa sessão não existe!");
        }

        const userId = session.rows[0].userId;
        
        const userExists = await selectUserById(userId);

        if(!userExists.rows[0]){
            return res.status(401).send("Usuário não encontrado!");
        }
        
        res.locals.user = userId;
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export {authSessionMiddleware};