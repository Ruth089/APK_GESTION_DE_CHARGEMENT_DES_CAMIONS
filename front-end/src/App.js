import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import FormulaireConnexion from "./views/FormulaireConnexion";
import DetailsChargements from "./views/DetailsChargements";
import HomePage from "./views/HomePage";
import FormGI from "./views/FormGI";
import TableauDeBord from "./views/tableaud_de_bord.jsx";
import CamionsAuParking from "./views/CamionsAuParking";
import Admin from "./views/Admin";
import PageResponsableChargement from "./views/PageResponsableChargement";

import SuccessAnimation from "./components/SuccessAnimation";

import Navbar from "../src/components/Headers/Navbar"
// import ListeDesEmployes from "./components/pages/sous-pages-admin/ListeDesEmployes";




import EnregistrementGi from "./components/EnregistrementGi";

import CamionsEnChargement from "./views/CamionsEnChargement";
import CamionsCharges from "./views/CamionsCharges";
import SelecteurDate from "./components/SelecteurDate";
import SelecteurHeure from "./components/SelecteurHeure";


class App extends Component {
  render() {
    return (
      <Router>
      
        <div className="App">
         
          <div >
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <FormulaireConnexion />
                </>
              )}
            />
           
            <Route path="/homepage" component={HomePage} />
           
            <Route path="/Details" component={DetailsChargements} />
            <Route
              path="/PageResponsableChargement"
              component={PageResponsableChargement}
            />
            <Route path="/tableauDebord" component={TableauDeBord} />
            <Route path="/animation" component={SuccessAnimation} />
           
        
            <Route path="/EnregistrementGi" component={EnregistrementGi} />
            {/* <Route path="/ListeDesEmployes" component={ListeDesEmployes} /> */}
            <Route path="/CamionsAuParking" component={CamionsAuParking} />
            <Route path="/CamionsEnChargement" component={CamionsEnChargement}
            />
            <Route path="/CamionsCharges" component={CamionsCharges} />
            
            <Route path="/form" component={FormGI} />
            <Route path="/Admin" component={Admin} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
