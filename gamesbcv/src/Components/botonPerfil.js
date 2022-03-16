import React from "react";

import 'firebase/auth';
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase-config";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const BotonPerfil = (props) => {
  
  
  const auth = getAuth();
const admin = auth.currentUser;

  

  if (admin) {
    return (
      <Link to="/Perfil" style={{ color: "white" }}>

        <Button >
          <Avatar style={{ background: "lightblue", width: '30px',
    height: '30px'}}>
{
  admin.email.substring(0,1)
}

          </Avatar>
        </Button>
      </Link>
    );
  } else if (!admin) {
    return (
      <Link to="/SignIn" style={{ color: "white" }}>
        Iniciar Sesion
      </Link>
    );
    }
};

export default withRouter(BotonPerfil);
