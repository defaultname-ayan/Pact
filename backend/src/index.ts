import express, { type Express } from "express";
import authRoutes from "./routes/auth/authRoute";
import authMiddleware from "./middleware/authMiddleware";
import pactRoutes from "./routes/pact/pact.route";
const app: Express = express();

const PORT = process.env.PORT || 3001;
app.use(express.json());

app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    if (req.path.startsWith("/api/auth")) {
      console.log(
        `[auth] ${req.method} ${req.path} -> ${res.statusCode} (${Date.now() - startedAt}ms)`,
      );
    }
  });

  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pacts", authMiddleware, pactRoutes);
app.get("/health", (req, res) => {
  res.send("App working Perfectly on port " + PORT);
});
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
