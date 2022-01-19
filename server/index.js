const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

const dBOptions = require('./dataBase/index');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/register', async (req, res) => {
  res.send(await dBOptions.register(req.body.username, req.body.password));
});

app.post('/login', async (req, res) => {
  res.send(await dBOptions.login(req.body.username, req.body.password));
})

app.post('/getState', async (req, res) => {
  res.send(await dBOptions.getState(req.body.username));
})

app.post('/updateState', (req) => {
  dBOptions.updateState(req.body.state, req.body.username);
})

