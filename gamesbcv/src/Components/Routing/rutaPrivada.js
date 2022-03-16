import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//Firebase
import 'firebase/auth';

import { getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const RutaPrivada = ({component: Component, ...rest}) => {
    
    const auth = getAuth();
const admin = auth.currentUser;
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            admin?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default RutaPrivada;