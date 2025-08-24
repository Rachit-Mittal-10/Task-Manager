import { Router } from "express";
import { getUserDetails } from "../controllers/userController.js";

const router = Router();

router.get("/",getUserDetails);

export {router};
