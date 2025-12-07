// src/routes/index.routes.js

import { Router } from "express";
import { showHomePage } from "../controllers/index.controller.js";

const indexRoutes = Router();

indexRoutes.get("/", showHomePage);

export default indexRoutes;
