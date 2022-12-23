import connectionDB from "../database/db.js";

async function selectEmail (email){
    return connectionDB.query(`SELECT * FROM users WHERE email = $1`,[email]);
};

async function insertUser (name, email, passwordHash){
    return connectionDB.query(`
        INSERT INTO users
            (name, email, password)
        VALUES ($1, $2, $3)
        `, [name, email, passwordHash]);
};

async function selectUserById(userId){
    return connectionDB.query(`
        SELECT * FROM users WHERE id = $1
    `,[userId])
};

const usersRepositories = { 
    selectEmail, 
    insertUser, 
    selectUserById 
};

export default usersRepositories;