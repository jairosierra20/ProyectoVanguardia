
import './App.css';
import PaginaHome from "./Components/PaginaHome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import NavBar2 from "./Components/NavBar2";
import Login from "./Components/Login";
import Login2 from "./Components/Login";
import SignIn from "./Components/SingIn";
import RutaPrivada from "./Components/Routing/rutaPrivada";
import ForgotPass from "./Components/ForgotPassword";
import Perfil from "./Components/perfilAdmin";
import PaginasJuegos from "./Components/gamepage";
import PaginasJuegos2 from "./Components/gamepage2";
import Checkout from "./Components/checkoutpage";


function App() {


  return (
    <div className="content">
      <Router>
      <NavBar > </NavBar>
      <Switch>

        <Route exact path="/" component={PaginaHome}></Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>

        <Route path="/Login">
          <Login />
        </Route>

        <Route path="/ForgotPass">
          <ForgotPass />
        </Route>
        <Route path="/Grid">
          <PaginasJuegos />
        </Route>
        <Route path="/ActividadReciente">
          <PaginasJuegos2 />
        </Route>

        
        <RutaPrivada component={Perfil} path="/Perfil" exact />
        <RutaPrivada component={Login2} path="/Login2/:pass/:email" exact />
        <RutaPrivada component={Checkout} path="/Checkout" exact/>
       
      </Switch>
      <NavBar2> </NavBar2>
      </Router>


    </div>
  );
}

export default App;
