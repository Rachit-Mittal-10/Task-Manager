import express from "express";
import cors from "cors";
import { publicRouter, protectedRouter } from "./routes/index.js";


//* Getting the App from Express and adding cors and json middleware
const App = express();
App.use(cors());
App.use(express.json());

//* App routes
App.use("/",publicRouter);
App.use("/",protectedRouter);

export default App;