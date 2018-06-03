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
   TabContent,TabPane, CardTitle,CardText,Form, FormGroup, Label, Input
} from "reactstrap";
import {CardBody, Card} from "reactstrap";
import cat from "./cat.jpg";
import icon from "./icon.png";
import classnames from 'classnames';

const API = "http://127.0.0.1:5000";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);

    this.toggle3 = this.toggle3.bind(this);
    this.state = {
      hits: [],
      i: 1,
      maxI: 0,
      text: "Nastepna strona",
      collapse: false,
      collapse2: false,
      collapse3: false,
      patientData: [],
      renP: 0,
      filt: null
    };
  }
  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggle2() {
    this.setState({collapse2: !this.state.collapse2});
  }

  toggle3() {
    this.setState({collapse3: !this.state.collapse3});
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
    fetch(API + "/list/" + this.state.i.toString())
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
    fetch(API + "/list/0")
      .then(response => response.json())
      .then(hits => {
        this.setState({
          hits
        });
        this.removeItem(0);
      });
  }

  click2(id) {
    fetch(API + "/patient/" + id)
      .then(response => response.json())
      .then(patientData => {
        this.setState({
          patientData
        });
        this.setState({renP: 1});
      });
    this.render();
  }

  onClick3() {
    this.setState({renP: 0});
    this.render();
  }

  patientComponent() {
    return (
      <div>
        <h1> Informacje o pacjencie </h1>
        <div>
          <p>Imię: {this.state.patientData.patient.name[0].given[0]} </p>
          <p>Nazwisko: {this.state.patientData.patient.name[0].family} </p>
          <p>
            Płeć podczas narodzin/obecnie:{" "}
            {this.state.patientData.patient.extension[4].valueCode == "F"
              ? "Kobieta"
              : "Mężczyzna"}/
            {this.state.patientData.patient.gender == "female"
              ? "Kobieta"
              : "Mężczyzna"}{" "}
          </p>
          <div>
            <Button
              outline
              color="secondary"
              onClick={this.toggle2}
              style={{marginBottom: "1rem"}}
            >
              {" "}
              Dane o urodzeniu
            </Button>{" "}
            {""}
            <Collapse isOpen={this.state.collapse2}>
              <Card>
                <CardBody>
                  <p>
                    Data urodzenia: {this.state.patientData.patient.birthDate}{" "}
                  </p>
                  <p>
                    Miejsce urodzenia:{" "}
                    {this.state.patientData.patient.extension[2].valueAddress
                      .city +
                      " " +
                      this.state.patientData.patient.extension[2].valueAddress
                        .country +
                      " " +
                      this.state.patientData.patient.extension[2].valueAddress
                        .state}{" "}
                  </p>
                  <p>
                    Czy ma rodzeństwo:{" "}
                    {this.state.patientData.patient.multipleBirthBoolean == true
                      ? "Tak"
                      : "Nie"}{" "}
                  </p>
                </CardBody>
              </Card>
            </Collapse>
            <div>
              <Button
                outline
                color="secondary"
                onClick={this.toggle3}
                style={{marginBottom: "1rem"}}
              >
                {" "}
                Rodzice
              </Button>{" "}
              {""}
              <Collapse isOpen={this.state.collapse3}>
                <Card>
                  <CardBody>
                    {" "}
                    <p>
                      Matka:{" "}
                      {this.state.patientData.patient.extension[3].valueString}{" "}
                    </p>
                    <p>
                      Ojciec:{" "}
                      {
                        this.state.patientData.patient.extension[7]
                          .valueHumanName.text
                      }{" "}
                    </p>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
            <p>
              Rasa, Grupa etniczna:{" "}
              {
                this.state.patientData.patient.extension[0].valueCodeableConcept
                  .coding[0].display
              },
              {
                this.state.patientData.patient.extension[1].valueCodeableConcept
                  .coding[0].display
              }{" "}
            </p>
          </div>

          <p>
            Język:{" "}
            {
              this.state.patientData.patient.communication[0].language.coding[0]
                .display
            }{" "}
          </p>
          <p>
            Numer ubezpieczenia:{" "}
            {this.state.patientData.patient.extension[8].valueString}{" "}
          </p>
          <p>
            Lekarz rodzinny:{" "}
            {this.state.patientData.patient.generalPractitioner[0].reference}{" "}
          </p>
          <p>
            Czy wymagana opieka:{" "}
            {this.state.patientData.patient.extension[5].valueBoolean == true
              ? "Tak"
              : "Nie"}{" "}
          </p>
          <p>
            Stan cywilny: {this.state.patientData.patient.maritalStatus.text}{" "}
          </p>

          <div>
            <Button
              outline
              color="secondary"
              onClick={this.toggle}
              style={{marginBottom: "1rem"}}
            >
              {" "}
              Dane adresowe #RODO
            </Button>{" "}
            {""}
            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                  <p>
                    Kraj: {this.state.patientData.patient.address[0].country}{" "}
                  </p>
                  <p>
                    Stan: {this.state.patientData.patient.address[0].state}{" "}
                  </p>
                  <p>
                    Miasto: {this.state.patientData.patient.address[0].city}{" "}
                  </p>
                  <p>
                    Kod pocztowy:{" "}
                    {this.state.patientData.patient.address[0].postalCode}{" "}
                  </p>
                  <p>
                    Adres: {this.state.patientData.patient.address[0].line[0]}{" "}
                  </p>
                  <p>
                    Adres2:{" "}
                    {this.state.patientData.patient.address[0].line[1] ===
                    undefined
                      ? "- - -"
                      : this.state.patientData.patient.address[0].line[1]}{" "}
                  </p>
                  <p>
                    Telefon: {this.state.patientData.patient.telecom[0].value}{" "}
                  </p>
                </CardBody>
              </Card>
            </Collapse>
          </div>

          <p>
            Czy osoba fikcyjna:{" "}
            {this.state.patientData.patient.extension[6].valueBoolean == true
              ? "Tak"
              : "Nie"}{" "}
          </p>
          <p>
            Data śmierci:{" "}
            {this.state.patientData.patient.deceasedDateTime === undefined
              ? "- - -"
              : this.state.patientData.patient.deceasedDateTime}{" "}
          </p>
          <p>
            Ostatnia aktualizacja:{" "}
            {this.state.patientData.patient.meta.lastUpdated}{" "}
          </p>
        </div>
      </div>
    );
  }

  listComponent() {
    return (
      <div>
        <ListGroup>
          {this.state.hits.map(hit => (
            <ListGroupItem
              tag="a"
              action
              key={hit.id}
              onClick={this.click2.bind(this, hit.id)}
            >
              {" "}
              {hit.name}{" "}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
  photo() {
    return <img width="100%" src={cat} />;
  }

  b1() {
    return (
      <Button color="link" onClick={this.onClickHandler.bind(this)}>
        {this.state.text}
      </Button>
    );
  }

  b2() {
    return (
      <Button color="link" onClick={this.onClick3.bind(this)}>
        Wróć
      </Button>
    );
  }

  filter (but) {
      return (

      <Form onSubmit={this.fi} inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        {but}
          <Label for="exampleEmail" className="mr-sm-2">Wyszukaj po nazwisku: </Label>
          <Input name="surname" value={this.state.filt} id="exampleEmail" onChange={this.fi.bind(this)} placeholder="nazwisko" />
        </FormGroup></Form>
      )

  }

  handleChange(event) {
    this.setState({fi: event.target.value})
}

  fi(event) {
    this.handleChange(event)
  fetch(API + "/list/?surname="+this.state.fi)
    .then(response => response.json())
    .then(hits => {
      this.setState({
        hits
      });
      this.removeItem(0);
      console.log(hits)
    });
  }

  render() {
    var func;
    var photo;
    var filter, but;
    if (this.state.renP == 0 & this.state.filt == null) {
      func = this.listComponent();
      photo = null;
      but = this.b1();
      filter=this.filter(but)
    } else {
      if(this.state.filt != null) {
        func = this.listComponent()
        photo = null
        but = this.b2()
        filter = this.filter(but)
      }
      else {
      func = this.patientComponent();
      photo = this.photo();
      but = this.b2();
      filter=but

    }}
    return (
      <div>
        <Navbar color="light" light expand="lg">
          <img width="3%" src={icon} />
          <NavbarBrand href="/">mediCATion</NavbarBrand>
        </Navbar>
        <Container>
          <Row>
            <Col sm="4" md={{size: 8, offset: 2}}>
              {filter}
            </Col>{" "}
          </Row>
          <Row>
            <Col sm="2">{photo}</Col>
            <Col sm="10" md={{size: 8}}>
              {func}
            </Col>
          </Row>
          <Row>
            <Col sm="4" md={{size: 8, offset: 2}}>
              {but}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
