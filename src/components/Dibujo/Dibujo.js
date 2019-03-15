import React, { Component } from 'react';
import DibujoStudent from './DibujoStudent'
import DibujoTeacher from './DibujoTeacher'

class Dibujo extends Component{
    constructor(props){
        super();
        this.state = {
            userData: 'student'
        };
    }
    render(){
        if (this.state.userData === 'teacher'){
            return <DibujoTeacher />;
        } else{
            return <DibujoStudent />
        }
        
    }
}

export default Dibujo;