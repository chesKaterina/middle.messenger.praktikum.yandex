// server.js
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist/`));
app.use('/static/img/', express.static(`${__dirname}/static/img/`));
app.use('/static/icon/', express.static(`${__dirname}/static/icon/`));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/`);
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
