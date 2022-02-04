import express from "express";
import routes from "../routes";
import { deserializeUser } from "../middleware";

function createServer() {
    const app = express();
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.set('Access-Control-Allow-Credentials', 'true');
        res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin");
        if (req.method === "OPTIONS") {
          return res.sendStatus(200);
        }
        next();
    });
    app.use(deserializeUser);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    routes(app);

    return app
}

export default createServer;