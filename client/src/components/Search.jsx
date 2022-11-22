import React from 'react';
const {useState} = React;

function Search ({search}) {
  const [term, setTerm] = useState('');

  function onChange (e) {
    let value = e.target.value;
     setTerm(value);
  }
  function handleClick() {

    search(term);
    setTerm('');
  }

  return (
    <div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={term} onChange={onChange} />
      <button onClick={handleClick}> Add Repos </button>
    </div>
  )
}


// class Search extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       term: ''
//     }
//   }

//   onChange (e) {
//     this.setState({
//       term: e.target.value
//     });
//   }

//   search() {
//     this.props.onSearch(this.state.term);
//   }

//   render() {
//     return (<div>
//       <h4>Add more repos!</h4>
//       Enter a github username: <input value={this.state.terms} onChange={this.onChange}/>
//       <button onClick={this.search}> Add Repos </button>
//     </div>)
//   }
// }

export default Search;