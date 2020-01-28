const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger("dev"));

// var db = require ("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to Mongo DB with Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Set Handlebars.
var exphbs = require("express-handlebars");

// Set view engine as handlebars file type
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./controllers/")(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
    console.log(`Application running on PORT ${PORT}`);
  });