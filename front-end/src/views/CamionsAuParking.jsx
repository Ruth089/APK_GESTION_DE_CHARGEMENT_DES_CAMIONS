import React, { useEffect, useState } from "react";
import { Icon, Label, Menu, Table, Button, Input, Segment} from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import times from "lodash.times";
import { trackPromise } from "react-promise-tracker";
import Navbar from "../components/Headers/Navbar";
import IndicateurDeChargement from "../components/IndicateurDeChargement";
import styled from "styled-components";
// import DateFnsUtils from "@date-io/date-fns";
// import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
// import "date-fns";
 require ("es6-promise").polyfill()

const TOTAL_PAR_PAGE = 10;

const CamionsAuParking = ({etatChargement}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [motCle, setMotCle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());


    useEffect(() => {
      trackPromise(
        axios
          .get("https://appkwilu2.herokuapp.com/enregistrements")
          .then((res) => {
            setData(res.data);
            setTotalPages(Math.ceil(res.data.length / TOTAL_PAR_PAGE));
            // console.log(moment(new Date()).format("DD MM YYY"))
          })
      );
    }, [setData]);


  const startIndex = page * TOTAL_PAR_PAGE;

  let mapage = page;

  /*La variable donnees contient les données filtrées en fonction du mot clé
    saisi dans la zone de recherche en fonction du nom du transporteur */
  const donnees = motCle
    ? data.filter( (x) =>
        (x.etat.libelle === "parking"  &&
        x.transporteur.toLowerCase().includes(motCle.toLowerCase())) || 
        (x.etat.libelle === "parking"  &&
        x.societe.toLowerCase().includes(motCle.toLowerCase())) || 
        (x.etat.libelle === "parking"  &&
        x.marque.toLowerCase().includes(motCle.toLowerCase())) 
      )
    : data.reverse().filter((x) => x.etat.libelle === "parking");

  return (
    
    <>
      <Navbar />
      <Container>
        <Segment raised style={{marginTop:"60px"}}>
        <div className="corps">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              icon={<Icon name="search" inverted circular link />}
              placeholder="Recherche... "
              onChange={(e) => setMotCle(e.target.value)}
              style={{ width: "25%" }}
            />
          </div>
        <Table striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Etat chargement</Table.HeaderCell>
              <Table.HeaderCell>Image véhicule</Table.HeaderCell>
              <Table.HeaderCell>Nom du chauffeur</Table.HeaderCell>
              <Table.HeaderCell>Société de transport</Table.HeaderCell>
              <Table.HeaderCell>N°Plaque</Table.HeaderCell>
              <Table.HeaderCell>Marque</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Heure</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {donnees
              
              .slice(startIndex, startIndex + TOTAL_PAR_PAGE)
              .map((item) => (
               
                <tr key={item.id}>
                  <td id="etat">
                    <Label
                      color={
                        item.etat.id === 1
                          ? "orange"
                          : item.etat.id === 2
                          ? "blue"
                          : "green"
                      }
                      tag
                    >
                      <Icon
                        name={
                          item.etat.id === 1
                            ? "truck"
                            : item.etat.id === 2
                            ? "sync"
                            : "check"
                        }
                      />
                      {item.etat.libelle}
                    </Label>
                  </td>
                  <td>
                    <img src={item.photo_vehicule} width="50px" alt="" />
                  </td>
                  <td> {item.transporteur} </td>
                  <td> {item.societe} </td>
                  <td> {item.numero_plaque} </td>
                  <td> {item.marque} </td>
                  <td> {moment(item.heure_parking).format("L")} </td>
                  <td> {moment(item.heure_parking).format("LT")} </td>

                  <td>
                    <Link to="/Details">
                      <Button
                        color="green"
                        onClick={() => {
                          localStorage.setItem(
                            "info",
                            JSON.stringify({
                              id: item.id,
                              nom: item.transporteur,
                              plaque: item.numero_plaque,
                              idEtat: item.etatId,
                              etatLibelle: item.etat.libelle,
                              heureParking: item.heure_parking,
                              heureChargement: item.heure_chargement,
                              heureCharge: item.heure_charge,
                              // vehiculeId:
                              //   item.employes[0].employeVehicules.vehiculeId,
                            })
                          );
                        }}
                      >
                        Etat de chargement
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Button primary> Télécharger en CSV</Button>
            </Table.HeaderCell>
              <Table.HeaderCell colSpan="6">
                <Menu floated="right" pagination>
                  {page !== 0 && (
                    <Menu.Item as="a" icon onClick={() => setPage(--mapage)}>
                      <Icon name="left chevron" />
                    </Menu.Item>
                  )}
                  {times(totalPages, (n) => (
                    <Menu.Item
                      as="a"
                      key={n}
                      active={n === page}
                      onClick={() => setPage(n)}
                    >
                      {n + 1}
                    </Menu.Item>
                  ))}
                  {page !== totalPages - 1 && (
                    <Menu.Item as="a" icon onClick={() => setPage(++mapage)}>
                      <Icon name="right chevron" />
                    </Menu.Item>
                  )}
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IndicateurDeChargement />
        </div>
      </div>
    
      </Segment>
</Container>
</>
  );
};

export default CamionsAuParking;

const Container = styled.div`

  width :98%;
  margin : auto;
  .corps {
    background-color: #F8F8FB;
    padding:10px 5px 5px 5px;
  }
  
`;