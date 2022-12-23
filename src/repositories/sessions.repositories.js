import connectionDB from "../database/db.js";

async function insertSession(token, userId){
    return connectionDB.query(`
        INSERT INTO sessions
            (token, "userId")
        VALUES
            ($1, $2)
    `,[token, userId]);
}
async function selectSession(token){
    return connectionDB.query(`
        SELECT * FROM sessions WHERE token = $1
    `,[token]);
}

export {insertSession, selectSession}