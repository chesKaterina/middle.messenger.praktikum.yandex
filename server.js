// server.js
const express = require('express');
const fallback = require('express-history-api-fallback');

const app = express();

var port = process.env.PORT || 3000;
var root = __dirname + '/dist/';

app.use(express.static(root));

app.use(fallback('index.html', { root: root }));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

