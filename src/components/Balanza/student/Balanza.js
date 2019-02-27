import React, { Component } from 'react';
import '../css/Balanza.css';
import BaseBalanza from '../images/Base.svg';
import BalanzaBlanza from '../images/Balanza.svg';
import API from '../../Global/api';
import IconoTerminar from '../images/ico-terminar.png'
import domtoimage from 'dom-to-image'


class Balanza extends Component {
    /*state = {
        values: [
            {name: '', category:'choice'},
            
        ]
    }*/

    state = {
        description: "Coloca en cada lado de la balanza el valor positivo y negativo en cada lado",
        right_side: "Positivo",
        left_side: "Negativo",
        values: [
            {name: 'Positivo 1', category:'choice'},
            {name: 'Positivo 2', category:'choice'},
            {name: 'Positivo 3', category:'choice'},
            {name: 'Positivo 4', category:'choice'},
            {name: 'Positivo 5', category:'choice'},
            {name: 'Negativo 1', category:'choice'},
            {name: 'Negativo 2', category:'choice'},
            {name: 'Negativo 3', category:'choice'},
            {name: 'Negativo 4', category:'choice'},
        ],
        is_finish: false,
    }

    /*componentDidMount() {
        API.get(`tasks/`)
            .then(res=>{
                const task_data = {
                    description: res.data.data.description,
                    right_side: res.data.data.right_side,
                    left_side: res.data.data.left_side,
                    values: JSON.parse(res.data.data.values),
                    is_finish: false
                };
                
                this.setState(task_data);
            })
            .catch(error => {
                console.log('Error', error);
            });
    }*/

