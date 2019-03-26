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
            principal_idea_editable:false,
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
                    class_connection:"ispri",
                    editable:false,
                    name_si: 'Idea Secundaria'
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaSecond",
                    noIdea: 'ideaTwo',
                    classContainer: "containerThirdIdeaRig thirdIdeaTwo",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"isdoi",
                    editable:false,
                    name_si: 'Idea Secundaria'
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaThird" ,
                    noIdea: 'ideaThree',
                    classContainer: "containerThirdIdeaVer thirdIdeaThird",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"istri",
                    editable:false,
                    name_si: 'Idea Secundaria'
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaFourth" ,
                    noIdea: 'ideaFour',
                    classContainer: "containerThirdIdeaLef thirdIdeaFour",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"iscui",
                    editable:false,
                    name_si: 'Idea Secundaria'
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaFifth" ,
                    noIdea: 'ideaFive',
                    classContainer: "containerThirdIdeaHor thirdIdeaFifth",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"iscii",
                    editable:false,
                    name_si: 'Idea Secundaria'
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaSix" ,
                    noIdea: 'ideaSix',
                    classContainer: "containerThirdIdeaRig thirdIdeaSix",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"issei",
                    editable:false,
                    name_si: 'Idea Secundaria'
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaSeven" ,
                    noIdea: 'ideaSeven',
                    classContainer: "containerThirdIdeaVer thirdIdeaSeven",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"issii",
                    editable:false,
                    name_si: 'Idea Secundaria'
                },
                {
                    styl: {display:'none'},
                    styl_container: {display:'none'},
                    nameClass: "secondaryIdea secondaryIdeaEight",
                    noIdea: 'ideaEight',
                    classContainer: "containerThirdIdeaLef thirdIdeaEight",
                    ideaTres: 0,
                    style_delete:{visibility: 'hidden'},
                    class_connection:"isoci",
                    editable:false,
                    name_si: 'Idea Secundaria'
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

    addSecondIdea(){
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
                newIdea.editable = false;
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

    activeContainer = (ideaSecond) =>{
        let copyState = this.state.hidden;
        copyState.map((si)=>{
            if (si.noIdea === ideaSecond){
                    si.styl_container = {display: 'inline'};
                }
                return si;
            });
        this.setState({hidden: copyState});
    }

    editIdeaPrincipal(){
        var labelToShow;
        if(this.state.principal_idea === 'Idea'){
            labelToShow=<div>
                <label 
                className="testLabelPrincipalIdea" 
                onClick={ (e)=>{this.cambiarTextoPrincipalIdea(e)} }
                style={ this.state.principal_idea_editable?{display:'none'}:{display:'inline'} }
                >{ this.state.principal_idea }</label>
                <input 
                    type="text" 
                    className="testInputPrincipalIdea" 
                    placeholder={ this.state.principal_idea }
                    style={ this.state.principal_idea_editable?{display:'inline'}:{display:'none'} }
                    onChange={ (e)=>this.handleChangePrincipal(e) }
                    onBlur={(e)=>this.funcionTeclaEnterPrincipal()}
                    onKeyPress={ event=>{
                        if(event.key === 'Enter'){
                            this.funcionTeclaEnterPrincipal();
                        }
                    }}
                ></input>
            </div>



            /*labelToShow = <EditableLabel 
            initialValue={'Idea Principal'}
            save={value=>{
                    this.setState({principal_idea:value})
                }}
                inputClass="testInputPrincipalIdea"
                labelClass="testLabelPrincipalIdea"
            />*/
        } else {
            labelToShow = <label>{this.state.principal_idea}</label>      
        }
        return <div className="testLabelPrincipalIdea">{labelToShow}</div>
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
                            <label 
                                className="testLabelSecondIdea" 
                                style={ hid.editable?{visibility:'hidden'}:{visibility:'visible'} }
                                >{ hid.name_si }</label>
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
                            >
                                
                                <label 
                                className="testLabelSecondIdea" 
                                onClick={ (e)=>{this.cambiarTextoSecondIdea(e, hid.noIdea)} }
                                style={ hid.editable?{visibility:'hidden'}:{visibility:'visible'} }
                                >{ hid.name_si }</label>

                                <input 
                                    type="text" 
                                    className="testInputSecondIdea" 
                                    placeholder={ hid.name_si }
                                    style={ hid.editable?{visibility:'visible'}:{visibility:'hidden'} }
                                    onChange={ (e)=>this.handleChangeSecond(e, hid.noIdea) }
                                    onBlur={(e)=>this.funcionTeclaEnterSecond(hid.noIdea)}
                                    onKeyPress={ event=>{
                                        if(event.key === 'Enter'){
                                            this.funcionTeclaEnterSecond(hid.noIdea);
                                        }
                                    }}
                                ></input>


                            </div>
                            <hr className={hid.class_connection}></hr>
                        </div> 
                    );
                }
            })
        }
        return result;
    }

    onDragStart = (ev, dataIndex, dataIdeaSecondary,dataNameIdeaThird) =>{
        ev.dataTransfer.setData("dataIndex", dataIndex);
        ev.dataTransfer.setData("dataIdeaSecondary", dataIdeaSecondary);
        ev.dataTransfer.setData("ideaName", dataNameIdeaThird);
    };

    onDragOver = (ev) =>{
        ev.preventDefault();
    };

    onDrop = (ev, dataIdeaSecond) =>{
        var resultado = this.verifySpace(dataIdeaSecond);
        var moveIdea = {};
        if (!this.state.is_finish && resultado){
            let dataIndex = ev.dataTransfer.getData("dataIndex");
            let dataIdeaSecondary = ev.dataTransfer.getData("dataIdeaSecondary");
            let dataNameIdeaThird = ev.dataTransfer.getData("dataNameIdeaThird");
            let levels= this.state.level.filter((ti)=>{
                if (ti.inde === dataIndex){
                    moveIdea.inde=dataIndex;
                    moveIdea.idea=dataIdeaSecond;
                    moveIdea.nameTI=dataNameIdeaThird;
                    moveIdea.style_delete = {display:'none'}
                } 
                return ti.inde !== dataIndex;
            });
            levels.push(moveIdea);
            this.setState({
                level: levels
            });
            moveIdea={}
        this.funcionBorrarEspacio(dataIdeaSecondary);
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

    verifySpace = (ideaSecondary) =>{
        let copyState = this.state.hidden;
        var respuesta = false;
        copyState.map((si)=>{
            if (si.noIdea === ideaSecondary && si.ideaTres < 3){
                    si.ideaTres+=1;
                    respuesta = true;
                }
                return si;
            });
        this.setState({hidden: copyState});
        return respuesta;
    }

    changeNamePrincipalIdea = (dataNewName) =>{
        if (!this.state.is_finish){
            setTimeout(()=>this.setState({principal_idea: dataNewName}), 100);
        }
    }

    changeNameSecondIdea = (dataNewName, dataNumberIdea) =>{
        if (!this.state.is_finish){
            let hiddens = this.state.hidden.filter((obj)=>{
                if (obj.noIdea === dataNumberIdea){
                    obj.name_si=dataNewName;
                }
                return obj;
            });
            setTimeout(()=>this.setState({hidden: hiddens}), 100);
        }
    }

    changeNameThirdIdea = (dataNewName, dataIndex) =>{
        if (!this.state.is_finish){
            let levels = this.state.level.filter((ti)=>{
                if (ti.inde === dataIndex){
                    ti.nameTI=dataNewName;
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
                    si.editable=false;
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
                }   
            }
            return si;
        });
        this.setState({level: copyState}); 
    }

    disDeleteButtonThird = (ev,idea) =>{    
        let copyState = this.state.level;
        copyState.map((si)=>{
            if (si.inde === idea){
                if(si.style_delete.display==='inline'){
                    si.style_delete={display:'none'};
                    si.editable=false;
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
            { bgcolor: 'white', useCORS: true})
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

    cambiarTextoPrincipalIdea(ev){
        ev.preventDefault();
        if(this.functionVerifyOtherEditingSI() && this.functionVerifyOtherEditingTI()){
            if (!this.state.is_finish){
                var editablePI = true;
                setTimeout(()=>this.setState({
                    principal_idea_editable: editablePI
                }), 101);

            }
        }
    }

    cambiarTextoSecondIdea(ev, numberSecondIdea){
        ev.preventDefault();
        if(this.functionVerifyOtherEditingSI() && this.functionVerifyOtherEditingTI()){
            this.deleteButtonSecond(ev, numberSecondIdea)
            if (!this.state.is_finish){
                let copyHiddens = this.state.hidden.map((obj)=>{
                    if(obj.noIdea===numberSecondIdea){
                        obj.editable = true;
                    }
                    return obj;
                });
                setTimeout(()=>this.setState({
                    hidden: copyHiddens
                }), 101);

            }
        }
    }

    cambiarTexto(ev, texto){
        ev.preventDefault();
        if(this.functionVerifyOtherEditingTI()){
            this.deleteButtonThird(ev, texto)
            if (!this.state.is_finish){
                let copyLevels = this.state.level.map((ti)=>{
                    if(ti.inde===texto){
                        ti.editable = true;
                    }
                    return ti;
                });
                setTimeout(()=>this.setState({
                    level: copyLevels
                }), 101);

            }
        }
    }

    handleChangePrincipal(event){
        if(event.target.value){
            var newName = event.target.value;
            this.changeNamePrincipalIdea(newName);
        } else {
            this.changeNamePrincipalIdea('Idea Principal');
        }  
    }

    handleChangeSecond(event, numberSecondIdea){
        if(event.target.value){
            var newName = event.target.value;
            this.changeNameSecondIdea(newName, numberSecondIdea);
        } else {
            this.changeNameSecondIdea('Idea Secundaria', numberSecondIdea);
        }  
    }

    handleChange(event, indexIT){
        if(event.target.value){
            var newName = event.target.value;
            this.changeNameThirdIdea(newName, indexIT);
        } else {
            this.changeNameThirdIdea('Idea Tercera', indexIT);
        }  
    }

    funcionTeclaEnterPrincipal = () =>{
        if (!this.state.is_finish){
            var editable_status = false;
            setTimeout(()=>this.setState({principal_idea_editable: editable_status}), 100);
        }
    }

    funcionTeclaEnterSecond = (numberSecondIdea) =>{
        if (!this.state.is_finish){
            let hiddens = this.state.hidden.filter((obj)=>{
                if (obj.noIdea === numberSecondIdea){
                    obj.style_delete={visibility:'hidden'};
                    obj.editable=false;
                }
                return obj;
            });
            setTimeout(()=>this.setState({hidden: hiddens}), 100);
        }
    }

    funcionTeclaEnter = (indexT) =>{
        if (!this.state.is_finish){
            let levels = this.state.level.filter((ti)=>{
                if (ti.inde === indexT){
                    ti.style_delete={display:'none'};
                    ti.editable=false;
                }
                return ti;
            });
            setTimeout(()=>this.setState({level: levels}), 100);
        }
    }

    functionVerifyOtherEditingSI= ()=> {
        var flag = true;
        this.state.hidden.map((obj)=>{
            if(obj.editable===true){
                flag= false;
            }
            return obj;
        });
        return flag;
    }

    functionVerifyOtherEditingTI= ()=> {
        var flag = true;
        this.state.level.map((ti)=>{
            if(ti.editable===true){
                flag= false;
            }
            return ti;
        });
        return flag;
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
                            >
                                <label 
                                className="testLabelThirdIdea" 
                                onClick={(e)=>{this.cambiarTexto(e, t.inde)}}
                                style={t.editable?{display:'none'}:{display:'inline'}}
                                >{t.nameTI}</label>
                                <input 
                                    type="text" 
                                    className="testInputThirdIdea" 
                                    placeholder={ t.nameTI }
                                    style={t.editable?{display:'inline'}:{display:'none'}}
                                    onChange={ (e)=>this.handleChange(e, t.inde) }
                                    onBlur={(e)=>this.funcionTeclaEnter(t.inde)}
                                    onKeyPress={ event=>{
                                        if(event.key === 'Enter'){
                                            this.funcionTeclaEnter(t.inde);
                                        }
                                    }}
                                ></input>
                                
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
                                { this.editIdeaPrincipal() }
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
                                onClick={this.addSecondIdea.bind(this)} 
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