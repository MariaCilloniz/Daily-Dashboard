import express from "express";
import { v4 as uuidv4 } from "uuid";
import { writeData, readData } from "../utils/dataUtils.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(readData());
});

router.post("/", (req, res) => {
  const { description, tags } = req.body;

  const newTask = {
    id: uuidv4(),
    description,
    tags,
  };

  const tasks = readData();
  tasks.unshift(newTask);
  writeData(tasks);

  res.status(201).json(newTask);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const tasks = readData();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    res
      .status(404)
      .json({ message: "No task with that id exists. Could not delete task." });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  writeData(tasks);
  res.status(200).json(deletedTask);
});

router.get("/:tag", (req, res) => {
  const { tag } = req.params;
  const tasks = readData();
  const filteredTasks = tasks.filter((task) => task.tags.includes(tag));
  res.status(200).json(filteredTasks);
});

export default router;
