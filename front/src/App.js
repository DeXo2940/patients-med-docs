import * as React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      i: 1,
      maxI: 0,
      text: "Nastepna strona"
    };
  }

  onClickHandler() {
    console.log(this.state.i + " " + this.state.maxI);
    if (this.state.i < this.state.maxI) {
      this.setState({
        i: this.state.i + 1,
        text: "Nastepna strona"
      });
    } else {
      this.setState({
        i:1,
        text: "Nastepna strona"

      });
    }
    if (this.state.i == this.state.maxI - 1) {
      this.setState({
        text: "Pierwsza strona"
      });
    }
    fetch("http://127.0.0.1:5000/list/" + this.state.i.toString())
      .then(response => response.json())
      .then(hits => {
        this.setState({
          hits
        });
        this.removeItem(0);
      });

    this.render();
  }

  removeItem(index) {
    const list = this.state.hits;
    var x = 0;
    list.map(l => {
      if (l.pagecount != undefined) x = l.pagecount;
    });
    this.setState({
      maxI: x
    });

    list.splice(0, 1);
    this.setState({
      hits: list
    });
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/list/0")
      .then(response => response.json())
      .then(hits => {
        this.setState({
          hits
        });
        this.removeItem(0);
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.hits.map(hit => <li key={hit.id}> {hit.name} </li>)}
        </ul>
        <button onClick={this.onClickHandler.bind(this)}>
          {this.state.text}
        </button>
      </div>
    );
  }
}
export default App;
