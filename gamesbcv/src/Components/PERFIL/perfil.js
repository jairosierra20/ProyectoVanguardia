import React from 'react';



import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";

import "./estilos.css";

import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase-config";
import "firebase/compat/firestore";
import "firebase/compat/storage"
import { getAuth} from "firebase/auth";



  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = firebase.firestore();






export default function MediaControlCard(props) {
  //const { classes, theme } = props;
    const auth = getAuth();
const user2 = auth.currentUser;
const [apellido, setApellido] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [email, setEmail] = React.useState("");

const getCategorias = async () => {
  let obj;
  const querySnapshot = await db.collection("Usuarios").get();
 
  querySnapshot.forEach((doc) => {
    obj = doc.data();
    obj.id = doc.id;
      if(user2!=null){
        if(user2.email ===doc.data().email ){
          setNombre(doc.data().nombre)
          setApellido(doc.data().apellido)
          setEmail(doc.data().email)
        }
      }
      
    
  });
};

  getCategorias()


  return (
    
<Box
      sx={{
        width: 1250,
        height: 250,
        marginLeft:50,
        marginTop:30
     
       
      }}
    >
    <Grid className="centro" container spacing={2}  style={{ padding: 40 }} >
       
 
      <Grid item xs={3}  >
      <img 
      className="photo"
      src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
      alt="new"

      />
     </Grid>

     <Grid  item xs={5} >
     <Typography variant="h4">
          {nombre +"  "+apellido}
          </Typography>

          <Typography variant="subtitle1">
          Se unio el 12/11/2021
          </Typography>

          <br></br>
          <br></br>
          <br></br>

          <Typography variant="subtitle2" >
          Información: 
          </Typography>
          <Typography variant="subtitle2" >
          {"Correo: "+ email}
          </Typography>
     
     </Grid>

    
    </Grid>
    </Box>
    
   
  );
}


