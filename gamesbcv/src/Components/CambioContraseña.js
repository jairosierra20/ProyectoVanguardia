import React, { useState } from "react";
import "firebase/auth";
import { useFirebaseApp} from "reactfire";

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

export default function CambioPass() {
  const history = useHistory();
  const firebase = useFirebaseApp();
  //const user=null;
  const user2 = firebase.auth().currentUser;

  const [contraseñaa, setContraseñaa] = useState("");

  const [contraseñan, setContraseñan] = useState("");
  const [confirmec, setConfirmec] = useState("");

  const [openMessage, setOpenMessage] = React.useState(false);
  const [openMessage2, setOpenMessage2] = React.useState(false);

  /*const submit =()=>{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(firebaseUser) {
        handleClickOpenMessage2();
     //   user2 = firebase.auth().currentUser();
    })
   .catch(function(error) {
        handleClickOpenMessage();
   });
    }*/
  const submit2 = () => {
   

    var contra = contraseñan;

    if (contraseñan != confirmec) {
      handleClickOpenMessage2();
    } else {
      user2
        .updatePassword(contra)
        .then(function () {
          handleClickOpenMessage();
        })
        .catch(function (error) {
          handleClickOpenMessage2();
        });
    }
  };

  const handleClickOpenMessage = () => {
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
    history.push("/Perfil");
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
    <div>
      {user2 && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cambio de Contraseña
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="contraseñaa"
                label="Contraseña Actual"
                type="password"
                id="contraseñaa"
                autoComplete="current-password"
                onChange={(ev) => setContraseñaa(ev.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="contraseñan"
                label="Contraseña Nueva"
                type="password"
                id="contraseñan"
                autoComplete="current-password"
                onChange={(ev) => setContraseñan(ev.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmec"
                label="Confirme Contraseña"
                type="password"
                id="confirmec"
                autoComplete="current-password"
                onChange={(ev) => setConfirmec(ev.target.value)}
              />

              <div>
                <Button
                  onClick={submit2}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Cambiar Contraseña
                </Button>
                <Dialog
                  open={openMessage}
                  onClose={handleCloseMessage}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Cambio de contraseña correcto"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Su cambio de contraseña fue exitoso
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseMessage} color="primary">
                      Confirmacion
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openMessage2}
                  onClose={handleCloseMessage2}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Ingrese correctamente su contraseña actual y confirme
                      correctamente su contraseña nueva
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseMessage2} color="primary">
                      Confirmacion
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    to="/Perfil"
                    style={{ textDecoration: "none", color: "Blue" }}
                  >
                    Volver
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container>
      )}
    </div>
  );
}
