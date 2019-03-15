import React, { Component } from 'react'
import './css/Mapa.css'
import LineTo, { SteppedLineTo } from 'react-lineto';

class Instructions extends Component{
    render(){

        return(<LineTo  
            from="Prueba" to= "principalIdea"
            borderStyle="dashed"
           />
        );
    }
}

export default Instructions;