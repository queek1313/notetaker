var db = require("../db/db.json");
var fs = require("fs");
const {v4:uuid} = require("uuid");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function(app){

    
    app.get("/api/notes", function (req, res){
        res.json(db)
    });

    app.post("/api/notes", function(req, res){

                var note = req.body;
        
                var lastId = db[db.length - 1]["id"];
                var newId = lastId = 1;
                note["id"] = newId;
                db.push(note);
                
                writeFileAsync("./db/db.json", JSON.stringify(db)).then(function(){
                    console.log("db.json updated")
                });
                res.json(note);
            });









}