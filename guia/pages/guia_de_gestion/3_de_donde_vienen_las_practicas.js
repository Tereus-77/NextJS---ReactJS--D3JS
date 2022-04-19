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

  getMenuBreadcrumbs() {
    guiaApi.getMenuBreadcrumbs().then(res => {
      this.setState({
        menuBreadcrumbs: res
      })
    })
  }

  getGuias() {
    guiaApi.getGuias().then(res => {
      this.setState({
        guia: res
      })
    })
  }

    //selected circle shadow 
  selectedcircleshadow(svg, height) {
    var g1 = svg.append('g');
    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "selectedcircleshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
      .attr("stdDeviation", height/300)
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
  shadow (svg, x, y, w, h) {
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
      .attr("rx", 20)								// radius
      .attr("ry", 20)	
  }
  gradientRect(svg, x, y, w, h, radio, stroke, strokeWidth) {
    svg.append('rect')
      //.classed('outlined', true)
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .style("stroke", stroke)
      .style("stroke-width", strokeWidth)
      .attr("rx", h / radio)			// 15					// radius
      .attr("ry", h / radio);	// 15

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .style("stroke", stroke)
      .style("stroke-width", strokeWidth)
      .attr("rx", h / radio)			// 15					// radius
      .attr("ry", h / radio);	// 15
  }

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

    const w_pageTitleBg = rp(920, 'x', width, height);
    const h_pageTitleBg = rp(100.42, 'x', width, height);    
    const x_pageTitle = rp(914, 'x', width, height);
    const y_pageTitle = rp(110, 'x', width, height);
    const w_pageTitle = rp(800, 'x', width, height);
    const h_pageTitle = rp(100, 'x', width, height);
    const letterSpacing_pageTitle = rp(4, 'x', width, height);
    const fontSize_pageTitle = rp(26, 'x', width, height);
    const fontFamily_pageTitle = 'Oswald';
    const style_pageTitle = 'font-family:' + fontFamily_pageTitle + ';font-weight:bold;font-size:' + fontSize_pageTitle + 'px;letter-spacing:' + letterSpacing_pageTitle + 'px;color:#FFFFFF';

    const svg = d3.select(element)
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      //class to make it responsive
      .classed("svg-content-responsive", true)

      gradients(svg);

    

    

    //tooltip ~~~~~~~~~~~~~~~~~~~~~~~~~

    //tooltip rectangle
    svg.append('rect')
      .attr('x', rp(872.72, 'x', width, height))
      .attr('y', rp(139,'x', width, height))
      .attr('rx', 10)
      .attr('ry', 10)
      .style("fill", "url(#bgLinGradB)")
      .transition()
      .delay(200)
      .attr('width', w_pageTitleBg)
      .attr('height', h_pageTitleBg);

    //tooltip triangle    
    const x_triangle = rp(1164, 'x', width, height)
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
        valueSetTriangle['fill'] = '#337a90'
        valueSetTriangle['filter'] = ''    
    setTriangle(valueSetTriangle)   

    const text = ["¿DESDE DÓNDE VIENEN LAS PRÁCTICAS DE GESTIÓN EN LAS","ETAPAS DE LA CADENA DE SUMINISTRO Y SU ANÁLISIS?"]

    for(var i=0; i<text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText( svg, 1, 'textGradientBold' + i, 
                  rp(872.72, 'x', width, height), 
                  (rp(150, 'x', width, height) + (i * rp(41.1, 'x', width, height))),
                  w_pageTitleBg,
                  rp(36, 'x', width, height),
                  text[i], 
                  rp(26, 'x', width, height), 'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))

    /******************************
    mainLines - Start
    *******************************/ 
    //main~~~~~~~~~~~~~~~~~~~~~~~~~
    //first down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", x_triangle)
      .attr("y1", rp(238, 'x', width, height))
      .attr("x2", x_triangle)
      .attr("y2", rp(257, 'x', width, height))

    //first two way line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(587.16, 'x', width, height))
      .attr("y1", rp(257.34, 'x', width, height))
      .attr("x2", rp(1422.23, 'x', width, height))
      .attr("y2", rp(257.34, 'x', width, height))

    //second down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(587.16, 'x', width, height))
      .attr("y1", rp(257.34, 'x', width, height))
      .attr("x2", rp(587.16, 'x', width, height))
      .attr("y2", rp(288.06, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, heightCorrected)

    //third down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1000, 'x', width, height))
      .attr("y1", rp(257.34, 'x', width, height))
      .attr("x2", rp(1000, 'x', width, height))
      .attr("y2", rp(288.06, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      
    getArrowEnd(svg, heightCorrected)

    //fourth down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1422.23, 'x', width, height))
      .attr("y1", rp(257.34, 'x', width, height))
      .attr("x2", rp(1422.23, 'x', width, height))
      .attr("y2", rp(288.06, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      
    getArrowEnd(svg, heightCorrected)

    //second two way line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(587.16, 'x', width, height))
      .attr("y1", rp(765.88, 'x', width, height))
      .attr("x2", rp(1422.23, 'x', width, height))
      .attr("y2", rp(765.88, 'x', width, height))

    //fifth down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(587.16, 'x', width, height))
      .attr("y1", rp(731.07, 'x', width, height))
      .attr("x2", rp(587.16, 'x', width, height))
      .attr("y2", rp(765.88, 'x', width, height))

    //sixth down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(800, 'x', width, height))
      .attr("y1", rp(731.07, 'x', width, height))
      .attr("x2", rp(800, 'x', width, height))
      .attr("y2", rp(778.23, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      
    getArrowEnd(svg, heightCorrected)

    //seventh down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1422.23, 'x', width, height))
      .attr("y1", rp(731.07, 'x', width, height))
      .attr("x2", rp(1422.23, 'x', width, height))
      .attr("y2", rp(765.88, 'x', width, height))
    
    // first up-down arrwo line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(800, 'x', width, height))
      .attr("y1", rp(839.14, 'x', width, height))
      .attr("x2", rp(800, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      
    getArrowEnd(svg, heightCorrected)

    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(800, 'x', width, height))
      .attr("y1", rp(885.33, 'x', width, height))
      .attr("x2", rp(800, 'x', width, height))
      .attr("y2", rp(839.14, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      
    getArrowEnd(svg, heightCorrected)

    //second up-down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(979.6, 'x', width, height))
      .attr("y1", rp(804.17, 'x', width, height))
      .attr("x2", rp(979.6, 'x', width, height))
      .attr("y2", rp(927.89, 'x', width, height))

    // firt right arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(932.04, 'x', width, height))
      .attr("y1", rp(804.17, 'x', width, height))
      .attr("x2", rp(979.6, 'x', width, height))
      .attr("y2", rp(804.17, 'x', width, height))

    //second right arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(932.04, 'x', width, height))
      .attr("y1", rp(927.89, 'x', width, height))
      .attr("x2", rp(979.6, 'x', width, height))
      .attr("y2", rp(927.89, 'x', width, height))

    //third right arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(979.6, 'x', width, height))
      .attr("y1", rp(869.37, 'x', width, height))
      .attr("x2", rp(1026.74, 'x', width, height))
      .attr("y2", rp(869.37, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    
    /******************************
    mainLines - Finish
    *******************************/ 
      
    getArrowEnd(svg, heightCorrected)
    //first big block
    this.shadow(svg, 
                rp(274.29, 'x', width, height),
                rp(321.67, 'x', width, height),
                rp(384, 'x', width, height),
                rp(419.57, 'x', width, height))
    this.gradientRect(svg, 
                      rp(274.29, 'x', width, height),
                      rp(321.67, 'x', width, height),
                      rp(384, 'x', width, height),
                      rp(419.57, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'A.- LEVANTAMIENTO DE BUENAS PRÁCTICAS A PARTIR DE ENTREVISTAS Y REPORTES DE SOSTENIBILIDAD 2020.',
      'Entrevistas en profundidad:<br/>'+
      '<ul style="line-height: 130%;padding-left: 10%"><li> Natura</li>'+
      '<li> Casa ideas</li>'+
      '<li> Sura</li>'+
      '<li> Sodimac</li>'+
      '<li> Falabella</li>'+
      '<li> BCI</li>'+
      '<li> Colbún</li>'+
      '<li> PYMES</li>'+
      '<li> Otras</li></ul>'+
      'Reportes sostenibilidad:<br/>'+
      '<ul style="line-height: 130%;padding-left: 10%"><li> Financiero: SURA - SANTANDER</li>'+
      '<li> Retailer: JUMBO - SODIMAC</li>'+
      '<li> Productivo: CODELCO - LIPIGAS</li>'+
      '<li> Consumo Masivo: LOREAL – NATURA – NESTLÉ, Otras</li></ul>'
    ]
    setHtmlText(svg, 1, 'text'+i, 
                (rp(295.39, 'x', width, height)),
                (rp(355.56, 'x', width, height)),
                (rp(342.86, 'x', width, height)),
                (rp(834.79, 'x', width, height)),
                text[0], 
                (rp(12, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
    setHtmlText(svg, 1, 'text'+i, 
                (rp(295.39, 'x', width, height)),
                (rp(408.52, 'x', width, height)),
                (rp(342.86, 'x', width, height)),
                (rp(834.79, 'x', width, height)),
                text[1], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'black', '')

    //first small block
    this.shadow(svg, 
                rp(512, 'x', width, height),
                rp(292.43, 'x', width, height),
                rp(147.7, 'x', width, height),
                rp(48.25, 'x', width, height))
    this.gradientRect(svg, 
                      rp(512, 'x', width, height),
                      rp(292.43, 'x', width, height),
                      rp(147.7, 'x', width, height),
                      rp(48.25, 'x', width, height),
                      heightCorrected / radio + 10, "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))
    
    text = ['INDUSTRIA LOCAL']
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text'+i, 
                (rp(530.39, 'x', width, height)),
                (rp(309.68, 'x', width, height)),
                (rp(640, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[0], 
                (rp(13.72, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')

    //second big block
    this.shadow(svg, 
                rp(685.72, 'x', width, height),
                rp(321.67, 'x', width, height),
                rp(384, 'x', width, height),
                rp(419.57, 'x', width, height))
    this.gradientRect(svg, 
                      rp(685.72, 'x', width, height),
                      rp(321.67, 'x', width, height),
                      rp(384, 'x', width, height),
                      rp(419.57, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'B.- LEVANTAMIENTO DE BUENAS PRÁCTICAS DE EMPRESAS CHILENAS DE DISTINTAS CATEGORÍAS CON PARTICIPACIÓN EN DOW JONES:',
      '<ul style="line-height: 130%;padding-left: 10%"><li> AntarChile</li>'+
      '<li> Copec</li>'+
      '<li> CCU</li>'+
      '<li> Parque Arauco</li>'+
      '<li> CMPC</li>'+
      '<li> Colbún'
    ]    
    setHtmlText(svg, 1, 'text', 
                (rp(711.12, 'x', width, height)),
                (rp(355.56, 'x', width, height)),
                (rp(342.86, 'x', width, height)),
                (rp(834.79, 'x', width, height)),
                text[0], 
                (rp(12, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
    setHtmlText(svg, 1, 'text', 
                (rp(711.12, 'x', width, height)),
                (rp(408.52, 'x', width, height)),
                (rp(342.86, 'x', width, height)),
                (rp(834.79, 'x', width, height)),
                text[1], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'black', '')

    //second small block
    this.shadow(svg, 
                rp(923.08, 'x', width, height),
                rp(292.43, 'x', width, height),
                rp(147.7, 'x', width, height),
                rp(48.25, 'x', width, height))
    this.gradientRect(svg, 
                      rp(923.08, 'x', width, height),
                      rp(292.43, 'x', width, height),
                      rp(147.7, 'x', width, height),
                      rp(48.25, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/mila.png")
      .attr("x", rp(945.82, 'x', width, height))
      .attr("y", rp(301.57, 'x', width, height))
      .attr("width", rp(101.06, 'x', width, height))

     //third big block
    this.shadow(svg, 
                rp(1097.15, 'x', width, height),
                rp(321.67, 'x', width, height),
                rp(384, 'x', width, height),
                rp(419.57, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1097.15, 'x', width, height),
                      rp(321.67, 'x', width, height),
                      rp(384, 'x', width, height),
                      rp(419.57, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'C- LEVANTAMIENTO BUENAS PRÁCTICAS DE ABASTECIMIENTO EN EMPRESAS GOLD DEL DOW JONES INDEX, DE LAS SIGUIENTES CATEGORÍAS (*):',
      '<ul style="line-height: 130%;padding-left: 10%"><li> Grupo Nutresa (alimentos)</li>'+
      '<li> Adidas (textiles-confección)</li>'+
      '<li> ITOCHU Corp (comercio –distribución)</li>'+
      '<li> Samsung (equipos-instrumentos-electrónicos)</li>'+
      '<li> Teck resources ltd (metales-minería)</li>'+
      '<li> UPM-Kymmene OYJ (productos madereros – papeleros)</li>'+
      '<li> Unilever NV (productos personales)</li>'+
      '<li> Sodexo FR (restaurantes – centros recreativos)</li>'+
      '<li> Industria de Diseño Textil (retail)</li>'+
      '<li> Allianz GE (seguros)</li>'+
      '<li> True Corp PCl Thai (servicios de telecomunicaciones)</li>'+
      '<li> Waste Management Inc (suministros y servicios comerciales)</li>'+
      '<li> Otros</li></ul>'
    ]
    
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text'+i, 
                (rp(1122.81, 'x', width, height)),
                (rp(355.56, 'x', width, height)),
                (rp(342.86, 'x', width, height)),
                (rp(834.79, 'x', width, height)),
                text[0], 
                (rp(12, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
     //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text'+i, 
                (rp(1122.81, 'x', width, height)),
                (rp(408.52, 'x', width, height)),
                (rp(342.86, 'x', width, height)),
                (rp(834.79, 'x', width, height)),
                text[1], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'black', '')
 
     //third small block
    this.shadow(svg, 
                rp(1333.34, 'x', width, height),
                rp(292.43, 'x', width, height),
                rp(147.7, 'x', width, height),
                rp(48.25, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1333.34, 'x', width, height),
                      rp(292.43, 'x', width, height),
                      rp(147.7, 'x', width, height),
                      rp(48.25, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/dow.png")
      .attr("x", rp(1342.66, 'x', width, height))
      .attr("y", rp(301.57, 'x', width, height))
      .attr("width", rp(131.42, 'x', width, height))

    //fourth block
    this.gradientRect(svg, 
                      rp(60, 'x', width, height),
                      rp(804.17, 'x', width, height),
                      rp(480, 'x', width, height),
                      rp(120.63, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    svg.append("text")
        .attr("x", rp(426.67, 'x', width, height))
        .attr("y", rp(839.14, 'x', width, height))
        .attr("dx", "0px")
        .attr("dy", "0px")
        .text('LINKS')
        .style("font-size", rp(16.17, 'x', width, height))
        .style("font-weight", "bold")
        .style("font-family", "Roboto")

    const img = [
      '/img/repositorio_web-17.png',
      '/img/repositorio_web-19.png',
      '/img/repositorio_web-20.png',
      '/img/repositorio_web-21.png',
      '/img/repositorio_web-22.png',
      '/img/repositorio_web-23.png',
    ]

    for(var i = 0; i < img.length; i ++)
      svg.append("image")
        .attr("xlink:href", window.location.origin + img[i])
        .attr("x", width/32 + 
        i* rp(80.85, 'x', width, height))
        .attr("y", rp(861.61, 'x', width, height))
        .attr("width", rp(60.76, 'x', width, height))

    //first bottom left line
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');

      svg.append('rect')
      .classed('filled', true)
      .attr('x', 0)
      .attr('y', rp(846.5, 'x', width, height))
      .attr('width', rp(480, 'x', width, height))
      .attr('height', rp(3.22, 'x', width, height));

    //dot 
    svg.append("circle")
      .attr("cx", rp(480, 'x', width, height))
      .attr("cy", rp(847.98, 'x', width, height))
      .attr("r", rp(3.86, 'x', width, height))
      .style("fill", "#82368C")

    //fifth block
    this.shadow(svg, 
                rp(640, 'x', width, height),
                rp(784.56, 'x', width, height),
                rp(295.39, 'x', width, height),
                rp(48.25, 'x', width, height))
    this.gradientRect(svg, 
                      rp(640, 'x', width, height),
                      rp(784.56, 'x', width, height),
                      rp(295.39, 'x', width, height),
                      rp(48.25, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'BUENAS PRÁCTICAS: LÍNEA BASE Y REFERENCIAS'
    ]
    setHtmlText(svg, 1, 'textBox', 
                rp(640, 'x', width, height),
                rp(794.24, 'x', width, height),
                rp(295.39, 'x', width, height),
                rp(784.56, 'x', width, height),
                text[0], 
                rp(13.72, 'x', width, height),
                'Roboto', 'center', 0, 'black', 'bold','')


    //sixth block
    this.shadow(svg, 
                rp(640, 'x', width, height),
                rp(893.52, 'x', width, height),
                rp(295.39, 'x', width, height),
                rp(48.25, 'x', width, height))
    this.gradientRect(svg, 
                      rp(640, 'x', width, height),
                      rp(893.52, 'x', width, height),
                      rp(295.39, 'x', width, height),
                      rp(48.25, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'ETAPAS DEL PROCESO DE APROVISIONAMIENTO'
    ]

    setHtmlText(svg, 1, 'textBox', 
                rp(640, 'x', width, height),
                rp(901.87, 'x', width, height),
                rp(295.39, 'x', width, height),
                rp(784.56, 'x', width, height),
                text[0], 
                rp(13.72, 'x', width, height),
                'Roboto', 'center', 0, 'black', 'bold','')

    //seventh block
    this.shadow(svg, 
                rp(1037.84, 'x', width, height),
                rp(797.53, 'x', width, height),
                rp(160, 'x', width, height),
                rp(137.86, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1037.84, 'x', width, height),
                      rp(797.53, 'x', width, height),
                      rp(160, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Pertinencia de las practicas en cada etapa del proceso'
    ]
    setHtmlText(svg, 1, 'textBox', 
                rp(1054.95, 'x', width, height),
                rp(807.54, 'x', width, height),
                rp(120, 'x', width, height),
                rp(137.86, 'x', width, height),
                text[0], 
                rp(12.8, 'x', width, height),
                'Roboto', 'left', 0, 'black', '','')
    
    //eigth block
    this.shadow(svg, 
                rp(1207.55, 'x', width, height),
                rp(797.53, 'x', width, height),
                rp(160, 'x', width, height),
                rp(137.86, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1207.55, 'x', width, height),
                      rp(797.53, 'x', width, height),
                      rp(160, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Competencia mandante, proveedor o compartida en cada etapa del proceso y asociación a práctica'
    ]
    setHtmlText(svg, 1, 'textBox', 
                rp(1226.84, 'x', width, height),
                rp(807.54, 'x', width, height),
                rp(128, 'x', width, height),
                rp(137.86, 'x', width, height),
                text[0], 
                rp(12.8, 'x', width, height),
                'Roboto', 'left', 0, 'black', '','')

    //nineth block
    this.shadow(svg, 
                rp(1376.35, 'x', width, height),
                rp(797.53, 'x', width, height),
                rp(160, 'x', width, height),
                rp(137.86, 'x', width, height))
    this.gradientRect(svg,
                      rp(1376.35, 'x', width, height),
                      rp(797.53, 'x', width, height),
                      rp(160, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Asociación de prácticas y competencia a dimensiones OCDE (ya definidas desde el inicio)'
    ]
    setHtmlText(svg, 1, 'textBox', 
                rp(1396.37, 'x', width, height),
                rp(807.54, 'x', width, height),
                rp(128, 'x', width, height),
                rp(137.86, 'x', width, height),
                text[0], 
                rp(12.8, 'x', width, height),
                'Roboto', 'left', 0, 'black', '','')

    //tenth block
    this.shadow(svg, 
                rp(1545.9, 'x', width, height),
                rp(797.53, 'x', width, height),
                rp(160, 'x', width, height),
                rp(137.86, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1545.9, 'x', width, height),
                      rp(797.53, 'x', width, height),
                      rp(160, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Asociación de prácticas, competencia y dimensiones OCDE a los 10 principios de pacto global'
    ]
    setHtmlText(svg, 1, 'textBox', 
                rp(1564.8, 'x', width, height),
                rp(807.54, 'x', width, height),
                rp(128, 'x', width, height),
                rp(137.86, 'x', width, height),
                text[0], 
                rp(12.8, 'x', width, height),
                'Roboto', 'left', 0, 'black', '','')

    //eleventh block
    this.shadow(svg, 
                rp(1714.29, 'x', width, height),
                rp(797.53, 'x', width, height),
                rp(160, 'x', width, height),
                rp(137.86, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1714.29, 'x', width, height),
                      rp(797.53, 'x', width, height),
                      rp(160, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Asociación de práctica competencia dimensiones OCDE principios de pacto global y ODS'
    ]
    setHtmlText(svg, 1, 'textBox', 
                rp(1734.42, 'x', width, height),
                rp(807.54, 'x', width, height),
                rp(128, 'x', width, height),
                rp(137.86, 'x', width, height),
                text[0], 
                rp(12.8, 'x', width, height),
                'Roboto', 'left', 0, 'black', '','')

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

    theCircleShadow(svg, height);
    selectedcircleshadow(svg, height);
    menuCircles(svg, width, height, x_triangle, 1);
    /******************************
    Section 3 - headerMenu - Finish
    *******************************/

    /******************************
    Sidebar - Start
    *******************************/
    getSideBarLines(svg, width);
    
    getSideBarGuia(svg, width, heightCorrected, styles.grow);
    /******************************
    Sidebar - End
    *******************************/
    
    /******************************
      Brand corner - begin
    *******************************/
    headerCornerLogo(svg, width, heightCorrected);
    /******************************
      Brand corner - end
    *******************************/

    /******************************
    Section 3 - breadcrumb - Start
    *******************************/
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', '¿De dónde vienen las prácticas?');
    /******************************
    Section 3 - breadcrumb - End
    *******************************/
  }

  //svg table
  svgtablecontent= (element) => {
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

    const svg = d3.select(element)
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      //class to make it responsive
      .classed("svg-content-responsive", true)

    //linkref
    this.gradientRect(svg, 
                      rp(64, 'x', width, height),
                      rp(622.59, 'x', width, height),
                      rp(349.1, 'x', width, height),
                      rp(120.63, 'x', width, height),
                      heightCorrected / radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))
    
    //second bottom left line
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');

    svg.append('rect')
      .classed('filled', true)
      .attr('x', 0)
      .attr('y', rp(678.15, 'x', width, height))
      .attr('width', rp(384, 'x', width, height))
      .attr('height', rp(3.22, 'x', width, height));

    //second dot 
    svg.append("circle")
      .attr("cx", rp(384, 'x', width, height))
      .attr("cy", rp(679.58, 'x', width, height))
      .attr("r", rp(3.86, 'x', width, height))
      .style("fill", "#82368C")

    const text = [
      'Link Guía ODS',
      'https://www.pactomundial.org/wp-content/uploads/20',
      '16/09/Guia_ODS_online.pdf'
    ]
    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(96, 'x', width, height)),
                  ((rp(649.53, 'x', width, height))+
                  (i*rp(12, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold',)
    for(var i=1; i < text.length; i++)
      //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlTextLink(svg, 1, 'text'+i, 
                      (rp(83.48, 'x', width, height)),
                      ((rp(676.06, 'x', width, height))+
                      (i*rp(14.77, 'x', width, height))),
                      (rp(640, 'x', width, height)),
                      (rp(19.2, 'x', width, height)),
                      text[i], 
                      (rp(13.25, 'x', width, height)),
                      'Roboto', 'left', 0, 'black', '', 'https://www.pactomundial.org/wp-content/uploads/2016/09/Guia_ODS_online.pdf')

    //reflink end
    svg.append("rect")
      .attr("width", rp(1280, 'x', width, height))
      .attr("height", rp(69.93, 'x', width, height))
      .attr("fill", "#a5a5a5")
      .attr("x", rp(505.27, 'x', width, height))
      .attr("y", rp(106.67, 'x', width, height))
    
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(117.69, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '10 PRINCIPIOS PACTO GLOBAL', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold',)
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(144.03, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '4 DIMENSIONES OCDE: DDHH, TRABAJO, MEDIO AMBIENTE, ÉTICA, PROBIDAD Y RESOLUCIÓN DE CONFLICTOS', 
                (rp(19.2, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '')

    //celda A1
    svg.append("rect")
      .attr("width", rp(300, 'x', width, height))
      .attr("height", rp(155.65, 'x', width, height))
      .attr("fill", "#f2b21b")
      .attr("x", rp(505.27, 'x', width, height))
      .attr("y", rp(178.71, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(193, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '1', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
    const textA1 = [
      'Las empresas deben apoyar y respetar la protección de los Derechos Humanos'+
      ' fundamentales, reconocidos internacionalmente, dentro de su ámbito de influencia.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(229.77, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textA1[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )
    //celda A2
    svg.append("rect")
      .attr("width", rp(300, 'x', width, height))
      .attr("height", rp(155.65, 'x', width, height))
      .attr("fill", "#f4bf42")
      .attr("x", rp(805.04, 'x', width, height))
      .attr("y", rp(178.71, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
                (rp(820.52, 'x', width, height)),
                (rp(193, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '2', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
    const textA2 = [
      'Las empresas deben asegurarse que sus empresas no son cómplices en la vulneración de los Derechos Humanos.',
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(820.52, 'x', width, height)),
                (rp(229.77, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textA2[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )
    //celda A3
    setHtmlText(svg, 1, 'text', 
                (rp(1122.81, 'x', width, height)),
                (rp(196.94, 'x', width, height)),
                (rp(76.8, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                'DERECHOS HUMANOS', 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
    svg.append("line")                 
      .style("stroke", "#f4bf42")         
      .style("stroke-width", rp(3, 'x', width, height))
      .style("stroke-linecap", "butt")
      .attr("x1", rp(1122.81, 'x', width, height))
      .attr("y1", rp(235.37, 'x', width, height))
      .attr("x2", rp(1202.26, 'x', width, height))
      .attr("y2", rp(235.37, 'x', width, height))
      
    //celda B1
    svg.append("rect")
      .attr("width", rp(300, 'x', width, height))
      .attr("height", rp(155.65, 'x', width, height))
      .attr("fill", "#34b6ec")
      .attr("x", rp(505.27, 'x', width, height))
      .attr("y", rp(332.76, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
              (rp(518.92, 'x', width, height)),
              (rp(350.91, 'x', width, height)),
              (rp(1280, 'x', width, height)),
              (rp(139.14, 'x', width, height)),
              '3', 
              (rp(22.59, 'x', width, height)),
              'Roboto', 'left', 0, 'white', 'bold')
    const textB1 = [
      'Las empresas deben apoyar la libertad de afiliación y el reconocimiento efectivo del derecho a la negociación colectiva.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(390.69, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textB1[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )
    //celda B2
    svg.append("rect")
      .attr("width", rp(300, 'x', width, height))
      .attr("height", rp(155.65, 'x', width, height))
      .attr("fill", "#5cc4f0")
      .attr("x", rp(805.04, 'x', width, height))
      .attr("y", rp(332.76, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
                (rp(820.52, 'x', width, height)),
                (rp(350.91, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '4', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
    const textB2 = [
      'Las empresas deben apoyar la eliminación de toda forma de trabajo forzoso o realizado bajo coacción.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(820.52, 'x', width, height)),
                (rp(390.69, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textB2[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )
    //celda B3
    svg.append("rect")
      .attr("width", rp(300, 'x', width, height))
      .attr("height", rp(155.65, 'x', width, height))
      .attr("fill", "#34b6ec")
      .attr("x", rp(1104.72, 'x', width, height))
      .attr("y", rp(332.76, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
                (rp(1122.81, 'x', width, height)),
                (rp(350.91, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '5', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
    const textB3 = [
      'Las empresas deben apoyar la erradicación del trabajo infantil.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(1122.81, 'x', width, height)),
                (rp(390.69, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textB3[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )
    //celda B4
    svg.append("rect")
      .attr("width", rp(300, 'x', width, height))
      .attr("height", rp(155.65, 'x', width, height))
      .attr("fill", "#5cc4f0")
      .attr("x", rp(1404.54, 'x', width, height))
      .attr("y", rp(332.76, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
                (rp(1416.98, 'x', width, height)),
                (rp(350.91, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '6', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
    const textB4 = [
      'Las empresas deben apoyar la abolición de las prácticas de discriminación en el empleo y la ocupación.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(1416.98, 'x', width, height)),
                (rp(390.69, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textB4[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )

    //celda B5
    setHtmlText(svg, 1, 'text', 
      (rp(1717.36, 'x', width, height)),
      (rp(347.13, 'x', width, height)),
      (rp(87.28, 'x', width, height)),
      (rp(139.14, 'x', width, height)),
      'NORMAS LABORALES', 
      (rp(14.77, 'x', width, height)),
      'Roboto', 'left', 0, 'black', 'bold')
    svg.append("line")                 
      .style("stroke", "#34b6ec")         
      .style("stroke-width", rp(3, 'x', width, height))
      .style("stroke-linecap", "butt")
      .attr("x1", rp(1717.36, 'x', width, height))
      .attr("y1", rp(386, 'x', width, height))
      .attr("x2", rp(1802.82, 'x', width, height))
      .attr("y2", rp(386, 'x', width, height));
    //celda C1
    svg.append("rect")
      .attr("width", rp(300, 'x', width, height))
      .attr("height", rp(155.65, 'x', width, height))
      .attr("fill", "#5f864d")
      .attr("x", rp(505.27, 'x', width, height))
      .attr("y", rp(487.38, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(502.61, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '7', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
    const textC1 = [
      'Las empresas deberán mantener un enfoque preventivo que favorezca el medio ambiente.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(543.67, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textC1[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )

    //celda C2
    svg.append("rect")
      .attr("width", rp(300, 'x', width, height))
      .attr("height", rp(155.65, 'x', width, height))
      .attr("fill", "#7a9965")
      .attr("x", rp(805.04, 'x', width, height))
      .attr("y", rp(487.38, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
                (rp(820.52, 'x', width, height)),
                (rp(502.61, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '8', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
    const textC2 = [
      'Las empresas deben fomentar las iniciativas que promuevan una mayor responsabilidad ambiental.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(820.52, 'x', width, height)),
                (rp(543.67, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textC2[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )

    //celda C3
    svg.append("rect")
        .attr("width", rp(300, 'x', width, height))
        .attr("height", rp(155.65, 'x', width, height))
        .attr("fill", "#5f864d")
        .attr("x", rp(1104.72, 'x', width, height))
        .attr("y", rp(487.38, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
              (rp(1122.81, 'x', width, height)),
              (rp(502.61, 'x', width, height)),
              (rp(1280, 'x', width, height)),
              (rp(139.14, 'x', width, height)),
              '9', 
              (rp(22.59, 'x', width, height)),
              'Roboto', 'left', 0, 'white', 'bold')

    const textC3 = [
      'Las empresas deben favorecer el desarrollo y la difusión de las tecnologías respetuosas con el medio ambiente.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(1122.81, 'x', width, height)),
                (rp(543.67, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textC3[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )

    //celda C4
    setHtmlText(svg, 1, 'text', 
                (rp(1416.98, 'x', width, height)),
                (rp(502.61, 'x', width, height)),
                (rp(87.28, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                'MEDIO AMBIENTE', 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
    svg.append("line")                 
      .style("stroke", "#5f864d")         
      .style("stroke-width", rp(3, 'x', width, height))
      .style("stroke-linecap", "butt")
      .attr("x1", rp(1416.98, 'x', width, height))
      .attr("y1", rp(542.14, 'x', width, height))
      .attr("x2", rp(1494.17, 'x', width, height))
      .attr("y2", rp(542.14, 'x', width, height));
    //celda D1
    svg.append("rect")
        .attr("width", rp(300, 'x', width, height))
        .attr("height", rp(155.65, 'x', width, height))
        .attr("fill", "#e6472e")
        .attr("x", rp(505.27, 'x', width, height))
        .attr("y", rp(642.48, 'x', width, height))
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(658.71, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '10', 
                (rp(22.59, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
    const textD1 = [
      'Las empresas deben trabajar contra la corrupción en todas sus formas, incluidas extorsión y soborno.'
    ]
    setHtmlText(svg, 1, 'text', 
                (rp(518.92, 'x', width, height)),
                (rp(696.76, 'x', width, height)),
                (rp(274.29, 'x', width, height)),
                (rp(155.65, 'x', width, height)),
                textD1[0], 
                (rp(12.8, 'x', width, height)),
                'Roboto', 'left', 0, 'white', '', )

    //celda D2
    setHtmlText(svg, 1, 'text', 
                (rp(818.77, 'x', width, height)),
                (rp(660.96, 'x', width, height)),
                (rp(128, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                'LUCHA CONTRA LA CORRUPCIÓN', 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
    svg.append("line")                 
      .style("stroke", "#e6472e")         
      .style("stroke-width", rp(3, 'x', width, height))
      .style("stroke-linecap", "butt")
      .attr("x1", rp(820.52, 'x', width, height))
      .attr("y1", rp(699.28, 'x', width, height))
      .attr("x2", rp(941.18, 'x', width, height))
      .attr("y2", rp(699.28, 'x', width, height));
  }
  //table the 10 principles
  svgtable10principles= (element) => {
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

    const svg = d3.select(element)
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      //class to make it responsive
      .classed("svg-content-responsive", true)
      //linkref
    this.gradientRect(svg, 
                      rp(64, 'x', width, height),
                      rp(622.59, 'x', width, height),
                      rp(349.1, 'x', width, height),
                      rp(120.63, 'x', width, height),
                      heightCorrected / radio + 10, "url(#bgLinGradB)",
                      rp(1.61, 'x', width, height))

    
    //second bottom left line
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');

    svg.append('rect')
      .classed('filled', true)
      .attr('x', 0)
      .attr('y', rp(678.15, 'x', width, height))
      .attr('width', rp(384, 'x', width, height))
      .attr('height', rp(3.22, 'x', width, height));

    //second dot 
    svg.append("circle")
      .attr("cx", rp(384, 'x', width, height))
      .attr("cy", rp(679.58, 'x', width, height))
      .attr("r", rp(3.86, 'x', width, height))
      .style("fill", "#82368C")

    const text = [
      'Link Guía ODS',
      'https://www.pactomundial.org/wp-content/uploads/20',
      '16/09/Guia_ODS_online.pdf'
    ]
    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(96, 'x', width, height)),
                  ((rp(649.53, 'x', width, height))+
                  (i*rp(12, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(19.2, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold',)
    for(var i=1; i < text.length; i++)
      //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlTextLink(svg, 1, 'text'+i, 
                      (rp(83.48, 'x', width, height)),
                      ((rp(676.06, 'x', width, height))+
                      (i*rp(14.77, 'x', width, height))),
                      (rp(640, 'x', width, height)),
                      (rp(19.2, 'x', width, height)),
                      text[i], 
                      (rp(13.25, 'x', width, height)),
                      'Roboto', 'left', 0, 'black', '', 'https://www.pactomundial.org/wp-content/uploads/2016/09/Guia_ODS_online.pdf')

    //reflink end
      svg.append("image")
        .attr("xlink:href", window.location.origin + "/img/losdiezprincipiosgrafico.png")
        .attr("x", 1)
        .attr("y", 1)
        .attr("width", width*0.825)
        .attr("height", height*0.825)
      svg.append("rect")
        .attr("width", rp(640, 'x', width, height))
        .attr("height", rp(96.5, 'x', width, height))
        .attr("fill", "#a5a5a5")
        .attr("x", rp(1200, 'x', width, height))
        .attr("y", rp(96.5, 'x', width, height))
      setHtmlText(svg, 1, 'text', 
                  (rp(1230.77, 'x', width, height)),
                  (rp(110.92, 'x', width, height)),
                  (rp(640, 'x', width, height)),
                  (rp(96.5, 'x', width, height)),
                  'LOS DIEZ PRINCIPIOS', 
                  (rp(32.17, 'x', width, height)),
                  'Roboto', 'left', 0, 'white', 'bold', )
      setHtmlText(svg, 1, 'text', 
                  (rp(1230.77, 'x', width, height)),
                  (rp(148.92, 'x', width, height)),
                  (rp(640, 'x', width, height)),
                  (rp(96.5, 'x', width, height)),
                  'de la Red de Pacto Global', 
                  (rp(24.13, 'x', width, height)),
                  'Roboto', 'left', 0, 'white', '', )

      //10principlesA1
      svg.append("circle")
        .attr("cx",rp(1246.76, 'x', width, height))
        .attr("cy", rp(226, 'x', width, height))
        .attr("r", rp(23.54, 'x', width, height))
        .style("stroke", "#f4bf42")
        .style("fill", "#f4bf42")
      setHtmlText(svg, 1, 'text', 
                  (rp(1246.76, 'x', width, height)),
                  (rp(201.89, 'x', width, height)),
                  (rp(128, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  'DERECHOS HUMANOS', 
                  (rp(20.98, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
      
      //10principlesA2
      svg.append("circle")
        .attr("cx", rp(1476.93, 'x', width, height))
        .attr("cy", rp(226, 'x', width, height))
        .attr("r", rp(23.54, 'x', width, height))
        .style("stroke", "#34b6ec")
        .style("fill", "#34b6ec")
      setHtmlText(svg, 1, 'text', 
                  (rp(1476.93, 'x', width, height)),
                  (rp(201.89, 'x', width, height)),
                  (rp(128, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  'NORMAS LABORALES', 
                  (rp(20.98, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
      
      //10principlesB1
      svg.append("circle")
        .attr("cx",rp(1246.76, 'x', width, height))
        .attr("cy", rp(286.36, 'x', width, height))
        .attr("r", rp(23.54, 'x', width, height))
        .style("stroke", "#5f864d")
        .style("fill", "#5f864d")
      setHtmlText(svg, 1, 'text', 
                (rp(1246.76, 'x', width, height)),
                (rp(260.82, 'x', width, height)),
                (rp(128, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                'MEDIO AMBIENTE', 
                (rp(20.98, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
      
      //10principlesB2
      svg.append("circle")
        .attr("cx", rp(1476.93, 'x', width, height))
        .attr("cy", rp(286.36, 'x', width, height))
        .attr("r", rp(23.54, 'x', width, height))
        .style("stroke", "#e6472e")
        .style("fill", "#e6472e")
      setHtmlText(svg, 1, 'text', 
                  (rp(1476.93, 'x', width, height)),
                  (rp(260.82, 'x', width, height)),
                  (rp(240, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  'LUCHA CONTRA LA CORRUPCIÓN', 
                  (rp(20.98, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')

      //item numbers
      //yellow
      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(350.91, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#f4bf42")
        .style("fill", "#f4bf42")
      setHtmlText(svg, 1, 'text', 
                  (rp(1210.6, 'x', width, height)),
                  (rp(338.6, 'x', width, height)),
                  (rp(1280, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  '1', 
                  (rp(19.3, 'x', width, height)),
                  'Roboto', 'left', 0, 'white', 'bold')
      const text1 = [
          'Las empresas deben apoyar y respetar la protección de los derechos humanos fundamentales, reconocidos internacionalmente, dentro de su ámbito de influencia.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(335.07, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text1[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(400.42, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#f4bf42")
        .style("fill", "#f4bf42")
      setHtmlText(svg, 1, 'text', 
                  (rp(1210.6, 'x', width, height)),
                  (rp(389.12, 'x', width, height)),
                  (rp(1280, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  '2', 
                  (rp(19.3, 'x', width, height)),
                  'Roboto', 'left', 0, 'white', 'bold')
      const text2 = [
          'Las empresas deben asegurarse de que sus empresas no son cómplices en la vulneración de los Derechos Humanos.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(386, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text2[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      //blue
      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(456.27, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#34b6ec")
        .style("fill", "#34b6ec")
      setHtmlText(svg, 1, 'text', 
                  (rp(1210.6, 'x', width, height)),
                  (rp(447.39, 'x', width, height)),
                  (rp(1280, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  '3', 
                  (rp(19.3, 'x', width, height)),
                  'Roboto', 'left', 0, 'white', 'bold')
      const text3 = [
        'Las empresas deben apoyar la libertad de afiliación y el reconocimiento efectivo del derecho a la negociación colectiva.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(442.67, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text3[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(513.3, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#34b6ec")
        .style("fill", "#34b6ec")
      setHtmlText(svg, 1, 'text', 
                  (rp(1210.6, 'x', width, height)),
                  (rp(502.61, 'x', width, height)),
                  (rp(1280, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  '4', 
                  (rp(19.3, 'x', width, height)),
                  'Roboto', 'left', 0, 'white', 'bold')
      const text4 = [
          'Las empresas deben apoyar la eliminación de toda forma de trabajo forzoso o realizado bajo coacción.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(497.43, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text4[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(564.33, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#34b6ec")
        .style("fill", "#34b6ec")
      setHtmlText(svg, 1, 'text', 
                (rp(1210.6, 'x', width, height)),
                (rp(553.01, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '5', 
                (rp(19.3, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
      const text5 = [
          'Las empresas deben apoyar la erradicación del trabajo infantil.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(551.43, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text5[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(620.18, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#34b6ec")
        .style("fill", "#34b6ec")
      setHtmlText(svg, 1, 'text', 
                (rp(1210.6, 'x', width, height)),
                (rp(608.84, 'x', width, height)),
                (rp(1280, 'x', width, height)),
                (rp(139.14, 'x', width, height)),
                '6', 
                (rp(19.3, 'x', width, height)),
                'Roboto', 'left', 0, 'white', 'bold')
      const text6 = [
          'Las empresas deben apoyar la abolición de las prácticas de discriminación en el empleo y la ocupación.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(606.92, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text6[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      //green
      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(677.2, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#5f864d")
        .style("fill", "#5f864d")
      setHtmlText(svg, 1, 'text', 
              (rp(1210.6, 'x', width, height)),
              (rp(665.52, 'x', width, height)),
              (rp(1280, 'x', width, height)),
              (rp(139.14, 'x', width, height)),
              '7', 
              (rp(19.3, 'x', width, height)),
              'Roboto', 'left', 0, 'white', 'bold')
      const text7 = [
          'Las empresas deberán mantener un enfoque preventivo que favorezca el medio ambiente.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(665.06, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text7[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(733.85, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#5f864d")
        .style("fill", "#5f864d")
      setHtmlText(svg, 1, 'text', 
            (rp(1210.6, 'x', width, height)),
            (rp(722.85, 'x', width, height)),
            (rp(1280, 'x', width, height)),
            (rp(139.14, 'x', width, height)),
            '8', 
            (rp(19.3, 'x', width, height)),
            'Roboto', 'left', 0, 'white', 'bold')
      const text8 = [
          'Las empresas deben fomentar las iniciativas que promuevan una mayor responsabilidad',
          'ambiental.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(720.15, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text8[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(784.56, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#5f864d")
        .style("fill", "#5f864d")
      setHtmlText(svg, 1, 'text', 
            (rp(1210.6, 'x', width, height)),
            (rp(773.24, 'x', width, height)),
            (rp(1280, 'x', width, height)),
            (rp(139.14, 'x', width, height)),
            '9', 
            (rp(19.3, 'x', width, height)),
            'Roboto', 'left', 0, 'white', 'bold')
      const text9 = [
          'Las empresas deben favorecer el desarrollo y la difusión de las tecnologías respetuosas con',
          'el medioambiente.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(772, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text9[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

      //red
      svg.append("circle")
        .attr("cx", rp(1215.19, 'x', width, height))
        .attr("cy", rp(839.14, 'x', width, height))
        .attr("r", rp(14.85, 'x', width, height))
        .style("stroke", "#e6472e")
        .style("fill", "#e6472e")
      setHtmlText(svg, 1, 'text', 
            (rp(1205.28, 'x', width, height)),
            (rp(828.33, 'x', width, height)),
            (rp(1280, 'x', width, height)),
            (rp(139.14, 'x', width, height)),
            '10', 
            (rp(19.3, 'x', width, height)),
            'Roboto', 'left', 0, 'white', 'bold')
      const text10 = [
          'Las empresas deben trabajar contra la corrupción en todas sus formas, incluidas extorsión y soborno.'
      ]
      setHtmlText(svg, 1, 'text', 
                  (rp(1250.82, 'x', width, height)),
                  (rp(821.98, 'x', width, height)),
                  (rp(564.71, 'x', width, height)),
                  (rp(139.14, 'x', width, height)),
                  text10[0], 
                  (rp(13.79, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')
  }

  render() { 
    const {guia, menuBreadcrumbs} = this.state

    return (
      <div className={styles.container}>
        <Head>
          {MetaData("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible")}
          {OpenGraph("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible", "/img/repositorio_web-01.png")}
        </Head>

          <div ref={this.main}></div>
          {/*div tabla svg*/}
          <div ref={this.svgtablecontent}></div> 
          {/*div grafico*/}
          <div ref={this.svgtable10principles}></div>
          <FooterGuia />
      </div>
    )
  }
}
export default Metodologia
