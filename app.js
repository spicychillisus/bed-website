// required module
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// this is the message that will display on the body if connection is successful
/* app.get('/', (req, res, next) => {
    res.send("this bed ca2 was done by spicychillisus"); 
}); */

const mainRoutes = require("./src/routes/mainRoutes");
app.use("/api", mainRoutes);
app.use("/", express.static('public')); // uses the public folder to access front-end


// app export
module.exports = app;