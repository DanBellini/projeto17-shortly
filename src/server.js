import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routers.js";
import urlsRouter from "./routes/urls.routers.js";
import userRouter from "./routes/user.routers.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);
app.use(userRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));