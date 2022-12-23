import { Router } from "express";
import { shortenUrl } from "../controllers/urls.controllers.js";
import { authSessionMiddleware } from "../middlewares/authSession.middleware.js";

const router = Router();

router.post('/urls/shorten', authSessionMiddleware, shortenUrl)

export default router;