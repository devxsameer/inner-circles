// src/routes/index.routes.js

import { Router } from "express";
import { getAllPosts } from "../services/posts.service.js";

const indexRoutes = Router();

indexRoutes.get("/", async (req, res) => {
  const viewerId = req.user ? req.user.id : null;
  const posts = await getAllPosts(viewerId);

  res.render("index", { title: "InnerCircles", publicPosts: posts });
});

export default indexRoutes;
