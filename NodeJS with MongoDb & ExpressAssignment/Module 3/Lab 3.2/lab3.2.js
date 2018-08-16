var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var exp = express();
var cors = require('cors');
var fs = require('fs');
var parser = require('body-parser');
var url = "mongodb://localhost:27017/test";


exp.use(parser.json());
exp.route("/rest/api/post", cors()).post((req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        var myquery = req.body;
        dbo.collection("employees").insertMany(myquery, { useNewUrlParser: true }, function (err, res) {
            if (err) throw err;
            console.log("Document inserted");
            db.close();
        });
    });
});


exp.get('/rest/api/get', cors(), (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("employees").find({}, { useNewUrlParser: true }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

exp.get('/rest/api/getonstate/:state', cors(), (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        var query = JSON.parse('{"empAddress.state":"'+req.params.state+'"}');
        //var myquery = req.body;
        dbo.collection("employees").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});




exp.use(parser.json());
exp.route("/rest/api/updateoncity/:empId", cors()).put((req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        //var myquery = { _id: "2" };
        //var myquery = req.body;
        var myquery = JSON.parse('{"empId":'+req.params.empId+'}');
        console.log(myquery);
        var newvalues = { $set: { "empAddress.city": "Pune"} };
        dbo.collection("employees").updateOne(myquery, newvalues,{ useNewUrlParser: true }, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
});


exp.use(cors()).listen(3004, () => console.log("Running....."))