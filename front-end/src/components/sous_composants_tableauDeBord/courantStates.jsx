import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Step, Grid, Segment} from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
// import "../css/truckstates.css";

export default function CourantStates() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://appkwilu2.herokuapp.com/vehicules",
    }).then((res) => {
      setData(res.data);
    });
  }, [data]);

  const donneesDuJour = data.filter(
    (camion) =>
      moment(new Date()).format("YYYY-MM-DD") ===
      moment(camion.updatedAt).format("YYYY-MM-DD")
  );

  const nbParking = data.filter((camion) => camion.etatId === 1)
    .length;

  const nbEnChargement = donneesDuJour.filter((camion) => camion.etatId === 2)
    .length;
  const nbCharges = donneesDuJour.filter((camion) => camion.etatId === 3)
    .length;

  // const onParkingTotal = new Stack();
  // const unpackingInprogress = new Stack();
  // const truckRegisterTime = new Stack();
  // truckRegisterTime.push(packedTrucks);
  // onParkingTotal.push(onParking);
  // unpackingInprogress.push(unpacking);

  return (
    <>
    

      
    </>
  );
}
