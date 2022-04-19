import React, { Component } from "react"
import { useCallback, useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { guiaApi } from "../api/guia-api"
import * as d3 from 'd3';
import FooterGuia from "../components/FooterGuia";
import { theCircleShadow, selectedcircleshadow, shadow } from "../../functions/circleShadow";
import { behindHorizontalLine, curvedLine, menuCircles, breadcrumb, headerCornerLogo, gradients, setTriangle } from "../../functions/headerMenu";
import { getSideBarGuia, getTimeOut, getSideBarLines, getDurationAnim } from "../../functions/sideBar";
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "../../functions/referenceSize";
import { getArrowEnd } from "../../functions/arrowEnd";
import { getFooter, getFooterImage } from "../../functions/footer";
import { setHtmlText, setHtmlTextLink } from "../../functions/htmlText";
import { OpenGraph, MetaData } from "../../functions/metaTags";

class Metodologia extends Component {
  constructor(props) {
    super(props);
  }

  //circle shadow 
  circleShadow(svg) {
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
  selectedcircleshadow(svg) {
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
  shadow(svg, x, y, w, h, rx, ry) {
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
  gradientRect(svg, x, y, w, h, rx, ry) {
    if (window.innerHeight > window.innerWidth) {
      var width = window.innerWidth
      var height = (getReferenceSizeHeight()/getReferenceSizeWidth()) * window.innerWidth
    } else {
      var width = window.innerWidth
      var height = window.innerHeight
    }
    var svgDefs = svg.append('defs');


    svg.append('rect')
      //.classed('outlined', true)
      .attr('stroke', 'url(#bgLinGradB)') //bgLinGradA
      .attr('stroke-width', height/250)
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("rx", rx)
      .attr("ry", ry)

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .attr("rx", rx)
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
      .attr("rx", 5)
      .attr("ry", 5)

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .attr("rx", 5)
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


    gradients(svg);




    //big horizontal Line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(406.35, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(1655.18, 'x', width, height))
      .attr("y2", rp(603.13, 'x', width, height))


    //down 1
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(408.52, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(408.52, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)
    //down 2 
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(716.42, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(716.42, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)
    //down 3
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1026.74, 'x', width, height))
      .attr("y1", rp(386, 'x', width, height))
      .attr("x2", rp(1026.74, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    //down 4
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1342.66, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(1342.66, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)
    //down 5
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1652.33, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(1652.33, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)


    /******************************
    mainLines - Finish
    *******************************/

    /******************************
    linkRef - Start
    *******************************/
    //linkrefConatiner
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(507.94, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      rp(295.39, 'x', width, height),
                      rp(107.23, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradC)')
    svg.append("rect")
      .attr('x', rp(507.94, 'x', width, height))
      .attr('y', rp(137.86, 'x', width, height))
      .attr('width', rp(295.39, 'x', width, height))
      .attr('height', rp(107.23, 'x', width, height))
      .attr("fill", "#efefef")
      .attr("rx", rp(8.78, 'x', width, height))
      .attr("ry", rp(8.78, 'x', width, height))

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

    svg.append("line")
      .style("stroke", "#90278D")
      .style("stroke-width", rp(3.22, 'x', width, height))
      .style("stroke-linecap", "butt")
      .attr("x1", rp(533.34, 'x', width, height))
      .attr("y1", rp(193, 'x', width, height))
      .attr("x2", rp(1745.46, 'x', width, height))
      .attr("y2", rp(193, 'x', width, height))

    //linkrefText 
    svg.append("circle")
      .attr("cx", rp(533.34, 'x', width, height))
      .attr("cy", rp(193, 'x', width, height))
      .attr("r", rp(5.37, 'x', width, height))
      .style("fill", "#82368C")

    text = [
      'Link Iseal Alliance',
      'https://www.newhope.com/business-resource',
      's/business-benefits-using-sustainability-stand',
      'ards-infographic'
    ]
    for (var i = 0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(533.34, 'x', width, height)),
                  ((rp(166.96, 'x', width, height)) +
                  (i * rp(12, 'x', width, height))),
                  (rp(295.39, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold',)
    for (var i = 1; i < text.length; i++)
      //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlTextLink(svg, 1, 'text' + i, 
                      (rp(480, 'x', width, height)),
                      ((rp(182.86, 'x', width, height)) +
                      (i * rp(14.77, 'x', width, height))),
                      (rp(295.39, 'x', width, height)),
                      (rp(12, 'x', width, height)),
                      text[i], 
                      (rp(12, 'x', width, height)),
                      'Roboto', 'right', 0, 'black', '', 
                      'https://www.newhope.com/business-resources/business-benefits-using-sustainability-standards-infographic')

    /******************************
    linkRef - Finish
    *******************************/
    /******************************
    tippedContainer - Start
    *******************************/
    //container under container1
    //shadow (svg, x, y, w, h) {
    this.shadow(svg, 
                (rp(960, 'x', width, height)),
                (rp(214.45, 'x', width, height)),
                (rp(834.79, 'x', width, height)),
                (rp(107.23, 'x', width, height)),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    const text = [
      'PARA GENERAR VALOR, OPTIMIZAR PROCESOS Y MAXIMIZAR LAS',
      'VENTAJAS COMPETITIVAS DEL NEGOCIO'
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(979.6, 'x', width, height)),
                  ((rp(256, 'x', width, height)) +
                  (i * rp(27.43, 'x', width, height))),
                  (rp(960, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(21.34, 'x', width, height)),
                  'Roboto', 'left', 0, '#90278D', 'bold')
    //gradientcontainer1
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');

    // tool tip 1
    svg.append('rect')
      .attr('fill', 'url(#bgLinGradB)')
      .attr('x', rp(834.79, 'x', width, height))
      .attr('y', rp(137.86, 'x', width, height))
      .attr("rx", rp(8.78, 'x', width, height))
      .attr("ry", rp(8.78, 'x', width, height))
      .transition()
      .delay(200)
      .attr('width', rp(960, 'x', width, height))
      .attr('height', rp(107.23, 'x', width, height));


    text = [
        '¿POR QUÉ GESTIONAR CADENAS DE SUMINISTRO SOSTENIBLES?'
      ]
    for(var i=0; i<text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'textGradientBold' + i, 
                  (rp(834.79, 'x', width, height)),
                  rp(168, 'x', width, height),
                  (rp(960, 'x', width, height)),
                  rp(36, 'x', width, height),
                  text[i], 
                  rp(26, 'x', width, height), 
                  'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))

    //container2
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(480, 'x', width, height),
                rp(344.65, 'x', width, height),
                rp(1097.15, 'x', width, height),
                rp(60.32, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(480, 'x', width, height),
                      rp(344.65, 'x', width, height),
                      rp(1097.15, 'x', width, height),
                      rp(60.32, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'LAS EMPRESAS EXPERIMENTAN UNA VARIEDAD DE BENEFICIOS AL UTILIZAR ESTÁNDARES DE SOSTENIBILIDAD',
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(581.82, 'x', width, height)),
                  ((rp(362.27, 'x', width, height)) +
                  (i * rp(41.12, 'x', width, height))),
                  (rp(960, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(17.46, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')

    //container3
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(480, 'x', width, height),
                rp(419.57, 'x', width, height),
                rp(1097.15, 'x', width, height),
                rp(160.84, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(480, 'x', width, height),
                      rp(419.57, 'x', width, height),
                      rp(1097.15, 'x', width, height),
                      rp(160.84, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'Una investigación independiente , realizada por Iseal Alianse, concluyó que los estándares de sostenibilidad mejoran el acceso al mercado, la rentabilidad y la producción para las empresas que aplican estos estándares, así como también su reputación. Paralelamente reducen el riesgo para los fabricantes y minoristas. <br/> Se analizaron 40 empresas con el objetivo de identificar qué beneficios obtienen a partir del uso de estándares de sostenibilidad y cuáles son los factores de influencia en este contexto para cuatro sectores industriales: agricultura, pesca, minería y silvicultura. El porcentaje destacado a continuación, se refiere a la proporción de empresas que informan un beneficio asociado a cada ítem.'
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(497.41, 'x', width, height)),
                  ((rp(441.38, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(1066.67, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'justify', 0, 'black', '')

    //container4
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(274.29, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(274.29, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(274.29, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(274.29, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'BENEFICIOS OBTENIDOS A CORTO',
      'PLAZO',
      '45% Aumento en el precio de',
      '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0producto/servicio',
      '',
      '55% Mejor administración de riesgos',
      '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0de la cadena de suministro',
      '',
      '30% Mejor acceso a finanzas',
      '',
      '78% Mejores operaciones',
      '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0comerciales',
      '',
      '85% Mejor acceso al mercado'
    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(304.77, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(304.77, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(14.77, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container5
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(274.29, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(274.29, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    const textContainer5 = [
      'BENEFICIOS OBTENIDOS EN EL LARGO',
      'PLAZO',
      '53% Mayor rentabilidad',
      '',
      '60% Mejoras en la reputación',
      '',
      '30% Reducción de costos'
    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(615.39, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(615.39, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(14.77, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container6
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(893.03, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(274.29, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(893.03, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(274.29, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'FACTORES DE INFLUENCIA',
      'Tamaño de la empresa',
      '',
      'Gestión de la cadena de suministro',
      '',
      'Desempeño organizacional',
      '',
      'Diversidad de la cartera de productos',
      '',
      'Cuota de mercado'
    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(923.08, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(923.08, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(14.77, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container7
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1205.28, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(274.29, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(1205.28, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(274.29, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'CARACTERÍSTICAS DEL SECTOR',
      'Dinámica de mercado',
      '',
      'Exposición pública',
      '',
      'Entorno de políticas públicas',
      '',
      'Fase de desarrollo del sector',
      '',
      'Gobernanza y estructura de la cadena de',
      'suministro'
    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1230.77, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1230.77, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(14.77, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container8
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1518.39, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(274.29, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(1518.39, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(274.29, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'CARACTERÍSTICAS DEL SISTEMA:',
      'ESTÁNDARES',
      'Modelo de gobernanza',
      'Compromiso del sector público',
      'Cadena de custodia y sistema de',
      'trazabilidad',
      'Comunicación y marketing',
      'Declaraciones y etiquetado',
      'Soporte de implementación',
      'Diálogo entre múltiples partes',
      'interesadas: seguimiento y evaluación',
      'Modelo de aseguramiento'
    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1548.39, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1548.39, 'x', width, height)), ((width/2.9) +
                  (i * rp(14.77, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //tooltip triangle    
    const x_triangle = rp(1405, 'x', width, height)
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
        valueSetTriangle['fill'] = '#4d4c9a'
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
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', '¿Por qué gestionar cadenas?');
    /******************************
    Section 3 - breadcrumb - End
    *******************************/


  }

  //secondPart
  secondPart = (element) => {
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
    /******************************
    mainLines - Start
    *******************************/
    //big horizontal Line
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(389.46, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(1655.18, 'x', width, height))
      .attr("y2", rp(603.13, 'x', width, height))


    //down 1
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(391.84, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(391.84, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)
    //down 2 
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(640, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(640, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)
    //down 3
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(893.03, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(893.03, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)
    //down 4
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1146.27, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(1146.27, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)
    //down 5 big
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1401.46, 'x', width, height))
      .attr("y1", rp(321.67, 'x', width, height))
      .attr("x2", rp(1401.46, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    //down 6
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1652.33, 'x', width, height))
      .attr("y1", rp(603.13, 'x', width, height))
      .attr("x2", rp(1652.33, 'x', width, height))
      .attr("y2", rp(622.59, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height)


    /******************************
    mainLines - Finish
    *******************************/

    /******************************
    linkRef - Start
    *******************************/
    //linkrefContainer
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(507.94, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      rp(295.39, 'x', width, height),
                      rp(107.23, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')
    svg.append("rect")
      .attr('x', rp(507.94, 'x', width, height))
      .attr('y', rp(137.86, 'x', width, height))
      .attr('width', rp(295.39, 'x', width, height))
      .attr('height', rp(107.23, 'x', width, height))
      .attr("fill", "#efefef")
      .attr("rx", rp(8.78, 'x', width, height))
      .attr("ry", rp(8.78, 'x', width, height))

    //second bottom left line


    svg.append("line")
      .style("stroke", "#90278D")
      .style("stroke-width", rp(3.22, 'x', width, height))
      .style("stroke-linecap", "butt")
      .attr("x1", rp(533.34, 'x', width, height))
      .attr("y1", rp(193, 'x', width, height))
      .attr("x2", rp(1745.46, 'x', width, height))
      .attr("y2", rp(193, 'x', width, height))

    //linkrefText 
    svg.append("circle")
      .attr("cx", rp(533.34, 'x', width, height))
      .attr("cy", rp(193, 'x', width, height))
      .attr("r", rp(5.37, 'x', width, height))
      .style("fill", "#82368C")

    text = [
      'Link SMITH',
      'https://www.sourcetoday.com/supply-chain/a',
      'rticle/21867505/6-ways-supply-chain-sustain',
      'ability-drives-value'
    ]
    for (var i = 0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(533.34, 'x', width, height)),
                  ((rp(166.96, 'x', width, height)) +
                  (i * rp(12, 'x', width, height))),
                  (rp(295.39, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold',)
    for (var i = 1; i < text.length; i++)
      //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlTextLink(svg, 1, 'text' + i, 
                      (rp(480, 'x', width, height)),
                      ((rp(182.86, 'x', width, height)) +
                      (i * rp(14.77, 'x', width, height))),
                      (rp(295.39, 'x', width, height)),
                      (rp(12, 'x', width, height)),
                      text[i], 
                      (rp(12, 'x', width, height)),
                      'Roboto', 'right', 0, 'black', '', 
                      'https://www.sourcetoday.com/supply-chain/article/21867505/6-ways-supply-chain-sustainability-drives-value')


    /******************************
    linkRef - Finish
    *******************************/
    /******************************
    tippedContainer - Start
    *******************************/
    //container under container1
    //shadow (svg, x, y, w, h) {
    this.shadow(svg, 
                (rp(960, 'x', width, height)),
                (rp(214.45, 'x', width, height)),
                (rp(834.79, 'x', width, height)),
                (rp(107.23, 'x', width, height)),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    const text = [
      'PARA GENERAR VALOR, OPTIMIZAR PROCESOS Y MAXIMIZAR LAS',
      'VENTAJAS COMPETITIVAS DEL NEGOCIO'
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(979.6, 'x', width, height)),
                  ((rp(256, 'x', width, height)) +
                  (i * rp(27.43, 'x', width, height))),
                  (rp(960, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(21.34, 'x', width, height)),
                  'Roboto', 'left', 0, '#90278D', 'bold')

    //gradientcontainer1
    var svgDefs = svg.append('defs');


    // tool tip 2
    svg.append('rect')
      .attr('x', rp(834.79, 'x', width, height))
      .attr('y', rp(137.86, 'x', width, height))
      .attr('rx', height/radio) //10
      .attr('ry', height/radio)
      .attr('fill', 'url(#bgLinGradB)')
      .transition()
      .delay(200)
      .attr('width', rp(960, 'x', width, height))
      .attr('height', rp(107.23, 'x', width, height));

    text = [
        '¿POR QUÉ GESTIONAR CADENAS DE SUMINISTRO SOSTENIBLES?'
      ]
      
    for(var i=0; i<text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'textGradientBold' + i, 
                  (rp(834.79, 'x', width, height)),
                  rp(168, 'x', width, height),
                  (rp(960, 'x', width, height)),
                  rp(36, 'x', width, height),
                  text[i], 
                  rp(26, 'x', width, height), 'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))

    //container2
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1163.64, 'x', width, height),
                rp(344.65, 'x', width, height),
                rp(480, 'x', width, height),
                rp(60.32, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(1163.64, 'x', width, height),
                      rp(344.65, 'x', width, height),
                      rp(480, 'x', width, height),
                      rp(60.32, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'SEIS MANERAS EN QUE LA SOSTENIBILIDAD DE',
      'LA CADENA DE SUMINISTRO GENERA VALOR'
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1136.1, 'x', width, height)),
                  ((rp(355.56, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(548.58, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')

    //container3
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1129.42, 'x', width, height),
                rp(419.57, 'x', width, height),
                rp(548.58, 'x', width, height),
                rp(137.86, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(1129.42, 'x', width, height),
                      rp(419.57, 'x', width, height),
                      rp(548.58, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'Los compradores de todas las industrias están poniendo a la',
      'sostenibilidad de la cadena de suministro en la parte superior de',
      'sus prioridades. No sólo para posicionarse como empresas',
      'conscientes y responsables, sino que también para reducir costos,',
      'mejorar las ineficiencias y volverse más resilientes.'
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1163.64, 'x', width, height)),
                  ((rp(436.37, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(548.58, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container4
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(270.43, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(240, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(270.43, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      '1. MITIGAR EL RIESGO DE LA',
      'CADENA DE SUMINISTRO',
      'Para 2030 las pérdidas de',
      'productividad vinculadas a las',
      'interrupciones y lesiones en el',
      'lugar de trabajo relacionadas',
      'con el aumento de la',
      'temperatura, podrían superar',
      'los $2 billones.',
    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(286.57, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.72, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(286.57, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container5
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(521.74, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(240, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(521.74, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      '2. AHORRE DINERO',
      'MEDIANTE UNA MEJORA EN',
      'LA EFICIENCIA DE LOS',
      'RECURSOS',
      'Durante el 2019 se',
      'identificaron 99 empresas que',
      'ahorraron U$19 mil millones al',
      'reducir las emisiones de',
      'gases de efecto invernadero',
      '(GEI) en 633 millones de',
      'toneladas de CO2 equivalente. ',

    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(540.85, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.72, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(540.85, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container6
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(774.2, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(240, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(774.2, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      '3. ELIMINAR LAS',
      'INEFICIENCIAS DE LA',
      'CADENA DE SUMINISTRO',
      '• Crear soluciones rentables',
      '• Construir valor de marca',
      '• Desarrollar ventajas',
      '\u00A0\u00A0competitivas',
      '• Gestionar riesgos'
    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(793.39, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.72, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(793.39, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container7
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1026.74, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(240, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(1026.74, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      '4. IMPULSAR MÁS',
      'INNOVACIÓN',
      'La gestión de la cadena de',
      'suministro es una fuente',
      'importante de innovación.'
    ]
    for (var i = 0; i < 2; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1043.48, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.72, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 2; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1043.48, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container8
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1280, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(240, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(1280, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      '5. OBTENER UN MEJOR',
      'ACCESO AL',
      'FINANCIAMIENTO',
      'El 90% de los estudios',
      'demuestran que la',
      'sustentabilidad reduce el',
      'costo de capital.'
    ]
    for (var i = 0; i < 3; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1297.3, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.72, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 3; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1297.3, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //container9
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1533.55, 'x', width, height),
                rp(634.87, 'x', width, height),
                rp(240, 'x', width, height),
                rp(253.95, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(1533.55, 'x', width, height),
                      rp(634.87, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(253.95, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    const textContainer9 = [
      '6. MANTENER LA',
      'COMPETITIVIDAD DEL',
      'MERCADO',
      'Las empresas implementan',
      'iniciativas de sostenibilidad',
      'para cumplir con los',
      'requisitos de los clientes y',
      'obtener una ventaja',
      'competitiva.'
    ]
    for (var i = 0; i < 3; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1552.15, 'x', width, height)),
                  ((rp(650.85, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(13.72, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold')
    for (var i = 3; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1552.15, 'x', width, height)),
                  ((rp(662.07, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(12.8, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    /******************************
    tippedContainer - Finish
    *******************************/

  }
  //thirdPart
  thirdPart = (element) => {
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
    /******************************
  mainLinesThird - Start
  *******************************/
    //down 5 big
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1401.46, 'x', width, height))
      .attr("y1", rp(175.46, 'x', width, height))
      .attr("x2", rp(1401.46, 'x', width, height))
      .attr("y2", rp(350.91, 'x', width, height))
      .attr("marker-end", "url(#triangle)")

    /******************************
    mainLines - Finish
    *******************************/

    /******************************
    linkRef - Start
    *******************************/
    //linkrefContainer
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(507.94, 'x', width, height),
                      rp(68.93, 'x', width, height),
                      rp(295.39, 'x', width, height),
                      rp(107.23, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')
    svg.append("rect")
      .attr('x', rp(507.94, 'x', width, height))
      .attr('y', rp(68.93, 'x', width, height))
      .attr('width', rp(295.39, 'x', width, height))
      .attr('height', rp(107.23, 'x', width, height))
      .attr("fill", "#efefef")
      .attr("rx", rp(8.78, 'x', width, height))
      .attr("ry", rp(8.78, 'x', width, height))

    //second bottom left line
    var svgDefs = svg.append('defs');


    svg.append("line")
      .style("stroke", "#90278D")
      .style("stroke-width", rp(3.22, 'x', width, height))
      .style("stroke-linecap", "butt")
      .attr("x1", rp(533.34, 'x', width, height))
      .attr("y1", rp(126.98, 'x', width, height))
      .attr("x2", rp(1745.46, 'x', width, height))
      .attr("y2", rp(126.98, 'x', width, height))

    //linkrefText 
    svg.append("circle")
      .attr("cx", rp(533.34, 'x', width, height))
      .attr("cy", rp(126.98, 'x', width, height))
      .attr("r", rp(5.37, 'x', width, height))
      .style("fill", "#82368C")

    text = [
      'Link Sharedvaluechain.com',
      'https://www.sharedvaluechain.com/sustainab',
      'le-cost-reduction/'
    ]
    for (var i = 0; i < 1; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(533.34, 'x', width, height)),
                  ((rp(96, 'x', width, height)) +
                  (i * rp(12, 'x', width, height))),
                  (rp(295.39, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(16, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', 'bold',)
    for (var i = 1; i < text.length; i++)
      //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
      setHtmlTextLink(svg, 1, 'text' + i, 
                      (rp(480, 'x', width, height)),
                      ((rp(120, 'x', width, height)) +
                      (i * rp(14.77, 'x', width, height))),
                      (rp(295.39, 'x', width, height)),
                      (rp(12, 'x', width, height)),
                      text[i], 
                      (rp(12, 'x', width, height)),
                      'Roboto', 'right', 0, 'black', '', 
                      'https://www.sharedvaluechain.com/sustainable-cost-reduction/')

    /******************************
    linkRef - Finish
    *******************************/
    /******************************
    tippedContainerThird - Start
    *******************************/

    //gradientcontainer1
    var svgDefs = svg.append('defs');


    svg.append('rect')
      .attr('fill', 'url(#bgLinGradB)')
      .attr('x', rp(834.79, 'x', width, height))
      .attr('y', rp(68.93, 'x', width, height))
      .attr("rx", rp(8.78, 'x', width, height))
      .attr("ry", rp(8.78, 'x', width, height))
      .transition()
      .delay(200)
      .attr('width', rp(960, 'x', width, height))
      .attr('height', rp(107.23, 'x', width, height));

    const text = [
      '¿POR QUÉ GESTIONAR CADENAS DE SUMINISTRO SOSTENIBLES?'
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'textGradientBold' + i, 
                  (rp(834.79, 'x', width, height)),
                  rp(105, 'x', width, height),
                  (rp(960, 'x', width, height)),
                  rp(36, 'x', width, height),
                  text[i], 
                  rp(26, 'x', width, height), 'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))


    //container2
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, 
                rp(1163.64, 'x', width, height),
                rp(225.89, 'x', width, height),
                rp(480, 'x', width, height),
                rp(60.32, 'x', width, height),
                rp(8.78, 'x', width, height),
                rp(8.78, 'x', width, height),
                'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, 
                      rp(1163.64, 'x', width, height),
                      rp(225.89, 'x', width, height),
                      rp(480, 'x', width, height),
                      rp(60.32, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      rp(8.78, 'x', width, height),
                      'url(#bgLinGradB)')

    text = [
      'SER SOSTENIBLE OPTIMIZA RENDIMIENTOS',
      'FINANCIEROS'
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1084.75, 'x', width, height)),
                  ((rp(237.04, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')

    svg.append('rect')
      .attr('x', rp(834.79, 'x', width, height))
      .attr('y', rp(357.41, 'x', width, height))
      .attr('width', rp(960, 'x', width, height))
      .attr('height', rp(53.62, 'x', width, height))
      .attr("fill", "url(#bgLinGradD)")

    text = ["Sostenibilidad y reducción de costos"
    ]
    for (var i = 0; i < text.length; i++)
      //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
      setHtmlText(svg, 1, 'text' + i, 
                  (rp(1084.75, 'x', width, height)),
                  ((rp(365.72, 'x', width, height)) +
                  (i * rp(19.2, 'x', width, height))),
                  (rp(640, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(25.6, 'x', width, height)),
                  'Oswald', 'right', 0, 'white', '')

    svg.append('rect')
      .attr('x', rp(834.79, 'x', width, height))
      .attr('y', rp(414.17, 'x', width, height))
      .attr('width', rp(960, 'x', width, height))
      .attr('height', rp(26.81, 'x', width, height))
      .attr("fill", "gray")

    svg.append("text")
      .attr("x", rp(1560.98, 'x', width, height))
      .attr("y", rp(433.71, 'x', width, height))
      .text("Fases del ciclo de vida")
      .style("font-weight", "bold")
      .style("font-size", rp(16, 'x', width, height))
      .style("font-family", "Roboto")
      .attr("fill", "white")

    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-39.png")
      .attr("x", rp(192, 'x', width, height))
      .attr("y", rp(182.08, 'x', width, height))
      .attr("width", rp(1641.03, 'x', width, height))
      .attr("height", height)

    /******************************
    tippedContainer - Finish
    *******************************/

  }

  //fourthyPart
  fourthyPart = (element) => {
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

  /******************************
  mainLines - Start
  *******************************/
  //big horizontal Line
  svg.append('line')
    .style("stroke", "#82368C")
    .style("stroke-width", rp(6.04, 'x', width, height))
    .attr("x1", rp(406.35, 'x', width, height))
    .attr("y1", rp(292.43, 'x', width, height))
    .attr("x2", rp(1655.18, 'x', width, height))
    .attr("y2", rp(292.43, 'x', width, height))
  //down largo
  svg.append('line')
    .style("stroke", "#82368C")
    .style("stroke-width", rp(6.04, 'x', width, height))
    .attr("x1", rp(1476.93, 'x', width, height))
    .attr("y1", rp(193, 'x', width, height))
    .attr("x2", rp(1476.93, 'x', width, height))
    .attr("y2", rp(292.43, 'x', width, height))

  //down 1
  svg.append('line')
    .style("stroke", "#82368C")
    .style("stroke-width", rp(6.04, 'x', width, height))
    .attr("x1", rp(408.52, 'x', width, height))
    .attr("y1", rp(292.43, 'x', width, height))
    .attr("x2", rp(408.52, 'x', width, height))
    .attr("y2", rp(321.67, 'x', width, height))
    .attr("marker-end", "url(#triangle)")
  getArrowEnd(svg, height)
  //down 2 
  svg.append('line')
    .style("stroke", "#82368C")
    .style("stroke-width", rp(6.04, 'x', width, height))
    .attr("x1", rp(716.42, 'x', width, height))
    .attr("y1", rp(292.43, 'x', width, height))
    .attr("x2", rp(716.42, 'x', width, height))
    .attr("y2", rp(321.67, 'x', width, height))
    .attr("marker-end", "url(#triangle)")
  getArrowEnd(svg, height)

  //down 3
  svg.append('line')
    .style("stroke", "#82368C")
    .style("stroke-width", rp(6.04, 'x', width, height))
    .attr("x1", rp(1026.74, 'x', width, height))
    .attr("y1", rp(292.43, 'x', width, height))
    .attr("x2", rp(1026.74, 'x', width, height))
    .attr("y2", rp(321.67, 'x', width, height))
    .attr("marker-end", "url(#triangle)")
  //down 4
  svg.append('line')
    .style("stroke", "#82368C")
    .style("stroke-width", rp(6.04, 'x', width, height))
    .attr("x1", rp(1342.66, 'x', width, height))
    .attr("y1", rp(292.43, 'x', width, height))
    .attr("x2", rp(1342.66, 'x', width, height))
    .attr("y2", rp(321.67, 'x', width, height))
    .attr("marker-end", "url(#triangle)")
  getArrowEnd(svg, height)
  //down 5
  svg.append('line')
    .style("stroke", "#82368C")
    .style("stroke-width", rp(6.04, 'x', width, height))
    .attr("x1", rp(1652.33, 'x', width, height))
    .attr("y1", rp(292.43, 'x', width, height))
    .attr("x2", rp(1652.33, 'x', width, height))
    .attr("y2", rp(321.67, 'x', width, height))
    .attr("marker-end", "url(#triangle)")
  getArrowEnd(svg, height)


  /******************************
  mainLines - Finish
  *******************************/

  /******************************
  linkRef - Start
  *******************************/
  //linkrefContainer

  //gradientRect(svg, x, y, w, h,rx,ry)
  this.gradientRect(svg, 
                    rp(507.94, 'x', width, height),
                    rp(68.93, 'x', width, height),
                    rp(295.39, 'x', width, height),
                    rp(107.23, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    'url(#bgLinGradB)')
  svg.append("rect")
    .attr('x', rp(507.94, 'x', width, height))
    .attr('y', rp(68.93, 'x', width, height))
    .attr("fill", "#efefef")
    .attr("rx", rp(8.78, 'x', width, height))
    .attr("ry", rp(8.78, 'x', width, height))
    .transition()
    .delay(200)
    .attr('width', rp(295.39, 'x', width, height))
    .attr('height', rp(107.23, 'x', width, height))

  //second bottom left line
  var svgDefs = svg.append('defs')


  svg.append("line")
    .style("stroke", "#90278D")
    .style("stroke-width", rp(3.22, 'x', width, height))
    .style("stroke-linecap", "butt")
    .attr("x1", rp(533.34, 'x', width, height))
    .attr("y1", rp(126.98, 'x', width, height))
    .attr("x2", rp(1745.46, 'x', width, height))
    .attr("y2", rp(126.98, 'x', width, height))

  //linkrefText 
  svg.append("circle")
    .attr("cx", rp(533.34, 'x', width, height))
    .attr("r", rp(5.37, 'x', width, height))
    .attr("cy", rp(126.98, 'x', width, height))
    .style("fill", "#82368C")

  text = [
    'Link enviromentalleader.com',
    'https://www.environmentalleader.com/2017/02/5-benefits-sustainable-supply-chains/'
  ]
  for (var i = 0; i < 1; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(533.34, 'x', width, height)),
                ((rp(96, 'x', width, height)) +
                (i * rp(12, 'x', width, height))),
                (rp(295.39, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(16, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold',)
  for (var i = 1; i < text.length; i++)
    //setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link)
    setHtmlTextLink(svg, 1, 'text' + i, 
                    (rp(498.71, 'x', width, height)),
                    ((rp(120, 'x', width, height)) +
                    (i * rp(14.77, 'x', width, height))),
                    (rp(295.39, 'x', width, height)),
                    (rp(12, 'x', width, height)),
                    text[i], 
                    (rp(12, 'x', width, height)),
                    'Roboto', 'right', 0, 'black', '', 
                    'https://www.environmentalleader.com/2017/02/5-benefits-sustainable-supply-chains/')


  /******************************
  linkRef - Finish
  *******************************/
  /******************************
  tippedContainer - Start
  *******************************/
  //container under container1
  //shadow (svg, x, y, w, h) {
  this.shadow(svg, 
              (rp(960, 'x', width, height)),
              (rp(148.47, 'x', width, height)),
              (rp(834.79, 'x', width, height)),
              (rp(107.23, 'x', width, height)),
              rp(8.78, 'x', width, height),
              rp(8.78, 'x', width, height),
              'url(#bgLinGradB)')
  const text = [
    'PARA GENERAR VALOR, OPTIMIZAR PROCESOS Y MAXIMIZAR LAS',
    'VENTAJAS COMPETITIVAS DEL NEGOCIO'
  ]
  for (var i = 0; i < text.length; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(979.6, 'x', width, height)),
                ((rp(192, 'x', width, height)) +
                (i * rp(27.43, 'x', width, height))),
                (rp(960, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(21.34, 'x', width, height)),
                'Roboto', 'left', 0, '#90278D', 'bold')

  //gradientcontainer1
  var svgDefs = svg.append('defs');


  svg.append('rect')
    .attr('fill', 'url(#bgLinGradB)')
    .attr('x', rp(834.79, 'x', width, height))
    .attr('y', rp(68.93, 'x', width, height))
    .attr("rx", rp(8.78, 'x', width, height))
    .attr("ry", rp(8.78, 'x', width, height))
    .transition()
    .delay(200)
    .attr('width', rp(960, 'x', width, height))
    .attr('height', rp(107.23, 'x', width, height));

  text = [
    '¿POR QUÉ GESTIONAR CADENAS DE SUMINISTRO SOSTENIBLES?'
  ]
  for (var i = 0; i < text.length; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'textGradientBold' + i, 
                (rp(834.79, 'x', width, height)),
                rp(105, 'x', width, height),
                (rp(960, 'x', width, height)),
                rp(36, 'x', width, height),
                text[i], 
                rp(26, 'x', width, height), 
                'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))
  

  //container4
  //shadow (svg, x, y, w, h,rx,ry)
  this.shadow(svg, 
              rp(274.29, 'x', width, height),
              rp(332.76, 'x', width, height),
              rp(274.29, 'x', width, height),
              rp(428.89, 'x', width, height),
              rp(8.78, 'x', width, height),
              rp(8.78, 'x', width, height),
              'url(#bgLinGradB)')
  //gradientRect(svg, x, y, w, h,rx,ry)
  this.gradientRect(svg, 
                    rp(274.29, 'x', width, height),
                    rp(332.76, 'x', width, height),
                    rp(274.29, 'x', width, height),
                    rp(428.89, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    'url(#bgLinGradB)')

  text = [
    'PROTECCIÓN CONTRA DAÑOS',
    'DE REPUTACIÓN',
    'Las partes interesadas, incluidos',
    'los inversores y los clientes, están ',
    'presionando cada vez más a las',
    'empresas para que extiendan sus',
    'políticas de sostenibilidad a sus',
    'cadenas de suministro. Esto se',
    'evidencia en un número récord de',
    'resoluciones de accionistas',
    'relacionadas con la sostenibilidad',
    'de la cadena de suministro en los',
    'últimos años, así como la presión',
    'de los medios sociales sobre las',
    'empresas para garantizar que se',
    'vean comprometidas con',
    'prácticas comerciales sostenibles',
    'y responsables. '

  ]
  for (var i = 0; i < 2; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(295.39, 'x', width, height)),
                ((rp(355.56, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(640, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
  for (var i = 2; i < text.length; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(295.39, 'x', width, height)),
                ((rp(384, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(208.7, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(13.72, 'x', width, height)),
                'Roboto', 'justify', 0, 'black', '')

  //container5
  //shadow (svg, x, y, w, h,rx,ry)
  this.shadow(svg, 
              rp(581.82, 'x', width, height),
              rp(332.76, 'x', width, height),
              rp(274.29, 'x', width, height),
              rp(428.89, 'x', width, height),
              rp(8.78, 'x', width, height),
              rp(8.78, 'x', width, height),
              'url(#bgLinGradB)')
  //gradientRect(svg, x, y, w, h,rx,ry)
  this.gradientRect(svg, 
                    rp(581.82, 'x', width, height),
                    rp(332.76, 'x', width, height),
                    rp(274.29, 'x', width, height),
                    rp(428.89, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    'url(#bgLinGradB)')

  text = [
    'REDUCCIÓN DEL IMPACTO',
    'AMBIENTAL Y LOS COSTOS',
    'Aquí Walmart es un buen ejemplo.',
    'Cuando el gigante minorista',
    'anunció su objetivo de reducir las',
    'emisiones corporativas de gases',
    'de efecto invernadero en 20',
    'millones de toneladas por año',
    'para 2020, se evidencio que su',
    'cadena de suministro',
    'representaba alrededor del 95% de',
    'la huella de carbono general de',
    'Walmart. Un informe de CDP',
    'publicado demostro que Walmart',
    'y otras iniciativas importantes de',
    'reducción de emisiones de la',
    'cadena de suministro ahorraron a',
    'los proveedores un total de 12.400',
    'millones de dólares en 2016.'
  ]
  for (var i = 0; i < 2; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(609.53, 'x', width, height)),
                ((rp(355.56, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(640, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
  for (var i = 2; i < text.length; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(609.53, 'x', width, height)),
                ((rp(384, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(213.34, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(13.72, 'x', width, height)),
                'Roboto', 'justify', 0, 'black', '')

  //container6
  //shadow (svg, x, y, w, h,rx,ry)
  this.shadow(svg, 
              rp(893.03, 'x', width, height),
              rp(332.76, 'x', width, height),
              rp(274.29, 'x', width, height),
              rp(428.89, 'x', width, height),
              rp(8.78, 'x', width, height),
              rp(8.78, 'x', width, height),
              'url(#bgLinGradB)')
  //gradientRect(svg, x, y, w, h,rx,ry)
  this.gradientRect(svg, 
                    rp(893.03, 'x', width, height),
                    rp(332.76, 'x', width, height),
                    rp(274.29, 'x', width, height),
                    rp(428.89, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    'url(#bgLinGradB)')

  text = [
    'MEJORAR LA CONTINUIDAD DEL',
    'SUMINISTRO',
    'La industria automotriz aprendió',
    'esta lección cuando las',
    'inundaciones en Tailandia',
    'detuvieron a la industria de',
    'suministro de piezas de',
    'automóviles, reflejándose en',
    'fábricas inactivas en todo el',
    'mundo", "como resultado, y',
    'después de trabajar con',
    'proveedores clave, la cadena de',
    'suministro de la industria',
    'automotriz está ahora mucho más',
    'diversificada, lo que también ha',
    'resultado en beneficios para sus',
    'proveedores".'
  ]
  for (var i = 0; i < 2; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(918.67, 'x', width, height)),
                ((rp(355.56, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(640, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
  for (var i = 2; i < text.length; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(918.67, 'x', width, height)),
                ((rp(384, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(213.34, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(13.72, 'x', width, height)),
                'Roboto', 'justify', 0, 'black', '')

  //container7
  //shadow (svg, x, y, w, h,rx,ry)
  this.shadow(svg, 
              rp(1205.28, 'x', width, height),
              rp(332.76, 'x', width, height),
              rp(274.29, 'x', width, height),
              rp(428.89, 'x', width, height),
              rp(8.78, 'x', width, height),
              rp(8.78, 'x', width, height),
              'url(#bgLinGradB)')
  //gradientRect(svg, x, y, w, h,rx,ry)
  this.gradientRect(svg, 
                    rp(1205.28, 'x', width, height),
                    rp(332.76, 'x', width, height),
                    rp(274.29, 'x', width, height),
                    rp(428.89, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    'url(#bgLinGradB)')

  text = [
    'PRODUCTOS Y SERVICIOS',
    'INNOVADORES',
    'Los proveedores que entienden la',
    'visión de una empresa y los planes',
    'a largo plazo están mejor',
    'preparados para sugerir cambios',
    'que a nivel de productos y',
    'procesos pueden mejorar las',
    'operaciones y contribuir a que las',
    'empresas puedan lograr sus',
    'objetivos de innovación.'
  ]
  for (var i = 0; i < 2; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(1230.77, 'x', width, height)),
                ((rp(355.56, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(640, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
  for (var i = 2; i < text.length; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(1230.77, 'x', width, height)),
                ((rp(384, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(213.34, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(13.72, 'x', width, height)),
                'Roboto', 'justify', 0, 'black', '')

  //container8
  //shadow (svg, x, y, w, h,rx,ry)
  this.shadow(svg, 
              rp(1518.39, 'x', width, height),
              rp(332.76, 'x', width, height),
              rp(274.29, 'x', width, height),
              rp(428.89, 'x', width, height),
              rp(8.78, 'x', width, height),
              rp(8.78, 'x', width, height),
              'url(#bgLinGradB)')
  //gradientRect(svg, x, y, w, h,rx,ry)
  this.gradientRect(svg, 
                    rp(1518.39, 'x', width, height),
                    rp(332.76, 'x', width, height),
                    rp(274.29, 'x', width, height),
                    rp(428.89, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    rp(8.78, 'x', width, height),
                    'url(#bgLinGradB)')

  text = [
    'CREACIÓN DE ASOCIACIONES O',
    'ESTÁNDARES DE LA INDUSTRIA',
    'GLOBAL',
    'Diversas empresas en el mundo',
    'construyen acuerdos con su',
    'competencia para el logro de',
    'producción sustentable que',
    'contribuya a mitigar el impacto',
    'ambiental y social de su sector.'
  ]
  for (var i = 0; i < 2; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(1542.17, 'x', width, height)),
                ((rp(355.56, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(640, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'left', 0, 'black', 'bold')
  for (var i = 2; i < text.length; i++)
    //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
    setHtmlText(svg, 1, 'text' + i, 
                (rp(1542.17, 'x', width, height)),
                ((rp(384, 'x', width, height)) +
                (i * rp(19.2, 'x', width, height))),
                (rp(213.34, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(13.72, 'x', width, height)),
                'Roboto', 'justify', 0, 'black', '')


  /******************************
  tippedContainer - Finish
  *******************************/

  }

  render() {
    //const {guia, menuBreadcrumbs} = this.state;

    return (
      <div className={styles.container}>
        <Head>
          {MetaData("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible")}
          {OpenGraph("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible", "/img/repositorio_web-01.png")}
        </Head>
        <div ref={this.main}></div>
        <div ref={this.secondPart}></div>
        <div ref={this.thirdPart}></div>
        <div ref={this.fourthyPart}></div>
      </div>
    )
  }
}
export default Metodologia