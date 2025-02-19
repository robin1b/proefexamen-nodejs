// src/server.ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import raceRoutes from "./routes/raceRoutes";
import teamRoutes from "./routes/teamRoutes";
import driverRoutes from "./routes/driverRoutes";
import circuitRoutes from "./routes/circuitRoutes";

// Import middleware
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

dotenv.config();

const app = express();
app.use(express.json());

// Use the request logger middleware
app.use(logger);

// Register routes
app.use("/races", raceRoutes);
app.use("/teams", teamRoutes);
app.use("/drivers", driverRoutes);
app.use("/circuits", circuitRoutes);

// Handle 404 - Not Found
app.use(notFound);

// Global error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start the server
const mongoUri =
  process.env.MONGO_URI ||
  "mongodb+srv://robin1broos:56drYRRLr4XybitP@cluster0.7irb6.mongodb.net/f1db?retryWrites=true&w=majority";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Verbonden met MongoDB");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server draait op poort ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB-verbinding mislukt:", err);
  });
