import express, { type Express } from "express";
import authRoutes from "./routes/auth/authRoute";
import authMiddleware from "./middleware/authMiddleware";

const app: Express = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.send("App working Perfectly on port " + PORT);
});
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
