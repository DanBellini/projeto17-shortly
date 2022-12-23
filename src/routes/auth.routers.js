import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.middleware.js";
import singInSchema from "../schemas/singIn.schema.js";
import registerSchema from "../schemas/register.schema.js";
import { singInUser }from "../controllers/auth.controllers.js";
import { registerUser } from "../controllers/user.controllers.js";


const router = Router();

router.post('/singin', validationSchema(singInSchema), singInUser);
router.post('/singup',validationSchema(registerSchema), registerUser);

export default router;