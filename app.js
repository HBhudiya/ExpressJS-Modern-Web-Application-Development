// Imports
import express from "express";
import database from "./database.js";

// Configure express app
const app = new express();

// Configure middleware

// Controllers
const modulesController = async (req, res) => {
  const table = "Modules";
  const fields = [
    "ModuleID",
    "ModuleCode",
    "ModuleName",
    "ModuleLevel",
    "ModuleYearID",
    "ModuleLeaderID",
    "ModuleImageURL",
  ];
  const sql = `SELECT ${fields} FROM ${table}`;
  try {
    const [result] = await database.query(sql);
    if (result.length === 0)
      res.status(404).json({ message: "No Record(s) Found" });
    else res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed To Execute Query: ${error.message}` });
  }
};

// Endpoints
app.get("/api/modules", modulesController);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));
