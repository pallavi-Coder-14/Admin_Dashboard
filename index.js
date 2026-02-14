import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import DbCon from "./libs/db.js";

import AuthRoutes from "./routes/Auth.js";
import ProductRoutes from "./routes/Products.js";

import brandRoutes from "./routes/brand.js";
import offerRoutes from "./routes/offer.js";

dotenv.config();

const app = express(); // ✅ FIRST

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// DB
DbCon();

// Routes
app.use("/auth", AuthRoutes);
app.use("/product", ProductRoutes);
app.use("/brand", brandRoutes);
app.use("/offer", offerRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello from backend ✅");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
