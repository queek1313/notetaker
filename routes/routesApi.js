var db = require("../db/db.json");
var fs = require("fs");
const { v4: uuid } = require("uuid");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function (app) {


    app.get("/api/notes", function (req, res) {
        res.json(db)
    });

    app.post("/api/notes", function (req, res) {

        var note = req.body;

        // var lastId = db[db.length - 1]["id"];
        // var newId = lastId++;
        note["id"] = uuid();
        db.push(note);

        writeFileAsync("./db/db.json", JSON.stringify(db)).then(function () {
        });
        res.json(note);
    });

    app.delete("/api/notes/:id", function (req, res) {
        var chId = req.params.id

        for (var i = 0; i < db.length; i++) {
            if (chId === db[i].id) {
                db.splice(i, 1);

                var idJson = JSON.stringify(db)
                writeFileAsync("./db/db.json", idJson).then(function () {

                })
            }
        }
        res.json(db)
    })







}