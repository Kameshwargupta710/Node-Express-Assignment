var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var exp = express();
var cors = require('cors');
var fs = require('fs');
var parser = require('body-parser');
var url = "mongodb://localhost:27017/test";


exp.use(parser.json());
exp.route("/rest/api/insert", cors()).post((req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        var myquery = req.body;
        dbo.collection("Products").insert(myquery, { useNewUrlParser: true }, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
});


exp.get('/rest/api/get', cors(), (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("Products").find({}, { useNewUrlParser: true }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

exp.get('/rest/api/getdataonproductid', cors(), (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        var query = { _id: "1" };
        //var myquery = req.body;
        dbo.collection("Products").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});


exp.use(parser.json());
exp.route("/rest/api/deletedatabasedonproductid", cors()).delete((req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        //var myquery = { _id: "2" } ;
        var myquery = req.body;
        dbo.collection("Products").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
});


exp.use(parser.json());
exp.route("/rest/api/updateonproductid", cors()).put((req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        //var myquery = { _id: "2" };
        var myquery = req.body;
        var newvalues = { $set: { name: "Mobile"} };
        dbo.collection("Products").updateOne(myquery, newvalues,{ useNewUrlParser: true }, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
});


exp.use(cors()).listen(3001, () => console.log("Running....."))