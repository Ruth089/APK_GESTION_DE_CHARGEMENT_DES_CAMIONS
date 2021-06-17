import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Icon, Grid, Header, Segment, Form, Table, Button, Input, Container } from "semantic-ui-react";
import IndicateurDeChargement from "../components/IndicateurDeChargement";
import Navbar from "../components/Headers/Navbar";
import ListeDuPersonnelActif from "../components/sous-composants-admin/ListeDuPersonnelActif";
import ListeDesEmployes from "../components/sous-composants-admin/ListeDuPersonnelActif"
import Sidebar from "../components/Sidebar/Sidebar"


const Admin = () => {


    return (
        <>
    <Navbar />
    <Sidebar/>
    <Container>
      <Header>Personnel actif</Header> 
      <Segment raised>
        <ListeDuPersonnelActif />
      </Segment>
      <ListeDesEmployes/>
      </Container>
      
 </>

  );
}
 
export default Admin;