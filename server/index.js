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
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  //get username from req
  console.log(req.body.username);

  // getReposByUsername(req.body.username).
  //   then(repos => {
  //     return save(repos);
  //   })
  //   .then(() => {
  //     res.send('added!');
  //   })
  res.send();

});

app.get('/repos', function (req, res) {
  retrieveAll()
    .then(results => {
      return results.sort((a, b) => b['watchers_count'] - a['watchers_count']).slice(0, 25);
    })
    .then(toDisplay => {
      res.send(toDisplay);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
