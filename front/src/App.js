import * as React from "react";
import './App.css';

const API = 'http://localhost:8080/baseDstu3/'
var query = 'Patient/06eb35fc-09e6-48b4-a311-47633f6c4769?_format=json'

class ProfileList extends React.Component {
  render() {
    return <ul>
      {
        this.props.profiles.map(
          profile => <li key={profile.id}>{profile.name}</li>
        )
      }
    </ul>
  }
}

 class App extends React.Component {

    constructor(props) {
    super(props);

    this.state = {
      hits: [],
      i: 1,
      maxI : 0
    };
  }

	onClickHandler() {
	console.log(this.state.i + " " + this.state.maxI);
	if (this.state.i < this.state.maxI) {
    this.setState({
      i: this.state.i + 1
    }); }
    else {
    	this.setState({
      i: 1
    });
    }
fetch('http://127.0.0.1:5000/list/'+this.state.i.toString())
      .then(response => response.json())
      .then((hits) =>{
       this.setState({hits});this.removeItem(0);
     })
     
       	
  	this.render()
  	}
  		    
	
	removeItem(index) {
  const list = this.state.hits;
  var x = 0;
  list.map(l => {if (l.pagecount!= undefined) x = l.pagecount; console.log("l. pagecount "+l.pagecount)});
  console.log("to jest x "+x);
  this.setState({maxI: x});

  list.splice(0, 1);
  this.setState({ hits: list });
}
	
	fetch(i) {
		  }

  componentDidMount() {
    fetch('http://127.0.0.1:5000/list/0')
      .then(response => response.json())
      .then((hits) =>{
       this.setState({hits});this.removeItem(0);
     })

       }
  
  render() {

        return(<div><ul>
   {this.state.hits.map(hit=><li key={hit.id}>{hit.name}</li>)}
</ul>

  <button onClick={this.onClickHandler.bind(this)}>Kliknij!</button></div>
);}
}
export default App;
