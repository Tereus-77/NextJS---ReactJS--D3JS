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

class Contenido extends Component {
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
 
// shadow stuff:
  /*shadow (svg, x, y, w, h, radio) {
    var g1 = svg.append('g');
    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "dropshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", h/80)
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
      .attr('rx', h/radio)
      .attr('ry', h/radio);
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
    height = heightCorrected;
    const radio = 80;
    const radio_small = 160;

    const w_pageTitleBg = rp(920, 'x', width, height);
    const h_pageTitleBg = rp(100.42, 'x', width, height);
    const x_pageTitle = rp(790, 'x', width, height);
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

    //footer
    getFooter(svg, width, height)
    gradients(svg);

    //tooltop ~~~~~~~~~~~~~~~~~~~~~~~~~
    
    //tooltip rectangle
    svg.append('rect')
      //.classed('filled', true)
      .attr('x', rp(872.72, 'x', width, height))
      .attr('y', rp(139,'x', width, height))
      .attr('rx', height/radio)
      .attr('ry', height/radio)
      .style("fill", "url(#bgLinGradB)")
      .transition()
      .delay(200)
      .attr('width', w_pageTitleBg)
      .attr('height', h_pageTitleBg);//height/9.37
    
    //tooltip triangle    
    const x_triangle = rp(1044, 'x', width, height)
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
        valueSetTriangle['fill'] = '#2b9180'
        valueSetTriangle['filter'] = ''    
    setTriangle(valueSetTriangle)   

    const text = ['¿QUÉ CONTIENE LA GUÍA PARA GESTIÓN DE UNA CADENA','DE SUMINISTRO SOSTENIBLE?'
    ]
    
    for(var i=0; i<text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText( svg, 1, 'textGradientBold' + i, 
                  rp(872.72, 'x', width, height), 
                  (rp(150, 'x', width, height) + (i * rp(41.1, 'x', width, height))),
                  w_pageTitleBg,
                  rp(36, 'x', width, height),
                  text[i], 
                  rp(26, 'x', width, height), 'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))

  //main~~~~~~~~~~~~~~~~~~~~~~~~~
    //first down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", x_triangle)
      .attr("y1", rp(238,'x', width, height))
      .attr("x2", x_triangle)
      .attr("y2", rp(280,'x', width, height))

    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", rp(685.72, 'x', width, height))
      .attr("y1", rp(275.72, 'x', width, height))
      .attr("x2", rp(685.72, 'x', width, height))
      .attr("y2", rp(306.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

      getArrowEnd(svg, height)


    //first right arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", rp(685.72, 'x', width, height))
      .attr("y1", rp(278.1, 'x', width, height))
      .attr("x2", rp(1371.43, 'x', width, height))
      .attr("y2", rp(278.1, 'x', width, height))

      //second down arrow line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", rp(1371.43, 'x', width, height))
      .attr("y1", rp(278.1, 'x', width, height))
      .attr("x2", rp(1371.43, 'x', width, height))
      .attr("y2", rp(736.65, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, height)

    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", rp(1371.43, 'x', width, height))
      .attr("y1", rp(278.1, 'x', width, height))
      .attr("x2", rp(1371.43, 'x', width, height))
      .attr("y2", rp(306.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, height)
    
    //first block
    shadow(svg, 
            rp(369.24, 'x', width, height),
            rp(311.3, 'x', width, height),
            rp(640, 'x', width, height),
            rp(402.09, 'x', width, height),
            height/radio+10, 
            rp(6, 'x', width, height))
    this.gradientRect(svg, 
                      rp(369.24, 'x', width, height),
                      rp(311.3, 'x', width, height),
                      rp(640, 'x', width, height),
                      rp(402.09, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))
    //svg.append("rect")
      //.attr('x', width/5.2)
      //.attr('y', height/3.1)
      //.attr('width', width/3)
      //.attr('height', height/2.4)
      //.attr("stroke", "url(#bgLinGradB)")
     // .attr("fill", "white")
     // .attr('rx', height/radio)
      //.attr('ry', height/radio);

    text = [
      'ABORDAJE DESDE LA CADENA DE SUMINISTRO', '', 'Una propuesta de etapas de gestión de la cadena de suministro:', '',
      'Necesidad, solicitud del pedido, fuentes de aprovisionamiento, creación y seguimiento orden',
      'de compra/contrato, ejecución del servicio y administración del contrato, recepción de',
      'mercancías, recepción del servicio, recepción de facturas, verificación de facturas, proceso',
      'de pago, evaluación y cierre.', '',
      '• La identificación de roles de mandante/proveedor en cada etapa de la cadena', '',
      '• La identificación de riesgos y oportunidades en cada etapa de la cadena', '',
      '• La identificación de oportunidades en las distintas etapas de la cadena de suministro'
    ]
    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(400, 'x', width, height)),
                  ((rp(329.9, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(19.2, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for(var i=1; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(400, 'x', width, height)),
                  ((rp(342.86, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(19.2, 'x', width, height)),
                  text[i], 
                  (rp(14.23, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //seond block
    shadow(svg, 
            rp(1026.74, 'x', width, height),
            rp(311.3, 'x', width, height),
            rp(640, 'x', width, height),
            rp(402.09, 'x', width, height),
            height/radio, 
            rp(6, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1026.74, 'x', width, height),
                      rp(311.3, 'x', width, height),
                      rp(640, 'x', width, height),
                      rp(402.09, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'PRÁCTICAS DE GESTIÓN EN LAS ETAPAS DE LA CADENA DE SUMINISTRO', 
      '• Identificación de buenas prácticas, a nivel nacional e internacional, y de riesgos de gestión', 'para cada una de las etapas de la cadena de suministro.','',
      '• Identificación de seis niveles ascendentes de buenas prácticas para cada etapa de la', '\u00A0\u00A0cadena.', '',
      '• Identificación de roles de mandantes, proveedores y compartidos para cada práctica en las', '\u00A0\u00A0distintas etapas de la cadena de suministro.', '',
      '• Asociación de cada práctica en las distintas etapas de la cadena de suministro a las',
      '\u00A0\u00A0dimensiones OCDE: derechos humanos, medio ambiente, trabajo y ética, probidad y', '\u00A0\u00A0resolución de conflictos.', '',
      '• Asociación de cada práctica en las distintas etapas de la cadena de suministro a los 10', '\u00A0\u00A0principios de pacto global.', '',
      '• Asociación de cada práctica en las distintas etapas de la cadena de suministro a los', '\u00A0\u00A0Objetivos de Desarrollo Sostenible (ODS).', ''
    ]
    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(1054.95, 'x', width, height)),
                  ((rp(329.9, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(19.2, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for(var i=1; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(1054.95, 'x', width, height)),
                  ((rp(342.86, 'x', width, height))+
                  (i*rp(17.46, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(19.2, 'x', width, height)),
                  text[i], 
                  (rp(14.23, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //third block
    this.gradientRect(svg, 
                      rp(1192.55, 'x', width, height),
                      rp(742.31, 'x', width, height),
                      rp(336.85, 'x', width, height),
                      rp(48.25, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))
    //svg.append("rect")
     // .attr('x', width/1.61)
     // .attr('y', height/1.3)
     // .attr('width', width/5.7)
     // .attr('height', height/20)
     // .attr("stroke", "url(#bgLinGradB)")
     // .attr("fill", "white")
     // .attr('rx', height/radio)
     // .attr('ry', height/radio);      
      
   text = ['¿DESDE DÓNDE VIENEN LAS PRÁCTICAS?']
   for(var i=0; i < text.length; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text'+i, 
                (rp(1207.55, 'x', width, height)),
                ((rp(757.4, 'x', width, height))+
                (i*rp(19.2, 'x', width, height))),
                (rp(640, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(16, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
    
    //third down arrow line
    svg.append("line")
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", rp(1371.43, 'x', width, height))
      .attr("y1", rp(790.99, 'x', width, height))
      .attr("x2", rp(1371.43, 'x', width, height))
      .attr("y2", rp(831.9, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, height)

    //fourth down arrow line
    svg.append("line")
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", rp(1263.16, 'x', width, height))
      .attr("y1", rp(810.93, 'x', width, height))
      .attr("x2", rp(1263.16, 'x', width, height))
      .attr("y2", rp(831.9, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, height)

      //fifth down arrow line
    svg.append("line")
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", rp(1476.93, 'x', width, height))
      .attr("y1", rp(810.93, 'x', width, height))
      .attr("x2", rp(1476.93, 'x', width, height))
      .attr("y2", rp(831.9, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    getArrowEnd(svg, height)

      //third down arrow line
    svg.append("line")
      .style("stroke", "#82368C")
      .style("stroke-width", rp(4.83, 'x', width, height))
      .attr("x1", rp(1263.16, 'x', width, height))
      .attr("y1", rp(810.93, 'x', width, height))
      .attr("x2", rp(1476.93, 'x', width, height))
      .attr("y2", rp(810.93, 'x', width, height))

    //fourth block
    this.gradientRect(svg, 
                      rp(240, 'x', width, height),
                      rp(804.17, 'x', width, height),
                      rp(274.29, 'x', width, height),
                      rp(120.63, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))
      
    text = [
      'Link OCDE', 
      'https://mneguidelines.oecd.org/Guia-de',
      '-la-OCDE-de-debida-diligencia-para-una',
      'conducta-empresarial-responsable.pdf'
    ]
    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(263.02, 'x', width, height)),
                  ((rp(827.59, 'x', width, height))+
                  (i*rp(12, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(19.2, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold',)
    for(var i=1; i < text.length; i++)
      //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlTextLink(svg, 1, 'text'+i, 
                      (rp(263.02, 'x', width, height)),
                      ((rp(857.15, 'x', width, height))+
                      (i*rp(14.77, 'x', width, height))),
                      (rp(640, 'x', width, height)),
                      (rp(13.72, 'x', width, height)),
                      text[i], 
                      (rp(13.72, 'x', width, height)),
                      'Roboto', 'left', 0, 'black', '', 
                      'https://mneguidelines.oecd.org/Guia-de-la-OCDE-de-debida-diligencia-para-una-conducta-empresarial-responsable.pdf')

      //fifth block
    this.gradientRect(svg, 
                      rp(533.34, 'x', width, height),
                      rp(804.17, 'x', width, height),
                      rp(274.29, 'x', width, height),
                      rp(120.63, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Link Pacto Global',
      'https://pactoglobal.cl/nosotros/10-prin',
      'cipios-de-pacto-global/'
    ]
    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(551.73, 'x', width, height)),
                  ((rp(827.59, 'x', width, height))+
                  (i*rp(12, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(19.2, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold',)
    for(var i=1; i < text.length; i++)
      //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlTextLink(svg, 1, 'text'+i, 
                      (rp(551.73, 'x', width, height)),
                      ((rp(857.15, 'x', width, height))+
                      (i*rp(14.77, 'x', width, height))),
                      (rp(640, 'x', width, height)),
                      (rp(13.72, 'x', width, height)),
                      text[i], 
                      (rp(13.72, 'x', width, height)),
                      'Roboto', 'left', 0, 'black', '', 
                      'https://pactoglobal.cl/nosotros/10-principios-de-pacto-globa/')

    //sixth block
    this.gradientRect(svg, 
                      rp(827.59, 'x', width, height),
                      rp(804.17, 'x', width, height),
                      rp(274.29, 'x', width, height),
                      rp(120.63, 'x', width, height),
                      height/radio + 10, 
                      "url(#bgLinGradB)", 
                      rp(1.61, 'x', width, height))

    text = [
      'Link ODS',
      'https://www.un.org/sustainabledevelop',
      'ment/es/objetivos-de-desarrollo-sosten',
      'ible/'
    ]
    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(845.82, 'x', width, height)),
                  ((rp(827.59, 'x', width, height))+
                  (i*rp(12, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(19.2, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold',)
    for(var i=1; i < text.length; i++)
      //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlTextLink(svg, 1, 'text'+i, 
                      (rp(845.82, 'x', width, height)),
                      ((rp(857.15, 'x', width, height))+
                      (i*rp(14.77, 'x', width, height))),
                      (rp(640, 'x', width, height)),
                      (rp(19.2, 'x', width, height)),
                      text[i], 
                      (rp(13.72, 'x', width, height)),
                      'Roboto', 'left', 0, 'black', '', 
                      'https://www.un.org/sustainabledevelopment/es/objetivos-de-desarrollo-sostenible/')
    
      //bottom line
    svg.append("line")
      .style("stroke", "#82368C")
      .style("stroke-width", rp(3.22, 'x', width, height))
      .attr("x1", rp(274.29, 'x', width, height))
      .attr("y1", rp(861.61, 'x', width, height))
      .attr("x2", width)
      .attr("y2", rp(861.61, 'x', width, height));

      //dot 
      svg.append("circle")
        .attr("cx", rp(274.29, 'x', width, height))
        .attr("cy", rp(861.61, 'x', width, height))
        .attr("r", height/radio_small)
        .style("fill", "#82368C");

      //seventh block
    shadow(svg, 
            rp(1222.93, 'x', width, height),
            rp(839.14, 'x', width, height),
            rp(90.96, 'x', width, height),
            rp(51.5, 'x', width, height),
            height/radio, 
            rp(6, 'x', width, height))
    svg.append("rect")
      .attr('x', rp(1222.93, 'x', width, height))
      .attr('y', rp(839.14, 'x', width, height))
      .attr('width', rp(90.96, 'x', width, height))
      .attr('height', rp(51.5, 'x', width, height))
      .attr("fill", "#82368C")
      .attr('rx', height/radio)
      .attr('ry', height/radio);

    svg.append("text")
      .attr("x", rp(1246.76, 'x', width, height))
      .attr("y", rp(871.73, 'x', width, height))
      .text('OCDE')
      .style("font-weight", "bold")
      .style("font-size", rp(16, 'x', width, height))
      .style("font-family", "Roboto")
      .style("fill", "white");
    

    //eigth block
    shadow(svg, 
            rp(1324.14, 'x', width, height),
            rp(839.14, 'x', width, height),
            rp(90.96, 'x', width, height),
            rp(51.5, 'x', width, height),
            height/radio, 
            rp(6, 'x', width, height))
    svg.append("rect")
      .attr('x', rp(1324.14, 'x', width, height))
      .attr('y', rp(839.14, 'x', width, height))
      .attr('width', rp(90.96, 'x', width, height))
      .attr('height', rp(51.5, 'x', width, height))
      .attr("fill", "#82368C")
      .attr('rx', height/radio)
      .attr('ry', height/radio);
    
    text = ['Pacto', 'Global'];

    for (var i = 0 ; i < text.length; i ++)
      svg.append("text")
        .attr("x", rp(1348.32, 'x', width, height))
        .attr("y", height/1.12 + i * (height/50))
        .text(text[i])
        .style("font-weight", "bold")
        .style("font-size", rp(16, 'x', width, height))
        .style("font-family", "Roboto")
        .style("fill", "white");

    //ninth block
    shadow(svg, 
            rp(1425.39, 'x', width, height),
            rp(839.14, 'x', width, height),
            rp(90.96, 'x', width, height),
            rp(51.5, 'x', width, height),
            height/radio, 
            rp(6, 'x', width, height))
    svg.append("rect")
      .attr('x', rp(1425.39, 'x', width, height))
      .attr('y', rp(839.14, 'x', width, height))
      .attr('width', rp(90.96, 'x', width, height))
      .attr('height', rp(51.5, 'x', width, height))
      .attr("fill", "#82368C")
      .attr('rx', height/radio)
      .attr('ry', height/radio);

    svg.append("text")
      .attr("x", rp(1454.55, 'x', width, height))
      .attr("y", rp(871.73, 'x', width, height))
      .text('ODS')
      .style("font-weight", "bold")
      .style("font-size", rp(16, 'x', width, height))
      .style("font-family", "Roboto")
      .style("fill", "white");
    
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
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', 'Contenido');
    /******************************
    Section 3 - breadcrumb - End
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
          <div ref={this.main} ></div>
      </div>
    )
  }
}
export default Contenido
