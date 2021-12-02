const express = require("express");
const app= express();
const path = require("path");

const port = process.env.PORT || 8080;

//with path express easily routes to the prod build folder
app.use(express.static(path.join(__dirname, "/build")));

//rendering the index.html for every get request
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname + "/build/index.html"));
})

app.listen(port, (_)=>console.log(`react app is listening on port ${port}`));
