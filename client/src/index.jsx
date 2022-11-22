import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const {useState} = React;


function App () {
  let [repos, setRepos] = useState([]);

  function search(term) {
    console.log(term);
    // let data = JSON.stringify({username: term});
    // $.ajax('/repos', {
    //   method: 'POST',
    //   contentType: 'application/json',
    //   data: data,
    //   success: () => {},
    //   error: (_, status, err) => {console.log(`${status}: ${err}`)}
    // });
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList reps={repos} />
      <Search search={search}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));