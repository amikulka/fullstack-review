const express = require('express');
const path = require ('path');
const {save, retrieveAll} = require('../database');
const {getReposByUsername} = require('../helpers/github.js');

let app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname + '/../client/dist')));


app.get('/', (req, res) => {
  res.render('index');
})

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.username)
    .then(repos => {
      return save(repos);
    })
    .then(() => {
      res.send('added!');
    })

});

app.get('/repos', function (req, res) {
  retrieveAll()
    .then(results => {
      return results.sort((a, b) => b['watchers_count'] - a['watchers_count']).slice(0, 25);
    })
    .then(toDisplay => {

      toDisplay = JSON.stringify(toDisplay);
      res.setHeader('Content-Type', 'application/json')
      res.send(toDisplay);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
