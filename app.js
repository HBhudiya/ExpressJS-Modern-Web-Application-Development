// Imports
import express from "express";
import database from "./database.js";

// Configure express app
const app = new express();

// Configure middleware

// Controllers
const modulesController = async (req, res, variant) => {
  // Initialisations
  let table = "Modules";
  let fields = [
    "ModuleID",
    "ModuleCode",
    "ModuleName",
    "ModuleLevel",
    "ModuleYearID",
    "ModuleLeaderID",
    "ModuleImageURL",
  ];

  // Resolve foreign keys
  table = `(${table} LEFT JOIN Years ON ModuleYearID = YearID)`;
  fields = [...fields, "YearName AS ModuleYearName"];
  table = `(${table} LEFT JOIN Users ON ModuleLeaderID = UserID)`;
  fields = [
    ...fields,
    'CONCAT(UserFirstName, " ", UserLastName) AS ModuleLeaderName',
  ];

  // Build and execute query
  let where = "";
  const id = parseInt(req.params.id);
  switch (variant) {
    case "primary":
      where = `WHERE ModuleID=${id}`;
      break;
    case "leader":
      where = `WHERE ModuleLeaderID=${id}`;
      break;
    case "users":
      table = `(${table} INNER JOIN Modulemembers ON ModuleID=ModulememberModuleID)`;
      where = `WHERE ModulememberUserID=${id}`;
      break;
  }

  const sql = `SELECT ${fields} FROM ${table} ${where}`;
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
app.get("/api/modules/:id", (req, res) =>
  modulesController(req, res, "primary"),
);
app.get("/api/modules/leader/:id", (req, res) =>
  modulesController(req, res, "leader"),
);
app.get("/api/modules/users/:id", (req, res) =>
  modulesController(req, res, "users"),
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));
