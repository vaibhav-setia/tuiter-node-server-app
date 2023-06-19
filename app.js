import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js"
import cors from 'cors'
import AuthController from "./users/auth-controller.js";
import session from "express-session";
import mongoose from "mongoose";
// mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
const app = express()
app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        sameSite  : 'none',
        secure    : true
    }})
   );
   const CONNECTION_STRING = 'mongodb+srv://naresh:naresh@cluster0.ucnqcns.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING);
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: "https://a6--endearing-halva-ab9ff7.netlify.app"
    })
   );
AuthController(app);
HelloController(app)
UserController(app)
TuitsController(app);
app.listen(process.env.PORT || 4000);