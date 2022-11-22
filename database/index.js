const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  owner: {
    username: String,
    id: Number,
    html_url: String
  },
  html_url: String,
  watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  repos = repos.map(repoToInsert => {
    return new Repo({
      id: repoToInsert.id,
      name: repoToInsert.name,
      owner: {
        username: repoToInsert.owner.login,
        id: repoToInsert.owner.id,
        html_url: repoToInsert.owner['html_url']
      },
      html_url: repoToInsert['html_url'],
      watchers_count: repoToInsert['watchers_count']
    });
  });

  return Promise.all(repos.map(repo => {
    Repo.exists({id: repo.id})
      .then(doesExist => {
        if (!doesExist) {
          return repo.save()
        } else {
          return;
        }
      })
  }))
  .catch(err => {
    console.log(err);
  });

};

let retrieveAll = () => {
  return Repo.find({});
}

module.exports.save = save;
module.exports.retrieveAll = retrieveAll;

/* let repo = new Repo({
  id: repoToInsert.id,
  name: repoToInsert.name,
  owner: {
    username: repoToInsert.owner.login,
    id: repoToInsert.owner.id,
    html_url: repoToInsert.owner['html_url']
  },
  html_url: repoToInsert['html_url'],
  watchers_count: repoToInsert['watchers_count']
}) */