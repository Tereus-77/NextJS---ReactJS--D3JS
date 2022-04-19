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

    }

  }



  // shadow stuff:
  /*shadow(svg, x, y, w, h, delay, stdDeviation, dx, dy, rx, ry) {
    var g1 = svg.append('g');
    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "dropshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
      .attr("stdDeviation", stdDeviation) // 8
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
      .attr("dx", dx)
        .attr("dy", dy)
        .attr("result", "offsetBlur");
    filter.append("feFlood")
          .attr("in", "offsetBlur")
          .attr("flood-color", "grey")
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
      .transition()
      .duration(0)
      .delay(delay)
      .attr('width', w)
      .attr('height', h)
      .style('fill', "white")
      .attr("filter", "url(#dropshadow)")
      .attr("rx", rx) // 15								// radius
      .attr("ry", ry) // 15
  }/**/
  //gradient rect
  gradientRect(svg, x, y, w, h, radio, stroke, strokeWidth) {
    svg.append('rect')
      //.classed('outlined', true)
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .style("stroke", stroke)
      .style("stroke-width", strokeWidth)
      .attr("rx", h/radio)			// 15					// radius
      .attr("ry", h/radio);	// 15

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .style("stroke", stroke)
      .style("stroke-width", strokeWidth)
      .attr("rx", h/radio)			// 15					// radius
      .attr("ry", h/radio);	// 15
  }

  main = (element) => {
    // Obtiene el tamaño de la pantalla en uso
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Calcula el height adecuado para mantener el aspect ratio frente a cualquier resolución
    // En base a una resolución de pantalla de W:getReferenceSizeWidth() H:1080
    const refWidth = getReferenceSizeWidth();
    const refHeight = getReferenceSizeHeight();
    const heightCorrected = Math.round((refHeight * width)/refWidth);
    //const heightCorrected = Math.round(width/aspectRatio);
    if (height > width) {
      heightCorrected = Math.round((refHeight * width)/refWidth);
    }

    const radio = 80;
    const radio_small = 160;

    const w_pageTitleBg = rp(930, 'x', width, height);
    const h_pageTitleBg = rp(100.42, 'x', width, height);
    const x_pageTitle = rp(690, 'x', width, height);
    const y_pageTitle = rp(110, 'x', width, height);
    const w_pageTitle = rp(820, 'x', width, height);
    const h_pageTitle = rp(100, 'x', width, height);
    const letterSpacing_pageTitle = rp(4, 'x', width, height);
    const fontSize_pageTitle = rp(26, 'x', width, height);
    const fontFamily_pageTitle = 'Oswald';
    const style_pageTitle = 'font-family:' + fontFamily_pageTitle + ';font-weight:bold;font-size:' + fontSize_pageTitle + 'px;letter-spacing:' + letterSpacing_pageTitle + 'px;color:#FFFFFF';

    const w_pageSubTitleBg = 4 * (w_pageTitleBg/5)
    const h_pageSubTitleBg = rp(100.42, 'x', width, height);
    const x_pageSubTitleBg = x_pageTitle + w_pageTitleBg/5;
    const y_pageSubTitleBg = rp(100.42, 'x', width, height);
    const x_pageSubTitle = rp(690, 'x', width, height);
    const y_pageSubTitle = rp(210, 'x', width, height);
    const w_pageSubTitle = rp(790, 'x', width, height);
    const h_pageSubTitle = rp(100, 'x', width, height);
    const letterSpacing_pageSubTitle = rp(0, 'x', width, height);
    const fontSize_pageSubTitle = rp(20, 'x', width, height);
    const fontFamily_pageSubTitle = 'Oswald';
    const style_pageSubTitle = 'font-family:' + fontFamily_pageSubTitle + ';font-weight:normal;font-size:' + fontSize_pageSubTitle + 'px;letter-spacing:' + letterSpacing_pageSubTitle + 'px;color:#90278D';

    
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
      20, // radio circulo menu
      5,  // radio circulo pequeño
      30, // radio circulo grande
      2, // stroke-width circulo menu
      10, // radio circulo que redondea la línea
      15, // corner radio
      6, // standard deviation
      25, // 30
      33,
      17,
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
      20, //menu behind gradient bar height
      15, // dy segunda línea de texto menu
      50, // corner radio
      8,
      40, //20
      4, // deviation
      3, // 
      2,
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
      resizeRatioWidth = refWidth/width;
    } else {
      resizeRatioWidth = width/refWidth;
    }
    if (heightCorrected >= refHeight) {
      resizeRatioHeight = refHeight/heightCorrected;
    } else {
      resizeRatioHeight = heightCorrected/refHeight;
    }

    if (heightCorrected == width) {
      //resizeRatioHeight = resizeRatioWidth;
    }
    //Recalcula las variables cada magnitud absoluta utilizada para posicionar o dar tamaño a elementos SVG
    for (let i = 0; i < divH.length; i++) {
      /*if (heightCorrected >= width) {
        divHR[i] = (divH[i] * heightCorrected)/refHeight;
      } else {
        divHR[i] = divH[i] * resizeRatioHeight;
      }
      /**/
      divHR[i] = (divH[i] * heightCorrected)/refHeight;
      if (i == 0) {
        console.log("(divH[0] * heightCorrected)/refHeight " + (divH[0] * heightCorrected)/refHeight);
      }
    }
    for (let i = 0; i < divW.length; i++) {
      divWR[i] = divW[i] * resizeRatioWidth;
    }

    height = heightCorrected;

    const svg = d3.select(element)
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + heightCorrected)
      //class to make it responsive
      .classed("svg-content-responsive", true)
      .append("g");
    //footer
    getFooter(svg, width, height)
    gradients(svg);
    

    



    // declare each delay
    const delay1 = 300
    const delay2 = 400
    const delay3 = 600
    const delay4 = 800
    const delay5 = 1000

  //tooltop ~~~~~~~~~~~~~~~~~~~~~~~~~
    //white block
    svg.append('rect')
      .attr('x', rp(1058, 'x', width, height))
      .attr('y', rp(225, 'x', width, height))
      .attr('rx', divWR[27])
      .attr('ry', divWR[27])
      .transition()
      .delay(delay1)
      .attr('width', w_pageSubTitleBg)
      .attr('height', rp(55.15, 'x', width, height))
      .style('fill', 'white')

    /*svg.append("text")
      .attr("x", rp(914.29, 'x', width, height))
      .attr("y", rp(253.95, 'x', width, height))
      .transition()
      .delay(delay1)
      .text("Resultado de la agregación, análisis e integración de 4 etapas")
      .attr("font-weight", 400)
      .attr("font-size", rp(21.34, 'x', width, height))
      .attr("font-family", "Oswald")
      .style('fill', '#93278F')/**/
    svg.append("foreignObject")
      .attr('id', 'pageSubTitleFO')
      .attr('x', rp(1300, 'x', width, height))
      .attr('y', rp(225, 'x', width, height))
      .attr("width", w_pageSubTitle)
      .attr("height", h_pageSubTitle)
      .html(function (d) {
        return '<div style="' + style_pageSubTitle + '"><p align="justify">Resultado de la agregación, análisis e integración de 4 etapas</p></div>'
      })

    //tooltip rectangle
    svg.append('rect')
      //.classed('filled', true)
      .attr('x', rp(872.72, 'x', width, height))
      .attr('y', rp(139,'x', width, height))
      .attr('rx', divWR[27]) //10
      .attr('ry', divWR[27])
      .style("fill", "url(#bgLinGradB)")
      .transition()
      .delay(delay1)
      .attr('width', w_pageTitleBg)
      .attr('height', h_pageTitleBg)

    //tooltip triangle    
    const x_triangle = rp(924, 'x', width, height)
    const y_triangle = rp(140,'x', width, height)
    const vertexA = (-rp(40,'x', width, height)) //valor negativo indica punta arriba
    const vertexBX = (-rp(25,'x', width, height))
    const vertexBY = (0)
    const vertexCX = (rp(25,'x', width, height))
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
        valueSetTriangle['fill'] = '#1fad77'
        valueSetTriangle['filter'] = ''    
    setTriangle(valueSetTriangle)    

    const textGradientBold = [
      'METODOLOGÍA: ¿DESDE DÓNDE SE CONSTRUYE LA GUÍA PARA', 'LA GESTIÓN DE UNA CADENA DE SUMINISTRO SOSTENIBLE?'
    ]
    
    for (var i = 0; i < textGradientBold.length; i++)
      setHtmlText( svg, 1, 'textGradientBold' + i, 
                  rp(872.72, 'x', width, height), 
                  (rp(150, 'x', width, height) + (i * rp(41.1, 'x', width, height))),
                  w_pageTitleBg,
                  rp(36, 'x', width, height),
                  textGradientBold[i], 
                  rp(26, 'x', width, height), 'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))
    
    /*svg.append('rect')

      .attr('x', rp(629.51, 'x', width, height))
      .attr('y', rp(123.72, 'x', width, height))
      .attr('width', rp(872.73, 'x', width, height))
      .attr('height', rp(102.99, 'x', width, height))
      .style('stroke', 'red')
      .style("fill", "transparent")*/

    //first down arrow line 
    svg.append('line')
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5
      .attr("x1", x_triangle)
      .attr("y1", rp(238,'x', width, height))
      .attr("x2", x_triangle)
      .attr("y2", rp(280,'x', width, height))

    svg.append('line')
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5
      .attr("x1", rp(579,'x', width, height))
      .attr("y1", rp(278,'x', width, height))
      .attr("x2", x_triangle)
      .attr("y2", rp(278,'x', width, height))


    svg.append('line')
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5
      .attr("x1", rp(581.82, 'x', width, height))
      .attr("y1", rp(280,'x', width, height))
      .attr("x2", rp(581.82, 'x', width, height))
      .attr("y2", rp(311.3, 'x', width, height))
      .attr("marker-end", "url(#triangle)");

    getArrowEnd(svg, height)
    

    //first right arrow line
    svg.append('line')
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5

      .attr("x1", rp(685.72, 'x', width, height))
      .attr("y1", rp(393.88, 'x', width, height))
      .attr("x2", rp(758.9, 'x', width, height))
      .attr("y2", rp(393.88, 'x', width, height))
      .attr("marker-end", "url(#triangle)");

    getArrowEnd(svg, height)
    

    //second right arrow line
    svg.append('line')
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5

      .attr("x1", rp(1010.53, 'x', width, height))
      .attr("y1", rp(393.88, 'x', width, height))
      .attr("x2", rp(1066.67, 'x', width, height))
      .attr("y2", rp(393.88, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, height)
    

    //third right arrow line
    svg.append('line')
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5
      .attr("x1", rp(1306.13, 'x', width, height))
      .attr("y1", rp(393.88, 'x', width, height))
      .attr("x2", rp(1381.3, 'x', width, height))
      .attr("y2", rp(393.88, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, height)
    


    //second down arrow line
    svg.append("line")
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5
      .attr("x1", rp(581.82, 'x', width, height))
      .attr("y1", rp(459.53, 'x', width, height))
      .attr("x2", rp(581.82, 'x', width, height))
      .attr("y2", rp(606.92, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, height)
    

    // first block
    shadow(svg, 
            rp(457.15, 'x', width, height),
            rp(321.67, 'x', width, height),
            rp(240, 'x', width, height),
            rp(150.79, 'x', width, height),
            height/radio + 10, 
            rp(8, 'x', width, height))
    this.gradientRect(svg, 
                      rp(457.15, 'x', width, height),
                      rp(321.67, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(150.79, 'x', width, height),
                      height/radio + 10, "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    const text = [
      '1º IDENTIFICACIÓN DE', 'NORMATIVAS', 'ASOCIADAS AL APS A', 'NIVEL NACIONAL E', 'INTERNACIONAL'
    ];
    for (var i = 0; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(471.75, 'x', width, height)),
                  ((rp(331.04, 'x', width, height)) +
                  (i * rp(25.27, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(17.46, 'x', width, height)),
                  'Oswald', 'left', 0, 'black', '')

    //third down arrow line
    svg.append("line")
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5

      .attr("x1", rp(893.03, 'x', width, height))
      .attr("y1", rp(459.53, 'x', width, height))
      .attr("x2", rp(893.03, 'x', width, height))
      .attr("y2", rp(507.9, 'x', width, height))
      .attr("marker-end", "url(#triangle)");

    getArrowEnd(svg, height)
    

    //second block
    shadow(svg, 
            rp(768, 'x', width, height),
            rp(321.67, 'x', width, height),
            rp(240, 'x', width, height),
            rp(150.79, 'x', width, height), 
            height/radio + 10, 
            rp(8, 'x', width, height))
    this.gradientRect(svg, 
                      rp(768, 'x', width, height),
                      rp(321.67, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(150.79, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      '2º EVALUACIÓN', 'ACTUAL PROCESO DE', 'APROVISIONAMIENTO', 'EN CHILE'
    ]
    for (var i = 0; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(783.68, 'x', width, height)),
                  ((rp(331.04, 'x', width, height)) +
                  (i * rp(25.27, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(17.46, 'x', width, height)),
                  'Oswald', 'left', 0, 'black', '')

    //third block
    shadow(svg, 
            rp(1078.66, 'x', width, height),
            rp(321.67, 'x', width, height),
            rp(240, 'x', width, height),
            rp(150.79, 'x', width, height),
            height/radio + 10, 
            rp(8, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1078.66, 'x', width, height),
                      rp(321.67, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(150.79, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      '3º LEVANTAMIENTO', 'BUENAS PRÁCTICAS:', '• Nacional Internacional: Mila, Dow', '\u00A0\u00A0Jones, destacados industria local', '• Revisión y registro de más de 30', '\u00A0\u00A0reportes'
    ]
    for (var i = 0; i < 2; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1097.15, 'x', width, height)),
                  ((rp(331.04, 'x', width, height)) +
                  (i * rp(25.27, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(17.46, 'x', width, height)),
                  'Oswald', 'left', 0, 'black', '')
    for (var i = 2; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1097.15, 'x', width, height)),
                  (rp(355.56, 'x', width, height) +
                  (i * rp(17.46, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.13, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //fourth block
    shadow(svg, 
            rp(1391.31, 'x', width, height),
            rp(321.67, 'x', width, height),
            rp(240, 'x', width, height),
            rp(150.79, 'x', width, height),
            height/radio + 10, 
            rp(8, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1391.31, 'x', width, height),
                      rp(321.67, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(150.79, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      '4º EVALUACIÓN', 'PROTOTIPO GUÍA'
    ]
    for (var i = 0; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1411.77, 'x', width, height)),
                  ((rp(331.04, 'x', width, height)) +
                  (i * rp(25.27, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(17.46, 'x', width, height)),
                  'Oswald', 'left', 0, 'black', '')

    //left arrow line
    svg.append("line")
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5

      .attr("x1", rp(768, 'x', width, height))
      .attr("y1", rp(564.33, 'x', width, height))
      .attr("x2", rp(698.19, 'x', width, height))
      .attr("y2", rp(564.33, 'x', width, height));

    //third  down arrow line
    svg.append("line")
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5
      .attr("x1", rp(698.19, 'x', width, height))
      .attr("y1", rp(564.33, 'x', width, height))
      .attr("x2", rp(698.19, 'x', width, height))
      .attr("y2", rp(603.13, 'x', width, height))
      .attr("marker-end", "url(#triangle)");

    getArrowEnd(svg, height)
    

    //second right arrow line 
    svg.append("line")
      .style("stroke", "#93278F")
      .style("stroke-width", rp(5, 'x', width, height)) // 5

      .attr("x1", rp(1078.66, 'x', width, height))
      .attr("y1", rp(564.33, 'x', width, height))
      .attr("x2", rp(1010.53, 'x', width, height))
      .attr("y2", rp(564.33, 'x', width, height));

    //fourth down arrow line
    svg.append("line")
      .style("stroke", "#93278F")
      .style("stroke-width", rp(5, 'x', width, height)) // 5

      .attr("x1", rp(1078.66, 'x', width, height))
      .attr("y1", rp(564.33, 'x', width, height))
      .attr("x2", rp(1078.66, 'x', width, height))
      .attr("y2", rp(603.13, 'x', width, height))
      .attr("marker-end", "url(#triangle)");

    getArrowEnd(svg, height)
    

    //fifth down arrow line
    svg.append("line")
      .style("stroke", "#93278F")
      .style("stroke-width", divWR[24]) // 5

      .attr("x1", rp(1511.82, 'x', width, height))
      .attr("y1", rp(473.04, 'x', width, height))
      .attr("x2", rp(1511.82, 'x', width, height))
      .attr("y2", rp(603.13, 'x', width, height))
      .attr("marker-end", "url(#triangle)");

    getArrowEnd(svg, height)
    

    //fifth block
    shadow(svg, 
            rp(768, 'x', width, height),
            rp(521.63, 'x', width, height),
            rp(240, 'x', width, height),
            rp(74.24, 'x', width, height),
            height/radio + 10, 
            rp(8, 'x', width, height))
    this.gradientRect(svg, 
                      rp(768, 'x', width, height),
                      rp(521.63, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(74.24, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'En actores del proceso de', 'aprovisionamiento a nivel de', 'grandes empresas y pymes'
    ]

    for (var i = 0; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(783.68, 'x', width, height)),
                  ((rp(526.03, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(17.46, 'x', width, height)),
                  'Oswald', 'left', 0, 'black', '')

    //sixth block
    shadow(svg, 
            rp(320, 'x', width, height),
            rp(614.65, 'x', width, height),
            rp(320, 'x', width, height),
            rp(275.72, 'x', width, height),
            height/radio + 10)
    this.gradientRect(svg, 
                      rp(320, 'x', width, height),
                      rp(614.65, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(275.72, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Revisión del marco regulatorio, de protocolos y', 'normativas asociadas a la relación de', 'aprovisionamiento y de manera específica a las', 'temáticas de:',
      '• DDHH', '• Derechos laborales', '• Medio ambiente', '• Ética, probidad y mediación', 'Revisión y análisis de aproximadamente de 90', 'documentos (Programa sin límites PUC)'
    ]
    for (var i = 0; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(336.85, 'x', width, height)),
                  ((rp(640, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.14, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //seventh block
    shadow(svg, 
            rp(662.07, 'x', width, height),
            rp(614.65, 'x', width, height),
            rp(320, 'x', width, height),
            rp(275.72, 'x', width, height),
            height/radio + 10, 
            rp(8, 'x', width, height))
    this.gradientRect(svg, 
                      rp(662.07, 'x', width, height),
                      rp(614.65, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(275.72, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Fase cualitativa', 'Entrevistas en profundidad a grandes empresas', 'y a pymes:', '', '10 entrevistas grandes empresas', '', '3 entrevistas a organizaciones (Ministerio',
      'Economía, ASECH y CORFO)', '', '4 entrevistas a actores relevantes: Pacto Global,', 'Cedex, Cam, GRI', '', '7 entrevistas grupales a pymes.'
    ]
    for (var i = 0; i < 1; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(673.69, 'x', width, height)),
                  ((rp(640, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 1; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(673.69, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(14.77, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.14, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //eigth block
    shadow(svg, 
            rp(1005.24, 'x', width, height),
            rp(614.65, 'x', width, height),
            rp(320, 'x', width, height),
            rp(275.72, 'x', width, height),
            height/radio + 10, 
            rp(8, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1005.24, 'x', width, height),
                      rp(614.65, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(275.72, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Fase cuantitativa', 'Encuestas online a grandes empresas', '(mandantes) y a pymes (proveedores),', 'abordando aspectos relativos a cumplimientos',
      'y procesos relacionales asociados a:', '', '• DD.HH', '• Derechos laborales', '• Medio ambiente', '• Ética, probidad y mediación', '', '20 Encuestas grandes empresas', '170 Encuestas pymes'
    ]
    for (var i = 0; i < 1; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1021.28, 'x', width, height)),
                  ((rp(640, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')

    for (var i = 1; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1021.28, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(14.77, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.14, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //nineth block
    shadow(svg, 
            rp(1347.37, 'x', width, height),
            rp(614.65, 'x', width, height),
            rp(320, 'x', width, height),
            rp(275.72, 'x', width, height),
            height/radio + 10, 
            rp(8, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1347.37, 'x', width, height),
                      rp(614.65, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(275.72, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = ['Presentación y revisión de la estructura de la', 'Guía a Pymes y Grandes Empresas'];
    for (var i = 0; i < text.length; i++)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1371.43, 'x', width, height)),
                  ((rp(640, 'x', width, height)) +
                  (i * rp(14.77, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.14, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    /******************************
    Section 3 - headerMenu - Start
    *******************************/
    // Para fade in y fade out
    svg.append('rect')
      .attr('id', 'rectWhiteFade')
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr('opacity', 1)
      .attr("fill", 'white');
    // Ejecuta fade In
    d3.select('#rectWhiteFade')
      .transition()
      .duration(getDurationAnim())
      .attr('opacity', 0)
      .duration(10)
      .attr("height", 1);

    behindHorizontalLine(svg, width, height, 'url(#bgLinGradHorizontal)');

    curvedLine(svg, width, height);

    theCircleShadow(svg, height)
    selectedcircleshadow(svg, height)
    menuCircles(svg, width, height, x_triangle, 1);
    /******************************
    Section 3 - headerMenu - Finish
    *******************************/

     /******************************
    Sidebar - Start
    *******************************/
    getSideBarLines(svg, width);
    
    getSideBarGuia(svg, width, height, styles.grow);
    /******************************
    Sidebar - End
    *******************************/

    /******************************
      Brand corner - begin
    *******************************/
    headerCornerLogo(svg, width, height);
    /******************************
      Brand corner - end
    *******************************/

    /******************************
    Section 3 - breadcrumb - Start
    *******************************/
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', 'Metodología');
    /******************************
    Section 3 - breadcrumb - End
    *******************************/
    
  }


 

  render() {
    const { guia, menuBreadcrumbs } = this.state;

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
