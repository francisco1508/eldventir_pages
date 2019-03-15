import React, { Component } from 'react';
import MapaStudent from './MapaStudent'
import MapaTeacher from './MapaTeacher'

class Mapa extends Component{
    constructor(props){
        super();
        this.state = {
            userData: 'student'
        };
    }
    render(){
        if (this.state.userData === 'teacher'){
            return <MapaTeacher />;
        } else{
            return <MapaStudent />
        }
        
    }
}

export default Mapa;