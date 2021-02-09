module.exports = app => {
    
    //Setings
    app.set("port", process.env.PORT || 3000);

    return app
}