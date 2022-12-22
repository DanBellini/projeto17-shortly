import connectionDB from "../database/db.js";

async function insertSession(token, userId){
    return connectionDB.query(`
        INSERT INTO sessions
            (token, "userId")
        VALUES
            ($1, $2)
    `,[token, userId])
}

export {insertSession}