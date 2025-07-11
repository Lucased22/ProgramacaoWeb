import express from "express";
import dotenv from "dotenv"
import { engine } from "express-handlebars";
import cookieParser from 'cookie-parser';
import validateEnv from "./utils/validateEnv";
import logger from "./middleware/logger";
import router from "./router/router";
import session from 'express-session';
import  {v4 as uuidv4} from "uuid";

declare module "express-session" {
    interface SessionData {
        logado: boolean
    }
}
 
const app = express()
dotenv.config()
validateEnv()

const PORT = process.env.PORT ?? 6688

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}))
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

app.use(logger("simple"))

app.use("/css", express.static(`${process.cwd()}/public/css`))
app.use("/js", express.static(`${process.cwd()}/public/js`))
app.use("/img", express.static(`${process.cwd()}/public/img`))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session({
    genid: () => uuidv4(), 
    secret: 'Hi9Cf#mK98',
    resave: true,
    saveUninitialized: true,
    }));

app.use(router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})