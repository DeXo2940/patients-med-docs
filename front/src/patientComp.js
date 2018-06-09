import * as React from "react";
import "./App.css";

import {Button} from "reactstrap";
import {ListGroup, ListGroupItem, Collapse, Card, CardBody} from "reactstrap";
class Patient extends React.Component {
  return (
    <div>
      <h2> Informacje o pacjencie </h2>
      <div>
        <p><strong className="text-muted">Imię:</strong> {this.state.patientData.patient.name[0].given[0]} </p>
        <p><strong className="text-muted">Nazwisko:</strong> {this.state.patientData.patient.name[0].family} </p>
        <p>
          <strong className="text-muted">Płeć podczas narodzin/obecnie:</strong>{" "}
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
                  <strong className="text-muted">Data urodzenia:</strong> {this.state.patientData.patient.birthDate}{" "}
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
                <strong className="text-muted">    Matka:</strong>{" "}
                    {this.state.patientData.patient.extension[3].valueString}{" "}
                  </p>
                  <p>
                  <strong className="text-muted">  Ojciec:</strong>{" "}
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
        <strong className="text-muted">    Rasa, Grupa etniczna:</strong>{" "}
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
<strong className="text-muted">          Numer ubezpieczenia:</strong>{" "}
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
        <strong className="text-muted">  Stan cywilny:</strong> {this.state.patientData.patient.maritalStatus.text}{" "}
        </p>

        <div>
          <Button
            outline
            color="secondary"
            onClick={this.toggle}
            style={{marginBottom: "1rem"}}
          >
            {" "}
          <strong className="text-muted">  Dane adresowe #RODO</strong>
          </Button>{" "}
          {""}
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <p>
                <strong className="text-muted">  Kraj: </strong> {this.state.patientData.patient.address[0].country}{" "}
                </p>
                <p>
              <strong className="text-muted">    Stan: </strong> {this.state.patientData.patient.address[0].state}{" "}
                </p>
                <p>
                <strong className="text-muted">  Miasto: </strong> {this.state.patientData.patient.address[0].city}{" "}
                </p>
                <p>
                <strong className="text-muted">  Kod pocztowy: </strong>{" "}
                  {this.state.patientData.patient.address[0].postalCode}{" "}
                </p>
                <p>
                <strong className="text-muted">  Adres:</strong> {this.state.patientData.patient.address[0].line[0]}{" "}
                </p>
                <p>
                <strong className="text-muted">  Adres2: </strong>{" "}
                  {this.state.patientData.patient.address[0].line[1] ===
                  undefined
                    ? "- - -"
                    : this.state.patientData.patient.address[0].line[1]}{" "}
                </p>
                <p>
                <strong className="text-muted">  Telefon: </strong> {this.state.patientData.patient.telecom[0].value}{" "}
                </p>
              </CardBody>
            </Card>
          </Collapse>
        </div>

        <p>
        <strong className="text-muted">  Czy osoba fikcyjna: </strong>{" "}
          {this.state.patientData.patient.extension[6].valueBoolean == true
            ? "Tak"
            : "Nie"}{" "}
        </p>
        <p>
        <strong className="text-muted">  Data śmierci: </strong>{" "}
          {this.state.patientData.patient.deceasedDateTime === undefined
            ? "- - -"
            : this.state.patientData.patient.deceasedDateTime}{" "}
        </p>
        <p>
        <strong className="text-muted">  Ostatnia aktualizacja: </strong>{" "}
          {this.state.patientData.patient.meta.lastUpdated}{" "}
        </p>
      </div>
    </div>
  );
}
