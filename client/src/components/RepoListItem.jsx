import React from 'react';

function RepoListItem ({repo}) {
  return (
    <li>
      <a href={repo['html_url']}>{repo.name}</a>
      <div>{repo.owner.login}</div>
      <div>Watch Count: {repo['watchers_count']}</div>
    </li>
  )
}

export default RepoListItem;