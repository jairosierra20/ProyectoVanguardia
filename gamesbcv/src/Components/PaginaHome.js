
import Grid from "@material-ui/core/Grid";

import ServicioGrid from "../Components/servicioGrid";
import JuegosPopulares from "../Components/juegosPopulares";

export default function PaginaHome() {
  return (
<div>
<Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
  <img
      className="d-block w-100"
      src="https://www.islabit.com/wp-content/uploads/2018/05/Videojuegos.png"
      alt="First slide"
      style={{width:"100%"}}
    />
    </Grid>
      
      
      </Grid>
      <h1 className="centrar">Juegos Disponibles</h1>
    <Grid item xs={12} sm={12}>
      
     
      
    < JuegosPopulares></ JuegosPopulares>
       </Grid>
    
      <br></br>
  
      <img
      className="d-block w-100"
      src="https://i.postimg.cc/0jRMGf8h/Captura.png"
      alt="First slide"
      style={{height:"120px",width:"100%"}}
    />
    <h1 className="centrar">Actividad Reciente</h1>
    <Grid item xs={12} sm={12}>
      
     
      <Grid item xs={12} sm={6}>
      
       </Grid>
    
      <br></br>
      < ServicioGrid></ ServicioGrid>
    </Grid>
    
    </div>
    
  );
}
