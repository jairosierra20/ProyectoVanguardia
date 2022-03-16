import  React from 'react';
import 'firebase/auth';

import { getAuth, signOut } from "firebase/auth";


import "firebase/compat/firestore";
import "firebase/compat/storage";
import Userpage from './PERFIL/PaginaPerfil';



import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';


import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./PERFIL/estilos.css";


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
export default function PerfilAdmin() {
    const classes = useStyles();
    const auth = getAuth();
const user2 = auth.currentUser;
    
    const history = useHistory();
    
    const submit2 =()=>{
        
      const auth = getAuth();
      signOut(auth).then(() =>  {


            history.push("/");
           window.location.reload();
            
        });
        
        
      } 
      

    return(




    <div>
<Userpage></Userpage>
        {
            user2 &&
            <Grid container spacing={3} style={{ height: "fit-content" , backgroundColor: "#414443" , padding: 40}}>
            <Grid className="centro" container spacing={2}  style={{ padding: 40 }} >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                 
                  <form className={classes.form} noValidate>
                    
                  
          <div>
                    <Button
                    
                      onClick={submit2}
                    
                      fullWidth
                      variant="contained"
                     
                      color="primary"
                      className={classes.submit}
              
                    >
                      Cerrar Sesion
                    </Button>
          
                    
          
          
                    </div>
                  
                    
                    <Grid container>
                    
                      
                      <Grid item>
                      <div> 
                  
                      </div>
                        <Link to="/ForgotPass"  style={{ textDecoration: 'none' ,color:"White", marginLeft:145}}  >
                        Cambio de Contraseña
                        </Link>
                        
                      </Grid>
                      
                    </Grid>
                    
                  </form>
                </div>
                
                <Box mt={8}>
                
                </Box>
                </Container>
                </Grid>
              </Grid>
          }
          </div>
    );



}