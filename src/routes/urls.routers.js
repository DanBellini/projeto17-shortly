import { Router } from "express";
import { deleteUrl, redirectShortenUrl, shortenUrl, takeUrlWithId } from "../controllers/urls.controllers.js";
import { authSessionMiddleware } from "../middlewares/authSession.middleware.js";

const router = Router();

router.post('/urls/shorten', authSessionMiddleware, shortenUrl);
router.get('/urls/:id', takeUrlWithId);
router.get('/urls/open/:shortUrl', redirectShortenUrl);
router.delete('/urls/:id', authSessionMiddleware, deleteUrl);

export default router;