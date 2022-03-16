import React from "react";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";



import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase-config";
import "firebase/compat/firestore";
import "firebase/compat/storage"
import { getAuth} from "firebase/auth";

import Box from '@material-ui/core/Box';


 
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = firebase.firestore();



function PaginasJuegos(){
    let location = useLocation();
    const [listaDatos, setListaDatos] = useState(location.state);
    const [url, setUrl] = useState(listaDatos.url);
    const [name, setName] = useState(listaDatos.name);
    const [description, setDescription] = useState(listaDatos.description);
    const [tags, setTags] = useState(listaDatos.tags)
    const [synopsis, setSynopsis]  = useState(listaDatos.synopsis)
    const [price, setPrice] = useState(listaDatos.price)
    const [ListaCompra, setListaCompra] = React.useState([]);
    const [listajuegos, setListajuegos] = React.useState([]);
    const [apellido, setApellido] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [docid, setDocid] = React.useState();
    const [email, setEmail] = React.useState("");

    const [toBuy, setToBuy] = useState(false);
    const [comprado, setComprado] = useState(false);
    const auth = getAuth();
    let j=0
const user2 = auth.currentUser;

    
    useEffect(()=>{
        getCategorias()
    },[]);

    function cancelAddtoCart(){
        setToBuy(false);
    }
    const getCategorias = async () => {
        let obj;
        const querySnapshot = await db.collection("Usuarios").get();
       
        querySnapshot.forEach((doc) => {
          obj = doc.data();
          obj.id = doc.id;
          if(user2 != null){
          if(user2.email === doc.data().email){
            
            setNombre(doc.data().nombre)
            setListajuegos(doc.data().listajuegos)
            setListaCompra(doc.data().ListaCompra)
            setEmail(doc.data().email)
            setApellido(doc.data().apellido)
            setDocid(obj.id)

          }  
          }   
        });
        
      };

      const setCategorias2 = async () => {
        let obj = {nombre, apellido, email, listajuegos, ListaCompra};
        db.collection("Usuarios").doc(docid).set(obj);
            console.log("PASE TODO");
      };


    function handleCartProcedure(){
        //Add functions here xd
        let obj = {name, description, synopsis, url, tags, price};
    let list = ListaCompra;
    
    let bandera = true
        if(user2 != null){
        for (j=0; j < ListaCompra.length; j++){
            if(ListaCompra[j].name === name){
                bandera = false  
            }
        }
        if(bandera){
            list.push(obj)
            setListaCompra(list)
            setComprado(true)
            setCategorias2();
        }
        setToBuy(false)
    }
    }

    return(

        
        <div class="row  text-center" style={{backgroundImage: `url(${"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/232430/0c5f09279246102009314e27b76cb35a209fb8cf.jpg"})`, textAlign: 'left'}}>
            <Box 
        
        sx={{
          width: 1200,
          height: 300,
          padding: 500
         
        }}

        >
            <h2 style= { {fontFamily: 'Arial', color: 'white'}} >{name}</h2>
            <Grid container spacing={2}>
               <Grid item xs={2} >
                    <img src={url} alt="coverart" height={200} width={200}/>
               </Grid>
                <Grid item xs={8} >
                <TextField
                    inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                    style={{ flex: 1, margin: '0 20px 0 0', backgroundColor: 'gray'}}
                    id="syn"
                    label="Synopsis"
                    multiline
                    fullWidth
                    maxRows={4}
                    value={synopsis}
                    variant="filled"
                />

                </Grid>
               
             </Grid>
             <Grid container spacing={2} >
                <Grid item xs={4}>
                        <Button 
                            variant="contained"
                            style={{backgroundColor:'green', fontFamily:'Arial', borderColor:'black', boxShadow:'inherit', color:'white'}}
                            onClick={()=>setToBuy(true)}
                            >
                            {price} Add to Cart
                        </Button>
                </Grid>
             </Grid>
             <br/>
             <br/>
             <Grid container spacing={0} >
                 <Grid item xs ={8}>
                     <TextField
                        inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                        //style={{ flex: 1, margin: '0 20px 0 0', backgroundColor: 'gray'}}
                        id="des"
                        multiline
                        fullWidth
                        value = {description}
                        variant = "filled"
                        />
                 </Grid>
             </Grid>

             <br/>
             <br/>
             
             <Dialog
                open={toBuy}
                onClose = {cancelAddtoCart}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                  <DialogTitle id ='alert-dialog-title'>
                      {"Add game to cart"}
                  </DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    El juego {name} con un costo de {price} se agregara al carrito
                  </DialogContentText>
                  <DialogActions>
                      <Button onClick={handleCartProcedure} color="primary">
                          Aceptar
                      </Button>
                      <Button onClick={cancelAddtoCart} color="primary">
                          Cancelar
                      </Button>
                  </DialogActions>
                  </DialogContent>
              </Dialog>
              </Box>
        </div>
        

    );

}

export default PaginasJuegos