import React, { Component } from 'react';
import './css/Instructions.css'
class Instructions extends Component {
    render() {
        return (
            <div className="container">
                <img src="./img/avatar.png" alt="avatar" className="avatar"/>
                <div className="text_instructions">
                    <img src="./img/fondo-instrucciones.png"/>
                    <h2>INSTRUCCIONES:</h2>
                    <p>{this.props.instuctionsText}</p>
                </div>
            </div>
        );
    }
}

export default Instructions;
