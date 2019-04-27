import React, { Component } from 'react';
import './css/Instructions.css'
import Fondo from './img/fondo-instrucciones.png'
import Avatar from './img/avatar.png'

class Instructions extends Component {
    render() {
        return (
            <div className="container">
                <img src={ Avatar } alt="avatar" className="avatar"/>
                <div className="text_instructions">
                    <img src={ Fondo } alt=""/>
                    <h2>INSTRUCCIONES:</h2>
                    <p>{this.props.instuctionsText}</p>
                </div>
            </div>
        );
    }
}

export default Instructions;
