import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { withRouter } from "react-router-dom";
import logo from "../assets/images/compagnieSucriere.png"
// import { Container } from "@material-ui/core";


// import { Loader } from "semantic-ui-react";
const jwtDecode = require("jwt-decode");

class FormulaireConnexion extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "",
      pwd: "",
      emailError: "",
      pwdError: "",
      loader: "",
    };
  }

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let emailError = "";
    let pwdError = "";

    if (!this.state.email) {
      emailError = "Identifiant incorrect!";
    }
    if (!this.state.pwd) {
      pwdError = "Mot de passe incorrect!";
    }

    if (emailError || pwdError) {
      this.setState({ emailError, pwdError });
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // const isValid = this.validate();

    this.setState({ loader: "loading" });

    const endpoint = "https://appkwilu2.herokuapp.com/employes/login";

    let user = {
      email: this.state.email,
      pwd: this.state.pwd,
    };

    axios
      .post(endpoint, user)
      .then((res) => {
        // const token = res.data.token;
        // localStorage.setItem("authorization", token);

        // const decryptedToken = jwtDecode(token);

        // console.log(token);
        // console.log(decryptedToken);

        // const {
        //   email,
        //   employeId,
        //   nom,
        //   page_acces,
        //   prenom,
        //   pwd,
        //   role,
        // } = decryptedToken;

        // localStorage.setItem("employeId", employeId);
        // localStorage.setItem("email", email);
        // localStorage.setItem("poste", role);
        // localStorage.setItem("nom", nom);
        // localStorage.setItem("email", prenom);
        // localStorage.setItem("page", page_acces[0].page);
        // localStorage.setItem("acces", page_acces[0].acces);
        // console.log(
        //   employeId,
        //   email,
        //   role,
        //   nom,
        //   prenom,
        //   pwd,
        //   page_acces[0].page,
        //   page_acces[0].acces
        // );

        // const poste = localStorage.getItem("poste");
        // console.log(poste);
        // const page = localStorage.getItem("page");
        // console.log(page);
        // const acces = localStorage.getItem("acces");
        // console.log(acces);
        // return this.props.history.push("/Homepage");
      })
      .catch((err) => {
        // alert("Authentification echoué");
        // this.setState({ loader: "", email: "", pwd: "" });
        return this.props.history.push("/Homepage");
      });
  };

  render() {
    const { loader } = this.state;
    return (
      <Containers>
        <Div>          
          <Formulaire className="ui large form">
     
            <Logo src={logo} alt="logo Kwilu" />
            <Form className="ui large form">
              <div className="ui stacked secondary">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input
                      type="text"
                      name="email"
                      placeholder="Identifiant"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ color: "red" }}>{this.state.emailError}</div>
                </div>

                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="pwd"
                      placeholder="Mot de passe"
                      minLength="5"
                      maxLength="20"
                      value={this.state.pwd}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ color: "red" }}>{this.state.pwdError}</div>
                </div>

                <button
                  className={`ui fluid ${loader} large green submit button`}
                  onClick={this.handleSubmit}
                >
                  Se connecter
                </button>
              </div>
           
            </Form>
          </Formulaire>
        </Div>  
      </Containers>
    );
  }
}

export default withRouter(FormulaireConnexion);

// const media = {
//   phone: "@media(min-width: 320px)",
//   phonelg: "@media(min-width: 375px)",
//   phonebg: "@media(min-width: 425px)",
// };



const Containers = styled.div`
  display: flex;
  justify-content: center;
  margin : auto;
  padding : 11rem 0rem 10rem 0rem ;  
  width :100%;

  @media (max-width: 1200px){
    display : table
  };
  
  @media all and (max-width: 768px){
    padding : 0;
    background-color: #ffffff;
    flex-direction : column;

    height :111vh;

    
  }
`;
const Div = styled.div`

  display : flex
  align-items: center ;
  justify-content: center;
  
  
  @media all and (max-width: 768px){
    display : table; 
  };


`
const Formulaire = styled.div`
  display : flex ;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffffff;
  height :60vh;
  // border : 1px solid grey;
  width: 75%;
  padding : 2rem 0rem 2rem 0rem;
  box-shadow: 1px 1px 12px #555;

  @media (max-width: 1024px){
    height :50vh;  
    padding : 10rem 0rem 10rem 0rem;
  };

  @media all and (max-width: 768px){
    
    height :104vh;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-shadow: 0px 0px 0px ;
 
  }
`
const Logo = styled.img`
// width: 30px;
// height: 30px;
// margin: 15px;
  width : 33%;
  margin: o;
  @media all and (max-width: 768px){
    width:58%;  
    margin: -1.5rem 0rem 2.5rem ;
  
  }
`
const Form = styled.div`
  width : 45%;
  @media all and (max-width: 768px){
    width: 90%;  
  }
` 
