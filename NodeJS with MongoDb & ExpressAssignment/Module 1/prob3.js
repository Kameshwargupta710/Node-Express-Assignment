var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.writeFile('demofile1.txt', 'I am writing in demofile.txt file', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
}).listen(8080);

