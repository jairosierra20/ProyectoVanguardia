import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import BotonPerfil from "../Components/botonPerfil";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//import { useFirebaseApp, useUser } from "reactfire";
//import "firebase/auth";

function NavBar(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  
  //const firebase = useFirebaseApp();
  //const admin = firebase.auth().currentUser;
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          
        <NavLink style={{ color: "white" }} exact to="/" className="nav-logo">
           <img src="https://jackmoreno.files.wordpress.com/2015/12/iconmonstr-gamepad-4-icon-256.png" width="75px" ></img>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            
            
            
          <li className="nav-item">
          <Link to="/Checkout" style={{ color: "white" }}>

<Button >
<Avatar>
        <AddShoppingCartIcon />
      </Avatar>
</Button>
</Link>
</li>
<li className="nav-item">
              <BotonPerfil></BotonPerfil>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
      </>
  );
}

export default NavBar;
