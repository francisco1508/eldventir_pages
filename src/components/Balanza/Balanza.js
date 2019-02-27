import React, { Component } from 'react';
import BalanzaStudent from './student/Balanza'
import BalanzaTeacher from './teacher/Balanza'

class Balanza extends Component{
    constructor(props){
        super();
        this.state = {
            userData: 'student'
        };
    }
    render(){
        if (this.state.userData === 'teacher'){
            return <BalanzaTeacher />;
        } else{
            return <BalanzaStudent />
        }
        
    }
}

export default Balanza;