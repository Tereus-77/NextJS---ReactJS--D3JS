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
import { setHtmlText,setHtmlTextLink, setHtmlTextBorde } from "../../functions/htmlText";
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
      .attr("rx", rx)
      .attr("ry", ry)	
  }
  
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
      .attr("rx", h / radio)
      .attr("ry", h / radio)

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .style("stroke", stroke)
      .style("stroke-width", strokeWidth)
      .attr("rx", h / radio)
      .attr("ry", h / radio)
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
    

    
    //linkrefConatiner
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/7, height/1.4, width/6.5, height/9,heightCorrected / radio + 10, "url(#bgLinGradB)", height/600)

    
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

    svg.append("line")                 // attach a line
      .style("stroke", "#90278D")         // colour the line
      .style("stroke-width", rp(3.86, 'x', width, height)) // adjust line width
      .style("stroke-linecap", "butt")  // stroke-linecap type
      .attr("x1", rp(295.39, 'x', width, height)) // x position of the first end of the line
      .attr("y1", rp(742.31, 'x', width, height)) // y position of the first end of the line
      .attr("x2", rp(1745.46, 'x', width, height)) // x position of the second end of the line
      .attr("y2", rp(742.31, 'x', width, height)); // y position of the second end of the line

    //linkrefText 
    svg.append("circle")
      .attr("cx", rp(295.39, 'x', width, height))
      .attr("cy", rp(742.31, 'x', width, height))
      .attr("r", rp(4.83, 'x', width, height))
      .style("fill", "#82368C");

      const text = [
        'Revista Comercio de la CSS. Enero-Febrero',
        '2021',
        'https://ccomercio.santiagolab.cl/enero2021/'
      ];
      for(var i=0; i < 2; i++)
        //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
        setHtmlText(svg, 1, 'text'+i, 
                    (rp(300, 'x', width, height)),
                    ((rp(703.3, 'x', width, height))+
                    (i*rp(17.46, 'x', width, height))),
                    (rp(266.67, 'x', width, height)),
                    (rp(480, 'x', width, height)),
                    text[i], 
                    (rp(13.72, 'x', width, height)),
                    'Roboto', 'right', 0, 'black', 'bold',)
      for(var i=2; i < text.length; i++)
        //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
        setHtmlTextLink(svg, 1, 'text'+i, 
                        (rp(300, 'x', width, height)),
                        ((rp(724.53, 'x', width, height))+
                        (i*rp(14.77, 'x', width, height))),
                        (rp(640, 'x', width, height)),
                        (rp(13.25, 'x', width, height)),
                        text[i], 
                        (rp(13.25, 'x', width, height)),
                        'Roboto', 'left', 0, 'black', '', 'https://ccomercio.santiagolab.cl/enero2021/')

    /******************************
    linkRef - Finish
    *******************************/

    /******************************
    tippedContainer - Start
    *******************************/
    //punta
    //triangle

    const x_triangle = rp(565, 'x', width, height);
    const y_triangle = rp(214,'x', width, height)
    const vertexA = (-rp(115,'x', width, height)) //valor negativo indica punta arriba
    const vertexBX = (rp(90,'x', width, height))
    const vertexBY = (0)
    const vertexCX = (rp(150,'x', width, height))
    const vertexCY = (-rp(50,'x', width, height))

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
        valueSetTriangle['filter'] = 'url(#dropshadow)'    
    setTriangle(valueSetTriangle)

    //container
    this.shadow(svg,
                (rp(640, 'x', width, height)),
                rp(139,'x', width, height),
                (rp(1371.43, 'x', width, height)),
                (rp(919.05, 'x', width, height)),
                rp(96.5, 'x', width, height),
                rp(96.5, 'x', width, height))

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

    //text question
    const textQuestion = [
      '¿Por qué una Guía para una Cadena de Suministro Sostenible?'
    ]
    for(var i=0; i<textQuestion.length; i++)
      setHtmlText(svg, 1, 'textQuestion'+i, 
                  (rp(795.04, 'x', width, height)),
                  (width/6 + i * width/41), 
                  (rp(874.32, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  textQuestion[i], 
                  (rp(38.4, 'x', width, height)),
                  'Oswald', 'justify', 0, '#90278D', 'bold',)

    /******************************
    Divider - Start
    *******************************/
    svg.append('rect')
      .style('fill', 'url(#bgLinGradB)')
      .attr('x', width / 2.7)
      .attr('y', height / 2.1)
      .attr("rx", height / radio)
      .attr("ry", height / radio)
      .attr('height', height / 70)
      .attr('width', width / 1.82)
      .transition()
      .delay(200)
      

    svg.append("circle")
      .attr("r", height / 25)
      .style("stroke", "#90278D")
      .style("fill", "#90278D")
      .attr("cx", width / 2)      
      .attr("cy", height / 2.08)
      .transition()
      .delay(200)
      .attr("cx", width / 1.072)
    /******************************
    Divider - End
    *******************************/
      /*svg.append('rect')
        .attr('x', width / 2.7)
        .attr('y', height /6.5)
        .attr('height', height / 1.2)
        .attr('width', width / 23)
        .style('stroke', 'red')
        .style("fill", "transparent")

      svg.append('rect')
        .attr('x', width / 2.7)
        .attr('y', height /2.275)
        .attr('height', height / 12.1)
        .attr('width', width / 1.716)
        .style('stroke', 'red')
        .style("fill", "transparent")

      svg.append('rect')
        .attr('x', width / 1.15)
        .attr('y', height /6.5)
        .attr('height', height / 1.2)
        .attr('width', width / 23)
        .style('stroke', 'red')
        .style("fill", "transparent")*/
  
      //text answer

      const textAnswer = 'En nuestro país la gestión sostenible de la cadena de suministro ha sido insuficiente, representando una de las materias con menor avance en sostenibilidad al interior de las organizaciones. Esto se expresa en la existencia de una significativa brecha en la relación entre las grandes empresas y las pymes, lo cual se refleja en escasas instancias de encuentro, comunicación y reflexión que promuevan las prácticas virtuosas entre las empresas en torno al aprovisionamiento responsable.'
      setHtmlText(svg, 1, 'textQuestion', 
                  (rp(795.04, 'x', width, height)),
                  (width/4.22 + 
                    i * rp(46.83, 'x', width, height)),
                  (rp(874.32, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  textAnswer, 
                  (rp(21.34, 'x', width, height)),
                  'Roboto', 'justify', 0, 'black', '',)
      
    /******************************
    tippedContainer - Finish
    *******************************/

    //footerImage
    getFooterImage(svg, width, height)
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
    menuCircles(svg, width, height, x_triangle,1);

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
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', '¿Por qué una guía?');
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
