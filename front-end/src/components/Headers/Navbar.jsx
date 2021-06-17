import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from "moment";
import { Segment, Icon} from 'semantic-ui-react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfilUtilisateur from './profilutilisateur';
import logo from "../../assets/images/compagnieSucriere.png"
import Section1 from '../sous_composants_tableauDeBord/section1';


export default function Navbar () {
 
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://appkwilu2.herokuapp.com/vehicules",
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  const donneesDuJour = data.reverse().filter(
    (camion) =>
      moment(new Date()).format("YYYY-MM-DD") ===
      moment(camion.createdAt).format("YYYY-MM-DD")
  );

  const nbParking = data.reverse().filter((camion) => camion.etatId === 1)
    .length;

  const nbEnChargement = donneesDuJour.filter((camion) => camion.etatId === 2)
    .length;
  const nbCharges = donneesDuJour.filter((camion) => camion.etatId === 3)
    .length;
  

    return (
     <>
      <Div>
        <Segment.Group >

          <Segment className='segment-one'>

            <Link to="/homepage">
              <Logo src={logo} alt="kwilu" />
            </Link>

            <Profil>
             <ProfilUtilisateur className='profil'/>
            </Profil>
            
          </Segment>

          <Segment.Group horizontal >
          
            <Segment textAlign='center'>
              <Links href="/CamionsAuParking">
                <Icon name="truck" />
                &ensp;
                <span className='span'>{nbParking}</span>
                &ensp;
                <span>Au Parking</span>
              </Links>
            </Segment>
            
            <Segment textAlign='center'>
              <Links href="/CamionsEnChargement">
              <Icon name="sync" />
              &ensp;
              <span className='span'>{nbEnChargement}</span>
              &ensp;
              <span>En chargement</span>
            </Links>
          </Segment>
            
          <Segment textAlign='center'>
            <Links href="/CamionsCharges">
              <Icon name="check" />
              &ensp;
              <span className='span'>{nbCharges}</span>
              &ensp;
              <span>Chargés</span>
            </Links>
          </Segment>
          </Segment.Group>
        </Segment.Group>
        
      </Div>
      <Section></Section>
      </>
    )
};

const Section = styled.div`
height:9rem;
margin-bottom: 5rem;

`;


const Div = styled.div`
  background :  rgb(80, 189, 80);
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  margin-bottom: 5rem !important;

  .segment-one{
    display : flex !important;
    justify-content: space-between;
    background : #ffffff;
    padding:0;
  } 
  .segment-two{
  
  } 

`;

const Profil = styled.div`

  display : flex;
  justify-content : center;
  align-items: center;
  margin-right: 2.5rem;

`;

const Logo = styled.img`
  width: 7rem;
  height:4.5rem;
  margin: 0.3rem 2rem 0rem  ;

`;
const Links = styled.a`
  text-decoration : none;
  color : white;
  font-style : normal;
  padding: 0;
  margin: 0;
  font-size : 1rem;
  margin: 0;
  padding : 0;
  &: hover {
    color : white;
    cursor: pointer;
  }
  `;