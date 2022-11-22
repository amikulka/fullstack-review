import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const {useState, useEffect} = React;


function App () {
  let [repos, setRepos] = useState([]);

  function search(term) {
    let options = {
      method: 'post',
      url: '/repos',
      headers: {
        contentType: 'application/json'
      },
      data: {username: term}
    };
    axios(options)
      .then(() => {
        getRepos();
      })
      .catch(err => {
        console.log(err)
      });
    // let data = JSON.stringify({username: term});
    // $.ajax('/repos', {
    //   method: 'POST',
    //   contentType: 'application/json',
    //   data: data,
    //   success: () => {
    //     getRepos();
    //   },
    //   error: (_, status, err) => {console.log(`${status}: ${err}`)}
    // });
  }

  function getRepos() {
    let options = {
      method: 'get',
      url: '/repos',
      headers: {
        contentType: 'application/json'
      }
    }
    axios(options)
      .then(response => {
        setRepos(response.data);
      })
      .catch(err => {
        console.log(err);
      })
    // $.ajax('/repos', {
    //   method: 'GET',
    //   contentType: 'application/json',
    //   success: repos => {
    //     setRepos(repos);
    //   },
    //   error: (_, status, err) => {console.log(`${status}: ${err}`)}
    // })
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