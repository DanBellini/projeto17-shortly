import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.middleware.js";
import urlSchema from "../schemas/url.schema.js";
import { authSessionMiddleware } from "../middlewares/authSession.middleware.js";
import { deleteUrl, redirectShortenUrl, shortenUrl, takeUrlWithId } from "../controllers/urls.controllers.js";

const router = Router();

router.post('/urls/shorten',validationSchema(urlSchema), authSessionMiddleware, shortenUrl);
router.get('/urls/:id', takeUrlWithId);
router.get('/urls/open/:shortUrl', redirectShortenUrl);
router.delete('/urls/:id', authSessionMiddleware, deleteUrl);

export default router;