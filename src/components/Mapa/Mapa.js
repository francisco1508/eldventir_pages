import React, { Component } from 'react';
import API from '../Global/api'

class Mapa extends Component {
    state = {
            
        };

    componentDidMount() {
        API.get(`tasks/`)
            .then(res=>{
                const task_data = {
                    id: res.data.data.id,
                    description: res.data.data.description,
                    right_side: res.data.data.right_side,
                    left_side: res.data.data.left_side,
                    values: JSON.parse(res.data.data.values),
                    status: res.data.data.status
                };
                
                this.setState(task_data);
                console.log(this.state);
            })
            .catch(error => {
                console.log('Error', error);
            });
    }

    render() {
        //const data = this.state.tasks;
        return (
            <div>
            <ul>
                {JSON.stringify(this.state.values)}
                {/*{this.state.values.map((task, i)  => <li key={i}>{task.name}</li>)}*/}
            </ul>
            </div>
        )
    }
}

export default Mapa;