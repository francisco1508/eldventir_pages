import React, { Component } from 'react'
import './css/Mapa.css'
import IconoTerminar from './images/ico-terminar.svg'
import IconoDescargar from './images/ico-descarga.svg'
import EditableLabel from 'react-editable-label'
import IconoSecundario from './images/ico-secundaria.svg'
import IconoTercero from './images/ico-tercer.svg'
import Center from 'react-center'
import axios from 'axios'
import LineTo, { SteppedLineTo } from 'react-lineto';
import domtoimage from 'dom-to-image-more'
import IconoBorrar from './images/borrar.svg'

class MapaPrueba extends Component{
    constructor(props){
        super(props);
    this.state = {
        principal_idea:'Idea',
        description: '',
        is_finish: false,
        is_delete: false,
        hidden : [
            {
                styl: {display:'none'},
                styl_container: {display:'none'},
                nameClass: "secondaryIdea secondaryIdeaFirst",
                noIdea: 'ideaOne',
                styleLineTo:{
                    delay: true,
                    borderColor:"#f06522",
                    borderStyle: "dashed",
                    fromAnchor: "bottom",
                    orientation: "v",
                    zIndex: 1
                },
                classContainer: "containerThirdIdeaHor thirdIdeaFirst",
                ideaTres: 0,
            },
            {
                styl: {display:'none'},
                styl_container: {display:'none'},
                nameClass: "secondaryIdea secondaryIdeaSecond",
                noIdea: 'ideaTwo',
                styleLineTo:{
                    delay: true,
                    borderColor:"#f06522",
                    borderStyle: "dashed",
                    fromAnchor: "bottom",
                    orientation: "v"
                },
                classContainer: "containerThirdIdeaRig thirdIdeaTwo",
                ideaTres: 0,
            },
            {
                styl: {display:'none'},
                styl_container: {display:'none'},
                nameClass: "secondaryIdea secondaryIdeaThird" ,
                noIdea: 'ideaThree',
                styleLineTo:{
                    delay: true,
                    borderColor:"#f06522",
                    borderStyle: "dashed",
                    fromAnchor: "left",
                    orientation: "h"
                },
                classContainer: "containerThirdIdeaVer thirdIdeaThird",
                ideaTres: 0,
            },
            {
                styl: {display:'none'},
                styl_container: {display:'none'},
                nameClass: "secondaryIdea secondaryIdeaFourth" ,
                noIdea: 'ideaFour',
                styleLineTo:{
                    delay: true,
                    borderColor:"#f06522",
                    borderStyle: "dashed",
                    fromAnchor: "left",
                    toAnchor: "right",
                    orientation: "h"
                },
                classContainer: "containerThirdIdeaLef thirdIdeaFour",
                ideaTres: 0,
            },
            {
                styl: {display:'none'},
                styl_container: {display:'none'},
                nameClass: "secondaryIdea secondaryIdeaFifth" ,
                noIdea: 'ideaFive',
                styleLineTo:{
                    delay: true,
                    borderColor:"#f06522",
                    borderStyle: "dashed",
                    fromAnchor: "top",
                    orientation: "v"
                },
                classContainer: "containerThirdIdeaHor thirdIdeaFifth",
                ideaTres: 0,
            },
            {
                styl: {display:'none'},
                styl_container: {display:'none'},
                nameClass: "secondaryIdea secondaryIdeaSix" ,
                noIdea: 'ideaSix',
                styleLineTo:{
                    delay: true,
                    borderColor:"#f06522",
                    borderStyle: "dashed",
                    fromAnchor: "right",
                    orientation: "h"
                },
                classContainer: "containerThirdIdeaRig thirdIdeaSix",
                ideaTres: 0,
            },
            {
                styl: {display:'none'},
                styl_container: {display:'none'},
                nameClass: "secondaryIdea secondaryIdeaSeven" ,
                noIdea: 'ideaSeven',
                styleLineTo:{
                    delay: true,
                    borderColor:"#f06522",
                    borderStyle: "dashed",
                    fromAnchor: "right",
                    toAnchor: "left",
                    orientation: "v"
                },
                classContainer: "containerThirdIdeaVer thirdIdeaSeven",
                ideaTres: 0,
            },
            {
                styl: {display:'none'},
                styl_container: {display:'none'},
                nameClass: "secondaryIdea secondaryIdeaEight",
                noIdea: 'ideaEight',
                styleLineTo:{
                    delay: true,
                    borderColor:"#f06522",
                    borderStyle: "dashed",
                    fromAnchor: "bottom",
                    orientation: "v"
                },
                classContainer: "containerThirdIdeaLef thirdIdeaEight",
                ideaTres: 0,
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
                this.setState({hidden: copyState,level: [...this.state.level, newIdea]});
                
                si.ideaTres+=1;
                stop+=1;
            }
            return si;
        });
    }

    deleteButton = (ev) =>{
        ev.preventDefault();
        this.setState({is_delete: !this.state.is_delete});
    }

