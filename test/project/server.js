var express = require('express')
  , gruntHang = require('../../');

var app = express();

app.use(gruntHang(__dirname));

app.get('/', function(req, res) {
  res.send(200, 'ok');
});

app.listen(8099, function() {
  console.log('Listening on port 8099');
});