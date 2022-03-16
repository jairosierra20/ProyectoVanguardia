import React from "react";

import LocationOnIcon from "@material-ui/icons/LocationOn";



export default function FooterPrueba() {
  
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div
          className="row text text-center"
          style={{ backgroundColor: "#13455e" }}
        >
          <div
            className="col-5 bg "
            style={{
              color: "white",
              textAlign: "center",
              backgroundColor: "#13455e",
            }}
          >
            <br></br>
            <br></br>
            <br></br>

            <LocationOnIcon fontSize="large"></LocationOnIcon>
            <h1>visitanos</h1>
            <br></br>
            <h5> ¡Ven con nosotros!</h5>
            <h4> ¡te va a gustar sonreir!</h4>
          </div>
          <div
            className="col-7 bg "
            style={{
              color: "black",
              textAlign: "left",
              backgroundColor: "#13455e",
            }}
          >
            <br></br>
            
            <br></br>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
