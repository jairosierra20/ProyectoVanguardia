import React from 'react';
import Carousel from 'react-bootstrap/Carousel'




export default function Courusel() {
 

  return (
    <Carousel fade className ="carro" >
  <Carousel.Item >
  <img
      className="d-block w-100"
      src="https://blogs.unitec.mx/content/dam/blogs/imagenes/corp_samara/necesito-brackets-1-compressor.jpg"
      alt="First slide"
      style={{height:"550px"}}
    />
    </Carousel.Item>
    <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
      alt="First slide"
      style={{height:"550px"}}
    />
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
      alt="Third slide"
      style={{height:"550px"}}
    />

   
  </Carousel.Item>
</Carousel>

  );
}