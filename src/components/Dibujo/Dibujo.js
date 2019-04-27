import React, { Component } from 'react';
import LC from 'literallycanvas';
import './css/literallycanvas.css';
import Instructions from './Intructions';
import axios from 'axios';
import domtoimage from 'dom-to-image'
import Rollo from './img/rollo_canvas.svg'
import IconoTerminar from './img/ico-terminar.svg'
import IconoDescargar from './img/ico-descarga.svg'

class Dibujo extends Component {

  constructor(props) {
    super(props);
    LC.localize({
      'fill':'Color 2',
      'Pencil':'Lapiz',
      'bg': 'Fondo',
      'Eyedropper': 'Gotero',
      'Text': 'Texto',
      'Rectangle': 'Rectangulo',
      'Eraser': 'Goma',
      'Clear': 'Limpiar',
      'Line': 'Linea',
      'Ellipse': 'Circulo',
      'Polygon': 'Polygono',
      // 'SelectShape': 'Selecciona Figura',
      'Color to change:':'Color a cambiar: ',
      'stroke': 'Color 1',
    });
    LC.defineShape('Triangulo', {
      constructor: function (args) {
        if (args == null) {
          args = {};
        }
        this.x = args.x || 0;
        this.y = args.y || 0;
        this.width = args.width || 0;
        this.height = args.height || 0;

        this.strokeWidth = args.strokeWidth || 5;
        this.strokeColor = args.strokeColor || 'black';
        return this.fillColor = args.fillColor || 'transparent';
      },
      getBoundingRect: function () {
        return {
          x: this.x - this.strokeWidth / 2,
          y: this.y - this.strokeWidth / 2,
          width: this.width + this.strokeWidth,
          height: this.height + this.strokeWidth
        };
      },
      toJSON: function () {
        return {
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height,
          strokeWidth: this.strokeWidth,
          strokeColor: this.strokeColor,
          fillColor: this.fillColor
        };
      },
      fromJSON: function (data) {
        return LC.createShape('Triangulo', data);
      },
      move: (moveInfo)=> {
        if (moveInfo == null) {
          moveInfo = {};
        }
        this.x = this.x - moveInfo.xDiff;
        return this.y = this.y - moveInfo.yDiff;
      },
      setUpperLeft: (upperLeft)=> {
        if (upperLeft == null) {
          upperLeft = {};
        }
        this.x = upperLeft.x;
        return this.y = upperLeft.y;
      }
    });

    LC.defineCanvasRenderer('Triangulo',  (ctx, shape)=> {
      let x, y,x2,y2,triHeight;
      x= shape.x;
      y= shape.y;
      triHeight = 50 * Math.tan(60 * Math.PI / 180);
      x2= shape.width;
      y2 = shape.height;
      if (shape.strokeWidth % 2 !== 0) {
        x += 0.5;
        y += 0.5;
      }
      ctx.save();
      ctx.beginPath();
        ctx.lineWidth = shape.strokeWidth;
        ctx.strokeStyle = shape.strokeColor;
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y);
        ctx.lineTo((x2+x)/2, y2-triHeight);
        ctx.lineTo(x,y);

        ctx.fillStyle = shape.fillColor;
        ctx.fill();
      ctx.closePath();
      return ctx.stroke();
    })

