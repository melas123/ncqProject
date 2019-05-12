// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var swaggerJSDoc = require("swagger-jsdoc");
var path = require("path");
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// swagger definition
var swaggerDefinition = {
  info: {
    title: "NCQ test API",
    version: "1.0.0",
    description: "Describe a RESTful API with Swagger"
  },
  host: "localhost:8080",
  basePath: "/api"
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./app/routes/*.js"]
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
var routes = require("./app/routes/index");
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.use(function(req, res, next) {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

var postWorkflows = require("./app/controllers/workflow");
var getWorkflowcategories = require("./app/controllers/workflowCategory");
// more routes for our API will happen here
router.route("/workflowCategories").get(getWorkflowcategories);

router.route("/workflows").post(postWorkflows);
// REGISTER OUR ROUTES -------------------------------
app.use(express.static(path.join(__dirname, "public")));
// all of our routes will be prefixed with /api
app.use("/api", routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
