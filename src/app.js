import express from "express";
import router from "./router/index.js";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config'

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

export default app;
