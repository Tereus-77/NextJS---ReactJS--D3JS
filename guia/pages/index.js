import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import styles from '../styles/Home.module.css'
import React from 'react'
import * as d3 from 'd3'
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "../functions/referenceSize";
import { getTimeOut, getDurationAnim } from "../functions/sideBar";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  
  getOs = () => {
    const os = [
      'Android',
      'webOS',
      'iPhone',
      'iPad',
      'iPod',
      'BlackBerry',
      'Windows Phone',
      'Windows',
      'Linux',
      'Mac'
    ]; // add your OS values
    return os.find(v => navigator.appVersion.indexOf(v) >= 0);
  }

  main = (element) => {
    // Obtiene el tamaño de la pantalla en uso
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Calcula el height adecuado para mantener el aspect ratio frente a cualquier resolución
    // En base a una resolución de pantalla de W:1920 H:1080
    const refWidth = getReferenceSizeWidth();
    const refHeight = getReferenceSizeHeight();
    const aspectRatio = width / height;
    const aspectRatioRef = refWidth / refHeight;
    const heightCorrected = Math.round((refHeight * width) / refWidth);

    const w_nodePrimary = rp(192, 'x', width, height);
    const w_nodeSecundary = rp(128, 'x', width, height);
    const x_nodeUp = rp(67.36, 'x', width, height); // x_node_1
    const y_nodeUp = rp(201.56, 'x', width, height); // x_node_1
    const x_nodeMiddle = rp(96, 'x', width, height); // x_node_1
    const y_nodeMiddle = rp(417.57, 'x', width, height); // x_node_1
    const x_nodeDown = rp(96, 'x', width, height); // x_node_2
    const y_nodeDown = rp(568.55, 'x', width, height); // x_node_2

    const w_guiaIntro = rp(640, 'x', width, height);
    const x_guiaIntro = rp(288.28, 'x', width, height);
    const y_guiaIntro = rp(164.11, 'x', width, height);

    const w_practicasIntro = rp(365.71, 'x', width, height);
    const x_practicasIntro = rp(1043.47, 'x', width, height);
    const y_practicasIntro = rp(48.25, 'x', width, height);

    const w_etapaIntro = rp(365.71, 'x', width, height);
    const x_etapaIntro = rp(914.28, 'x', width, height);
    const y_etapaIntro = rp(561.04, 'x', width, height);

    const w_nodeIntro = rp(320, 'x', width, height);
    const x_nodeIntro = rp(213.33, 'x', width, height);
    const y_nodeIntro = rp(266.61, 'x', width, height);

    const durationAnim = getDurationAnim();
    const timeOut = getTimeOut();

    //const heightCorrected = Math.round(width / aspectRatio);
    if (height > width) {
      heightCorrected = Math.round((refHeight * width) / refWidth);
    } 
    
    console.log('width ' + width + ' height ' + height + ' heightCorrected ' + heightCorrected);

    //alert(this.getOs());
    
    // Asiga a una variable cada magnitud absoluta utilizada para posicionar o dar tamaño a elementos SVG
    const divW = [
      21.87, //0
      3.8,
      5.5,
      6.34,
      7,
      20,
      3.17,
      5.75,
      10,
      6.26, //9
      9, //10
      63.3,
      6.66,
      19, // 13
      1.84,
      27.1,
      2.1, //16
      6.5, 
      10.57,
      7.5, // distance between nodes
      2, //20
      300,
      180,
      5,
      0,
      0,
      0,
      0,
      0
    ]

    const divH = [
    7.25, // 0
    8.36,
    30,
    5.88, //3
    31.2,
    2.15, //5
    20, 
    4.68, //7
    1.72,
    1.6, //9
    4.35, // 10
    5.29, 
    1.7,
    2,
    300, //14
    180, //15
    0,
    0,
    0,
    0,
    0, //20
    0, 
    0, 
    0, 
    0, 
    0, 
    0
    ];

    const divWR = [divW.length];
    const divHR = [divH.length];
    
    
    // Calcula proporción entre la resolución de referencia y la resolución de pantalla
    const resizeRatioWidth = 0.5;
    const resizeRatioHeight = 0.5;
    if (width >= refWidth) {
      resizeRatioWidth = refWidth / width;
    } else {
      resizeRatioWidth = width / refWidth;
    }
    if (heightCorrected >= refHeight) {
      resizeRatioHeight = refHeight / heightCorrected;
    } else {
      resizeRatioHeight = heightCorrected / refHeight;
    }

    //Recalcula las variables cada magnitud absoluta utilizada para posicionar o dar tamaño a elementos SVG
    for (let i = 0; i < divH.length; i++) {
      divHR[i] = (divH[i] * heightCorrected) / refHeight;
    }
    for (let i = 0; i < divW.length; i++) {
      divWR[i] = divW[i] * resizeRatioWidth;
    }
/**/
    const data = {
      "nodes": [
        {
          "name": 1,
          "fillColor" : "red",
          "url": "/img/repositorio_web-01.png"
        },
        {
          "name": 2,
          "fillColor" : "blue",
          "url": "/img/repositorio_web-02.png"
        },
        {
          "name": 3,
          "fillColor" : "green",
          "url": "/img/repositorio_web-03.png"
        },
      ],
      "links": [
        {
          "source": 1,
          "target": 2,
        },
        {
          "source": 2,
          "target": 3,
        },
        {
          "source": 3,
          "target": 1,
        },
      ]
    }
    const svg = d3.select(element)
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + heightCorrected)
      //class to make it responsive
      .classed("svg-content-responsive", true);


    const defs = svg.append("defs").append("linearGradient")
      .attr("id", "bgLinGrad")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    defs.append('stop')
      .attr('style', 'stop-color:#3D2C63;stop-opacity:0.8')
      .attr('offset', '50%');

    defs.append('stop')
      .attr('style', 'stop-color:#155180;stop-opacity:1')
      .attr('offset', '100%');

    defs.append("radialGradient")
      .attr("id", "bgRadGrad")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "50%")
      .attr("fy", "50%")
    defs.append('stop')
      .attr('style', 'stop-color:rgb(253, 253, 253);stop-opacity:1')
      .attr('offset', '47%')
    defs.append('stop')
      .attr('style', 'stop-color:rgb(204, 204, 204);stop-opacity:1')
      .attr('offset', '100%')
    
    // header white
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", heightCorrected / 7.25)
      .attr("fill", "white")
    
    // footer white
    svg.append("rect")
      .attr("x", 0)
      .attr("y", heightCorrected - (heightCorrected/divH[0]))
      .attr("width", width)
      .attr("height", heightCorrected / divH[0])
      .attr("fill", "white")

    //header image
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
      .attr("x", width/divWR[0])
      .attr("y", heightCorrected/divH[2])
      .attr("width", width / 3.8)

    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-06.png")
      .attr("x", width/divWR[0])
      .attr("y", heightCorrected - heightCorrected/divH[1])
      .attr("width", width / 7)
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/centro_innocacion_anacleto.png")
      .attr("x", width/divWR[23])
      .attr("y", heightCorrected - heightCorrected/divH[1])
      .attr("width", width / 6.2)
    
      //footer image
    svg.append("image")
    .attr("xlink:href", window.location.origin + "/img/repositorio_web-07.png")
      .attr("x", width-width/divW[2])
      .attr("y", heightCorrected - heightCorrected/divH[1])
    .attr("width", width / 6.34)


    // Lines behind the circles
    const link = svg
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .style("stroke", "url(#bgLinGrad)")
      .style('stroke-width', divWR[5]); // 20
    
    const node = svg
      .selectAll('nodes')
      .data(data.nodes)
      .enter()
      .append('image')
        .attr("xlink:href", function(d, i) {
          var imagePath =
                window.location.origin + "/img/repositorio_web-0"
                + (i+1).toString() + ".png";
          return imagePath;
        })
      .style("cursor", "pointer")
        .attr('width', function(d, i) {
          return (i+1) == 1 ? width/3.0 : width/5.25
        })
        .on("click", function(d, i) {
          if (i.index==0) {
            svg.append('rect')
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", width)
              .attr("height", heightCorrected)
              .attr("fill", "white")

            svg.append("image")
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
              .attr("x", width/divW[0])
              .attr("y", height/divH[2])
              .attr("width", width/3.8)
              .transition()
              .duration(250)
              .attr("x", width / divW[8])
              .attr("y", height/divH[2])
              .attr("width", width / 4)

            // first image
            svg.append("image")
            .attr("id",'guia')
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
              .attr("x", x_guiaIntro)
              .attr("y", y_guiaIntro)
              .attr("width", w_guiaIntro)
              .style("cursor", "pointer").attr("class", styles.grow)
              .transition()
              .duration(durationAnim)
              .attr("x", x_nodeIntro)
              .attr("y", y_nodeIntro)
              .attr("width", w_nodeIntro);

            setTimeout(function() {
              window.location.href="/guia_de_gestion";
            }, timeOut);

          } else if (i.index==1) {
            
            svg.append('rect')
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", width)
              .attr("height", heightCorrected)
              .attr("fill", 'white');
            
            svg.append("image")
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
              .attr("x", width/divW[0])
              .attr("y", height/divH[2])
              .attr("width", width/3.8)
              .transition()
              .duration(500)
              .attr("x", width / divW[11])
              .attr("y", height / divH[4])
              .attr("width", width / 5.43)

            // down arrow line
            var svgDefs = svg.append('defs');
            var mainGradient = svgDefs.append('linearGradient')
              .attr('id', 'mainGradient');

            mainGradient.append('stop')
              .attr('class', 'stop-left')
              .attr('offset', '0');

            mainGradient.append('stop')
              .attr('class', 'stop-right')
              .attr('offset', '1');

            // first image
            svg.append("image")
              .attr("id", 'guia')
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
              .attr("x", x_guiaIntro)
              .attr("y", y_guiaIntro)
              .attr("width", w_guiaIntro)
              .transition()
              .duration(400)
              .attr("x", x_nodeMiddle)
              .attr("y", y_nodeMiddle)
              .attr("width", w_nodeSecundary);

            // second image
            svg.append("image")
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
              .attr("x", x_practicasIntro)
              .attr("y", y_practicasIntro)
              .attr("width", w_practicasIntro)
              .transition()
              .duration(500)
              .attr("x", x_nodeUp)
              .attr("y", y_nodeUp)
              .attr("width", w_nodePrimary);

            // third image etapas
            svg.append("image")
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
              .attr("x", x_etapaIntro)
              .attr("y", y_etapaIntro)
              .attr("width", w_etapaIntro)
              .transition()
              .duration(400)
              .attr("x", x_nodeDown)
              .attr("y", y_nodeDown)
              .attr("width", w_nodeSecundary);
              

            setTimeout(function() {
              window.location.href="/buenas_practicas";
            }, 650);

          } else if (i.index==2) {
            svg.append('rect')
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", width)
              .attr("height", heightCorrected)
              .attr("fill", "white")

            svg.append("image")
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
              .attr("x", width/divW[0])
              .attr("y", heightCorrected/divH[2])
              .attr("width", width/3.8)
              .transition()
              .duration(500)
              .attr("x", width / 63.3)
              .attr("y", heightCorrected / 31.2)
              .attr("width", width / 5.43)

            // down arrow line
            var svgDefs = svg.append('defs');
            var mainGradient = svgDefs.append('linearGradient')
              .attr('id', 'mainGradient');

            mainGradient.append('stop')
              .attr('class', 'stop-left')
              .attr('offset', '0');

            mainGradient.append('stop')
              .attr('class', 'stop-right')
              .attr('offset', '1');

            // first image
            svg.append("image")
              .attr("id", 'guia')
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
              .attr("x", x_guiaIntro)
              .attr("y", y_guiaIntro)
              .attr("width", w_guiaIntro)
              .transition()
              .duration(500)
              .attr("x", x_nodeMiddle)
              .attr("y", y_nodeMiddle)
              .attr("width", w_nodeSecundary);

            // second image
            svg.append("image")
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
              .attr("x", x_practicasIntro)
              .attr("y", y_practicasIntro)
              .attr("width", w_practicasIntro)
              .transition()
              .duration(500)
              .attr("x", x_nodeDown)
              .attr("y", y_nodeDown)
              .attr("width", w_nodeSecundary);

            // third image etapas
            svg.append("image")
              .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
              .attr("x", x_etapaIntro)
              .attr("y", y_etapaIntro)
              .attr("width", w_etapaIntro)
              .transition()
              .duration(500)
              .attr("x", x_nodeUp)
              .attr("y", y_nodeUp)
              .attr("width", w_nodePrimary);

            setTimeout(function() {
              window.location.href="/etapas";
            }, 650)
          }
        }) 
        
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink()
        .id(function(d) { return d.name; })
        .links(data.links)
      )
      .force("charge", d3.forceManyBody().strength(-600))
      .force('collide', d3.forceCollide(function(d){          // distance between nodes
        return width / divW[19]
      }))
      .force("center", d3.forceCenter(width / divW[20], heightCorrected / divW[13] - 20))     // This force attracts nodes to the center of the svg area
      .on("end", ticked)
      .tick(300);

    function ticked() {
      link
        .attr("x1", function (d,i) {
          var x; (i + 1) == 1 ? x = (width / divW[12]) + divWR[21] : (i + 1) == 2 ? x = (width / divW[14]) + divWR[22] : x = (width / divW[16]) + divWR[22];
          return x;})
        .attr("y1", function (d,i) { 
          var y; (i + 1) == 1 ? y = (heightCorrected / divH[3]) + divHR[14] : (i + 1) == 2 ? y = (heightCorrected / divH[6]) + divHR[15] : y = (heightCorrected / divH[8]) + divHR[15];
          return y;})
        .attr("x2", function (d,i) { 
          var x; (i + 1) == 1 ? x = (width / divW[14]) + divWR[22] : (i + 1) == 2 ? x = (width / divW[16]) + divWR[22] : x = (width / divW[12]) + divWR[21];
          return x;})
        .attr("y2", function (d,i) { 
          var y; (i + 1) == 1 ? y = (heightCorrected / divH[6]) + divHR[15] : (i + 1) == 2 ? y = (heightCorrected / divH[8]) + divHR[15] : y = (heightCorrected / divH[3]) + divHR[14];
          return y;});
      console.log("width " + width + " heightCorrected ref " + Math.round(width / aspectRatioRef) +  " aspectRatioRef " + aspectRatioRef);
      console.log("divHR " + divHR[14] + " " + divHR[15] + " aspectRatio " + aspectRatio);
      console.log("divWR " + divWR[21] + " " + divWR[22] + " heightCorrected " + heightCorrected);
      console.log("heightCorrected - heightCorrected/divHR[0] " + (heightCorrected - (heightCorrected / divHR[0])) );
  
      node
          /*.attr("x", function(d, i) {
            var x; (i+1) == 1 ? x = d.x - width/6.5 : (i+1) == 2 ? x = d.x - width/10.57 : x = d.x - width/10.57; return x; })
          .attr("y", function(d, i) { var y; (i+1) == 1 ? y = d.y - height/4.35 : (i+1) == 2 ? y = d.y - height/7.25 : y = d.y - height/3.29; return y; });/**/
      
        /*.attr("x", function (d, i) { 
          var x; (i + 1) == 1 ? x = d.x - width / divW[17] : (i + 1) == 2 ? x = d.x - width / divW[18] : x = d.x - width / divW[18]; 
          return x; })
        .attr("y", function (d, i) {
           var y; (i + 1) == 1 ? y = d.y - heightCorrected / divH[10] : (i + 1) == 2 ? y = d.y - heightCorrected / divH[0] : y = d.y - heightCorrected / divH[11]; 
          console.log("i " + i + "d.x "+ d.x + "d.y" + d.y);
           return y; });/**/

        .attr("x", function (d, i) {
            var x; (i + 1) == 1 ? x = width / divW[12] : (i + 1) == 2 ? x = width / divW[14] : x = width / divW[16];
            return x;
          })
        .attr("y", function (d, i) {
          var y; (i + 1) == 1 ? y = heightCorrected / divH[3] : (i + 1) == 2 ? y = heightCorrected / divH[6] : y = heightCorrected / divH[8];
          console.log("i " + i + "d.x " + d.x + "d.y" + d.y);
          return y;
        });/**/
    }


  }
  render () {  

    return (
      <>
        <div ref={this.main} className={styles.containerRoot}></div>
      </>
    
    )
  }
  
};
export default Home;