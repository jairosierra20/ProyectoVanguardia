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
import Box from '@material-ui/core/Box';


 
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = firebase.firestore();



function PaginasJuegos(){
    let location = useLocation();
    const [listaDatos, setListaDatos] = useState(location.state);
    const [imgUrl, setImgUrl] = useState(listaDatos.url);
    const [name, setName] = useState(listaDatos.name);
    const [description, setDescription] = useState(listaDatos.description);
    const [tags, setTags] = useState(listaDatos.tags)
    const [synopsis, setSynopsis]  = useState(listaDatos.synopsis)
    const [price, setPrice] = useState(listaDatos.price)

    const [toBuy, setToBuy] = useState(false);

    const getData = async() =>{
       
        const querySnapshot = await db.collection("games").get();
        let nameCapture =""
        querySnapshot.forEach((doc) =>{
            console.log(doc.data().name);
            if(doc.data().name==="Syndicate"){
                setName(doc.data().name)
                nameCapture= doc.data().name;
                setSynopsis(doc.data().synopsis);
                setDescription(doc.data().description)
                setTags(doc.data().tags)
                setPrice(doc.data().price)
                console.log(doc.data().tags)

            }
        })

        let url =  await firebase.storage().ref(nameCapture+'_coverart.jpg').getDownloadURL();
        setImgUrl(url);
        console.log(url);

    }

    useEffect(()=>{
        //getData();
    },[]);

    function cancelAddtoCart(){
        setToBuy(false);
    }

    function handleCartProcedure(){
        //Add functions here xd
        setToBuy(false)
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
                    <img src={imgUrl} alt="coverart" height={200} width={200}/>
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
                            disabled
                            >
                            On your library
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