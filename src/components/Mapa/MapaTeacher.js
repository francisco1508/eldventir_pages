import React, { Component } from 'react'
import './css/Mapa.css'
import IconoTerminar from './../Balanza/images/ico-terminar.svg'
import axios from 'axios'


class Mapa extends Component {

    constructor(props){
        super(props);
        this.state = {
            description: '',
            principal_idea: ''
        };
    }

    handleDescription = event => {this.setState({ description: event.target.value })}
    handlePrincipalIdea = event => {this.setState({ principal_idea: event.target.value })}

    handleSubmit = (event) => {

        event.preventDefault();
        
        axios.post(`http://localhost:8000/v1/mentals/`,
        {
            description: this.state.description,
            principal: this.state.principal_idea
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(
            error=> {
                if(error.response.data.code === 422){
                    alert("Debes asignar una descripcion del ejercicio.");
                }
                else{
                    alert("Ocurrio un error, intente de nuevo.");
                }
                

            }
        );
        
    }

    render(){
        return (
            <div className="MapAdmin">
                <form onSubmit={this.handleSubmit}>
                    <div className="mapAdminDescription">
                        <p className="fontMLS">Con esta herramienta, el alumno podrá reflexionar sobre el peso de sus decisiones, para ello es necesario darle los
                            conceptos que deberá "pesar en la balanza". El mínimo de conceptos deben ser tres y deberán incrementarse en números
                            nones para que la balanza se incline siempre hacia un lado.</p>
                    </div>
                    <div className="mapAdminInstructions fontMBS">
                        <p>Instrucciones para el alumno:</p>
                        <textarea name="description" onChange={this.handleDescription}>
                        </textarea>
                    </div>
                    <hr/>
                    <div className="mapAdminValues fontMBS">
                        <div className="textMapAdminPrincipal">
                            <div className="divPrincipalIdea">
                                Idea Principal
                            </div>
                        </div>
                        <div className="textMapAdminPrincipal">
                            <div className="divPrincipalIdea">
                                <input type="text" onChange={this.handlePrincipalIdea}/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="alignButtonCSS">                 
                        <button 
                            type="submit" 
                            className="buttonAdminMapTerminar"
                            >
                            <div className="buttonAdminMapAlineacionImagen"><img src={IconoTerminar} alt="" /></div>
                            <div className="buttonAdminMapAlineacionTexto">Terminar</div>
                        </button>
                    </div>
                </form>

            </div>
        );
    }
}

export default Mapa;