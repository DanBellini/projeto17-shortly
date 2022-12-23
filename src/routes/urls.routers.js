import { Router } from "express";
import { shortenUrl, takeUrlWithId } from "../controllers/urls.controllers.js";
import { authSessionMiddleware } from "../middlewares/authSession.middleware.js";

const router = Router();

router.post('/urls/shorten', authSessionMiddleware, shortenUrl)
router.get('/urls/:id', takeUrlWithId)

export default router;