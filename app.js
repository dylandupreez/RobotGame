/// <reference path="./typings/index.d.ts" />
var path = require("path");
var express = require("express");

var app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname,"js")));
app.use(express.static(path.join(__dirname,"css")));

app.listen(3000,function(){
    console.log("Express server running on port 3000");
})