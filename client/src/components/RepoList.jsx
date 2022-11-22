import React from 'react';
import RepoListItem from './RepoListItem.jsx';

function RepoList ({repos}) {
  return (
  <div>
    <h4> Repo List: </h4>
    <ol>
    {repos.map(repo => {
      return <RepoListItem repo={repo} key={repo.id} />;
    })}
    </ol>
  </div>
);

}

export default RepoList;