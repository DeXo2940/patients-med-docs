import * as React from "react";
import "./App.css";

const API = "http://127.0.0.1:5000";

class App extends React.Component {
  constructor(props) {
    super(props);
	
    this.state = {
      hits: [],
      i: 1,
      maxI: 0,
      text: "Nastepna strona",
	  
	  patientData: [],
	  renP : 0
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
    fetch(API+"/list/" + this.state.i.toString())
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
    fetch(API+"/list/0")
      .then(response => response.json())
      .then(hits => {
        this.setState({
          hits
        });
        this.removeItem(0);
      });
  }

  click2(id){
	  fetch(API+"/patient/"+id)
      .then(response => response.json())
      .then(patientData => {
        this.setState({
          patientData
        })
		this.setState({renP:1})
      })
	  this.render()
  }
  
  onClick3(){
	  this.setState({renP:0})
	  this.render()
  }
  
  patientComponent(){
	  return (
		<div>
		  <h1> Informacje pacjenta </h1>
		  <div>
			<p>Imię: {this.state.patientData.patient.name[0].given[0]} </p>
			<p>Nazwisko: {this.state.patientData.patient.name[0].family} </p>
			<p>Płeć podczas narodzin/obecnie: {this.state.patientData.patient.extension[4].valueCode=='F'?"Kobieta":"Mężczyzna"}/
												{this.state.patientData.patient.gender=='female'?"Kobieta":"Mężczyzna"} </p>
			<div>
				<h2> Dane o urodzeniu </h2>
				<p>Data urodzenia: {this.state.patientData.patient.birthDate} </p>
				<p>Miejsce urodzenia: {this.state.patientData.patient.extension[2].valueAddress.city+' '+
										this.state.patientData.patient.extension[2].valueAddress.country+' '+
										this.state.patientData.patient.extension[2].valueAddress.state} </p>
				<p>Czy ma rodzeństwo: {this.state.patientData.patient.multipleBirthBoolean==true?'Tak':'Nie'} </p>
				<div>
					<h3> Rodzice</h3>
					<p>Matka: {this.state.patientData.patient.extension[3].valueString} </p>
					<p>Ojciec: {this.state.patientData.patient.extension[7].valueHumanName.text} </p>
				</div>
				<p>Rasa, Grupa etniczna: {this.state.patientData.patient.extension[0].valueCodeableConcept.coding[0].display}, 
								{this.state.patientData.patient.extension[1].valueCodeableConcept.coding[0].display} </p>
			</div>
			
			<p>Język: {this.state.patientData.patient.communication[0].language.coding[0].display} </p>
			<p>Numer ubezpieczenia: {this.state.patientData.patient.extension[8].valueString} </p>
			<p>Lekarz rodzinny: {this.state.patientData.patient.generalPractitioner[0].reference} </p>
			<p>Czy wymagana opieka: {this.state.patientData.patient.extension[5].valueBoolean==true?'Tak':'Nie'} </p>
			<p>Stan cywilny: {this.state.patientData.patient.maritalStatus.text} </p>
			
			<div>
				<h2>Dane adresowe</h2>
				<p>Kraj: {this.state.patientData.patient.address[0].country} </p>
				<p>Stan: {this.state.patientData.patient.address[0].state} </p>
				<p>Miasto: {this.state.patientData.patient.address[0].city} </p>
				<p>Kod pocztowy: {this.state.patientData.patient.address[0].postalCode} </p>
				<p>Adres: {this.state.patientData.patient.address[0].line[0]} </p>
				<p>Adres2: {this.state.patientData.patient.address[0].line[1]=== undefined?"- - -":this.state.patientData.patient.address[0].line[1]} </p>
				<p>Telefon: {this.state.patientData.patient.telecom[0].value} </p>
				
			</div>
			
			<p>Czy osoba fikcyjna: {this.state.patientData.patient.extension[6].valueBoolean==true?'Tak':'Nie'} </p>
			<p>Data śmierci: {this.state.patientData.patient.deceasedDateTime=== undefined?"- - -":this.state.patientData.patient.deceasedDateTime} </p>
			<p>Ostatnia aktualizacja: {this.state.patientData.patient.meta.lastUpdated} </p>
		  </div>
		  <button onClick={this.onClick3.bind(this)}>
			  Wróć
			</button>
		 </div>
		)
  }
  
  listComponent(){
	return (
		  <div>
			<ul>
			  {this.state.hits.map(hit => <button key={hit.id} onClick = { this.click2.bind(this,hit.id) }> {hit.name} </button>)}
			</ul>
			<button onClick={this.onClickHandler.bind(this)}>
			  {this.state.text}
			</button>
		  </div>
		)
  }
  
  
  render() {
	if(this.state.renP==0){
		return this.listComponent()
	}
	else {
		return this.patientComponent()
	}
  }
}
export default App;
