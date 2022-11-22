require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI)



let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  owner: {
    login: String,
    id: Number,
    html_url: String
  },
  html_url: String,
  watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  return Promise.all(repos.map(repo => {
    return Repo.findOneAndUpdate({id: repo.id}, repo, {upsert: true})
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