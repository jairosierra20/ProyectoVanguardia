import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//Firebase
import {useFirebaseApp} from 'reactfire';
import 'firebase/auth';

const RutaPublica = ({component: Component, restricted, ...rest}) => {
    const firebase = useFirebaseApp();
    const admin=firebase.auth().currentUser;
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            !admin && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default RutaPublica;