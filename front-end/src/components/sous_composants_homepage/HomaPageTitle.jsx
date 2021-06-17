import React from 'react'
import { Header} from "semantic-ui-react";
import styled from "styled-components";

export default  function HomePageTitle() {
  return (
  <Div><Header style={{ margin: "5rem 1.5rem  4rem  1.5rem", textAlign: "center"}} size="large">
      Gérer de manière optimale vos chargements
    </Header>
  </Div>
)
}

const Div = styled.div`

  

`;