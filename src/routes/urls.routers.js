import { Router } from "express";
import { redirectShortenUrl, shortenUrl, takeUrlWithId } from "../controllers/urls.controllers.js";
import { authSessionMiddleware } from "../middlewares/authSession.middleware.js";

const router = Router();

router.post('/urls/shorten', authSessionMiddleware, shortenUrl)
router.get('/urls/:id', takeUrlWithId)
router.get('/urls/open/:shortUrl', redirectShortenUrl)

export default router;