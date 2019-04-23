import React, { Component } from 'react'
import './css/Mapa.css'
import IconoBorrar from './images/borrar.svg'


class Tercera extends Component{
    cambiarTexto(ev, texto){
        ev.preventDefault();
        alert(texto);
    }
    render(){
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
        const { 
            hiddenData,
            levelData,
            onDragStart,
            deleteIdeaThird,
            deleteButtonThird,
            onDrop,
            onDragOver
         } = this.props;
         levelData.forEach((t)=>{
            ideas[t.idea].push(
                <div 
                className="thirdIdea"
                draggable="true"
                onDragStart={(e)=>onDragStart(e, t.inde, t.idea, t.nameTI)}
                >
                    <div className={ t.nameCI } >
                        <img 
                            src={IconoBorrar} 
                            className="imagenDeBorrado" 
                            onClick={ (e)=>deleteIdeaThird(e,t.inde, t.idea)}
                            style={ t.style_delete }
                            alt="" />
                            <div 
                            className="PruebaTexto"
                            onClick={(e)=>{deleteButtonThird(e, t.inde)}}
                            >
                            <label className="testLabelThirdIdea" onClick={(e)=>{this.cambiarTexto(e, t.inde)}}>{t.nameTI}</label>
                              
       
                            </div>
                        
                    </div>
                </div>
            );
        });  

        hiddenData.forEach((t)=>{
            if(t.styl_container.display === 'inline'){
                containers[t.noIdea].push(
                <div 
                    className={ t.classContainer }
                    onDrop={(e)=>{onDrop(e, t.noIdea)}}
                    onDragOver={(e)=>onDragOver(e)}
                >
                    { ideas[t.noIdea] }
                   
                </div>
                );           
            }
        });
        return(
            <div>
                { containers.ideaOne }
                { containers.ideaTwo }
                { containers.ideaThree }
                { containers.ideaFour }
                { containers.ideaFive }
                { containers.ideaSix }
                { containers.ideaSeven }
                { containers.ideaEight }
            </div>
        );
    }
}

export default Tercera;