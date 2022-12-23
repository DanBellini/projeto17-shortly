import { nanoid } from "nanoid";
import urlsRepositories from "../repositories/urls.repositories.js";

async function shortenUrl(req, res){
    const { url } = req.body;
    const userId = res.locals.user;
    const shortUrl = nanoid(8);

    try {
        await urlsRepositories.insertIntoUrls(url, userId, shortUrl);
        res.status(201).send({shortUrl})
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function takeUrlWithId(req,res){
    const { id } = req.params;

    try {
        const promise = await urlsRepositories.selectUrlById(id);

        const objectPromise = promise.rows[0];
        if(!objectPromise) return res.sendStatus(404);
        
        const newObjectPromise = {
            id:objectPromise.id,
            shortUrl:objectPromise.shortUrl,
            url:objectPromise.url
        };

        res.status(200).send(newObjectPromise);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function redirectShortenUrl (req,res){
    const { shortUrl } = req.params;
    try {
        const promise = await urlsRepositories.selectUrlByShortUrl(shortUrl);
        if(!promise.rows[0]) return res.sendStatus(404);

        const url = promise.rows[0];

        await urlsRepositories.updateVisitCount(url.id);

        res.redirect(url.url);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function deleteUrl(req,res){
    const { id } = req.params;
    const userId = res.locals.user;

    try {
        const promise = await urlsRepositories.selectUrlById(id);
        if(!promise.rows[0]) return res.sendStatus(404);
        if(promise.rows[0].userId !== userId) return res.sendStatus(401);

        await urlsRepositories.deleteUrlFromTable(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export {shortenUrl, takeUrlWithId, redirectShortenUrl, deleteUrl};