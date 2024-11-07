import express from "express";
import "dotenv/config";
import cors from "cors";
import taskRoutes from "./routes/to-do-tasks.js";
import messageRoutes from "./routes/daily-messages.js";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/daily-message", messageRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Daily Dashboard API");
});

app.listen(PORT, () => {
  console.log("Server is listening on:", PORT);
});
