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
  TabContent,
  TabPane,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {CardBody, Card} from "reactstrap";
import cat from "./cat.jpg";
import icon from "./icon.png";

import i from "./ic.png";
import classnames from "classnames";

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
      filt: null,
      timel: null
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
        <h2> Informacje o pacjencie </h2>
        <div>
          <p>
            <strong className="text-muted">Imię:</strong>{" "}
            {this.state.patientData.patient.name[0].given[0]}{" "}
          </p>
          <p>
            <strong className="text-muted">Nazwisko:</strong>{" "}
            {this.state.patientData.patient.name[0].family}{" "}
          </p>
          <p>
            <strong className="text-muted">
              Płeć podczas narodzin/obecnie:
            </strong>{" "}
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
                    <strong className="text-muted">Data urodzenia:</strong>{" "}
                    {this.state.patientData.patient.birthDate}{" "}
                  </p>
                  <p>
                    <strong className="text-muted">Miejsce urodzenia:</strong>{" "}
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
                    <strong className="text-muted">Czy ma rodzeństwo:</strong>{" "}
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
                      <strong className="text-muted"> Matka:</strong>{" "}
                      {this.state.patientData.patient.extension[3].valueString}{" "}
                    </p>
                    <p>
                      <strong className="text-muted"> Ojciec:</strong>{" "}
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
              <strong className="text-muted"> Rasa, Grupa etniczna:</strong>{" "}
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
            <strong className="text-muted">Język:</strong>{" "}
            {
              this.state.patientData.patient.communication[0].language.coding[0]
                .display
            }{" "}
          </p>
          <p>
            <strong className="text-muted"> Numer ubezpieczenia:</strong>{" "}
            {this.state.patientData.patient.extension[8].valueString}{" "}
          </p>
          <p>
            <strong className="text-muted">Lekarz rodzinny:</strong>{" "}
            {this.state.patientData.patient.generalPractitioner[0].reference}{" "}
          </p>
          <p>
            <strong className="text-muted">Czy wymagana opieka:</strong>{" "}
            {this.state.patientData.patient.extension[5].valueBoolean == true
              ? "Tak"
              : "Nie"}{" "}
          </p>
          <p>
            <strong className="text-muted"> Stan cywilny:</strong>{" "}
            {this.state.patientData.patient.maritalStatus.text}{" "}
          </p>

          <div>
            <Button
              outline
              color="secondary"
              onClick={this.toggle}
              style={{marginBottom: "1rem"}}
            >
              {" "}
              <strong className="text-muted"> Dane adresowe #RODO</strong>
            </Button>{" "}
            {""}
            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                  <p>
                    <strong className="text-muted"> Kraj: </strong>{" "}
                    {this.state.patientData.patient.address[0].country}{" "}
                  </p>
                  <p>
                    <strong className="text-muted"> Stan: </strong>{" "}
                    {this.state.patientData.patient.address[0].state}{" "}
                  </p>
                  <p>
                    <strong className="text-muted"> Miasto: </strong>{" "}
                    {this.state.patientData.patient.address[0].city}{" "}
                  </p>
                  <p>
                    <strong className="text-muted"> Kod pocztowy: </strong>{" "}
                    {this.state.patientData.patient.address[0].postalCode}{" "}
                  </p>
                  <p>
                    <strong className="text-muted"> Adres:</strong>{" "}
                    {this.state.patientData.patient.address[0].line[0]}{" "}
                  </p>
                  <p>
                    <strong className="text-muted"> Adres2: </strong>{" "}
                    {this.state.patientData.patient.address[0].line[1] ===
                    undefined
                      ? "- - -"
                      : this.state.patientData.patient.address[0].line[1]}{" "}
                  </p>
                  <p>
                    <strong className="text-muted"> Telefon: </strong>{" "}
                    {this.state.patientData.patient.telecom[0].value}{" "}
                  </p>
                </CardBody>
              </Card>
            </Collapse>
          </div>

          <p>
            <strong className="text-muted"> Czy osoba fikcyjna: </strong>{" "}
            {this.state.patientData.patient.extension[6].valueBoolean == true
              ? "Tak"
              : "Nie"}{" "}
          </p>
          <p>
            <strong className="text-muted"> Data śmierci: </strong>{" "}
            {this.state.patientData.patient.deceasedDateTime === undefined
              ? "- - -"
              : this.state.patientData.patient.deceasedDateTime}{" "}
          </p>
          <p>
            <strong className="text-muted"> Ostatnia aktualizacja: </strong>{" "}
            {this.state.patientData.patient.meta.lastUpdated}{" "}
          </p>
        </div>
      </div>
    );
  }

  listComponent() {
    return (
      <div>
        <ListGroup style={{margin: "1rem"}}>
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
    return (
      <img style={{border: "1px dashed #021a40"}} width="100%" src={cat} />
    );
  }

  b1() {
    return (
      <Button color="link" onClick={this.onClickHandler.bind(this)}>
        {this.state.text}
      </Button>
    );
  }

  tl() {
    this.setState({timel: 1})
    this.render()
  }

  b2() {
    return (<span>
      <Button color="link" onClick={this.onClick3.bind(this)}>
        Wróć
      </Button>
      <Button color="link" onClick={this.tl.bind(this)}>Oś czasu</Button></span>
    );
  }

  b3() {
    return (
      <Button color="link" onClick={this.onCl.bind(this)}>Wróć do pacjenta</Button>
    )
  }

  onCl() {
    this.setState({timel: null})
    this.render()
  }
  filter(but) {
    return (
      <div>
        {" "}
        {but}
        <Form onSubmit={this.fi} inline className="float-right">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
              Wyszukaj po nazwisku:{" "}
            </Label>
            <Input
              name="surname"
              value={this.state.filt}
              id="exampleEmail"
              onChange={this.fi.bind(this)}
              placeholder="nazwisko"
            />
          </FormGroup>
        </Form>
      </div>
    );
  }

  handleChange(event) {
    this.setState({fi: event.target.value});
  }

  fi(event) {
    this.handleChange(event);
    fetch(API + "/list/?surname=" + this.state.fi)
      .then(response => response.json())
      .then(hits => {
        this.setState({
          hits
        });
        this.removeItem(0);
        console.log(hits);
      });
  }

  timeline() {
    return(
   <VerticalTimeline>
     <VerticalTimelineElement
       className="vertical-timeline-element--work"
       date="2011 - present"
       iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
       icon ={      <img width="100%" src={i} />
}
     >
       <h3 className="vertical-timeline-element-title">Creative Director</h3>
       <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
       <p>
         Creative Direction, User Experience, Visual Design, Project Management, Team Leading
       </p>
     </VerticalTimelineElement>
     <VerticalTimelineElement
       className="vertical-timeline-element--work"
       date="2010 - 2011"
       iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
     >
       <h3 className="vertical-timeline-element-title">Art Director</h3>
       <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
       <p>
         Creative Direction, User Experience, Visual Design, SEO, Online Marketing
       </p>
     </VerticalTimelineElement>
     <VerticalTimelineElement
       className="vertical-timeline-element--work"
       date="2008 - 2010"
       iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
     >
       <h3 className="vertical-timeline-element-title">Web Designer</h3>
       <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
       <p>
         User Experience, Visual Design
       </p>
     </VerticalTimelineElement>
     <VerticalTimelineElement
       className="vertical-timeline-element--education"
       date="2006 - 2008"

           iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}     >
       <h3 className="vertical-timeline-element-title">Web Designer</h3>
       <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
       <p>
         User Experience, Visual Design
       </p>
     </VerticalTimelineElement>

   </VerticalTimeline>
 )
  }

  render() {
    var func;
    var photo;
    var filter, but, b2;
    var timeline;
    if ((this.state.renP == 0) & (this.state.filt == null)) {
      func = this.listComponent();
      photo = null;
      but = this.b1();
      filter = this.filter(but);
      timeline=null
      b2=null
    } else {
      if (this.state.filt != null) {
        func = this.listComponent();
        photo = null;
        but = this.b2();
        filter = this.filter(but);
        timeline=null
        b2= null
      } else {
        if (this.state.timel != null) {
          func = this.timeline()
          filter = null
          photo = null
          b2 = this.b3()
        }
        else {
        func = this.patientComponent();
        photo = this.photo();
        but = this.b2();
        filter = but;
        timeline=null
        b2=null
      }
    }
  }
    return (
      <div>
        <Navbar
          style={{marginBottom: "1rem", borderBottom: "1px dashed #000000"}}
          color="light"
          light
          expand="lg"
        >
          <img width="3%" src={icon} />
          <NavbarBrand href="/">mediCATion</NavbarBrand>
        </Navbar>
        <Container>
          <Row>
            <Col sm="4" md={{size: 8, offset: 2}}>
              {filter} {b2}
            </Col>{" "}
          </Row>
          <Row>
            <Col sm="2">{photo}</Col>
            <Col sm="8">{func}</Col>
          </Row>
          <Row>
            <Col sm="4" md={{size: 10, offset: 2}}>
              {but}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
