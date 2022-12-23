import connectionDB from "../database/db.js";

async function insertIntoUrls(url, userId, shortUrl){
    return connectionDB.query(`
        INSERT INTO urls
            (url, "shortUrl", "userId")
        VALUES
            ($1, $2, $3)
    `,[url, shortUrl, userId])
};

export {insertIntoUrls}