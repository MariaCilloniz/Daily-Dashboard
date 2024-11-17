import fs from "fs";

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(process.env.TASK_DATA), "utf8");
  } catch (error) {
    console.error("Error reading data.");
    throw new Error("Error reading data from file.");
  }
};

const writeData = (newData) => {
  try {
    fs.writeFileSync(process.env.TASK_DATA, JSON.stringify(newData, null, 2));
  } catch (error) {
    console.error("Error writing data.");
    throw new Error("Error writing data to file.");
  }
};

export { writeData, readData };
