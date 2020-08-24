import * as express from "express";
import * as cors from "cors";
import { registerRoutes } from "app/controller/router";
import { errorHandler } from "app/controller/errorHandler";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
registerRoutes(app);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
