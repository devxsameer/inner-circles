// src/server.js
import "dotenv/config";
import { app } from "./app.js";

const PORT = process.env.PORT || 6969;

const server = app.listen(PORT, () => {
  console.log(
    `✅ InnerCircles running on http://localhost:${PORT} (${
      process.env.NODE_ENV || "development"
    })`
  );
});

// Graceful shutdown (important for production / Neon / Railway)
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

function shutdown() {
  console.log("🛑 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed cleanly");
    process.exit(0);
  });
}
