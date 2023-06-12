import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js"
import cors from 'cors'
import AuthController from "./users/auth-controller.js";
import session from "express-session";
const app = express()
app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
    })
   );
   
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: "https://a5--endearing-halva-ab9ff7.netlify.app",
    })
   );
AuthController(app);
HelloController(app)
UserController(app)
TuitsController(app);
app.listen(process.env.PORT || 4000);