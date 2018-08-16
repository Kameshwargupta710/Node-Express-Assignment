var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('demofile1.txt', function(err, data) {
    console.log(data.toString());
    res.end();
  });
}).listen(8080);