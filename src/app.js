const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
   res.render("index", {
      title: "Weather App",
      name: "Jhoebert Huenda",
   });
});

app.get("/about", (req, res) => {
   res.render("about", {
      title: "About Me",
      name: "Jhoebert Huenda",
   });
});

app.get("/help", (req, res) => {
   res.render("help", {
      message: "Some Content",
      title: "Help",
      name: "Jhoebert Huenda",
   });
});

app.get("/weather", (req, res) => {
   if (!req.query.address) {
      return res.send({
         error: "You must provide an address",
      });
   }
   geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
         if (error) {
            return res.send({
               error: error,
            });
         }

         forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send({
                  error: error,
               });
            }
            res.send({
               forecast: location,
               location: forecastData,
               address: req.query.address,
            });
         });
      }
   );
   // res.send({
   //    forecast: "It is snowing",
   //    location: "Philadelphia",
   //    address: req.query.address,
   // });
});

app.get("/products", (req, res) => {
   if (!req.query.search) {
      return res.send({
         error: "You must provide a search term",
      });
   }

   console.log(req.query.search);
   res.send({
      products: [],
   });
});

app.get("/help/*", (req, res) => {
   res.render("404", {
      title: "404",
      name: "Jhoebert Huenda",
      errorMessage: "Help Article Not Found",
   });
});

app.get("*", (req, res) => {
   res.render("404", {
      title: "404",
      name: "Jhoebert Huenda",
      errorMessage: "Page Not Found",
   });
});

app.listen(3000, () => {
   console.log("Server is up on port 3000.");
});
