import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import styles from '../styles/Home.module.css'
import React from 'react'
import * as d3 from 'd3'

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
    const refWidth = 1920;
    const refHeight = 941;
    const aspectRatio = width / height;
    const aspectRatioRef = refWidth / refHeight;
    const heightCorrected = Math.round((refHeight * width) / refWidth);
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
        console.log('i ' + i)
        svg.append('rect')
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", heightCorrected)
          .attr("fill", 'white');
        if (i.index==0) {

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
            .attr("x", width / divW[9])
            .attr("y", height / divH[3])
            .attr("width", width / 3.17).style("cursor", "pointer").attr("class", styles.grow)
            .transition()
            .duration(250)
            .attr("x", width / 9)
            .attr("y", heightCorrected / 3 - heightCorrected / 20)
            .attr("width", width / 6);
          setTimeout(function() {
            window.location.href="/guia_de_gestion";
          }, 500);

        } else if (i.index==1) {

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
            .attr("x", width / divW[12])
            .attr("y", heightCorrected / divH[3])
            .attr("width", width / 3.17).style("cursor", "pointer").attr("class", styles.grow)
            .transition()
            .duration(400)
            .attr("x", width / divW[13])
            .attr("y", heightCorrected / divH[5])
            .attr("width", width / 17.27)

          // second image
          svg.append("image")
            .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
            .attr("x", width / divW[14])
            .attr("y", heightCorrected / divH[6])
            .attr("width", width / 4.75).style("cursor", "pointer").attr("class", styles.grow)
            .transition()
            .duration(500)
            .delay(50)
            .attr("x", width / divW[15])
            .attr("y", heightCorrected / divH[7])
            .attr("width", width/11.17)

          // third image etapas
          svg.append("image")
            .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
            .attr("x", width / divW[16])
            .attr("y", heightCorrected / divH[8])
            .attr("width", width / 4.75)
            .style("cursor", "pointer").attr("class", styles.grow)
            .transition()
            .duration(400)
            //.delay(100)
            .attr("x", width / divW[13])
            .attr("y", heightCorrected / divH[9])
            .attr("width", width / 17.27)
            

          setTimeout(function() {
            window.location.href="/buenas_practicas";
          }, 650);

        } else if (i.index==2) {
          
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
            .attr("x", width / divW[9])
            .attr("y", heightCorrected / divH[3])
            .attr("width", width/3.17)
            .style("cursor", "pointer").attr("class", styles.grow)
            .transition()
            .duration(500)
            .attr("x", width / divW[13])
            .attr("y", heightCorrected / divH[5])
            .attr("width", width / 17.27)

          // second image
          svg.append("image")
            .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
            .attr("x", width / divW[14])
            .attr("y", heightCorrected / divH[6])
            .attr("width", width/4.75)
            .style("cursor", "pointer").attr("class", styles.grow)
            .transition()
            .duration(500)
            //.delay(50)
            .attr("x", width / divW[13])
            .attr("y", heightCorrected / divH[9])
            .attr("width", width / 17.27)
            

          // third image etapas
          svg.append("image")
            .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
            .attr("x", width / divW[16])
            .attr("y", heightCorrected / divH[12])
            .attr("width", width/4.75)
            .style("cursor", "pointer").attr("class", styles.grow)
            .transition()
            .duration(500)
            //.delay(100)
            .attr("x", width / divW[15])
            .attr("y", heightCorrected / divH[7])
            .attr("width", width / 11.17)
            

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
      .tick(300);/**/

    
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
  
      node
        .attr("x", function (d, i) {
            var x; (i + 1) == 1 ? x = width / divW[12] : (i + 1) == 2 ? x = width / divW[14] : x = width / divW[16];
            return x;
          })
        .attr("y", function (d, i) {
          var y; (i + 1) == 1 ? y = heightCorrected / divH[3] : (i + 1) == 2 ? y = heightCorrected / divH[6] : y = heightCorrected / divH[8];
          console.log("i " + i + "d.x " + d.x + "d.y" + d.y);
          return y;
        });
    }/**/

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