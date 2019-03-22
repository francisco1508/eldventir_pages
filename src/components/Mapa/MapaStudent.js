import React, { Component } from 'react'
import './css/Mapa.css'
import IconoTerminar from './images/ico-terminar.svg'
import IconoDescargar from './images/ico-descarga.svg'
import EditableLabel from 'react-editable-label'
import IconoSecundario from './images/ico-secundaria.svg'
import IconoTercero from './images/ico-tercer.svg'
import Center from 'react-center'
import axios from 'axios'
import domtoimage from 'dom-to-image'
import IconoBorrar from './images/borrar.svg'

class MapaStudent extends Component{
    constructor(props){
        super(props);
        this.state = {
            principal_idea:'Idea',
            description: '',
            is_finish: false,
            hidden : [
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaFirst",
                    noIdea: 'ideaOne',
                    classContainer: "containerThirdIdeaHor thirdIdeaFirst",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"ispri"
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaSecond",
                    noIdea: 'ideaTwo',
                    classContainer: "containerThirdIdeaRig thirdIdeaTwo",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"isdoi"
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaThird" ,
                    noIdea: 'ideaThree',
                    classContainer: "containerThirdIdeaVer thirdIdeaThird",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"istri"
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaFourth" ,
                    noIdea: 'ideaFour',
                    classContainer: "containerThirdIdeaLef thirdIdeaFour",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"iscui"
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaFifth" ,
                    noIdea: 'ideaFive',
                    classContainer: "containerThirdIdeaHor thirdIdeaFifth",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"iscii"
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaSix" ,
                    noIdea: 'ideaSix',
                    classContainer: "containerThirdIdeaRig thirdIdeaSix",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"issei"
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaSeven" ,
                    noIdea: 'ideaSeven',
                    classContainer: "containerThirdIdeaVer thirdIdeaSeven",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"issii"
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaEight",
                    noIdea: 'ideaEight',
                    classContainer: "containerThirdIdeaLef thirdIdeaEight",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"isoci"
                },
            ],
            level:[],
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/v1/mentals/`)
        .then(res=>{       
            this.setState({
                description: res.data.data.description,
                principal_idea: res.data.data.principal
            });
        })
        .catch(error => {
            console.log('No funciona', error);
        });
        
    }

    addClick(){
        let copyState = this.state.hidden;
        let stop = 0;
        copyState.map((si)=>{
            if (si.styl.display === 'none' && stop === 0){
                    si.styl = {display: 'inline'};
                    this.activeContainer(si.noIdea);
                    stop += 1;
                }
                return si;
            });
        this.setState({hidden: copyState}); 
    }

    addThirdIdea = (ev) =>{
        ev.preventDefault();
        let copyState = this.state.hidden;
        var ind = this.state.level.length + 1;
        var newIdea = {}
        let stop = 0;
        copyState.map((si)=>{
            if (si.styl.display === 'inline' && si.ideaTres < 3 && stop === 0){
                newIdea.idea = si.noIdea;
                newIdea.inde = si.noIdea + '-' +ind.toString();
                newIdea.nameTI = 'Idea Tercera';
                newIdea.style_delete = {display:'none'}
                this.setState({
                    hidden: copyState,
                    level: [...this.state.level, newIdea]
                });
                si.ideaTres+=1;
                stop+=1;
            }
            return si;
        });
    }

    activeContainer = (data) =>{
        let copyState = this.state.hidden;
        copyState.map((si)=>{
            if (si.noIdea === data){
                    si.styl_container = {display: 'inline'};
                }
                return si;
            });
        this.setState({hidden: copyState});
    }

    IdeaPrincipal(){
        var divlab;
        if(this.state.principal_idea === 'Idea'){
            divlab = <EditableLabel 
            initialValue={'Idea Principal'}
            save={value=>{
                    this.setState({principal_idea:value})
                }}
                inputClass="testInputPrincipalIdea"
                labelClass="testLabelPrincipalIdea"
            />
        } else {
            divlab = <label>{this.state.principal_idea}</label>      
        }
        return <div className="testLabelPrincipalIdea">{divlab}</div>
    }

    secondaryIdeaDisplay(){

        var result = [];

        if(this.state.is_finish){
            this.state.hidden.map((hid)=>{
                if(hid.styl.display === 'inline'){
                    result.push(
                        <div 
                            className={hid.nameClass}
                            style={hid.styl}
                         >
                            <div className="textSecondary">
                                <EditableLabel 
                                initialValue={'Idea Secundaria'}
                                /> 
                            </div>
                            <hr className={hid.class_connection}></hr>
                        </div> 
                    );
                }
            })
        } else{
            this.state.hidden.map((hid)=>{
                if(hid.styl.display === 'inline'){
                    result.push(
                        <div 
                            className={hid.nameClass}
                            style={hid.styl}
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, hid.noIdea)}}
                            >
                            <img 
                            src={IconoBorrar} 
                            className="imagenDeBorrado" 
                            onClick={(e)=>{this.deleteSecondIdea(e, hid.noIdea)}}                            
                            style={ hid.style_delete }
                            alt="" />
                            <div 
                                className="textSecondary"
                                onClick={(e)=>{this.deleteButtonSecond(e, hid.noIdea)}}
                            >
                                <EditableLabel 
                                initialValue={'Idea Secundaria'}
                                save={value=>{
                                    this.disDeleteButtonSecond(hid.noIdea)
                                }}
                                labelClass="testLabelSecondIdea"
                                inputClass="testInputSecondIdea"
                                /> 
                            </div>
                            <hr className={hid.class_connection}></hr>
                        </div> 
                    );
                }
            })
        }
        return result;
    }

    onDragStart = (ev, data, ideaA,ideaName) =>{
        ev.dataTransfer.setData("id", data);
        ev.dataTransfer.setData("ideaA", ideaA);
        ev.dataTransfer.setData("ideaName", ideaName);
    };

    onDragOver = (ev) =>{
        ev.preventDefault();
    };

    onDrop = (ev, cat) =>{
        var resultado = this.verifySpace(cat);
        var moveIdea = {};
        if (!this.state.is_finish && resultado){
            let id = ev.dataTransfer.getData("id");
            let idA = ev.dataTransfer.getData("ideaA");
            let ideaName = ev.dataTransfer.getData("ideaName");
            let levels= this.state.level.filter((ti)=>{
                if (ti.inde === id){
                    moveIdea.inde=id;
                    moveIdea.idea=cat;
                    moveIdea.nameTI=ideaName;
                    moveIdea.style_delete = {display:'none'}
                } 
                return ti.inde !== id;
            });
            levels.push(moveIdea);
            this.setState({
                level: levels
            });
            moveIdea={}
        this.funcionBorrarEspacio(idA);
        }
    };

    funcionBorrarEspacio = (idea) =>{
        let copyState = this.state.hidden;
        copyState.map((si)=>{
            if (si.noIdea === idea){
                si.ideaTres-=1;  
                }
                return si;
            });
        this.setState({hidden: copyState});
    }

    verifySpace = (idea) =>{
        let copyState = this.state.hidden;
        var respuesta = false;
        copyState.map((si)=>{
            if (si.noIdea === idea && si.ideaTres < 3){
                    si.ideaTres+=1;
                    respuesta = true;
                }
                return si;
            });
        this.setState({hidden: copyState});
        return respuesta;
    }

    funcionPruebas = (ejemplo, n) =>{
        if (!this.state.is_finish){
            let levels = this.state.level.filter((ti)=>{
                if (ti.inde === n){
                    ti.nameTI=ejemplo;
                    ti.style_delete={display:'none'};
                }
                return ti;
            });
            setTimeout(()=>this.setState({level: levels}), 100);
        }
    }

    deleteSecondIdea = (ev, idea) =>{
        ev.preventDefault();
        let copyState = this.state.hidden;
        copyState.map((si)=>{
            if (si.noIdea === idea){
                    si.styl = {display: 'none'};
                    si.style_delete = {visibility: 'hidden'};
                }
                return si;
            });
        
        let copyLevels = this.state.level.filter((ti)=>{
            if(ti.idea !== idea){
                return ti;
            } else {
                this.funcionBorrarEspacio(idea);
            }
        });
        this.setState({
            hidden: copyState,
            level: copyLevels
        });
    }

    deleteIdeaThird = (ev, idea, idA) =>{
        ev.preventDefault();
        if (!this.state.is_finish){
            let copyLevels = this.state.level.filter((ti)=>{
                return ti.inde !== idea;
            });
            setTimeout(()=>this.setState({
                level: copyLevels
            }), 101);

        }
        this.funcionBorrarEspacio(idA); 
    }

    deleteButtonSecond = (ev, idea) =>{
        ev.preventDefault();
        let copyState = this.state.hidden;
        copyState.map((si)=>{
            if (si.noIdea === idea){
                if(si.style_delete.visibility==='hidden'){
                    si.style_delete={visibility:'visible'};
                }  
            }
            return si;
        });
        this.setState({hidden: copyState});
    }

    disDeleteButtonSecond = (idea) =>{
        let copyState = this.state.hidden;
        copyState.map((si)=>{
            if (si.noIdea === idea){
                if(si.style_delete.visibility==='visible'){
                    si.style_delete={visibility:'hidden'};
                } 
            }
            return si;
        });
        setTimeout(()=>this.setState({hidden: copyState}), 100);        
    }

    deleteButtonThird = (ev, idea) =>{
        ev.preventDefault();
        let copyState = this.state.level;
        copyState.map((si)=>{
            if (si.inde === idea){
                if(si.style_delete.display==='none'){
                    si.style_delete={display:'inline'};
                } else{
                    si.style_delete={display:'none'};
                }     
            }
            return si;
        });
        this.setState({level: copyState}); 
    }

    disDeleteButtonThird = (idea) =>{
        let copyState = this.state.level;
        copyState.map((si)=>{
            if (si.inde === idea){
                if(si.style_delete.display==='inline'){
                    si.style_delete={display:'none'};
                } else{
                    si.style_delete={display:'none'};
                }
            }
            return si;
        });
        setTimeout(()=>this.setState({level: copyState}), 2000);    
    }

    onFinish = (ev) =>{
        ev.preventDefault();
        this.setState({is_finish: true});
    };

    onDownload = (ev) =>{
        ev.preventDefault();
        domtoimage.toPng(document.getElementById('mapStudent'), 
            { bgcolor: 'black', useCORS: true})
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'mindmap.png';
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            alert('oops, something went wrong!', error);
        });
        /*html2canvas(document.getElementById('mapStudent'),{})
        .then(function (canvas) {
            //var link = document.createElement('a');
            //link.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            var link = canvas;
            document.body.appendChild(canvas);
        });*/

    }

    imprimirNombre = (data) =>{
        if(data){
            data='Hola';
        }else{
            
            data='Idea Tercera'
        }
        return data;
    }

    render(){
        var finishHidden = {};
        var downloadHidden = {};

        var ideas = {
            ideaOne:[],
            ideaTwo:[],
            ideaThree:[],
            ideaFour:[],
            ideaFive:[],
            ideaSix:[],
            ideaSeven:[],
            ideaEight:[],
        }

        var containers = {
            ideaOne:[],
            ideaTwo:[],
            ideaThree:[],
            ideaFour:[],
            ideaFive:[],
            ideaSix:[],
            ideaSeven:[],
            ideaEight:[],
        }

        var classes_connections = {
            ideaOne:["ituno","itdos","ittres"],
            ideaTwo:["itcuatro", "itcinco", "itseis"],
            ideaThree:["itsiete", "itocho", "itnueve"],
            ideaFour:["itdiez","itonce","itdoce"],
            ideaFive:["ittrece","itcator","itquinc"],
            ideaSix:["itdiec", "itdieci", "itdieco"],
            ideaSeven:["itdiece", "itveint", "itveino"],
            ideaEight:["itveind", "itveinr", "itveinc"],
        }

        var connections = {
            ideaOne:[],
            ideaTwo:[],
            ideaThree:[],
            ideaFour:[],
            ideaFive:[],
            ideaSix:[],
            ideaSeven:[],
            ideaEight:[],
        }

        this.state.hidden.forEach((t)=>{
            if(t.styl_container.display === 'inline'){
                containers[t.noIdea].push(
                <div 
                    className={ t.classContainer }
                    onDrop={(e)=>{this.onDrop(e, t.noIdea)}}
                    onDragOver={(e)=>this.onDragOver(e)}
                >
                    { ideas[t.noIdea] }
                </div>
                );           
            }
        });  

        this.state.level.forEach((t)=>{
            ideas[t.idea].push(
                <div 
                className="thirdIdea"
                draggable="true"
                onDragStart={(e)=>this.onDragStart(e, t.inde, t.idea, t.nameTI)}
                >
                    <div className={ t.nameCI } >
                        <img 
                            src={IconoBorrar} 
                            className="imagenDeBorrado" 
                            onClick={ (e)=>this.deleteIdeaThird(e,t.inde, t.idea)}
                            style={ t.style_delete }
                            alt="" />
                            <div 
                            className="PruebaTexto"
                            onClick={(e)=>{this.deleteButtonThird(e, t.inde)}}
                            >
                                <EditableLabel 
                                initialValue={t.nameTI||'Idea Tercera'}
                                save={value => {
                                this.funcionPruebas(value, t.inde);                              
                                }}
                                inputClass="testInputThirdIdea"
                                labelClass="testLabelThirdIdea"
                                />
                                
                            </div>
                        
                    </div>
                </div>
            );
        });  

        ideas.ideaOne.forEach((t, index)=>{
            connections.ideaOne.push(
                <hr className={classes_connections.ideaOne[index]}></hr>
            );
        });

        ideas.ideaTwo.forEach((t, index)=>{
            connections.ideaTwo.push(
                <hr className={classes_connections.ideaTwo[index]}></hr>
            );
        });

        ideas.ideaThree.forEach((t, index)=>{
            connections.ideaThree.push(
                <hr className={classes_connections.ideaThree[index]}></hr>
            );
        });

        ideas.ideaFour.forEach((t, index)=>{
            connections.ideaFour.push(
                <hr className={classes_connections.ideaFour[index]}></hr>
            );
        });

        ideas.ideaFive.forEach((t, index)=>{
            connections.ideaFive.push(
                <hr className={classes_connections.ideaFive[index]}></hr>
            );
        });

        ideas.ideaSix.forEach((t, index)=>{
            connections.ideaSix.push(
                <hr className={classes_connections.ideaSix[index]}></hr>
            );
        });

        ideas.ideaSeven.forEach((t, index)=>{
            connections.ideaSeven.push(
                <hr className={classes_connections.ideaSeven[index]}></hr>
            );
        });

        ideas.ideaEight.forEach((t, index)=>{
            connections.ideaEight.push(
                <hr className={classes_connections.ideaEight[index]}></hr>
            );
        });

        if(this.state.is_finish){
            finishHidden.display = 'none';
            downloadHidden.display = 'inline';
        } else {
            finishHidden.display = 'inline';
            downloadHidden.display = 'none';
        }



        return (
            <div id="mapStudent" className="mapStudent">
                <div className="mapStudentBand">
                    <div className="mapStudentText">
                        <div className="mapStudentTextIns fontTB">
                            INSTRUCCIONES:
                        </div>
                        <div className="mapStudentInstructions fontMB">
                            {this.state.description}
                        </div>
                    </div>
                </div>
                <div id="mapStudentContainer" className="mapStudentContainer">
                    <div 
                        className={ this.state.is_finish? "mapLeftSideFinished": "mapLeftSide" }
                    >
                        <div className="principalIdea">
                            <div className="textPrincipal">
                                { this.IdeaPrincipal() }
                            </div>
                        </div>
                        
                        { this.secondaryIdeaDisplay() }
                    
                        { containers.ideaOne }
                        { containers.ideaTwo }
                        { containers.ideaThree }
                        { containers.ideaFour }
                        { containers.ideaFive }
                        { containers.ideaSix }
                        { containers.ideaSeven }
                        { containers.ideaEight }

                        { connections.ideaOne }
                        { connections.ideaTwo }
                        { connections.ideaThree }
                        { connections.ideaFour }
                        { connections.ideaFive }
                        { connections.ideaSix }
                        { connections.ideaSeven }
                        { connections.ideaEight }

                    </div>
                    <div className="mapRightSide">
                    
                        <div className="mapStudentConceptsDisplay" style={finishHidden}>
                            <button 
                                className="buttonStudentChoice"
                                type="submit"
                                onClick={this.addClick.bind(this)} 
                                >
                                <Center>
                                <div className="buttonImagenSecundario"><img src={IconoSecundario} alt="" /></div>
                                <div className="buttonStudentAlineacionTexto">Agregar idea secundaria</div>
                                </Center>
                            </button>
                        </div>
                        <div className="mapStudentConceptsDisplayT" style={finishHidden}>
                            <button 
                                className="buttonStudentChoice"
                                type="submit"
                                onClick={(e)=>{this.addThirdIdea(e)}}
                                >
                                <Center>
                                <div className="buttonImagenSecundario"><img src={IconoTercero} alt="" /></div>
                                <div className="buttonStudentAlineacionTexto">Agregar idea tercera</div>
                                </Center>
                            </button>
                        </div>
                        
                        <div className="balanzaMapButton">
                            <button 
                                type="submit" 
                                className="buttonStudentTerminar"
                                style={finishHidden}
                                onClick={(e)=>{this.onFinish(e)}}
                                >
                                <div className="buttonStudentAlineacionImagen"><img src={IconoTerminar} alt="" /></div>
                                <div className="buttonStudentAlineacionTexto">Terminar</div>
                            </button>

                            <button 
                                type="submit" 
                                className="buttonStudentDescargar"
                                onClick={(e)=>{this.onDownload(e)}}
                                style={downloadHidden}
                                >
                                <div className="buttonStudentAlineacionImagenDescargar"><img src={IconoDescargar} alt="" /></div>
                                <div className="buttonStudentAlineacionTextoDescargar">Descargar ejercicio</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapaStudent;