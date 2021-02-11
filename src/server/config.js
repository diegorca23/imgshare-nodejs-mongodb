const path = require("path");
const exphbs = require("express-handlebars");
const express = require("express")

const morgan = require("morgan");
const multer = require("multer");

const erroHandler = require("errorhandler")

const routes = require("../routes/index");
const errorHandler = require("errorhandler");

module.exports = app => {
    
    //Setings
    app.set("port", process.env.PORT || 3000);
    app.set("views", path.join(__dirname, "views"));
    app.engine(".hbs", exphbs({
        defaultLayout: "main",
        partialsDir: path.join(app.get("views"), "partials"),
        layoutsDir: path.join(app.get("views"), "layouts"),
        extname: ".hbs",
        helpers: require("./helpers")
    }) )
    app.set("view engine", ".hbs");
    
    //Middlewares
    app.use(morgan("dev"));
    app.use(multer({dest: path.join(__dirname, "../public/upload/temp")}).single("imgage"));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    //routes
    routes(app);

    //static files
    app.use("/public", express.static(path.join(__dirname, "../public")));

    //errohandlers
    if ("development" === app.get("env")) {
        app.use(erroHandler);
    }

    return app
}