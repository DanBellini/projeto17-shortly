import urlSchema from "../schemas/url.schema.js";
import { nanoid } from "nanoid";
import { insertIntoUrls } from "../repositories/urls.repositories.js";

async function shortenUrl(req, res){
    const { url } = req.body;
    const userId = res.locals.user;

    const shortUrl = nanoid(8);
    console.log({shortUrl})
    try {
        await insertIntoUrls(url, userId, shortUrl);
        res.status(201).send({shortUrl})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
};

export {shortenUrl}