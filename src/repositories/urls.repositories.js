import connectionDB from "../database/db.js";

async function insertIntoUrls(url, userId, shortUrl){
    return connectionDB.query(`
        INSERT INTO urls
            (url, "shortUrl", "userId")
        VALUES
            ($1, $2, $3)
    `,[url, shortUrl, userId]);
};

async function selectUrlById(id){
    return connectionDB.query(`
        SELECT * FROM urls WHERE id = $1
    `,[id]);
}

export {insertIntoUrls, selectUrlById}