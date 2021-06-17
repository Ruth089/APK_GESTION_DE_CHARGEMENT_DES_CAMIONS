import React, { useEffect, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import moment from "moment";
import Navbar from "../components/Headers/Navbar";
import ModalPhoto from "../components/ModalPhoto";
import placeholder from "../assets/images/placeholder.gif";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import {
  Image,
  Icon,
  Form,
  Segment,
  Header,
  Button,
  Step,
  List,
  Label
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import "../assets/css/details.css";
import Section1 from "../components/sous_composants_tableauDeBord/section1";
// import { styled } from "@material-ui/core";

const DetailsChargements = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [commentaire, setCommentaire] = useState("");
  const [comError, setComError] = useState(null);
  const [details, setdetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [bons, setBons] = useState([]);
  const [data, setData] = useState();
  const [autreData, setAutreData] = useState([]);
  
  
  const [dateTime, setDateTime] = useState(new Date());
  const [heureFin, setHeureFin] = useState("");
  const [heureDebut, setHeureDebut] = useState("");


  useEffect(() => {
      const id = setInterval(() => setDateTime(new Date()), 1000);
      return () => {
          clearInterval(id);
      }
  }, []);

  useEffect(() => {
    axios.get("https://appkwilu2.herokuapp.com/detail_produits").then((res) => {
      setAutreData(res.data);
    });
  }, [setData]);

  const detailTransporteur = JSON.parse(localStorage.getItem("info"));
  let employeId = JSON.parse(localStorage.getItem("employeId"));

  // console.log(detailTransporteur);
  const [etatChargement, setEtatChargement] = useState(
    detailTransporteur.etatLibelle
  );

  const handleHeureChargement = (heureDebut) => {
    setHeureDebut(heureDebut);
    changerDEtat(2, {
      heure_chargement: `${moment(heureDebut).format("YYYY-MM-DD hh:mm:ss")}`,
    });
    setEtatChargement("en chargement");
  };
  const handleHeureCharge = (heureFin) => {
    setHeureFin(heureFin);
    changerDEtat(3, {
      heure_charge: `${moment(heureFin).format("YYYY-MM-DD hh:mm:ss")}`,
    });
    setEtatChargement("chargé");
  };
  // recuperation l'id de la table date detail_produit
  let ID;
  details.find((data) => {
    ID = data.id;
  });
  localStorage.setItem("idDetail", ID);
  const idDetail = localStorage.getItem("idDetail");

  function formPhoto1(photo) {
    setImage1(photo);
  }

  function formPhoto2(photo) {
    setImage2(photo);
    console.log(image2);
  }

  const changerDEtat = (newEtat, infoHeure) => {
    axios
      .put(
        `https://appkwilu2.herokuapp.com/employes/${employeId}/vehicules/${detailTransporteur.id}?etatId=${newEtat}`,
        infoHeure
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Heure de mise à jour de l'heure\n", err));
  };

  const onSubmitImage = () => {
    let formData = new FormData();
    formData.append("photo_bon_debut", image1);
    axios({
      method: "put",
      url: `https://appkwilu2.herokuapp.com/detail_produits/${idDetail}/photo_bon_debut`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("from send ==>" + res.data);
        alert("le bon de livraison initial a été soumis avec succes");
      })
      .catch((err) => {
        // alert("Un problème est survenu lors de la soumission de la photo\n");
        console.log("reponse ==>" + err.res);
      });
  };

  const onSubmitImage2 = () => {
    let formData = new FormData();
    formData.append("photo_bon_fin", image2);
    axios({
      method: "put",
      url: `https://appkwilu2.herokuapp.com/detail_produits/${idDetail}/photo_bon_fin`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("from send ==>" + res.data);
        alert("le bon de livraison final a été soumis avec succes");
      })
      .catch((err) => {
        // alert("Un problème est survenu lors de la soumission de la photo\n");
        console.log("reponse ==>" + err.res);
      });
  };

  const onSubmit = () => {
    if (commentaire === "") {
      setComError("Veuillez renseigner ce champs!");
      return true;
    } else {
      setComError(null);

      const infoCommentaire = {
        contenu: commentaire,
      };
            
      const endpoint = `https://appkwilu2.herokuapp.com/employes/${employeId}/vehicules/${detailTransporteur.id}/commentaires`;
      axios
        .post(endpoint, infoCommentaire)
        .then((res) => {
          console.log(res.data);
          axios
      .get(
        `https://appkwilu2.herokuapp.com/vehicules/${detailTransporteur.id}/commentaires`
      )
      .then((response) => setComments(response.data));;
        })
      .catch((err) => {
          alert(
            "Un problème est survenu lors de la soumission du commentaire\n"
          );
          console.log(err);
        });
      setCommentaire("")
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://appkwilu2.herokuapp.com/vehicules/${detailTransporteur.id}/detail_produits`
      )
      .then((response) => {
        setdetails(response.data);
        console.log(response.data);
      });

    axios
      .get(
        `https://appkwilu2.herokuapp.com/vehicules/${detailTransporteur.id}/commentaires`
      )
      .then((response) => setComments(response.data));

    console.log(detailTransporteur);
   
  }, []);

  const tabFilterOne = [];

  let tabFilterTwo = comments.employes;
  let noms = [];
  let nom = '';
  let contenu;
  let dates;
  let tab = [];

  for (let el in tabFilterTwo) {
    nom = tabFilterTwo[el].nom + nom;
    noms.push({
      nom: nom,
    });
    for (let i in tabFilterTwo[el].commentaires) {
      contenu = tabFilterTwo[el].commentaires[i].contenu;
      dates = tabFilterTwo[el].commentaires[i].date;
      tab.push({
        commentaire: contenu,
        date: dates,
      });
    }
  }

  return (
    <>
      <Navbar/> 
      <Container>
      
        <Segment
          clearing
          style={{
            
            width: "100%",
          }}
          className="segment-container"
        >
          <Div1 className="bloc1">
            <Img
              src={
                detailTransporteur.photoVehicule
                  ? detailTransporteur.photoVehicule
                  : "https://www.usine-digitale.fr/mediatheque/5/4/8/000794845_homePageUne/ups-tusimple.jpg"
              }
             
              alt="Vehicules"
            />

              <p>
                Transporteur : <span className="detailInfo"> {detailTransporteur.nom.toUpperCase()}</span> <br/>
                Heure début chargement : <span><Button circular >Confirmer</Button></span> <br/>
                Heure fin chargement : <span><Button circular >Confirmer</Button></span> <br/>
                Etat :
                  <Label
                    color={
                      etatChargement == "parking"
                        ? "orange"
                        : etatChargement == "en chargement"
                        ? "blue"
                        : "green"
                    }
                    style={{
                      marginLeft: "10%",
                      width: "20%",
                      paddingBottom: "0%"                      
                    }}
                    tag
                  >
                    <Icon
                      name={
                        etatChargement == "parking"
                          ? "truck"
                          : etatChargement == "en chargement"
                          ? "sync"
                          : "check"
                      }
                    />
                    {etatChargement}
                  </Label>
              </p>
            
            </Div1>
        
          <Div2>
            <p>
              N°_Plaque : <span className="detailInfo">{detailTransporteur.plaque} </span> <br/>
              Marque : <span className="detailInfo">{detailTransporteur.plaque} </span> <br/>
              produit : <span className="detailInfo">{detailTransporteur.plaque} </span> <br/>
              Total quantité : <span className="detailInfo">{detailTransporteur.plaque} </span> <br/>  
            </p>
          </Div2>
        </Segment>

        {details.map((data) => (
          <Step.Group >
            <div className="seg-group">
              <Step >
                <Step.Title>Client</Step.Title>
                <List>
                  <List.Item>
                    <List.Content>
                      <List.Header style={{ color: "green" }}>NOM</List.Header>
                      {data.clients.map((nom) => (
                        <List.Description>{nom.nom_client}</List.Description>
                      ))}
                    </List.Content>
                  </List.Item>

                  <List.Item style={{ paddingLeft: "1%" }}>
                    <List.Content>
                      <List.Header style={{ color: "green" }}>
                        NUMERO BL
                      </List.Header>
                      <List.Description>{data.ref_bon}</List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header style={{ color: "green" }}>
                        PRODUIT
                      </List.Header>
                      <List.Description>
                        {data.clients.map((client) =>
                          client.produits.map((produit) => (
                            <List.List>
                              <List.Content
                                style={{ margin: "0%", marginBottom: "5%" }}
                              >
                                <List.Icon name="caret right" />
                                Sucre {produit.type_produit}:{" "}
                                <Label classic style={{ marginLeft: "0%" }}>
                                  {produit.quantite}
                                </Label>
                              </List.Content>
                            </List.List>
                          ))
                        )}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Step>

              <Step style={{ width: "100%" }}>
                <Step.Title>Bon de livraison initial</Step.Title>
                <div className="containerPhotoBon">
                  <List className="containerPhotoBon">
                    
                    <Image
                      src={
                        details[0].photo_bon_debut
                          ? details[0].photo_bon_debut
                          : image1
                      }
                      id="imageBL"
                      type="file"
                      ref={register}
                      onChange={(event) => setImage1(event.target.value)}
                      centered
                    />
                    <div>
                      {/* <ModalPhoto ajoutPhoto={formPhoto1} floated="centered" /> */}
                      <Button onClick={onSubmitImage}>soumettre</Button>
                    </div>
                  </List>
                </div>
              </Step>

              <Step style={{ width: "100%" }}>
                <Step.Title>Bon de livraison final</Step.Title>
                <div className="containerPhotoBon">
                  
                    <Image
                      src={
                        details[0].photo_bon_fin
                          ? details[0].photo_bon_fin
                          : image2
                      }
                      id="imageBL"
                      type="file"
                      ref={register}
                      onChange={(event) => setImage2(event.target.value)}
                      centered
                    />
                    <div>
                      {/* <ModalPhoto ajoutPhoto={formPhoto2} floated="top" /> */}
                      <Button onClick={onSubmitImage2}>soumettre</Button>
                    </div>
                  
                </div>
              </Step>
            </div>
          </Step.Group>
        ))}

        <Segment.Group className="section-commentaire" color="green">
          <Segment>
            <Header className="titre" as="h3" color="green">
              Commentaire
            </Header>
          </Segment>
          <Segment>
          <Form className="seg-com">
            <Form.Field
              name="commentaire"
              value={commentaire}
              onChange={(event) => setCommentaire(event.target.value)}
              control="textarea"
              rows="3"
              placeholder="Ajouter un commentaire"
              // required
            />
            <div style={{color:"red"}}>{comError}</div>
            <Button
              circular
              icon="plus "
              color="green"
              className="Btn-icone"
              floated="top"
              onClick={onSubmit}
            />
          </Form>
          </Segment>

          {noms.reverse().map((datas) =>
            tab.reverse().map((data) => (
              <Segment className="seg-com">
                <div>
                  <p>
                    {" "}
                    <b>{datas.nom}</b> &ensp;
                    <span>{moment(data.date).calendar()}</span>
                  </p>
                  <p>{data.commentaire}</p>
                </div>
              </Segment>
            ))
          )}
         
        </Segment.Group>
     
    </Container>
    </>
  );
};
const Container = styled.div`
  .segment-container{
    display : flex;
  }
`;
const Img = styled.img`
  width : 20%;
`;
const Div1 = styled.div`
  display : flex;
  margin-left : 4px;
`;

const Div2 = styled.div`

`;

export default DetailsChargements;
