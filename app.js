// Imports
import express from "express";

// Configure express app
const app = new express();

// Configure middleware

// Controllers
const helloController = (req, res) => res.send("Hi! My Name Is John Doe");
const addController = (req, res) => {
  const var1 = req.params.var1;
  const var2 = req.params.var2;
  const result = {
    operation: "addition",
    operand1: var1,
    operand2: var2,
    result: parseInt(var1) + parseInt(var2),
    message: "Have A Great Day!",
  };
  res.json(result);
};

// Endpoints
app.get("/hello", helloController);

app.get("/add/:var1,:var2", addController);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));
