import config from "config";
import log from "./logger";
import connect from "./db/mongoConnect";
import createServer from "./utils/server";

// const ALLOWED_ORIGINS = [
//   `http://${host}:${port}`
// ]

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = createServer();

app.listen(port, host, () => {
    if (!config.get("demo")) {
      connect();
    }
    log.info(`Server listing at http://${host}:${port}`);
});