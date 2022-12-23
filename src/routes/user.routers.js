import { Router } from "express";
import { authSessionMiddleware } from "../middlewares/authSession.middleware.js";
import { takeUserWithId } from "../controllers/user.controllers.js";

const router = Router();

router.get('/users/:id', authSessionMiddleware, takeUserWithId);

export default router;