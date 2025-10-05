import express from "express";
import cors from "cors";
import { publicRouter } from "#routes/publicRouter.js";
import { protectedRouter } from "#routes/protectedRouter.js"


//* Getting the App from Express and adding cors and json middleware
const App = express();
App.use(cors());
App.use(express.json());

//* App routes
App.use("/",publicRouter);
App.use("/",protectedRouter);

export default App;