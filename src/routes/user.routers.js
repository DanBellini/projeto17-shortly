import { Router } from "express";
import { authSessionMiddleware } from "../middlewares/authSession.middleware.js";
import { listRanking, takeUserWithId } from "../controllers/user.controllers.js";

const router = Router();

router.get('/users/:id', authSessionMiddleware, takeUserWithId);
router.get('/ranking', listRanking)

export default router;