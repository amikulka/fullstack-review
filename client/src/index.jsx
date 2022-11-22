import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const {useState, useEffect} = React;


function App () {
  let [repos, setRepos] = useState([]);

  function search(term) {
    let data = JSON.stringify({username: term});
    $.ajax('/repos', {
      method: 'POST',
      contentType: 'application/json',
      data: data,
      success: () => {
        setTimeout(getRepos, 50);
      },
      error: (_, status, err) => {console.log(`${status}: ${err}`)}
    });
  }

  function getRepos() {
    $.ajax('/repos', {
      method: 'GET',
      contentType: 'application/json',
      success: repos => {
        setRepos(repos);
      },
      error: (_, status, err) => {console.log(`${status}: ${err}`)}
    })
  }

  useEffect(() => {
    getRepos();
  }, []);



  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search search={search}/>
      <RepoList repos={repos} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));