    this.canvasDraw='';
    this.ctx = '';
    this.state = {
      animated: true,
      downloadBtn: "none",
      endBtn: "flex",
      cubeta: false,
      instrucciones: "",
      colorActive:"active"
    };
  };

  onDownload = (ev) => {
    ev.preventDefault();
    domtoimage.toPng(document.getElementById('dibujoSection'), {
        quality: 0.95,
        bgcolor: 'white'
      })
      .then( (dataUrl) =>{
        var link = document.createElement('a');
        link.download = 'MiDibujo.png';
        link.href = dataUrl;
        link.click();
      });
  };
  onEnd=() =>{
    this.setState({
      downloadBtn: "flex",
      endBtn: "none"
    })
  }
  setBackClor=(canvas)=>{
    this.ctx.globalCompositeOperation = 'destination-over';
    this.ctx.fillStyle = this.rgb2hex(this.getStyle());
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  getStyle = () =>{
    const lc_draw = document.getElementsByClassName('lc-drawing')[0];
    let styl = lc_draw.getAttribute('style');
    let bckg = styl.split(':');
    return bckg[1].replace(';', '').trim();
  }
  rgb2hex = (rgb) =>{
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }
                        Triangle = (lc) => {
                          const self = this;
                          return {
                            usesSimpleAPI: false,
                            name: 'Triangulo',
                            iconName: 'triangle',
                            optionsStyle: 'stroke-width',
                            strokeWidth: lc.opts.defaultStrokeWidth,

                            didBecomeActive:  (lc)=> {
                              var onPointerDown =  (pt)=> {
                                console.log(self.strokeWidth)
                              self.currentShape = LC.createShape('Triangulo', {
                                x: pt.x,
                                y: pt.y,
                                width: pt.x, // Punto final ancho
                                height: pt.y, // punto final alto
                                strokeWidth:lc.opts.defaultStrokeWidth,
                                strokeColor:lc.getColor('primary')
                              });
                                lc.setShapesInProgress([self.currentShape]);
                                lc.repaintLayer('main');
                              };
                              var ptsX = 0 // variables inicio
                              var ptsY = 0
                              var h = 0;
                              var onPointerDrag =  (pt) =>{
                                //ptsX++; // aumento de arrastre x
                                //ptsY++; // aumento de arrastre y
                                h = pt.x * (Math.sqrt(3)/2);
                                self.currentShape.width = pt.x;
                                //self.currentShape.width = pt.x + ptsX;
                                self.currentShape.height = pt.y; //+ ptsY;
                                ///self.currentShape.height = h/2;
                                lc.drawShapeInProgress(self.currentShape);
                              };
                              var onPointerUp =  (pt) =>{
                                ptsX = 0
                                ptsY = 0
                                  lc.saveShape(self.currentShape);
                                  lc.setShapesInProgress([]);
                                  lc.repaintLayer('main');
                              };
                              self.unsubscribeFuncs = [
                                lc.on('lc-pointerup', onPointerUp),
                                lc.on('lc-pointerdrag', onPointerDrag),
                                lc.on('lc-pointerdown', onPointerDown)
                              ];
                            },
                            willBecomeInactive:  (lc) =>{
                              self.unsubscribeFuncs.map( (f) =>{
                                f()
                              });
                            }
                          }
                        };

  BucketTool = (lc) => {
    const self = this;
    return {
      usesSimpleAPI: false,
      name: 'Cubeta',
      iconName: 'bucket',
      didBecomeActive:  (lc)=> {

        var onPointerDown =  (pt)=> {

          let idShape = lc.shapes.filter((s) => {
            let shape = s.getBoundingRect();


            if ((pt.x > shape.x && pt.x < shape.x + shape.width) && (pt.y> shape.y && pt.y< shape.y + shape.height)){
              return s.id;
            }
          })

          if(idShape[0] !== undefined){
              if (idShape[0].fillColor !== undefined) {
                idShape[0].fillColor = lc.getColor('secondary');
                lc.saveShape(idShape[0]);
                lc.repaintLayer('main');
              } else {
                lc.repaintLayer('main');
              }
          }
        };
        self.unsubscribeFuncs = [
          lc.on('lc-pointerdown', onPointerDown),
        ];
      },
      willBecomeInactive:  (lc)=> {
        self.unsubscribeFuncs.map( (f) =>{
          f()
        });
      }
    }
  };

  componentDidMount(lc){

    document.querySelector('#drawingArea').style.cursor = "pointer";
     setTimeout(() => {
       document.querySelector('#drawingArea').classList.add('animation')
       document.querySelector('.rollo_der').classList.add('animation')
       this.setState({ animated:false})
     }, 2000)

    this.canvasDraw = document.getElementById('drawingArea');
    this.ctx = this.canvasDraw.getContext('2d');
     axios.get('http://jsonplaceholder.typicode.com/comments')
       .then((response) => {
         // handle success

         this.setState({
           instrucciones: response.data[0].body
         })
       }).catch((error) => {
         // handle error
         console.log(error);
       })
  }
  OnInitPaint =lc=>{

    lc.canvas.id = "drawingArea";
    document.querySelector('.horz-toolbar div').id= "pointsStroke";
    // document.querySelector('#colorsPallete ul li').classList.remove('active')
    document.querySelectorAll('#colorsPallete ul li').forEach(element=>{
      element.addEventListener('click',(e)=>{
        document.querySelectorAll('#colorsPallete ul li').forEach(element => {
          element.classList.remove('active')
        })
        element.classList.add('active')
        if(this.state.cubeta){
          lc.setColor('secondary', e.target.id)
        }else{
          lc.setColor('primary', e.target.id)

        }
      })
    })
    document.querySelectorAll('.lc-pick-tool').forEach(element => {
      element.addEventListener('click', (e) => {
          this.setState({ cubeta: false })
          if (e.target.title === "Cubeta"){
            this.setState({cubeta:true})
          }else{
            lc.setColor('secondary', "#0000")
          }
          if (e.target.title === "Linea"){
            document.querySelector('#drawingArea').style.cursor = "crosshair";
            setTimeout(()=>{
                document.querySelector('.literally.toolbar-at-bottom > div.lc-options.horz-toolbar > div > div:nth-child(3)').id = "pointsStroke";
            },10)
          }
          if (e.target.title === "Lapiz") {
            document.querySelector('#drawingArea').style.cursor = "pointer";
          }
          if (e.target.title === "Goma") {
            document.querySelector('#drawingArea').style.cursor = "pointer";
          }
          if (e.target.title === "Cubeta") {
            document.querySelector('#drawingArea').style.cursor = "url('./img/bucket.cur')";
          }
          if (e.target.title === "Selecciona Figura") {
            document.querySelector('#drawingArea').style.cursor = "pointer";
          }
          if (e.target.title === "Rectangulo") {
            document.querySelector('#drawingArea').style.cursor = "crosshair";
          }
          if (e.target.title === "Texto") {
            document.querySelector('#drawingArea').style.cursor = "text";
          }
          if (e.target.title === "Circulo") {
            document.querySelector('#drawingArea').style.cursor = "crosshair";
          }
          if (e.target.title === "Triangulo"){
            document.querySelector('#drawingArea').style.cursor = "crosshair";
          }
          if (e.target.title === "Polygono") {
            document.querySelector('#drawingArea').style.cursor = "crosshair";
            setTimeout(()=>{
              document.querySelector('.literally.toolbar-at-bottom > div.lc-options.horz-toolbar > div > div:nth-child(2)').style = "width:100%";
              document.querySelector('.literally.toolbar-at-bottom > div.lc-options.horz-toolbar > div > div:nth-child(2) > div').id = "pointsStroke";
            },10)
          }

      })
    })


    document.querySelector('.lc-undo-redo').remove(true);
    const undoa = document.createElement('div');
    undoa.classList.add("lc-undo");
    undoa.classList.add("toolbar-button");
    undoa.classList.add("thin-button");
    undoa.id ="undoAction";
    document.querySelector(".lc-picker-contents").appendChild(undoa);

    const redoa = document.createElement('div');
    redoa.classList.add("lc-undo");
    redoa.classList.add("toolbar-button");
    redoa.classList.add("thin-button");
    redoa.id = "redoaction";

    document.querySelector(".lc-picker-contents").appendChild(undoa);
    document.querySelector(".lc-picker-contents").appendChild(redoa);

    document.querySelector('#undoAction').addEventListener('click',(e)=>{
      lc.undo()
    })
    document.querySelector('#redoaction').addEventListener('click', (e) => {
      lc.redo()
    })

  }

  render() {
    const MainTools =[
      LC.tools.Pencil,
      LC.tools.Text,
      LC.tools.Eraser,
      LC.tools.Line,
      LC.tools.Rectangle,
      LC.tools.Ellipse,
      // LC.tools.Polygon,
      this.Triangle,
      // LC.tools.SelectShape,
      this.BucketTool
    ];

    var backgroundImage = new Image()
    backgroundImage.src = './PAINT/bckground_areaDraw.svg';
    return (
            <main className="main_content" id="dibujoSection">
              <Instructions instuctionsText={this.state.instrucciones}> </Instructions>
              <section className="draw">
                <img src={ Rollo } className="rollo_izq" alt=""/>
                <LC.LiterallyCanvasReactComponent
                imageURLPrefix = "/img"
                backgroundColor= "#0000"
                imageSize={{width:1800, height:null}}
                /* backgroundShapes={imgBck} */
                toolbarPosition="bottom"
                secondaryColor = "#0000"
                strokeWidths={[3,5,10]}
                var tools = {MainTools}
                onInit={this.OnInitPaint}/>
                <img src={ Rollo } className="rollo_der" id="rollo_der" alt=""/>
                <div id="colorsPallete">
                <ul>
                    <li id="#96161B" style={{backgroundColor:'#96161B'}}></li>
                    <li id="#ae656e" style={{backgroundColor:'#ae656e'}}><span></span></li>
                    <li id="#1a6e4b" style={{backgroundColor:'#1a6e4b'}}><span></span></li>
                    <li id="#1d884d" style={{backgroundColor:'#1d884d'}}><span></span></li>
                    <li id="#596640" style={{backgroundColor:'#596640'}}><span></span></li>
                    <li id="#547b95" style={{backgroundColor:'#547b95'}}><span></span></li>
                    <li id="#033d63" style={{backgroundColor:'#033d63'}}><span></span></li>
                  </ul>
                  <ul>
                    <li id="#75175b" style={{backgroundColor:"#75175b"}}></li>
                    <li id="#A5014c" style={{backgroundColor:"#A5014c"}}><span></span></li>
                    <li id="#9a500e" style={{backgroundColor:"#9a500e"}}><span></span></li>
                    <li id="#c38221" style={{backgroundColor:"#c38221"}}><span></span></li>
                    <li id="#c0a673" style={{backgroundColor:"#c0a673"}}><span></span></li>
                    <li id="#000000" style={{backgroundColor:"#000000"}} className="active"><span></span></li>
                    <li id="#ffffff" style={{backgroundColor:"#ffffff"}}><span></span></li>
                  </ul>
                </div>
                <a id="endBtn" ><button type="button" className="buttons" style={{display:this.state.endBtn}} onClick={this.onEnd}><img src={ IconoTerminar } alt="" className="imagenDibujoTerminar"></img> Terminar</button></a>
                <a id="downloadBtn" href="" download="Dibujo.jpg"><button type="button" className="buttons" style={{display:this.state.downloadBtn}} onClick={this.onDownload}><img src={IconoDescargar} alt="" className="imagenDibujoTerminar" ></img> Descargar</button></a>

                

              </section>
            </main>);
  }
}

export default Dibujo;
