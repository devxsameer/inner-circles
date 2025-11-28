// src/server.js
import "dotenv/config";
import { app } from "./app.js";

const PORT = process.env.PORT || 6969;

app.listen(PORT, (err) => {
  if (err) {
    console.error("❌ Server Error:", err);
    return;
  }
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
