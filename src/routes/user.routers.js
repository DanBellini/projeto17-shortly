import { Router } from "express";
import { authSessionMiddleware } from "../middlewares/authSession.middleware.js";

const router = Router();

router.get('/users/:id', authSessionMiddleware);

export default router;