    onDragStart = (ev, id) =>{
        ev.dataTransfer.setData("id", id);
    };
    onDragOver = (ev) =>{
        ev.preventDefault();
    };
    onDrop = (ev, cat) =>{
        if (!this.state.is_finish){
            let id = ev.dataTransfer.getData("id");
            let tasks = this.state.values.filter((task)=>{
                if (task.name === id){
                    task.category=cat;
                }
                return task;
            });
            this.setState({
                ...this.state,
                tasks
            });
        }
    };
    onFinish = (ev) =>{
        ev.preventDefault();

        let choiceValue = 0;
        this.state.values.filter((task)=>{
            if (task.category === 'choice'){
                    choiceValue += 1;
                }
                return task;
            });
            
        if(choiceValue === 0){
            this.setState({is_finish: true});
        }
    };
    onDownload = (ev) =>{
        ev.preventDefault();
        domtoimage.toJpeg(document.getElementById('balanzaStudent'), 
            { quality: 0.95 , bgcolor: 'white'})
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
    };
    render(){
        var finishHidden = {};
        var downloadHidden = {};
                
        var tasks = {
            leftSide:[],
            rightSide:[],
            choice:[],
        };
        
        this.state.values.forEach((t)=>{
            tasks[t.category].push(
                <div key={t.name}
                    onDragStart={(e)=>this.onDragStart(e, t.name)}
                    className="balanzaStudentConcept fontMB"
                    draggable="true"
                >
                    <div className="balanzaStudentConceptText">{t.name}</div>
                 </div>
            );
        });
        
        let itemsSelected = tasks.leftSide.length + tasks.rightSide.length;
        let balanzaInclinacion = 'balanzaStudentBalanzaItems';
        let leftSideContainer = 'balanzaStudentLeftSide';
        let rightSideContainer = 'balanzaStudentRightSide';
        let balanzaStudentElementsSize;
        let balanzaStudentConceptsDisplay;
        let balanzaStudentBalanzaPosition;
        

       if(tasks.leftSide.length > tasks.rightSide.length){
            let valueLeftSide = tasks.leftSide.length / itemsSelected;
            if(valueLeftSide>(3/6) && valueLeftSide <= (4/6)){
                balanzaInclinacion = 'balanzaStudentBalanzaLeftOne';
                leftSideContainer = 'balanzaStudentLeftSideOneDown';
                rightSideContainer = 'balanzaStudentRightSideOneUp';
            }else if(valueLeftSide>(4/6) && valueLeftSide <= (5/6)){
                balanzaInclinacion = 'balanzaStudentBalanzaLeftTwo';
                leftSideContainer = 'balanzaStudentLeftSideTwoDown';
                rightSideContainer = 'balanzaStudentRightSideTwoUp';
            }else{
                balanzaInclinacion = 'balanzaStudentBalanzaLeftThree';
                leftSideContainer = 'balanzaStudentLeftSideThreeDown';
                rightSideContainer = 'balanzaStudentRightSideThreeUp';
           }
       
       } else if(tasks.leftSide.length < tasks.rightSide.length){
            let valueRightSide = tasks.rightSide.length / itemsSelected;
            if(valueRightSide>(3/6) && valueRightSide <= (4/6)){
                balanzaInclinacion = 'balanzaStudentBalanzaRightOne';
                leftSideContainer = 'balanzaStudentLeftSideOneUp';
                rightSideContainer = 'balanzaStudentRightSideOneDown';

            }else if(valueRightSide>(4/6) && valueRightSide <= (5/6)){
                balanzaInclinacion = 'balanzaStudentBalanzaRightTwo';
                leftSideContainer = 'balanzaStudentLeftSideTwoUp';
                rightSideContainer = 'balanzaStudentRightSideTwoDown';

            }else{
                balanzaInclinacion = 'balanzaStudentBalanzaRightThree';
                leftSideContainer = 'balanzaStudentLeftSideThreeUp';
                rightSideContainer = 'balanzaStudentRightSideThreeDown';
        }
       }
       
       if(this.state.is_finish){
            finishHidden.display = 'none';
            downloadHidden.display = 'inline';
            balanzaStudentElementsSize = 'balanzaStudentElementsSize';
            balanzaStudentConceptsDisplay = 'balanzaStudentConceptsDisplay';
            balanzaStudentBalanzaPosition = 'balanzaStudentBalanzaPos';
            

       } else {
            finishHidden.display = 'inline';
            downloadHidden.display = 'none';
            balanzaStudentElementsSize = 'balanzaStudentElements';
            balanzaStudentConceptsDisplay = 'balanzaStudentConcepts';
            balanzaStudentBalanzaPosition = 'balanzaStudentBalanza';
       }

        return(
            <div id="balanzaStudent" className="balanzaStudent">
                <div className="balanzaStudentBand">
                    <div className="balanzaStudentText">
                        <div className="balanzaStudentTextIns fontTB">
                            INSTRUCCIONES:
                        </div>
                        <div className="balanzaStudentInstructions fontMB">
                            {this.state.description}
                        </div>
                    </div>
                </div>
                <div id="balanzaStudentContainer" className="balanzaStudentContainer">
                    {/*Balanza*/}
                    <div id="balanzaStudentBalanza" className={balanzaStudentBalanzaPosition}>
                        <div className="balanzaStudentBalanzaUp">
                            <div
                                className={leftSideContainer}
                            >
                                <div
                                    className="balanzaStudentLeftSideContainer"
                                    onDragOver={(e)=>this.onDragOver(e)}
                                    onDrop={(e)=>{this.onDrop(e, "leftSide")}}
                                >
                                    {tasks.leftSide}
                                </div>
                            </div>
                            <div
                                className={rightSideContainer}
                            >
                                <div
                                    className="balanzaStudentRightSideContainer"
                                    onDragOver={(e)=>this.onDragOver(e)}
                                    onDrop={(e)=>{this.onDrop(e, "rightSide")}}>
                                    {tasks.rightSide}
                                </div>
                            </div>
                        </div>
                        <div className="balanzaStudentBalanzaDown">
                            <div className="balanzaStudentNegative">
                                <div className="negativeValueText fontTS">
                                    {this.state.left_side}
                                </div>
                            </div>
                            <img
                                className={balanzaInclinacion}
                                src={BalanzaBlanza}
                                alt=""/>
                            <img
                                className="balanzaStudentBase"
                                src={BaseBalanza}
                                alt=""/>
                            <div className="balanzaStudentPositive">
                                <div className="positiveValueText fontTS">
                                    {this.state.right_side}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Conceptos*/}
                    <div className={balanzaStudentElementsSize}>
                        <div className={balanzaStudentConceptsDisplay}>
                            <div className="balanzaStudentRepisa">
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[0]}</div>
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[1]}</div>
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[2]}</div>
                            </div>
                            <div className="balanzaStudentRepisa">
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[3]}</div>
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[4]}</div>
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[5]}</div>
                            </div>
                            <div className="balanzaStudentRepisa">
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[6]}</div>
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[7]}</div>
                            <div className="balanzaStudenRepisaPlace">{tasks.choice[8]}</div>
                            </div>
                        </div>
                        <div className="balanzaStudentButton">
                            <button 
                            type="submit" 
                            className="buttonTerminar"
                            onClick={(e)=>{this.onFinish(e)}}
                            style={finishHidden}
                            ><img src={IconoTerminar} alt="" />Terminar</button>
                            <button 
                            type="submit" 
                            className="buttonTerminar"
                            onClick={(e)=>{this.onDownload(e)}}
                            style={downloadHidden}
                            ><img src={IconoTerminar} alt="" />Descargar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Balanza;