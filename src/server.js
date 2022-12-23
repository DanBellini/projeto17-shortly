import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routers.js";
import urlsRouter from "./routes/urls.routers.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));