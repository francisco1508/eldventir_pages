import React, { Component } from 'react';
import '../css/Balanza.css'
import IconoTerminar from '../images/ico-terminar.png'
import API from '../../Global/api'

class Balanza extends Component {
    constructor(props){
        super(props);
        this.state = {
            description: '',
            right_side: '',
            left_side: '',
            values: ['','',''], 
        };
    }
    
    handleDescription = event => {this.setState({ description: event.target.value })}
    handleRightSide = event => {this.setState({ right_side: event.target.value })}
    handleLeftSide = event => {this.setState({ left_side: event.target.value })}
    handleValues = id => event => {
               
        const values = [...this.state.values];
        values[id] = event.target.value;
        this.setState({ values: values });
    }

    addClick(){
        if (this.state.values.length <=7){
            this.setState(prevState => ({ values: [...prevState.values, '','']}))
        }

    }
    handleSubmit = (event) => {

        event.preventDefault();
        
        API.post(`tasks/`,
        {
            description: this.state.description,
            right_side: this.state.right_side,
            left_side: this.state.left_side,
            values: this.state.values,
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        
    }

    createUI(){
        return this.state.values.map((el, i) =>
            <div className="createUI fontMBS" key={i}>
                <label >Concepto {i+1}</label>
                <input type="text" value={el||''} onChange={this.handleValues(i)} />
            </div>
        )
    }
  render() {
    return (
        <div className="BalanzaAdmin">
            <form onSubmit={this.handleSubmit}>
                <div className="balanzaDescription">
                    <p className="fontMLS">Con esta herramienta, el alumno podrá reflexionar sobre el peso de sus decisiones, para ello es necesario darle los
                        conceptos que deberá "pesar en la balanza". El mínimo de conceptos deben ser tres y deberán incrementarse en números
                        nones para que la balanza se incline siempre hacia un lado.</p>
                </div>
                <div className="balanzaInstructions fontMBS">
                    <p>Instrucciones para el alumno:</p>
                    <textarea name="description" onChange={this.handleDescription}>
                    </textarea>
                </div>
                <hr/>
                <div className="balanzaValues fontMBS">
                Valores de la balanza
                <div className="textBalanzaValues">
                    <div className="divPositive">
                        Positivo
                    </div>
                    <div className="divNegative">
                        Negativo
                    </div>
                </div>
                <div className="textBalanzaValues">
                    <div className="divPositive">
                        <input type="text" onChange={this.handleRightSide}/>
                    </div>
                    <div className="divNegative">
                        <input type="text" onChange={this.handleLeftSide}/>
                    </div>
                </div>

            </div>
                <hr/>
                {this.createUI()}
                <div className="alignButtonAgregar fontMBS">
                <button type="button" className="buttonAgregar" onClick={this.addClick.bind(this)}>+ Agregar Conceptos</button>
                </div>
                <div className="alignButtonCSS">
                    <button type="submit" className="buttonTerminar"><img src={IconoTerminar} alt="" />Terminar</button>
                </div>
            </form>

        </div>
    );
  }

}

export default Balanza;
