// src/controllers/index.controller.js
import { getLatestPublicPosts } from "../services/posts.service.js";
import { getPopularCircles } from "../services/circles.service.js";

export async function showHomePage(req, res) {
  const publicPosts = await getLatestPublicPosts(6);
  const circles = await getPopularCircles(6);

  res.render("index", {
    title: "Welcome to InnerCircles",
    publicPosts,
    circles,
  });
}
