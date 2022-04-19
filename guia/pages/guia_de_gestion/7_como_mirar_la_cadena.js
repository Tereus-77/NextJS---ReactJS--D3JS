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
  gradientRect(svg, x, y, w, h,rx,ry) {
    if (window.innerHeight > window.innerWidth) {
      var width = window.innerWidth
      var height = (941/1920)*window.innerWidth
    } else {
      var width = window.innerWidth
      var height = window.innerHeight
    }
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
      //.classed('outlined', true)
      .attr('stroke', 'url(#bgLinGradB)') //bgLinGradA
      .attr('stroke-width', height/250)
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("rx", rx)								// radius
      .attr("ry", ry)	

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .attr("rx", rx)								// radius
      .attr("ry", ry)
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
      .attr("rx", 5)								// radius
      .attr("ry", 5)	

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .attr("rx", 5)								// radius
      .attr("ry", 5)
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
    const heightCorrected = Math.round((refHeight * width)/refWidth);
    //const heightCorrected = Math.round(width/aspectRatio);
    if (height > width) {
      heightCorrected = Math.round((refHeight * width)/refWidth);
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

    //footer
    getFooter(svg, width, height)
    gradients(svg);
    



    /******************************
    mainLines - Start
    *******************************/
    //big horizontal Line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1097.15, 'x', width, height))
      .attr("y1", rp(296.93, 'x', width, height))
      .attr("x2", rp(1476.93, 'x', width, height))
      .attr("y2", rp(296.93, 'x', width, height));

    //small horizontal Line
    //arrow right
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1342.66, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(1238.71, 'x', width, height))
      .attr("y2", rp(603.13, 'x', width, height))
      .attr("marker-end", "url(#triangle)");
    //arrow left
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1238.71, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(1342.66, 'x', width, height))
      .attr("y2", rp(603.13, 'x', width, height))
      .attr("marker-end", "url(#triangle)");

    //down 1
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1284.29, 'x', width, height))
      .attr("y1", rp(120.63, 'x', width, height))
      .attr("x2", rp(1284.29, 'x', width, height))
      .attr("y2", rp(299.23, 'x', width, height));
    //down 2
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1474.21, 'x', width, height))
      .attr("y1", rp(299.04, 'x', width, height))
      .attr("x2", rp(1474.21, 'x', width, height))
      .attr("y2", rp(332.76, 'x', width, height))
      .attr("marker-end", "url(#triangle)");
    //down 3
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1099.66, 'x', width, height))
      .attr("y1", rp(299.04, 'x', width, height))
      .attr("x2", rp(1099.66, 'x', width, height))
      .attr("y2", rp(332.76, 'x', width, height))
      .attr("marker-end", "url(#triangle)");
      getArrowEnd(svg, height);

    /******************************
    mainLines - Finish
    *******************************/
       
    /******************************
    tippedContainer - Start
    *******************************/
    //container1
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');

    //tooltip rectangle
    
    svg.append('rect')
      .attr('x', rp(872.72, 'x', width, height))
      .attr('y', rp(135.92, 'x', width, height))
      .attr('rx', height/radio) //10
      .attr('ry', height/radio)
      .style("fill", "url(#bgLinGradB)")
      .transition()
      .delay(200)
      .attr('width', rp(872.73, 'x', width, height))
      .attr('height', rp(102.99, 'x', width, height));
    
    const text = [
        '¿CÓMO MIRAR LA CADENA DE SUMINISTRO SOSTENIBLE',
        'DESDE LO ESTRATÉGICO Y TÁCTICO?'
      ]
    for(var i=0; i<text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText( svg, 1, 'textGradientBold' + i, 
                  (rp(872.73, 'x', width, height)),
                  ((rp(147.7, 'x', width, height)) + (i * width/46.7)),
                  (rp(872.73, 'x', width, height)),
                  rp(36, 'x', width, height),
                  text[i], 
                  rp(26, 'x', width, height), 'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))

    //container2
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(790.13, 'x', width, height),
                rp(344.65, 'x', width, height),
                rp(426.67, 'x', width, height),
                rp(521.63, 'x', width, height),
                height/radio, 
                height/radio)
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(790.13, 'x', width, height),
                      rp(344.65, 'x', width, height),
                      rp(426.67, 'x', width, height),
                      rp(521.63, 'x', width, height),
                      height/radio, 
                      height/radio)

    text = [
      'LA MIRADA ESTRATÉGICA',
      '<ul style="line-height: 150%;padding-left: 5%"><li>Alinear la gestión de la cadena de suministro con los objetivos estratégicos de la compañía.</li><br/>'+
      '<li>Potenciar la reputación corporativa de la empresa.</li><br/>'+
      '<li>El enriquecimiento de la cadena de valor de la empresa.</li><br/>'+
      '<li>Mitigar riesgos posibles y emergentes asociados a los impactos ambientales, sociales y de gobernanza (ASG).</li><br/>'+
      '<li>Dar un enfoque que permite ser más competitivo, anticipándose frente a las regulaciones y estándares emergentes.</li></ul>'
    ]
    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(817.03, 'x', width, height)),
                  ((rp(376.48, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(370, 'x', width, height)),
                  (rp(521.63, 'x', width, height)),
                  text[i], 
                  (rp(18, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for(var i=1; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(817.03, 'x', width, height)),
                  ((rp(400, 'x', width, height))+
                  (i*rp(17.46, 'x', width, height))),
                  (rp(370, 'x', width, height)),
                  (rp(521.63, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'justify', 0, 'black', '')

    //container3
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1361.71, 'x', width, height),
                rp(344.65, 'x', width, height),
                rp(426.67, 'x', width, height),
                rp(521.63, 'x', width, height),
                height/radio, 
                height/radio)
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                rp(1361.71, 'x', width, height),
                rp(344.65, 'x', width, height),
                rp(426.67, 'x', width, height),
                rp(521.63, 'x', width, height),
                height/radio, 
                height/radio)

    const textContainer3 = [
      'LA MIRADA TÁCTICA',
      '<ul style="line-height: 150%;padding-left: 5%"><li>Generar relaciones resilientes mandante/proveedor para enfrentar entornos cambiantes y de crisis.</li><br/>'+
      '<li>Identificar aprendizajes y deltas de mejora que impacten en los costos y en la generación de valor agregado en las distintas etapas de la cadena.</li><br/>'+
      '<li>Gestionar los procesos para producir optimizaciones operacionales.</li><br/>'+
      '<li>Integrar la innovación en los procesos de gestión operacional.</li><br/>'+
      '<li>Gestionar los impactos ambientales, sociales y de gobernanza de la cadena de suministro.</li></ul>'
    ]

    for(var i=0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(1381.3, 'x', width, height)),
                  ((rp(376.48, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(370, 'x', width, height)),
                  (rp(521.63, 'x', width, height)),
                  text[i], 
                  (rp(18, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for(var i=1; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(1381.3, 'x', width, height)),
                  ((rp(400, 'x', width, height))+
                  (i*rp(17.46, 'x', width, height))),
                  (rp(370, 'x', width, height)),
                  (rp(521.63, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'justify', 0, 'black', '')

    //tooltip triangle    
    const x_triangle = rp(1284, 'x', width, height)
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
        valueSetTriangle['fill'] = '#395B9A'
        valueSetTriangle['filter'] = ''    
    setTriangle(valueSetTriangle)   
    

      
  /******************************
  tippedContainer - Finish
  *******************************/
 
    

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
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', 'Cómo mirar la guía');
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
