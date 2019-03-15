import React, { Component } from 'react'
import './css/Dibujo.css'
import IconoTerminar from '../Balanza/images/ico-terminar.svg'
import axios from 'axios'


class DibujoTeacher extends Component {

    constructor(props){
        super(props);
        this.state = {
            description: '',
        };
    }

    handleDescription = event => {this.setState({ description: event.target.value })}

    handleSubmit = (event) => {

        event.preventDefault();
        
        axios.post(`http://localhost:8000/v1/paints/`,
        {
            description: this.state.description,
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render(){
        return (
            <div className="PaintAdmin">
                <form onSubmit={this.handleSubmit}>
                    <div className="paintAdminDescription">
                        <p className="fontMLS">
                        Con esta herramienta, el alumno deberá representar gráficamente la idea, concepto o instrucciones descritas.
                        </p>
                    </div>
                    <div className="paintAdminInstructions fontMBS">
                        <p>Instrucciones para el alumno:</p>
                        <textarea name="description" onChange={this.handleDescription}>
                        </textarea>
                    </div>
                    
                    <div className="alignButtonCSS">                 
                        <button 
                            type="submit" 
                            className="buttonAdminPaintTerminar"
                            >
                            <div className="buttonAdminPaintAlineacionImagen"><img src={IconoTerminar} alt="" /></div>
                            <div className="buttonAdminPaintAlineacionTexto">Terminar</div>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default DibujoTeacher;