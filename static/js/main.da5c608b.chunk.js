(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,a,t){e.exports=t.p+"static/media/borrar.93998245.svg"},14:function(e,a,t){},20:function(e,a,t){e.exports=t.p+"static/media/ico-terminar.949e0e8c.svg"},21:function(e,a,t){e.exports=t.p+"static/media/ico-descarga.aaf4a751.svg"},22:function(e,a,t){e.exports=t.p+"static/media/ico-secundaria.ac106846.svg"},23:function(e,a,t){e.exports=t.p+"static/media/ico-tercer.f7fa6e8b.svg"},25:function(e,a,t){e.exports=t.p+"static/media/ico-terminar.949e0e8c.svg"},27:function(e,a,t){e.exports=t(58)},56:function(e,a,t){},58:function(e,a,t){"use strict";t.r(a);var n=t(0),i=t.n(n),s=t(10),d=t(2),r=t(3),l=t(5),c=t(4),o=t(6),u=t(26),m=(t(14),t(20)),p=t.n(m),h=t(21),f=t.n(h),v=t(8),y=t.n(v),E=t(22),I=t.n(E),S=t(23),T=t.n(S),b=t(11),g=t.n(b),N=t(7),_=t.n(N),C=t(24),D=t.n(C),O=t(12),x=t.n(O),w=function(e){function a(e){var t;return Object(d.a)(this,a),(t=Object(l.a)(this,Object(c.a)(a).call(this,e))).addThirdIdea=function(e){e.preventDefault();var a=t.state.hidden,n=t.state.level.length+1,i={},s=0;a.map(function(e){return"inline"===e.styl.display&&e.ideaTres<3&&0===s&&(i.idea=e.noIdea,i.inde=e.noIdea+"-"+n.toString(),i.nameTI="Idea Tercera",i.editable=!1,i.style_delete={display:"none"},t.setState({hidden:a,level:[].concat(Object(u.a)(t.state.level),[i])}),e.ideaTres+=1,s+=1),e})},t.activeContainer=function(e){var a=t.state.hidden;a.map(function(a){return a.noIdea===e&&(a.styl_container={display:"inline"}),a}),t.setState({hidden:a})},t.onDragStart=function(e,a,t,n){e.dataTransfer.setData("id",a),e.dataTransfer.setData("ideaA",t),e.dataTransfer.setData("ideaName",n)},t.onDragOver=function(e){e.preventDefault()},t.onDrop=function(e,a){var n=t.verifySpace(a),i={};if(!t.state.is_finish&&n){var s=e.dataTransfer.getData("id"),d=e.dataTransfer.getData("ideaA"),r=e.dataTransfer.getData("ideaName"),l=t.state.level.filter(function(e){return e.inde===s&&(i.inde=s,i.idea=a,i.nameTI=r,i.style_delete={display:"none"}),e.inde!==s});l.push(i),t.setState({level:l}),i={},t.funcionBorrarEspacio(d)}},t.funcionBorrarEspacio=function(e){var a=t.state.hidden;a.map(function(a){return a.noIdea===e&&(a.ideaTres-=1),a}),t.setState({hidden:a})},t.verifySpace=function(e){var a=t.state.hidden,n=!1;return a.map(function(a){return a.noIdea===e&&a.ideaTres<3&&(a.ideaTres+=1,n=!0),a}),t.setState({hidden:a}),n},t.funcionPruebas=function(e,a){if(!t.state.is_finish){var n=t.state.level.filter(function(t){return t.inde===a&&(t.nameTI=e),t});setTimeout(function(){return t.setState({level:n})},100)}},t.deleteSecondIdea=function(e,a){e.preventDefault();var n=t.state.hidden;n.map(function(e){return e.noIdea===a&&(e.styl={display:"none"},e.style_delete={visibility:"hidden"}),e});var i=t.state.level.filter(function(e){if(e.idea!==a)return e;t.funcionBorrarEspacio(a)});t.setState({hidden:n,level:i})},t.deleteIdeaThird=function(e,a,n){if(e.preventDefault(),!t.state.is_finish){var i=t.state.level.filter(function(e){return e.inde!==a});setTimeout(function(){return t.setState({level:i})},101)}t.funcionBorrarEspacio(n)},t.deleteButtonSecond=function(e,a){e.preventDefault();var n=t.state.hidden;n.map(function(e){return e.noIdea===a&&"hidden"===e.style_delete.visibility&&(e.style_delete={visibility:"visible"}),e}),t.setState({hidden:n})},t.disDeleteButtonSecond=function(e){var a=t.state.hidden;a.map(function(a){return a.noIdea===e&&"visible"===a.style_delete.visibility&&(a.style_delete={visibility:"hidden"}),a}),setTimeout(function(){return t.setState({hidden:a})},100)},t.deleteButtonThird=function(e,a){e.preventDefault();var n=t.state.level;n.map(function(e){return e.inde===a&&"none"===e.style_delete.display&&(e.style_delete={display:"inline"}),e}),t.setState({level:n})},t.disDeleteButtonThird=function(e,a){var n=t.state.level;n.map(function(e){return e.inde===a&&"inline"===e.style_delete.display&&(e.style_delete={display:"none"},e.editable=!1),e}),setTimeout(function(){return t.setState({level:n})},2e3)},t.onFinish=function(e){e.preventDefault(),t.setState({is_finish:!0})},t.onDownload=function(e){e.preventDefault(),D.a.toPng(document.getElementById("mapStudent"),{bgcolor:"white",useCORS:!0}).then(function(e){var a=document.createElement("a");a.download="mindmap.png",a.href=e,a.click()}).catch(function(e){alert("oops, something went wrong!",e)})},t.funcionTeclaEnter=function(e){if(!t.state.is_finish){var a=t.state.level.filter(function(a){return a.inde===e&&(a.style_delete={display:"none"},a.editable=!1),a});setTimeout(function(){return t.setState({level:a})},100)}},t.funcionTeclaEscape=function(e,a){if(!t.state.is_finish){var n=t.state.level.filter(function(t){return t.inde===e&&(t.style_delete={display:"none"},t.editable=!1,t.nameTI=a),t});setTimeout(function(){return t.setState({level:n})},100)}},t.functionVerifyOtherEditingTI=function(){var e=!0;return t.state.level.map(function(a){return!0===a.editable&&(e=!1),a}),e},t.state={principal_idea:"Idea",description:"",is_finish:!1,hidden:[{styl:{display:"none"},styl_container:{display:"none"},nameClass:"secondaryIdea secondaryIdeaFirst",noIdea:"ideaOne",classContainer:"containerThirdIdeaHor thirdIdeaFirst",ideaTres:0,style_delete:{visibility:"hidden"},class_connection:"ispri"},{styl:{display:"none"},styl_container:{display:"none"},nameClass:"secondaryIdea secondaryIdeaSecond",noIdea:"ideaTwo",classContainer:"containerThirdIdeaRig thirdIdeaTwo",ideaTres:0,style_delete:{visibility:"hidden"},class_connection:"isdoi"},{styl:{display:"none"},styl_container:{display:"none"},nameClass:"secondaryIdea secondaryIdeaThird",noIdea:"ideaThree",classContainer:"containerThirdIdeaVer thirdIdeaThird",ideaTres:0,style_delete:{visibility:"hidden"},class_connection:"istri"},{styl:{display:"none"},styl_container:{display:"none"},nameClass:"secondaryIdea secondaryIdeaFourth",noIdea:"ideaFour",classContainer:"containerThirdIdeaLef thirdIdeaFour",ideaTres:0,style_delete:{visibility:"hidden"},class_connection:"iscui"},{styl:{display:"none"},styl_container:{display:"none"},nameClass:"secondaryIdea secondaryIdeaFifth",noIdea:"ideaFive",classContainer:"containerThirdIdeaHor thirdIdeaFifth",ideaTres:0,style_delete:{visibility:"hidden"},class_connection:"iscii"},{styl:{display:"none"},styl_container:{display:"none"},nameClass:"secondaryIdea secondaryIdeaSix",noIdea:"ideaSix",classContainer:"containerThirdIdeaRig thirdIdeaSix",ideaTres:0,style_delete:{visibility:"hidden"},class_connection:"issei"},{styl:{display:"none"},styl_container:{display:"none"},nameClass:"secondaryIdea secondaryIdeaSeven",noIdea:"ideaSeven",classContainer:"containerThirdIdeaVer thirdIdeaSeven",ideaTres:0,style_delete:{visibility:"hidden"},class_connection:"issii"},{styl:{display:"none"},styl_container:{display:"none"},nameClass:"secondaryIdea secondaryIdeaEight",noIdea:"ideaEight",classContainer:"containerThirdIdeaLef thirdIdeaEight",ideaTres:0,style_delete:{visibility:"hidden"},class_connection:"isoci"}],level:[]},t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;_.a.get("http://localhost:8000/v1/mentals/").then(function(a){e.setState({description:a.data.data.description,principal_idea:a.data.data.principal})}).catch(function(e){console.log("No funciona",e)}),document.addEventListener("mousedown",this.handleClickOutside)}},{key:"handleOutsideClick",value:function(e){this.refs.megaMenu.contains(e.target)||this.setState({clicked:!1})}},{key:"addClick",value:function(){var e=this,a=this.state.hidden,t=0;a.map(function(a){return"none"===a.styl.display&&0===t&&(a.styl={display:"inline"},e.activeContainer(a.noIdea),t+=1),a}),this.setState({hidden:a})}},{key:"IdeaPrincipal",value:function(){var e,a=this;return e="Idea"===this.state.principal_idea?i.a.createElement(y.a,{initialValue:"Idea Principal",save:function(e){a.setState({principal_idea:e})},inputClass:"testInputPrincipalIdea",labelClass:"testLabelPrincipalIdea"}):i.a.createElement("label",null,this.state.principal_idea),i.a.createElement("div",{className:"testLabelPrincipalIdea"},e)}},{key:"secondaryIdeaDisplay",value:function(){var e=this,a=[];return this.state.is_finish?this.state.hidden.map(function(e){"inline"===e.styl.display&&a.push(i.a.createElement("div",{className:e.nameClass,style:e.styl},i.a.createElement("div",{className:"textSecondary"},i.a.createElement(y.a,{initialValue:"Idea Secundaria"})),i.a.createElement("hr",{className:e.class_connection})))}):this.state.hidden.map(function(t){"inline"===t.styl.display&&a.push(i.a.createElement("div",{className:t.nameClass,style:t.styl,onDragOver:function(a){return e.onDragOver(a)},onDrop:function(a){e.onDrop(a,t.noIdea)}},i.a.createElement("img",{src:x.a,className:"imagenDeBorrado",onClick:function(a){e.deleteSecondIdea(a,t.noIdea)},style:t.style_delete,alt:""}),i.a.createElement("div",{className:"textSecondary",onClick:function(a){e.deleteButtonSecond(a,t.noIdea)}},i.a.createElement(y.a,{initialValue:"Idea Secundaria",save:function(a){e.disDeleteButtonSecond(t.noIdea)},labelClass:"testLabelSecondIdea",inputClass:"testInputSecondIdea"})),i.a.createElement("hr",{className:t.class_connection})))}),a}},{key:"cambiarTexto",value:function(e,a){var t=this;if(e.preventDefault(),this.functionVerifyOtherEditingTI()&&(this.deleteButtonThird(e,a),!this.state.is_finish)){var n=this.state.level.map(function(e){return e.inde===a&&(e.editable=!0),e});setTimeout(function(){return t.setState({level:n})},101)}}},{key:"handleChange",value:function(e,a,t){if(e.target.value){var n=e.target.value;this.funcionPruebas(n,a)}else this.funcionPruebas("Idea Tercera",a)}},{key:"render",value:function(){var e=this,a={},t={},n={ideaOne:[],ideaTwo:[],ideaThree:[],ideaFour:[],ideaFive:[],ideaSix:[],ideaSeven:[],ideaEight:[]},s={ideaOne:[],ideaTwo:[],ideaThree:[],ideaFour:[],ideaFive:[],ideaSix:[],ideaSeven:[],ideaEight:[]},d={ideaOne:["ituno","itdos","ittres"],ideaTwo:["itcuatro","itcinco","itseis"],ideaThree:["itsiete","itocho","itnueve"],ideaFour:["itdiez","itonce","itdoce"],ideaFive:["ittrece","itcator","itquinc"],ideaSix:["itdiec","itdieci","itdieco"],ideaSeven:["itdiece","itveint","itveino"],ideaEight:["itveind","itveinr","itveinc"]},r={ideaOne:[],ideaTwo:[],ideaThree:[],ideaFour:[],ideaFive:[],ideaSix:[],ideaSeven:[],ideaEight:[]};return this.state.hidden.forEach(function(a){"inline"===a.styl_container.display&&s[a.noIdea].push(i.a.createElement("div",{className:a.classContainer,onDrop:function(t){e.onDrop(t,a.noIdea)},onDragOver:function(a){return e.onDragOver(a)}},n[a.noIdea]))}),this.state.level.forEach(function(a){n[a.idea].push(i.a.createElement("div",{className:"thirdIdea",draggable:"true",onDragStart:function(t){return e.onDragStart(t,a.inde,a.idea,a.nameTI)}},i.a.createElement("div",{className:a.nameCI},i.a.createElement("img",{src:x.a,className:"imagenDeBorrado",onClick:function(t){return e.deleteIdeaThird(t,a.inde,a.idea)},style:a.style_delete,alt:""}),i.a.createElement("div",{className:"PruebaTexto"},i.a.createElement("label",{className:"testLabelThirdIdea",onClick:function(t){e.cambiarTexto(t,a.inde)},style:a.editable?{display:"none"}:{display:"inline"}},a.nameTI),i.a.createElement("input",{type:"text",className:"testInputThirdIdea",placeholder:a.nameTI,style:a.editable?{display:"inline"}:{display:"none"},onChange:function(t){return e.handleChange(t,a.inde,a.nameTI)},onBlur:function(t){return e.funcionTeclaEnter(a.inde)},onKeyPress:function(t){"Enter"===t.key&&e.funcionTeclaEnter(a.inde)}})))))}),n.ideaOne.forEach(function(e,a){r.ideaOne.push(i.a.createElement("hr",{className:d.ideaOne[a]}))}),n.ideaTwo.forEach(function(e,a){r.ideaTwo.push(i.a.createElement("hr",{className:d.ideaTwo[a]}))}),n.ideaThree.forEach(function(e,a){r.ideaThree.push(i.a.createElement("hr",{className:d.ideaThree[a]}))}),n.ideaFour.forEach(function(e,a){r.ideaFour.push(i.a.createElement("hr",{className:d.ideaFour[a]}))}),n.ideaFive.forEach(function(e,a){r.ideaFive.push(i.a.createElement("hr",{className:d.ideaFive[a]}))}),n.ideaSix.forEach(function(e,a){r.ideaSix.push(i.a.createElement("hr",{className:d.ideaSix[a]}))}),n.ideaSeven.forEach(function(e,a){r.ideaSeven.push(i.a.createElement("hr",{className:d.ideaSeven[a]}))}),n.ideaEight.forEach(function(e,a){r.ideaEight.push(i.a.createElement("hr",{className:d.ideaEight[a]}))}),this.state.is_finish?(a.display="none",t.display="inline"):(a.display="inline",t.display="none"),i.a.createElement("div",{id:"mapStudent",className:"mapStudent"},i.a.createElement("div",{className:"mapStudentBand"},i.a.createElement("div",{className:"mapStudentText"},i.a.createElement("div",{className:"mapStudentTextIns fontTB"},"INSTRUCCIONES:"),i.a.createElement("div",{className:"mapStudentInstructions fontMB"},this.state.description))),i.a.createElement("div",{id:"mapStudentContainer",className:"mapStudentContainer"},i.a.createElement("div",{className:this.state.is_finish?"mapLeftSideFinished":"mapLeftSide"},i.a.createElement("div",{className:"principalIdea"},i.a.createElement("div",{className:"textPrincipal"},this.IdeaPrincipal())),this.secondaryIdeaDisplay(),s.ideaOne,s.ideaTwo,s.ideaThree,s.ideaFour,s.ideaFive,s.ideaSix,s.ideaSeven,s.ideaEight,r.ideaOne,r.ideaTwo,r.ideaThree,r.ideaFour,r.ideaFive,r.ideaSix,r.ideaSeven,r.ideaEight),i.a.createElement("div",{className:"mapRightSide"},i.a.createElement("div",{className:"mapStudentConceptsDisplay",style:a},i.a.createElement("button",{className:"buttonStudentChoice",type:"submit",onClick:this.addClick.bind(this)},i.a.createElement(g.a,null,i.a.createElement("div",{className:"buttonImagenSecundario"},i.a.createElement("img",{src:I.a,alt:""})),i.a.createElement("div",{className:"buttonStudentAlineacionTexto"},"Agregar idea secundaria")))),i.a.createElement("div",{className:"mapStudentConceptsDisplayT",style:a},i.a.createElement("button",{className:"buttonStudentChoice",type:"submit",onClick:function(a){e.addThirdIdea(a)}},i.a.createElement(g.a,null,i.a.createElement("div",{className:"buttonImagenSecundario"},i.a.createElement("img",{src:T.a,alt:""})),i.a.createElement("div",{className:"buttonStudentAlineacionTexto"},"Agregar idea tercera")))),i.a.createElement("div",{className:"balanzaMapButton"},i.a.createElement("button",{type:"submit",className:"buttonStudentTerminar",style:a,onClick:function(a){e.onFinish(a)}},i.a.createElement("div",{className:"buttonStudentAlineacionImagen"},i.a.createElement("img",{src:p.a,alt:""})),i.a.createElement("div",{className:"buttonStudentAlineacionTexto"},"Terminar")),i.a.createElement("button",{type:"submit",className:"buttonStudentDescargar",onClick:function(a){e.onDownload(a)},style:t},i.a.createElement("div",{className:"buttonStudentAlineacionImagenDescargar"},i.a.createElement("img",{src:f.a,alt:""})),i.a.createElement("div",{className:"buttonStudentAlineacionTextoDescargar"},"Descargar ejercicio"))))))}}]),a}(n.Component),k=t(25),F=t.n(k),B=function(e){function a(e){var t;return Object(d.a)(this,a),(t=Object(l.a)(this,Object(c.a)(a).call(this,e))).handleDescription=function(e){t.setState({description:e.target.value})},t.handlePrincipalIdea=function(e){t.setState({principal_idea:e.target.value})},t.handleSubmit=function(e){e.preventDefault(),_.a.post("http://localhost:8000/v1/mentals/",{description:t.state.description,principal:t.state.principal_idea}).then(function(e){console.log(e),console.log(e.data)}).catch(function(e){422===e.response.data.code?alert("Debes asignar una descripcion del ejercicio."):alert("Ocurrio un error, intente de nuevo.")})},t.state={description:"",principal_idea:""},t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"MapAdmin"},i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement("div",{className:"mapAdminDescription"},i.a.createElement("p",{className:"fontMLS"},'Con esta herramienta, el alumno podr\xe1 reflexionar sobre el peso de sus decisiones, para ello es necesario darle los conceptos que deber\xe1 "pesar en la balanza". El m\xednimo de conceptos deben ser tres y deber\xe1n incrementarse en n\xfameros nones para que la balanza se incline siempre hacia un lado.')),i.a.createElement("div",{className:"mapAdminInstructions fontMBS"},i.a.createElement("p",null,"Instrucciones para el alumno:"),i.a.createElement("textarea",{name:"description",onChange:this.handleDescription})),i.a.createElement("hr",null),i.a.createElement("div",{className:"mapAdminValues fontMBS"},i.a.createElement("div",{className:"textMapAdminPrincipal"},i.a.createElement("div",{className:"divPrincipalIdea"},"Idea Principal")),i.a.createElement("div",{className:"textMapAdminPrincipal"},i.a.createElement("div",{className:"divPrincipalIdea"},i.a.createElement("input",{type:"text",onChange:this.handlePrincipalIdea})))),i.a.createElement("hr",null),i.a.createElement("div",{className:"alignButtonCSS"},i.a.createElement("button",{type:"submit",className:"buttonAdminMapTerminar"},i.a.createElement("div",{className:"buttonAdminMapAlineacionImagen"},i.a.createElement("img",{src:F.a,alt:""})),i.a.createElement("div",{className:"buttonAdminMapAlineacionTexto"},"Terminar")))))}}]),a}(n.Component),A=function(e){function a(e){var t;return Object(d.a)(this,a),(t=Object(l.a)(this,Object(c.a)(a).call(this))).state={userData:"student"},t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){return"teacher"===this.state.userData?i.a.createElement(B,null):i.a.createElement(w,null)}}]),a}(n.Component);t(56),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(s.render)(i.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,2,1]]]);
//# sourceMappingURL=main.da5c608b.chunk.js.map