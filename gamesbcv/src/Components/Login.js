import  React, {useState} from 'react';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from "react-router-dom";


import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase-config";
import "firebase/compat/firestore";
import "firebase/compat/storage";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";








const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [openMessage, setOpenMessage] = React.useState(false);
  const [openMessage2, setOpenMessage2] = React.useState(false);
  const [password2, setPassword2] = useState('');
  const history = useHistory();
  const [ListaCompra, setListaCompra] = React.useState([]);
    const [listajuegos, setListajuegos] = React.useState([]);
  
const Usuarios = async () =>{
  
  let obj = { nombre, apellido, email, ListaCompra, listajuegos};
  console.log("hola: "+nombre)
    db.collection("Usuarios").add(obj);
  

}
  const submit =()=>{

    
    const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password2)
  .then((userCredential) =>  {
    Usuarios();
        handleClickOpenMessage();
     //   user2 = firebase.auth().currentUser();
    })
   .catch(function(error) {
        handleClickOpenMessage2();
   });
  
 } 
 const handleClickOpenMessage = () => {
  setOpenMessage(true);
};

const handleCloseMessage = () => {
  setOpenMessage(false);
  
  history.push("/Perfil");
  //window.location.reload();

};


const handleClickOpenMessage2 = () => {
  setOpenMessage2(true);
  
};

const handleCloseMessage2 = () => {
  setOpenMessage2(false);
 // user2=null;
};
  const classes = useStyles();



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                onChange={(ev) => setnombre(ev.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                autoFocus
                onChange={(ev) => setapellido(ev.target.value)}
              />
            </Grid>
            <div>
      
      <br />
      
    </div>
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
            onChange={(ev) => setPassword2(ev.target.value)}
          />
           
          </Grid>
          <Button
            //type="submit"
            onClick={submit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Dialog
                  open={openMessage2}
                  onClose={handleCloseMessage2}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  >
                <DialogTitle id="alert-dialog-title">{"¿Error en creación de cuenta nueva?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Intente de nuevo
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseMessage2} color="primary">
                Confirmacion
                </Button>
                
              </DialogActions>
            </Dialog>
            <Dialog
                  open={openMessage}
                  onClose={handleCloseMessage}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  >
                <DialogTitle id="alert-dialog-title">{"Creación de cuenta nueva correcta"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Su cuenta se ha creado correctamente.
                  
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseMessage} color="primary">
                Confirmacion
                </Button>
                
              </DialogActions>
            </Dialog>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/Perfil"  style={{ textDecoration: 'none' ,color:"Blue"}} >
                Volver
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}