    disDeleteButton = (ev)=>{
        ev.preventDefault();
        this.setState({is_delete: false});
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
            initialValue={'Idea'}
            save={value=>{
                    this.setState({principal_idea:value})
                }}
            />
        } else {
            divlab = <label>{this.state.principal_idea}</label>      
        }
        return <div className="labelPrincipalIdea fontMB">{divlab}</div>
    }

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

    onDragStart = (ev, data, ideaA) =>{
        ev.dataTransfer.setData("id", data);
        ev.dataTransfer.setData("ideaA", ideaA);
    };

    onDragOver = (ev) =>{
        ev.preventDefault();
    };

    onDrop = (ev, cat) =>{
        var copyLevel = this.state.level;
        var resultado = this.verifySpace(cat);
        if (!this.state.is_finish && resultado){
            let id = ev.dataTransfer.getData("id");
            let idA = ev.dataTransfer.getData("ideaA");
            let levels = copyLevel.filter((ti)=>{
                if (ti.inde === id){
                    ti.idea=cat;
                }
                return ti;
            });
            
            this.setState({
                ...this.state,
                levels
            });
        
        this.funcionBorrarEspacio(idA);
            
        }
    };

    secondaryIdeaDisplay(){

        var result = [];

        const style = {
            delay: true,
            borderColor:"#f06522",
            borderStyle: "dashed",
            borderWidth: "2px"
        };

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
                            <LineTo
                            from={ hid.nameClass }
                            to="principalIdea"
                            {...style}
                            />
                        </div> 
                    );
                }
            })
        } else{
            var deleteButtonDisplay = {
                display: this.state.is_delete?"inline":"none"
            }
            this.state.hidden.map((hid)=>{
                if(hid.styl.display === 'inline'){
                    result.push(
                        <div 
                            className={hid.nameClass}
                            style={hid.styl}
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, hid.noIdea)}}
                            onDoubleClick={(e)=>{this.deleteButton(e)}}
                            >
                            <img 
                            src={IconoBorrar} 
                            className="imagenDeBorrado" 
                            onClick={(e)=>{this.deleteSecondIdea(e, hid.noIdea)}}
                            style={ deleteButtonDisplay }
                            alt="" />
                            <div 
                                className="textSecondary"
                                onClick={(e)=>{this.deleteButton(e)}}
                            >
                            
                                <EditableLabel 
                                initialValue={'Idea Secundaria'}
                                save={value=>{
                                    
                                }}
                                /> 
                            </div>
                        </div> 
                    );
                }
            })
        }
        return result;
    }

    onFinish = (ev) =>{
        ev.preventDefault();
        this.setState({is_finish: true});
    };

    onDownload = (ev) =>{
        ev.preventDefault();
        domtoimage.toPng(document.getElementById('mapStudent'), 
            { quality: 0.95 , bgcolor: 'white'})
        .then(function (dataUrl) {
            var link = document.createElement('a');
            
            link.download = 'mindmap.png';
            link.href = dataUrl;
            alert(link.href);
            //link.click();
        });

    }

    funcionPruebas = (ejemplo, n) =>{

        if (!this.state.is_finish){
            let levels = this.state.level.filter((ti)=>{
                if (ti.inde === n){
                    ti.nameTI=ejemplo;
                }
                return ti;
            });
            this.setState({
                ...this.state,
                levels
            });
        }
    }

    deleteSecondIdea = (ev, idea) =>{
        ev.preventDefault();
        let copyState = this.state.hidden;
        copyState.map((si)=>{
            if (si.noIdea === idea){
                    si.styl = {display: 'none'};
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
            this.setState({
                level: copyLevels
            });
        }
        this.funcionBorrarEspacio(idA); 
    }

    render(){

        var deleteButtonDisplay = {
            display: this.state.is_delete?"inline":"none"
        }
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

        this.state.level.forEach((t, index)=>{
            ideas[t.idea].push(
                <div 
                className="thirdIdea"
                draggable="true"
                onDragStart={(e)=>this.onDragStart(e, t.inde, t.idea)}
                //onClick={(e)=>this.disDeleteButton(e)}
                onDoubleClick={(e)=>{this.deleteButton(e)}}
                >
                    <div className={ t.nameCI } >
                        <img 
                            src={IconoBorrar} 
                            className="imagenDeBorrado" 
                            onClick={ (e)=>this.deleteIdeaThird(e,t.inde, t.idea)}
                            style={ deleteButtonDisplay }
                            alt="" />

                        <Center>
                            <div className="PruebaTexto"
                            >
                                <EditableLabel 
                                initialValue={t.nameTI || 'Idea Tercera'}
                                save={value => {
                                //console.log(`Saving '${value}'`);
                                this.funcionPruebas(value, t.inde);
                                
                                }}
                                inputClass=""
                                />
                            </div>
                        </Center>
                    </div>
                </div>
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
                                //draggable="true"
                                onClick={(e)=>{this.addThirdIdea(e)}}
                                onDragStart={(e)=>this.onDragStart(e)}
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

export default MapaPrueba;