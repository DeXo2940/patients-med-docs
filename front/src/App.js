import * as React from "react";
import "./App.css";
import {Button} from "reactstrap";
import {ListGroup, ListGroupItem} from "reactstrap";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

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
        i: 1,
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
  alertClicked() {
    alert('You clicked the third ListGroupItem');
}

  render() {
    return (
      <div>
        <Navbar color="light" light expand="lg">
          <NavbarBrand href="/">medigunwo</NavbarBrand>
        </Navbar>
        <Container>
          <Row />
          <Row>
            <Col>Menumenu</Col>
          </Row>
          <Row>
            <Col sm="12" md={{size: 8, offset: 2}}>
              <ListGroup>
                {this.state.hits.map(hit => (
                  <ListGroupItem tag="a" action key={hit.id} onClick={this.alertClicked.bind(this)}> {hit.name} </ListGroupItem>
                ))}
              </ListGroup>
              <Button color="danger" onClick={this.onClickHandler.bind(this)}>
                {this.state.text}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>Piekny koniec</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
