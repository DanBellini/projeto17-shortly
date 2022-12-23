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
};

async function selectUrlByShortUrl(shortUrl){
    return connectionDB.query(`
        SELECT * FROM urls WHERE "shortUrl" = $1
    `,[shortUrl])
};

async function updateVisitCount(urlId){
    return connectionDB.query(`
        UPDATE 
            urls
        SET 
            "visitCount" = "visitCount" + 1
        WHERE
            id = $1
    `,[urlId])
};

async function deleteUrlFromTable(id){
    return connectionDB.query(`
        DELETE FROM urls WHERE id = $1
    `,[id])
};

async function selectSumVisitByUserId (userId){
    return connectionDB.query(`
        SELECT 
            SUM (urls."visitCount") 
        FROM 
            urls
        WHERE 
            urls."userId" = $1
    `,[userId]);
};

async function selectUrlByUserId(userId){
    return connectionDB.query(`
        SELECT 
            id,
            "shortUrl",
            url,
            "visitCount"
        FROM urls 
        WHERE urls."userId" = $1
    `,[userId]);
};

async function selectUrlsRanking(){
    return connectionDB.query(`
        SELECT
            users.id,
            users.name,
                COUNT (urls.id)
                    AS "linksCount",
                SUM (urls."visitCount")
                    AS "visitCount"
        FROM urls
        JOIN users
            ON urls."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10    
    `)
}

const urlsRepositories = {
    insertIntoUrls,
    selectUrlById,
    selectUrlByShortUrl,
    updateVisitCount,
    deleteUrlFromTable,
    selectSumVisitByUserId,
    selectUrlByUserId,
    selectUrlsRanking
}

export default urlsRepositories;