import React, { useEffect } from "react";
import 'firebase/auth';
import { getAuth} from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase-config";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginBottom: '5%'

  },
  gridList: {
    width:'70%',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  ancho:{
    
  }
});

export default function Categorias() {
  const [categorias, setCategorias] = React.useState([]);
  const classes = useStyles();
  let history = useHistory();
    const auth = getAuth();
const user2 = auth.currentUser;
  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = async () => {
    let obj;
    const querySnapshot = await db.collection("Usuarios").get();
   
    querySnapshot.forEach((doc) => {
      obj = doc.data();
      obj.id = doc.id;
      if(user2 != null){
      if(user2.email === doc.data().email){
      

      setCategorias(doc.data().listajuegos); 
      }  
      }   
    });
    
  };
  

  return (
    <div className={classes.root}>
      <GridList cellHeight={400} cellWidth={1000} className={classes.gridList} cols ={3}>
      {categorias.map((tile,index) => (
          <GridListTile key={tile.url}>
            <img src={tile.url} alt={tile.name} />
            <GridListTileBar
              title={tile.name}
          
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}  onClick={() => history.push({pathname: "/ActividadReciente", state: tile})}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      </div>
   
  );
}
