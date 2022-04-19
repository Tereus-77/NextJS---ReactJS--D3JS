import React, { Component } from "react"
import {useCallback, useState, useEffect} from "react"
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import {guiaApi} from "../api/guia-api"
import * as d3 from 'd3';
import FooterGuia from "../components/FooterGuia";
import { theCircleShadow, selectedcircleshadow, shadow } from "../../functions/circleShadow";
import { behindHorizontalLine, curvedLine, menuCircles, breadcrumb, headerCornerLogo, gradients, setTriangle } from "../../functions/headerMenu";
import { getSideBarGuia, getTimeOut, getSideBarLines, getDurationAnim } from "../../functions/sideBar";
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "../../functions/referenceSize";
import { getArrowEnd } from "../../functions/arrowEnd";
import { getFooter, getFooterImage } from "../../functions/footer";
import { setHtmlText,setHtmlTextLink } from "../../functions/htmlText";
import { OpenGraph, MetaData} from "../../functions/metaTags";

class Metodologia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guia: null,
      menuBreadcrumbs: null
    }
    this.getMenuBreadcrumbs();
    this.getGuias();
  }
  //getMenuBreadCrumbs
  getMenuBreadcrumbs() {
    guiaApi.getMenuBreadcrumbs().then(res => {
      this.setState({
        menuBreadcrumbs: res
      })
    })
  }
  //getGuias
  getGuias() {
    guiaApi.getGuias().then(res => {
      this.setState({
        guia: res
      })
    })
  }
  //circle shadow 
  circleShadow (svg) {
    var g1 = svg.append('g');
    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "circleshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");
    filter.append("feFlood")
          .attr("in", "offsetBlur")
          .attr("flood-color", "black")
          .attr("flood-opacity", "1")
          .attr("result", "offsetColor");
    filter.append("feComposite")
        .attr("in", "offsetColor")
        .attr("in2", "offsetBlur")
        .attr("operator", "in")
        .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");
  }
  //selected circle shadow 
  selectedcircleshadow (svg) {
    var g1 = svg.append('g');
    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "selectedcircleshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");
    filter.append("feFlood")
          .attr("in", "offsetBlur")
          .attr("flood-color", "black")
          .attr("flood-opacity", "1")
          .attr("result", "offsetColor");
    filter.append("feComposite")
        .attr("in", "offsetColor")
        .attr("in2", "offsetBlur")
        .attr("operator", "in")
        .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");
  }
  // shadow stuff:
  shadow (svg, x, y, w, h, rx, ry) {
    var g1 = svg.append('g');
    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "dropshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 8)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");
    filter.append("feFlood")
          .attr("in", "offsetBlur")
          .attr("flood-color", "#9a9a9a")
          .attr("flood-opacity", "1")
          .attr("result", "offsetColor");
    filter.append("feComposite")
        .attr("in", "offsetColor")
        .attr("in2", "offsetBlur")
        .attr("operator", "in")
        .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    svg.append('rect')
      .attr("x", x)
      .attr("y", y)
      .attr('width', w)
      .attr('height', h)
      .style('fill', "white")
      .attr("filter", "url(#dropshadow)")
      .attr("rx", rx)								// radius
      .attr("ry", ry)	
  }
  
  //gradient rect
  gradientRect(svg, x, y, w, h) {
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'sen-stop-left')
      .attr('offset', '0')

    mainGradient.append('stop')
      .attr('class', 'sen-stop-right')
      .attr('offset', '1');

    svg.append('rect')
      .classed('outlined', true)
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("rx", h/radio)								// radius
      .attr("ry", h / radio)	

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .attr("rx", h / radio)								// radius
      .attr("ry", h / radio)	
  }
  //small rect gradient
  gradientRectSmall(svg, x, y, w, h) {
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'sen-stop-left')
      .attr('offset', '0')

    mainGradient.append('stop')
      .attr('class', 'sen-stop-right')
      .attr('offset', '1');

    svg.append('rect')
      .classed('outlined', true)
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("rx", h / radio)								// radius
      .attr("ry", h / radio)	

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .attr("rx", h / radio)								// radius
      .attr("ry", h / radio)	
  }
  //arrow
  arrow(svg) {
    svg.append("svg:defs").append("svg:marker")
      .attr("id", "triangle")
      .attr("refX", 6)
      .attr("refY", 6)
      .attr("markerWidth", 30)
      .attr("markerHeight", 30)
      .attr("markerUnits","userSpaceOnUse")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 12 6 0 12 3 6")
      .style("fill", "#82368C");
  }
  //main
  main = (element) => {
    // Obtiene el tamaño de la pantalla en uso
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Calcula el height adecuado para mantener el aspect ratio frente a cualquier resolución
    // En base a una resolución de pantalla de W:1920 H:1080
    const refWidth = getReferenceSizeWidth();
    const refHeight = getReferenceSizeHeight();
    const heightCorrected = Math.round((refHeight * width) / refWidth);
    //const heightCorrected = Math.round(width / aspectRatio);
    if (height > width) {
      heightCorrected = Math.round((refHeight * width) / refWidth);
    }
    height = heightCorrected;
    const radio = 80;
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
      20, // radio circulo menu
      5,  // radio circulo pequeño
      30, // radio circulo grande
      2, // stroke-width circulo menu
      10, // radio circulo que redondea la línea
      15, // corner radio
      6, // standard deviation
      25, // 30
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
      20, //menu behind gradient bar height
      15, // dy segunda línea de texto menu
      50, // corner radio
      8,
      40, //20
      4, // deviation
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

    if (heightCorrected == width) {
      //resizeRatioHeight = resizeRatioWidth;
    }
    //Recalcula las variables cada magnitud absoluta utilizada para posicionar o dar tamaño a elementos SVG
    for (let i = 0; i < divH.length; i++) {
      /*if (heightCorrected >= width) {
        divHR[i] = (divH[i] * heightCorrected) / refHeight;
      } else {
        divHR[i] = divH[i] * resizeRatioHeight;
      }
      /**/
      divHR[i] = (divH[i] * heightCorrected) / refHeight;
      if (i == 0) {
        console.log("(divH[0] * heightCorrected) / refHeight " + (divH[0] * heightCorrected) / refHeight);
      }
    }

    const svg = d3.select(element)
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      //class to make it responsive
      .classed("svg-content-responsive", true)

        
    //footer
    getFooter(svg, width, height)
     
    // header white
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", rp(133.11, 'x', width, height))
      .attr("fill", "white")

    //header image
    svg.append("image")
    .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
    .attr("x", width/divW[8])
    .attr("y", height/divH[2])
    .attr("width", rp(480, 'x', width, height))
    .style("cursor", "pointer")
    .on("click", function () {
          window.location.href = '/guia_de_gestion/12_creditos_a'
      })  

    gradients(svg);

    /******************************
    Section 3 - breadcrumb - Start
    *******************************/
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', 'Colaboradores');
    /******************************
    Section 3 - breadcrumb - End
    *******************************/

    //container
    svg.append("image")
        .attr("xlink:href", window.location.origin + "/img/bg_creditos_a.png")
        .attr("x", rp(220, 'x', width, height))
        .attr("y", rp(160, 'x', width, height))
        .attr("width", rp(700, 'x', width, height))

    svg.append("image")
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
        .attr("x", rp(300, 'x', width, height))
        .attr("y", rp(450, 'x', width, height))
        .attr("width", rp(650, 'x', width, height))

    /******************************
    resume - Finish
    *******************************/
    /******************************
    people - Start
    *******************************/

    //containerPeople1
    //triangle
    var dataset = [1,2,3];
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');
    //rectGradiant
    svg.append('rect')
      .style('fill', 'url(#bgLinGradG)')
      .attr('x', rp(960, 'x', width, height))
      .attr('y', rp(0, 'x', width, height))
      .attr('width', rp(384, 'x', width, height))
      .attr('height', rp(650, 'x', width, height))
    this.shadow(svg ,
                (rp(960, 'x', width, height)) ,
                (rp(570, 'x', width, height)) ,
                (rp(384, 'x', width, height)) ,
                (rp(292.43, 'x', width, height)) ,
                rp(32, 'x', width, height),
                rp(32, 'x', width, height))
    const textTitle2 = [
      'LUIS FELIPE CUBILLOS<br/>'+
      'PRESIDENTE COMITÉ DE COMPRAS CCS'
    ]
    for(var i=0; i<textTitle2.length; i++)
    setHtmlText(svg , 1 ,
                'textTitle2'+i ,
                (rp(960, 'x', width, height)) ,
                ((rp(600, 'x', width, height))+(i*width/80)) ,
                (rp(384, 'x', width, height)) ,
                (rp(480, 'x', width, height)) ,
                textTitle2[i] ,
                (rp(18.29, 'x', width, height)) ,
                'Oswald' ,
                'center' ,
                0 ,
                '#616060')
            
    const textDescription2 = [
      ''
    ]
    for(var i=0; i<textDescription2.length; i++)
    setHtmlText(svg , 1 ,
                'textDescription2'+i ,
                (rp(990, 'x', width, height)) ,
                ((rp(200, 'x', width, height))+(i*width/100)) ,
                (rp(324, 'x', width, height)) ,
                (rp(480, 'x', width, height)) ,
                textDescription2[i] ,
                (rp(18, 'x', width, height)) ,
                'Roboto' ,
                'justify' ,
                0 ,
                'white','','','150%')    
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-07.png")
      .attr("x", rp(990, 'x', width, height))
      .attr("y", rp(695, 'x', width, height))
      .attr("width", rp(320, 'x', width, height))

    //triangle
    const x_triangle = rp(1150, 'x', width, height)
    const y_triangle = rp(571,'x', width, height)
    const vertexA = (-rp(30,'x', width, height)) //valor negativo indica punta arriba
    const vertexBX = (-rp(30,'x', width, height))
    const vertexBY = (0)
    const vertexCX = (rp(30,'x', width, height))
    const vertexCY = (0)
    
    var valueSetTriangle = []
        valueSetTriangle['svg'] = svg
        valueSetTriangle['x'] = x_triangle
        valueSetTriangle['y'] = y_triangle
        valueSetTriangle['vertexA'] = vertexA
        valueSetTriangle['vertexBX'] = vertexBX
        valueSetTriangle['vertexBY'] = vertexBY
        valueSetTriangle['vertexCX'] = vertexCX
        valueSetTriangle['vertexCY'] = vertexCY
        valueSetTriangle['fill'] = 'white'
        valueSetTriangle['filter'] = ''    
    setTriangle(valueSetTriangle)

    //containerPeople2
    //triangle

    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
    .attr('id', 'mainGradient');

    mainGradient.append('stop')
    .attr('class', 'stop-left')
    .attr('offset', '0');

    mainGradient.append('stop')
    .attr('class', 'stop-right')
    .attr('offset', '1');
    //rectGradiant
    svg.append('rect')
      //.classed('filled', true)
      .style('fill', 'url(#bgLinGradG)')
      .attr('x', rp(1401.46, 'x', width, height))
      .attr('y', rp(0, 'x', width, height))
      .attr('width', rp(384, 'x', width, height))
      .attr('height', rp(600, 'x', width, height))
    this.shadow(svg ,
                (rp(1401.46, 'x', width, height)) ,
                (rp(570, 'x', width, height)) ,
                (rp(384, 'x', width, height)) ,
                (rp(292.43, 'x', width, height)) ,
                rp(32, 'x', width, height),
                rp(32, 'x', width, height))
    const textTitle3 = [
      'TRINIDAD ALVAREZ<br/>'+
      'CENTRO INNOVACIÓN UC'
    ]
    for(var i=0; i<textTitle3.length; i++)
      setHtmlText(svg , 1 ,
                  'textTitle3'+i ,
                  (rp(1401.46, 'x', width, height)) ,
                  ((rp(600, 'x', width, height))+(i*width/80)) ,
                  (rp(384, 'x', width, height)) ,
                  (rp(480, 'x', width, height)) ,
                  textTitle3[i] ,
                  (rp(18.29, 'x', width, height)) ,
                  'Oswald' ,
                  'center' ,
                  0 ,
                  '#616060')
              
    const textDescription3 = [
      '“La sostenibilidad de la cadena de '+
      'suministro aporta directrices para '+
      'la creación de valor de su empresa '+
      'y a través de esta guía esperamos '+
      'entregar elementos estratégicos y '+
      'tácticos para poder avanzar hacia '+
      'un siguiente nivel en las relaciones '+
      'B2B, acorde a los desafíos '+
      'empresariales actuales.”'
    ]
    for(var i=0; i<textDescription3.length; i++)
    setHtmlText(svg , 1 ,
                'textDescription3'+i ,
                (rp(1439.29, 'x', width, height)) ,
                ((rp(200, 'x', width, height))+(i*width/100)) ,
                (rp(324, 'x', width, height)) ,
                (rp(480, 'x', width, height)) ,
                textDescription3[i] ,
                (rp(18, 'x', width, height)) ,
                'Roboto' ,
                'justify' ,
                0 ,
                'white','','','150%')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/centro_innocacion_anacleto.png")
      .attr("x", rp(1440, 'x', width, height))
      .attr("y", rp(695, 'x', width, height))
      .attr("width", rp(320, 'x', width, height))

    /*svg.append('rect')
      .attr('x',rp(1401.46, 'x', width, height))
      .attr('y', rp(650, 'x', width, height))
      .attr('height', rp(106, 'x', width, height))
      .attr('width', rp(384, 'x', width, height))
      .style('stroke', 'red')
      .style("fill", "transparent")*/

    //triangle
    x_triangle = rp(1593.5, 'x', width, height)
    y_triangle = rp(571,'x', width, height)
    
    var valueSetTriangle = []
        valueSetTriangle['svg'] = svg
        valueSetTriangle['x'] = x_triangle
        valueSetTriangle['y'] = y_triangle
        valueSetTriangle['vertexA'] = vertexA
        valueSetTriangle['vertexBX'] = vertexBX
        valueSetTriangle['vertexBY'] = vertexBY
        valueSetTriangle['vertexCX'] = vertexCX
        valueSetTriangle['vertexCY'] = vertexCY
        valueSetTriangle['fill'] = 'white'
        valueSetTriangle['filter'] = ''    
    setTriangle(valueSetTriangle)
    /******************************
    people - Finish
    *******************************/
    /******************************
    footerInMain - Start
    *******************************/
    svg.append("rect")
    .attr("width", window.innerWidth - 20)
    .attr("height", 70)
    .attr("fill", "white")
    .attr("x", 0)
    .attr("y", height-70)
    //photo ccs
    svg.append("image")
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-07.png")
        .attr("x", rp(1669.57, 'x', width, height))
        .attr("y", height-70)
        .attr("width", rp(192, 'x', width, height))
    /******************************
    footerInMain - Finish
    *******************************/

    
  }

  render() { 
    const {guia, menuBreadcrumbs} = this.state;

    return (
      <div className={styles.container}>
        <Head>
          {MetaData("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible")}
          {OpenGraph("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible", "/img/repositorio_web-01.png")}
        </Head>
          <div ref={this.main}></div>
      </div>
    )
  }
}
export default Metodologia