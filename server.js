// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var swaggerJSDoc = require("swagger-jsdoc");
var path = require("path");

var routes = require("./app/routes/index");
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

// REGISTER OUR ROUTES -------------------------------
app.use(express.static(path.join(__dirname, "public")));
// all of our routes will be prefixed with /api
app.use("/api", routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
