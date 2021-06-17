import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Segment, Header} from "semantic-ui-react";
import styled from "styled-components";

const Box = ({titreBox, ouvrirPage, iconeBox }) => {
  const [state, setState] = useState({hover:false})
 
  
  const toggleHover = () => {
    setState({hover: !state.hover})
  }
    let linkStyle;
    let gridStyle;
    if (state.hover) {
      linkStyle = {backgroundColor: 'green', color: 'white', border: '3px solid green',cursor: 'pointer', textAlign: "center" }
      gridStyle={border: '2px solid green', width: '100%', borderRadius: "7px 7px 0px 0px", textAlign: "center" }
    } else {
      linkStyle = {backgroundColor: '#16AB39', color: 'white', textAlign: "center"  }
      gridStyle={border: 'none', width: '100%', borderRadius: "7px 7px 0px 0px", textAlign: "center" }
    }
  return (
    <Grid>
      <Link to={ouvrirPage} className="colu">
      <Segment attached style={gridStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover} >
          <Img src={iconeBox}/>
        </Segment>
        <Header  style={linkStyle} as="h4" attached="bottom">
          {titreBox}
        </Header>
      </Link>
    </Grid>
  );
};

export default Box;

const Img = styled.img`
  width : 60%;
`;

const Grid = styled.div`
@media all and (max-width: 700px){
  // width :75%;
  // display : flex;
  // align-items :center;
  // justify-content: center;
  // padding: 0;
  // margin : 0 auto;

};
`;

