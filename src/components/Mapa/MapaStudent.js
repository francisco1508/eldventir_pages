import React, { Component } from 'react'
import './css/Mapa.css'
import IconoTerminar from './images/ico-terminar.svg'
import IconoDescargar from './images/ico-descarga.svg'
import EditableLabel from 'react-editable-label';
import IconoSecundario from './images/ico-secundaria.svg'
import IconoTercero from './images/ico-tercer.svg'
import Center from 'react-center';
import domtoimage from 'dom-to-image-more'
import axios from 'axios'
import LineTo, { SteppedLineTo } from 'react-lineto';

class MapaStudent extends Component{
    constructor(props){
        super(props);
    this.state = {
        principal_idea:'Idea',
        description: 'Aquí van las instrucciones, por eso coloco un ejemplo.',
        is_finish: false,
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
                classContainer: "containerThirdIdeaHor thirdIdeaFirst"
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
                classContainer: "containerThirdIdeaRig thirdIdeaTwo"
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
                classContainer: "containerThirdIdeaVer thirdIdeaThird"
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
                classContainer: "containerThirdIdeaLef thirdIdeaFour"
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
                classContainer: "containerThirdIdeaHor thirdIdeaFifth"
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
                classContainer: "containerThirdIdeaRig thirdIdeaSix"
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
                classContainer: "containerThirdIdeaVer thirdIdeaSeven"
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
                classContainer: "containerThirdIdeaLef thirdIdeaEight"
            },
        ],
        level:[
        ],
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
                    stop += 1;
                }
                return si;
            });
        this.setState({hidden: copyState}); 
    }

    addThirdIdea = (ev, data, clas, st) =>{
        ev.preventDefault();
        this.activeContainer(data);
        var flag = 0;
        var ind = this.state.level.length + 1;
        var newIdea = {
            idea: data, 
            nameCI: ind.toString(),
            classTo: clas,
            styleLineTo:st};
        this.state.level.map((l)=>{
            if(l.idea === data){
                flag +=1;
            }
            return l;
        });
        if(flag < 3){
        this.setState({level: [...this.state.level, newIdea]});}
        else{
            alert("Error");
        }
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

    onDragOver = (ev) =>{
        ev.preventDefault();
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
            this.state.hidden.map((hid)=>{
                if(hid.styl.display === 'inline'){
                    result.push(
                        <div 
                            className={hid.nameClass}
                            style={hid.styl}
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDoubleClick={(e)=>{this.addThirdIdea(e, hid.noIdea, hid.nameClass, hid.styleLineTo)}}
                            onDrop={(e)=>{this.addThirdIdea(e, hid.noIdea, hid.nameClass, hid.styleLineTo)}}>
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
        }
        return result;
    }

    onDragStart = (ev) =>{
    };

    onFinish = (ev) =>{
        ev.preventDefault();
        this.setState({is_finish: true});
    };

    onDownload = (ev) =>{
        ev.preventDefault();
        domtoimage.toJpeg(document.body, 
            { quality: 0.95 , bgcolor: 'white'})
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'mindmap.jpeg';
            link.href = dataUrl;
            link.click();
        });

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

        this.state.hidden.forEach((t)=>{
            if(t.styl_container.display === 'inline'){

            if(t.noIdea === 'ideaOne' || t.noIdea === 'ideaFive'){

                containers[t.noIdea].push(
                    <div 
                    className={ t.classContainer }
                    >
                        <Center>{ ideas[t.noIdea] }</Center>
                    </div>
                );
            } else {
                containers[t.noIdea].push(
                    <div 
                    className={ t.classContainer }
                    >
                        { ideas[t.noIdea] }
                    </div>
                );
            }
           
        }
            //containerHidden[t.noIdea] = t.styl_container;
        });  

        this.state.level.forEach((t, index)=>{
            var st = t.styleLineTo;
            ideas[t.idea].push(
                <div 
                className="thirdIdea">
                    <div className={ t.nameCI } >
                    
                    <Center>
                    <div className="PruebaTexto">
                        <EditableLabel 
                        initialValue={'Idea Tercera'}
                        />
                        </div>
                    </Center>
                    
                    </div>
                    <SteppedLineTo
                    
                        from={ t.nameCI } to= { t.classTo }
                        borderStyle="dashed"
                        { ...st }
                        />
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
                                draggable="true"
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

export default MapaStudent;