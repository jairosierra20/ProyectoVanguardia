import  React, {useState} from 'react';
import 'firebase/auth';
import {useFirebaseApp, useUser} from 'reactfire';

// eslint-disable-next-line import/no-anonymous-default-export
export default (pros) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const firebase = useFirebaseApp();
    const user = useUser();
    var user2 = firebase.auth().currentUser;
    const submit = async()=>{
       
        
    }
 

    return(
        <div>
            {user2.email}
            <div>
            
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id ="email" onChange={(ev) => setEmail(ev.target.value)} />
                <label htmlFor="password">Contraseña</label>
                <input type="password" id ="password" onChange={(ev) => setPassword(ev.target.value)}/>
                <button onClick={submit}>Iniciar sesión</button>
            </div>
        </div>
    )
}