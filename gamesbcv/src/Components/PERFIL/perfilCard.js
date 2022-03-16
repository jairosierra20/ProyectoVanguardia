import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import Grid from "@material-ui/core/Grid";


import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase-config";
import "firebase/compat/firestore";
import "firebase/compat/storage"
import {useFirebaseApp} from 'reactfire';
import { getAuth} from "firebase/auth";

 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();



const styles = theme => ({
  card: {
    display: 'flex',
    
    backgroundColor: "#06121e"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    fontColor: "white",
    flex: '1 0 auto',
 
  },
  cover: {
    width: 171,
    height: 180,
  },

  
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },

  
});



function MediaControlCard(props) {
  const [tags, setTags] = useState([])
  const [juegos, setJuegos] = useState([])
  const { classes, theme } = props;
    const auth = getAuth();
const user2 = auth.currentUser;

  const getCategorias = async () => {
    let obj;
    let list = [];
    const querySnapshot = await db.collection("Usuarios").get();
   
    querySnapshot.forEach((doc) => {
      obj = doc.data();
      obj.id = doc.id;
        if(user2.email === doc.data().email){
          setJuegos(doc.data().listajuegos)
        }
      
    });
    setTags(list);
    //setJuegos(obj.listajuegos)
    console.log(list)
  };
   

  useEffect(()=>{
    getCategorias();
},[]);
 
 

  



  return (

<Card className={classes.card}>
<Grid className="centro" container spacing={2}  style={{ padding: 40 }} >
  
    {juegos.map(juego =>
      

     <Grid item xs={3}>
      <img  className={classes.cover} src = {juego.url}></img>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {juego.name}
        </Typography>
        <Typography variant="body2">
          {juego.price}
        </Typography>
      </CardContent>
    
      </Grid>
  
    
     )}
     </Grid>
   </Card>


    
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);