import React, { useState } from "react";
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase-config";
import "firebase/compat/firestore";
import "firebase/compat/storage";


import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";


import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(11),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function SignIn() {
  var pass;
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [openMessage, setOpenMessage] = React.useState(false);
  const [openMessage2, setOpenMessage2] = React.useState(false);
  
  const history = useHistory();
  //const db = firebase.firestore();
  /*const Usuarios = async () =>{
    await setDoc(doc(db, "cities", "LA")
    const querySnapshot1 = await db.collection("UsuariosExtras").get();
    querySnapshot1.forEach((doc) => {
      if(doc.data().email===email){
        console.log("hola aqui estoy")
        flag2=true;
        console.log("hola aqui estoy"+flag2)
      }
    });
    console.log("hola aqui estoy"+flag2)
    if(flag2===false){
    let obj = { email, password };

      await db.collection("UsuariosExtras").add(obj);
    }
    
  
  }*/
  const submit = async () =>{
    pass = password;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        handleClickOpenMessage2();
        //Usuarios();
        

        history.push("/");

        //   user2 = firebase.auth().currentUser();
      })
      .catch(function (error) {
        handleClickOpenMessage();
      });
  };

  const handleClickOpenMessage = () => {
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  const handleClickOpenMessage2 = () => {
    setOpenMessage2(true);
  };



  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <div>
              <Button
                onClick={submit}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Iniciar sesion
              </Button>

              <Dialog
                open={openMessage}
                onClose={handleCloseMessage}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"¿Error Contraseña o correo incorrectos?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Revise su contraseña o su correo Electronico.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseMessage} color="primary">
                    Confirmacion
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            <Grid container>
              <Grid item xs>
                <Link
                  to="/ForgotPass"
                  style={{ textDecoration: "none", color: "Blue" }}
                >
                  Perdiste tu contraseña?
                </Link>

                
              </Grid>

              <Grid item xs>
                <Link
                  to="/Login"
                  style={{ textDecoration: "none", color: "Blue" }}
                >
                  Registrate si no tienes cuenta
                </Link>

                
              </Grid>
              
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
}
