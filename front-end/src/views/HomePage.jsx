import React from "react";
import { Grid, Container} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Box from "../components/sous_composants_homepage/Box";
import animation1 from "../assets/images/IMG-HomePage/animation.gif";
import animation2 from "../assets/images/IMG-HomePage/animation2.gif";
import animation3 from "../assets/images/IMG-HomePage/animation1.gif";
import Navbar from "../components/Headers/Navbar";
import HomePageTitle from '../components/sous_composants_homepage/HomaPageTitle'



import { Icon, withRouter } from "react-router-dom";
// import { Icon, InlineIcon } from '@iconify/react';
import administratorLine from '@iconify/icons-clarity/administrator-line';
import { useState } from "react";
import styled from "styled-components";

const HomePage = (props) => {
  // const poste = localStorage.getItem("poste")
  //   ? localStorage.getItem("poste")
  //   : "";
  // console.log(poste);

  // if (localStorage.getItem("authorization") === null) {
  //   window.location.href = "/";
  // }

  const redirection1 = () => "/Form";
  const redirection2 = () => "/CamionsAuParking";
  const redirection3 = () => "/tableauDebord";

  const Acces1 = (props) => redirection1();
  // {
  //   if (poste === "Garde industrielle" || poste === "Directrice commerciale") {
  //     return redirection1();
  //   } else {
  //   }
  // };

  const Acces2 = (props) => redirection2();
  // {
  //   if (
  //     poste === "Responsable de magasin" ||
  //     poste === "Directrice commerciale"
  //   ) {
  //     return redirection2();
  //   }
  // };

  const Acces3 = (props) => redirection3();
  // {
  //   if (poste === "Directrice commerciale") {
  //     return redirection3();
  //   }
  // };

  return (
    <>
      <Navbar />
     
      <Container>
        <HomePageTitle />
        <Body>
        {/* <Grid > */}
          <Box
            className='Box'
            titreBox="Enregistrer un chargement"
            iconeBox={animation1}
            ouvrirPage={Acces1}
          /> 
          <Box
            className='Box'
            titreBox="Voir les infos de chargement"
            iconeBox={animation2}
            ouvrirPage={Acces2}
          />
          <Box
            titreBox="Voir le tableau de bord"
            iconeBox={animation3}
            ouvrirPage={Acces3}
          /> 
        {/* </Grid> */}
        </Body>
      </Container>
      
    </>
  );
};

export default HomePage;

const Body = styled.div`
  display : grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap :2rem;
  
  // justify-content: space-between;
  @media only screen and (min-width: 768px )and (max-width: 1024px){
    
  };

  @media all and (max-width: 700px){
    width :80%;
    margin: auto;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
    padding: 0rem 0rem 5rem;
  
  };
  
`;