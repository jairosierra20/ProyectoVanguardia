import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import User_Profile from './perfilCard';




export default function MediaControlCard(props) {
  

  return (

<Box
      className = "cajaLibreria"
      sx={{
        width: 1200,
        height: 300,
        padding: 100,

     
       
      }}
    >
    <Grid container spacing={3} style={{ height: "fit-content" , backgroundColor: "#414443" , padding: 40}}>

<Grid item md={12}   >

    
<Typography  variant="h3">
           Libreria de Juegos
       </Typography>
    
    
    </Grid>
       
        
      <Grid item md={10}   >
              <User_Profile></User_Profile>
    
    
    </Grid>
    </Grid>
    </Box>
  );
}


