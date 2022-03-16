import  React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import { Link } from "react-router-dom";

import 'firebase/auth';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
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
    marginTop: theme.spacing(11),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPass() {
    const [email, setEmail] = useState('');
  
    const [openMessage, setOpenMessage] = React.useState(false);
    
    const history = useHistory();
  



  


    const PasswordRecover =()=>{
      const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() =>  {
        // Email sent.
        handleClickOpenMessage();
      }).catch(function(error) {
        // An error happened.
      });
  }
  const handleClickOpenMessage = () => {
    setOpenMessage(true);
  
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
    history.push("/SignIn");
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
         Perdiste Tu Contraseña
        </Typography>
        <Typography  component="h1" variant="subtitle2">
        ¿Perdiste tu contraseña? Ingrese su dirección de correo electrónico. Recibirá un enlace para crear una nueva contraseña por correo electrónico.
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(ev) => setEmail(ev.target.value)}
          />
          
          
          <Button
            onClick={PasswordRecover}
          
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Restablecer Contraseña
          </Button>
          <Dialog
                  open={openMessage}
                  onClose={handleCloseMessage}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  >
                <DialogTitle id="alert-dialog-title">{"Reestablecimiento de contraseña"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Su correo para la recuperación de contraseña fue enviado correctamente
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseMessage} color="primary">
                Confirmacion
                </Button>
                
              </DialogActions>
            </Dialog>
          <Grid container>
            <Grid item xs>
              
            </Grid>
            <Grid item>
              <Link to="/SignIn"  style={{ textDecoration: 'none' ,color:"Blue"}}>
                "¿Recuerdas tu contraseña? Iniciar Sesión"
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      
      </Box>
    </Container>
  );
}