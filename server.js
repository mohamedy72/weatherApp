/**
 * Setting up a server and including essential modules
 */

// Importing required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

/**
 * Global variables
 */
// App API endpoint
const projectData = {};

const app = express();
const port = 8000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Express server is pointed to the project folder
app.use(express.static("website"));

// Listen to the server
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`Server is running on port: ${port}`);
}

/**
 * Routes Started
 */

/* GET Route */
app.get("/all", (req, res) => {
  res.json(projectData);
});

/* POST Route */
app.post("/addEntry", (req, res) => {
  const data = req.body;
  projectData["temp"] = data.temp;
  projectData["date"] = data.date;
  projectData["userResponse"] = data.userResponse;
});
