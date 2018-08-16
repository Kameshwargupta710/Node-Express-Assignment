var express = require('express');
var exp = express();
var cors = require('cors');
var fs = require('fs');
var parser = require('body-parser');
var url = "mongodb://localhost:27017/test";
var appendData = require('./demodata.json')
//var appendData = data1;


exp.use(cors())


exp.route('/rest/api/get', cors()).get((req, res) => {
    console.log("GET Invoked");
    var Strdata = JSON.stringify(data1);
    res.send(Strdata);
});

exp.route('/rest/api/get/:state', cors()).get((req, res) => {
    console.log("GET Invoked");
    let rawdata = fs.readFileSync('demodata.json');
    let employee = JSON.parse(rawdata);
    for (let emp of employee) {
        if (emp.empAddress.state == req.params.state) {
            console.log(emp);
        }
    }
    res.send(emp);
});


exp.use(parser.json());
exp.route("/rest/api/post", cors()).post((req, res) => {
    //console.log(req.body);
    console.log("Post Invoked");
    appendData.push(req.body)
    console.log(appendData)
    fs.writeFileSync('demodata.json', JSON.stringify(appendData))
    res.status(201).send(appendData);
});


exp.route('/rest/api/put/:empId', cors()).put((req, res) => {
    console.log("GET Invoked");
    let rawdata = fs.readFileSync('demodata.json');
    let employee = JSON.parse(rawdata);
    for (emp of employee) {
        if (emp.empId == req.params.empId) {
            emp.empAddress.city = "Rajasthan";
            fs.writeFileSync('demodata.json', JSON.stringify(employee))
            res.status(201).send(emp);
        }
    }
});





exp.use(cors()).listen(3001, () => console.log("Running....."))