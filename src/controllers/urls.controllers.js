import urlSchema from "../schemas/url.schema.js";
import { nanoid } from "nanoid";
import { insertIntoUrls, selectUrlById, selectUrlByShortUrl, updateVisitCount } from "../repositories/urls.repositories.js";

async function shortenUrl(req, res){
    const { url } = req.body;

    const validationSchema = urlSchema.validate(req.body)
    if(validationSchema.error){
        return res.status(422).send(error.message)
    }

    const userId = res.locals.user;

    const shortUrl = nanoid(8);

    try {
        await insertIntoUrls(url, userId, shortUrl);
        res.status(201).send({shortUrl})
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function takeUrlWithId(req,res){
    const { id } = req.params;

    try {
        const promise = await selectUrlById(id);

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
        const promise = await selectUrlByShortUrl(shortUrl);
        if(!promise.rows[0]) return res.sendStatus(404);

        const url = promise.rows[0];

        await updateVisitCount(url.id);

        res.redirect(url.url);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export {shortenUrl, takeUrlWithId, redirectShortenUrl};