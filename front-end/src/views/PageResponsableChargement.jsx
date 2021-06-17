import React from "react";
import { Segment} from "semantic-ui-react";
import PageResponsableChargement from "../components/chargements/responsablechargement";
import Navbar from "../components/Headers/Navbar";


const SegmentExampleRaised = () => {
  

  return (
    <>
      <Navbar />
      <div></div>
      <Segment raised >
        <PageResponsableChargement />
      </Segment>
    </>
  );
};

export default SegmentExampleRaised;
