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
      .append("g");

    gradients(svg);

    


    
    /******************************
    mainLines - Start
    *******************************/
    //linesContainerA
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(213.34, 'x', width, height))
      .attr("y1", rp(482.5, 'x', width, height))
      .attr("x2", rp(263.02, 'x', width, height))
      .attr("y2", rp(482.5, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(480, 'x', width, height))
      .attr("y1", rp(505.24, 'x', width, height))
      .attr("x2", rp(533.34, 'x', width, height))
      .attr("y2", rp(505.24, 'x', width, height))

    //linesContainerB
    //left
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(330.48, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(330.48, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(393.88, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(393.88, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(457.35, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(457.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(516.05, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(516.05, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(577.16, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(577.16, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(639.08, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(639.08, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(699.28, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(699.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(759.85, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(759.85, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(821.28, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(821.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(885.33, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    //vertical
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(533.34, 'x', width, height))
      .attr("y1", rp(330.48, 'x', width, height))
      .attr("x2", rp(533.34, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
    //right
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(330.48, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(330.48, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(393.88, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(393.88, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1200, 'x', width, height))
      .attr("y1", rp(457.35, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(457.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(516.05, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(516.05, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(577.16, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(577.16, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(639.08, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(639.08, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(699.28, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(699.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(759.85, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(759.85, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(821.28, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(821.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(885.33, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    //vertical
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(952.86, 'x', width, height))
      .attr("y1", rp(330.48, 'x', width, height))
      .attr("x2", rp(952.86, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
    //linesContainerC
    //vertical
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1146.27, 'x', width, height))
      .attr("y1", rp(482.5, 'x', width, height))
      .attr("x2", rp(1146.27, 'x', width, height))
      .attr("y2", rp(507.9, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    //linesContainerD
    //left
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1335.19, 'x', width, height))
      .attr("y1", rp(395.5, 'x', width, height))
      .attr("x2", rp(1381.3, 'x', width, height))
      .attr("y2", rp(395.5, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1200, 'x', width, height))
      .attr("y1", rp(457.35, 'x', width, height))
      .attr("x2", rp(1381.3, 'x', width, height))
      .attr("y2", rp(457.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1335.19, 'x', width, height))
      .attr("y1", rp(516.05, 'x', width, height))
      .attr("x2", rp(1381.3, 'x', width, height))
      .attr("y2", rp(516.05, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1335.19, 'x', width, height))
      .attr("y1", rp(577.16, 'x', width, height))
      .attr("x2", rp(1381.3, 'x', width, height))
      .attr("y2", rp(577.16, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1335.19, 'x', width, height))
      .attr("y1", rp(639.08, 'x', width, height))
      .attr("x2", rp(1381.3, 'x', width, height))
      .attr("y2", rp(639.08, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    //vertical
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1337.42, 'x', width, height))
      .attr("y1", rp(393.88, 'x', width, height))
      .attr("x2", rp(1337.42, 'x', width, height))
      .attr("y2", rp(639.08, 'x', width, height))

    /******************************
    mainLines - Finish
    *******************************/

    
    /******************************
    Containers - Start
    *******************************/
   //container under gradiantContainer
    //shadow (svg, x, y, w, h) {
      this.shadow(svg,
                  (rp(960, 'x', width, height)),
                  (rp(214.45, 'x', width, height)),
                  (rp(834.79, 'x', width, height)),
                  (rp(107.23, 'x', width, height)),
                  rp(8.78, 'x', width, height),
                  rp(8.78, 'x', width, height))
      const text = [
        'ABORDAJE DESDE LA CADENA DE SUMINISTRO Y LA PARTICIPACIÓN DEL',
        'MANDANTE Y EL PROVEEDOR EN CADA ETAPA DE RELACIONAMIENTO'
      ]
      for(var i=0; i < text.length; i++)
        
        setHtmlText(svg, 1, 'text'+i, 
                    (rp(979.6, 'x', width, height)),
                    ((rp(256, 'x', width, height))+
                    (i*rp(27.43, 'x', width, height))),
                    (rp(960, 'x', width, height)),
                    (rp(480, 'x', width, height)),
                    text[i], 
                    (rp(21.34, 'x', width, height)),
                    'Roboto', 'left', 0, '#90278D', 'bold')
      
    //gradientContainer
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
        '¿CÓMO USAR ESTA GUÍA?'
      ]
    for(var i=0; i < text.length; i++)
        
        setHtmlText( svg, 1, 'textGradientBold' + i, 
                    (width / 2.3), 
                    ((width / 11) + (i * width / 46.7)),
                    (width / 2),
                    rp(36, 'x', width, height),
                    text[i], 
                    rp(26, 'x', width, height), 
                    'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))
    
    //tooltip triangle    
    const x_triangle = rp(1644.5, 'x', width, height)
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
        valueSetTriangle['fill'] = '#793594'
        valueSetTriangle['filter'] = ''    
    setTriangle(valueSetTriangle)  
    
    //containerA
    //containerA1
    
    this.shadow(svg, 
                rp(274.29, 'x', width, height),
                rp(419.57, 'x', width, height),
                rp(213.34, 'x', width, height),
                rp(137.86, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    
    this.gradientRect(svg, 
                      rp(274.29, 'x', width, height),
                      rp(419.57, 'x', width, height),
                      rp(213.34, 'x', width, height),
                      rp(137.86, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))

    var letterSize = 140
    var letterSizeH1 = 140

    text = [
      'CADENA DE SUMINISTRO',
      'INTERACTIVA,',
      'CONSIDERANDO 10',
      'ETAPAS DE PROCESO'
    ]    
    for(var i=0; i < text.length; i++)
      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(267.41, 'x', width, height)),
                  ((rp(451.77, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')
    
    //containerB
    //containerB1
    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(304.42, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(304.42, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))

    text = [
      'NECESIDAD'
    ]    
    for(var i=0; i < text.length; i++)
      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(629.51, 'x', width, height)),
                  ((rp(325.43, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')

    //containerB2
    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(366.93, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                rp(581.82, 'x', width, height),
                rp(366.93, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))

    text = [
      'SOLICITUD DEL PEDIDO'
    ]    
    for(var i=0; i < text.length; i++)
      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(629.51, 'x', width, height)),
                  ((rp(387.1, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')

    //containerB3
    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(428.89, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(428.89, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      'FUENTES DE APROVISIONAMIENTO'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(629.51, 'x', width, height)),
                  ((rp(440.37, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')

    //containerB4
    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(489.85, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(489.85, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))

    text = [
      'CREACIÓN Y SEGUIMIENTO DE',
      'ORDEN DE COMPRA/CONTRATO'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(629.51, 'x', width, height)),
                  ((rp(498.71, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')

    //containerB5    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(551.12, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(551.12, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))

    text = [
      'EJECUCIÓN DEL SERVICIO Y',
      'ADMINISTRACIÓN DE CONTRATO'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
      (rp(629.51, 'x', width, height)),
      ((rp(561.41, 'x', width, height))+
      (i*rp(19.2, 'x', width, height))),
      (rp(225.89, 'x', width, height)),
      (rp(480, 'x', width, height)),
      text[i], 
      (rp(14.77, 'x', width, height)),
      'Roboto', 'center', 0, 'black', 'bold')

    //containerB6    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(611.54, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(611.54, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      'RECEPCIÓN DE MERCANCÍAS -',
      'SERVICIOS'      
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(629.51, 'x', width, height)),
                  ((rp(623.38, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')

    //containerB7    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(672.48, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(672.48, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      'RECEPCIÓN DE FACTURAS'      
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
      (rp(629.51, 'x', width, height)),
      ((rp(690.65, 'x', width, height))+
      (i*rp(19.2, 'x', width, height))),
      (rp(225.89, 'x', width, height)),
      (rp(480, 'x', width, height)),
      text[i], 
      (rp(14.77, 'x', width, height)),
      'Roboto', 'center', 0, 'black', 'bold') 

    //containerB8    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(733.29, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(733.29, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      'VERIFICACIÓN DE FACTURAS'      
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
      (rp(629.51, 'x', width, height)),
      ((rp(752.95, 'x', width, height))+
      (i*rp(19.2, 'x', width, height))),
      (rp(225.89, 'x', width, height)),
      (rp(480, 'x', width, height)),
      text[i], 
      (rp(14.77, 'x', width, height)),
      'Roboto', 'center', 0, 'black', 'bold') 

    //containerB9    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(794.24, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(794.24, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      'PROCESO DE PAGO'      
    ]    
    for(var i=0; i < text.length; i++)      
    setHtmlText(svg, 1, 'text'+i,
                (rp(629.51, 'x', width, height)),
                ((rp(812.88, 'x', width, height))+
                (i*rp(19.2, 'x', width, height))),
                (rp(225.89, 'x', width, height)),
                (rp(480, 'x', width, height)),
                text[i], 
                (rp(14.77, 'x', width, height)),
                'Roboto', 'center', 0, 'black', 'bold') 
    
    //containerB10    
    this.shadow(svg, 
                rp(581.82, 'x', width, height),
                rp(856.26, 'x', width, height),
                rp(320, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(581.82, 'x', width, height),
                      rp(856.26, 'x', width, height),
                      rp(320, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      'EVALUACIÓN Y CIERRE'      
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(629.51, 'x', width, height)),
                  ((rp(874.72, 'x', width, height))+
                  (i*rp(19.2, 'x', width, height))),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'center', 0, 'black', 'bold')  
    
    //containerC
    //containerC1    
    this.shadow(svg, 
                rp(1026.74, 'x', width, height),
                rp(428.89, 'x', width, height),
                rp(240, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1026.74, 'x', width, height),
                      rp(428.89, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      'PARA CADA ETAPA'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(1037.84, 'x', width, height)),
                  ((rp(446.52, 'x', width, height))+(i*width/100)),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 
                  'center', 
                  0, 
                  'black', 
                  'bold') 

    //containerC2    
    this.shadow(svg, 
                rp(1026.74, 'x', width, height),
                rp(521.63, 'x', width, height),
                rp(240, 'x', width, height),
                rp(389.12, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1026.74, 'x', width, height),
                      rp(521.63, 'x', width, height),
                      rp(240, 'x', width, height),
                      rp(389.12, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      '¿QUÉ PERMITE ESTA EXPLORACIÓN?',
      '<ul style="padding-left: 15%"><li> Situarse en el contexto de la cadena de suministro sostenible.</li><br/>'+
      '<li> Posicionarse en la cadena de suministro sostenible.</li><br/>'+
      '<li> Enriquecer el conocimiento de la relación mandante y proveedor, para optimizar la gestión operacional.</li><br/>'+
      '<li> Identificar oportunidades para fortalecer la gestión de la cadena suministro propia</li></ul>'
    ]
    for(var i=0; i < 1; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  rp(1026,'x', width, height), 
                  (rp(540,'x', width, height)+
                  (i*rp(14,'x', width, height))), 
                  rp(240,'x', width, height), 
                  rp(480,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'center', 0, 'black', 'bold')
    for(var i=1; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i,             
                  rp(1026,'x', width, height), 
                  (rp(550,'x', width, height)+
                  (i*rp(14,'x', width, height))), 
                  rp(220,'x', width, height), 
                  rp(480,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'justify', 0, 'black', '')

    //containerD
    //containerD1    
    this.shadow(svg, 
      rp(1391.31, 'x', width, height),
      rp(366.93, 'x', width, height),
      rp(384, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                rp(1391.31, 'x', width, height),
                rp(366.93, 'x', width, height),
                rp(384, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    text = [
      'Definición'
    ]
    for(var i=0; i < text.length; i++)      
      setHtmlText( svg, 1, 'text'+i, 
                  (rp(1406.6, 'x', width, height)),
                  ((rp(387.1, 'x', width, height))+(i*width/100)),
                  (rp(384, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '') 

    //containerD2    
    this.shadow(svg, 
                rp(1391.31, 'x', width, height),
                rp(428.89, 'x', width, height),
                rp(384, 'x', width, height),
                rp(54.52, 'x', width, height),
                rp(8.05, 'x', width, height),
                rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
                      rp(1391.31, 'x', width, height),
                      rp(428.89, 'x', width, height),
                      rp(384, 'x', width, height),
                      rp(54.52, 'x', width, height),
                      rp(8.05, 'x', width, height),
                      rp(8.05, 'x', width, height))
    text = [
      'El rol del mandante y el proveedor'
    ]
    for(var i=0; i < text.length; i++)      
      setHtmlText( svg, 1, 'text'+i, 
                  (rp(1406.6, 'x', width, height)),
                  ((rp(447.56, 'x', width, height))+(i*width/100)),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)), 'Roboto', 'left', 0, 'black', '')

    //containerD3    
    this.shadow(svg, 
      rp(1391.31, 'x', width, height),
      rp(491.1, 'x', width, height),
      rp(384, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
          rp(1391.31, 'x', width, height),
          rp(491.1, 'x', width, height),
          rp(384, 'x', width, height),
          rp(54.52, 'x', width, height),
          rp(8.05, 'x', width, height),
          rp(8.05, 'x', width, height))
    text = [
      'Los riesgos asociados'
    ]
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(1406.6, 'x', width, height)),
                  ((rp(510.44, 'x', width, height))+(i*width/100)),
                  (rp(225.89, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')
    
    //containerD4    
    this.shadow(svg, 
      rp(1391.31, 'x', width, height),
      rp(553.01, 'x', width, height),
      rp(384, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
          rp(1391.31, 'x', width, height),
          rp(553.01, 'x', width, height),
          rp(384, 'x', width, height),
          rp(54.52, 'x', width, height),
          rp(8.05, 'x', width, height),
          rp(8.05, 'x', width, height))
    text = [
      'Las oportunidades de gestión para mandante y proveedor'
    ]
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(1406.6, 'x', width, height)),
                  ((rp(563.05, 'x', width, height))+(i*width/100)),
                  (rp(369.24, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')

    //containerD5    
    this.shadow(svg, 
      rp(1391.31, 'x', width, height),
      rp(614.65, 'x', width, height),
      rp(384, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
          rp(1391.31, 'x', width, height),
          rp(614.65, 'x', width, height),
          rp(384, 'x', width, height),
          rp(54.52, 'x', width, height),
          rp(8.05, 'x', width, height),
          rp(8.05, 'x', width, height))
    text = [
      'Ejemplos de KPI e indicadores de reportabilidad para etapas específicas '
    ]
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(1406.6, 'x', width, height)),
                  ((rp(625.41, 'x', width, height))+(i*width/100)),
                  (rp(369.24, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(14.77, 'x', width, height)),
                  'Roboto', 'left', 0, 'black', '')    

    /******************************
    Containers - Finish
    *******************************/
    svg.append('rect')
      .attr('id', 'rectWhiteFade')
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr('opacity', 1)
      .attr("fill", 'white');
    d3.select('#rectWhiteFade')
      .transition()
      .duration(getDurationAnim())
      .attr('opacity', 0)
      .duration(10)
      .attr("height", 1);
    /******************************
    Section 3 - headerMenu - Start
    *******************************/
    behindHorizontalLine(svg, width, height, 'url(#bgLinGradHorizontal)');

    curvedLine(svg, width, height);

    theCircleShadow(svg, height);
    selectedcircleshadow(svg, height);
    menuCircles(svg, width, height, x_triangle, 1);
    /******************************
    Section 3 - headerMenu - Finish
    *******************************/
   /******************************
    Section 4 - sideBar - Start
    *******************************/
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

    svg.append('rect')
      .classed('filled', true)
      .attr('x', rp(156.1, 'x', width, height))
      .attr('y', rp(309.3, 'x', width, height))
      .attr('width', rp(10.11, 'x', width, height))
      .attr('height', rp(965, 'x', width, height));

    // first image
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
      .attr("x", width / 28.5)
      .attr("y", height / 4.68)
      .attr("width", width / 10)
      .style("cursor", "pointer")
      .style("cursor", "pointer").attr("class", styles.grow)

     // second image
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
      .attr("x", width / 20)
      .attr("y", height / 2.3)
      .attr("width", width / 15)
      .style("cursor", "pointer")
      .style("cursor", "pointer").attr("class", styles.grow)
      .on("click", function () {
          window.location.href = '/etapas'
      })
      .on('mouseover', function (d, i) {
          /*d3.select(this)
            .transition()
            .duration(100)
            .attr('opacity', 0.9);/**/
      })
      .on('mouseout', function (d, i) {
          //console.log("mouseout ", this);
          /*d3.select(this)
            .transition()
            .duration(100)
            .attr('opacity', 1);/**/
      });

    /******************************
    Section 4 - sidebar - Finish
    *******************************/
    /******************************
        Section 4 - sidebar - Finish
        *******************************/
    /******************************
     Section 3 - headerMenu - Finish
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
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', '¿Cómo usar la guía?');
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
      .append("g");

    //footer
    getFooter(svg, width, height)
    /******************************
    Section 4 - leftMenu - Start
    *******************************/
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

    svg.append('rect')
      .classed('filled', true)
      .attr('x', rp(156.1, 'x', width, height))
      .attr('y', 0)
      .attr('width', rp(10.11, 'x', width, height))
      .attr('height', rp(643.34, 'x', width, height));

   

    // third image
    svg.append("image")

        .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
        .attr("x", width / 20)
        .attr("y", height / 1.7)
        .attr("width", width / 15)
        .style("cursor", "pointer")
        .attr("class", styles.grow)
        .on("click", function () {
            window.location.href = '/buenas_practicas'
        })
        .on('mouseover', function (d, i) {
            /*d3.select(this)
              .transition()
              .duration(100)
              .attr('opacity', 0.9);/**/
        })
        .on('mouseout', function (d, i) {
            /*d3.select(this)
              .transition()
              .duration(100)
              .attr('opacity', 1);/**/
        });
    /******************************
    Section 4 - leftMenu - Finish
    *******************************/

    /******************************
    mainLines - Start
    *******************************/
    //linesContainerA
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(214.05, 'x', width, height))
      .attr("y1", rp(634.87, 'x', width, height))
      .attr("x2", rp(263.02, 'x', width, height))
      .attr("y2", rp(634.87, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
    getArrowEnd(svg, height);
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(480, 'x', width, height))
      .attr("y1", rp(639.08, 'x', width, height))
      .attr("x2", rp(533.34, 'x', width, height))
      .attr("y2", rp(639.08, 'x', width, height))
    //linesContainerB
    //left
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(330.48, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(330.48, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(393.88, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(393.88, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(457.35, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(457.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(516.05, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(516.05, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(577.16, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(577.16, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(639.08, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(639.08, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(699.28, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(699.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(759.85, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(759.85, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(821.28, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(821.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(530.98, 'x', width, height))
      .attr("y1", rp(885.33, 'x', width, height))
      .attr("x2", rp(573.14, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    //vertical
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(533.34, 'x', width, height))
      .attr("y1", rp(330.48, 'x', width, height))
      .attr("x2", rp(533.34, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
    //right
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(330.48, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(330.48, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(393.88, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(393.88, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(457.35, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(457.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(516.05, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(516.05, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(577.16, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(577.16, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(639.08, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(639.08, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(699.28, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(699.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(759.85, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(759.85, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(821.28, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(821.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(885.33, 'x', width, height))
      .attr("x2", rp(909.96, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    //vertical
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(952.86, 'x', width, height))
      .attr("y1", rp(330.48, 'x', width, height))
      .attr("x2", rp(952.86, 'x', width, height))
      .attr("y2", rp(885.33, 'x', width, height))
    //linesContainerC
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(457.35, 'x', width, height))
      .attr("x2", rp(994.82, 'x', width, height))
      .attr("y2", rp(457.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(639.08, 'x', width, height))
      .attr("x2", rp(994.82, 'x', width, height))
      .attr("y2", rp(639.08, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(955.23, 'x', width, height))
      .attr("y1", rp(821.28, 'x', width, height))
      .attr("x2", rp(994.82, 'x', width, height))
      .attr("y2", rp(821.28, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
    //linesContainerD
    //left
    //horizontal
    svg.append('line')
      .style("stroke", "#82368C")
      .style("stroke-width", rp(6.04, 'x', width, height))
      .attr("x1", rp(1465.65, 'x', width, height))
      .attr("y1", rp(457.35, 'x', width, height))
      .attr("x2", rp(1514.2, 'x', width, height))
      .attr("y2", rp(457.35, 'x', width, height))
      .attr("marker-end", "url(#triangle)")
      getArrowEnd(svg, height)
   
    /******************************
    mainLines - Finish
    *******************************/    
    /******************************
    Containers - Start
    *******************************/
   //container under gradientContainer
    //shadow (svg, x, y, w, h) {
      this.shadow(svg, 
        (rp(960, 'x', width, height)),
        (rp(214.45, 'x', width, height)),
        (rp(834.79, 'x', width, height)),
        (rp(107.23, 'x', width, height)),
        rp(8.05, 'x', width, height),
        rp(8.05, 'x', width, height))
      const text = [
        'BUENAS PRÁCTICAS DE GESTIÓN EN LAS ETAPAS DE LA CADENA DE SUMINISTRO'
      ]
      for(var i=0; i < text.length; i++)        
      setHtmlText(svg, 1, 'text'+i, 
                  (rp(979.6, 'x', width, height)),
                  ((rp(270.43, 'x', width, height))+(i*width/100)),
                  (rp(960, 'x', width, height)),
                  (rp(480, 'x', width, height)),
                  text[i], 
                  (rp(21.34, 'x', width, height)),
                  'Roboto', 'left', 0, '#90278D', 'bold')
    //gradientContainer
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
      .attr('id', 'mainGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');

    // tooltip
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
        '¿CÓMO USAR ESTA GUÍA?'
      ]
    for(var i=0; i < text.length; i++)      
      setHtmlText( svg, 1, 'textGradientBold' + i, 
                    (width / 2.3), 
                    ((width / 11) + 
                    (i * width / 46.7)),
                    (width / 2),
                    rp(36, 'x', width, height),
                    text[i], 
                    rp(26, 'x', width, height), 
                    'Oswald', 'center', 0, 'white', 'bold', rp(4, 'x', width, height))
    
    //containerA
    //containerA1    
    this.shadow(svg, 
      rp(274.29, 'x', width, height),
      rp(561.05, 'x', width, height),
      rp(213.34, 'x', width, height),
      rp(137.86, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
          rp(274.29, 'x', width, height),
          rp(561.05, 'x', width, height),
          rp(213.34, 'x', width, height),
          rp(137.86, 'x', width, height),
          rp(8.05, 'x', width, height),
          rp(8.05, 'x', width, height))
    text = [
      'A PARTIR DE CADA',
      'ETAPAS DE LA',
      'CADENA DE',
      'SUMINISTRO'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 1, 
        'text'+i, 
        (rp(295.39, 'x', width, height)),
        ((rp(594.43, 'x', width, height))+(i*width/100)),
        (rp(225.89, 'x', width, height)),
        (rp(480, 'x', width, height)),
        text[i], 
        (rp(14.77, 'x', width, height)),
        'Roboto', 
        'left', 
        0, 
        'black', 
        'bold')
    
    //containerB
    //containerB1    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(304.42, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(304.42, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'NECESIDAD'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
        1, 
        'text'+i, 
        (rp(629.51, 'x', width, height)),
        ((rp(325.43, 'x', width, height))+(i*width/100)),
        (rp(225.89, 'x', width, height)),
        (rp(480, 'x', width, height)),
        text[i], 
        (rp(14.77, 'x', width, height)),
        'Roboto', 
        'center', 
        0, 
        'black', 
        'bold')

    //containerB2    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(366.93, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(366.93, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'SOLICITUD DEL PEDIDO'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
        1, 
        'text'+i, 
        (rp(629.51, 'x', width, height)),
        ((rp(387.1, 'x', width, height))+(i*width/100)),
        (rp(225.89, 'x', width, height)),
        (rp(480, 'x', width, height)),
        text[i], 
        (rp(14.77, 'x', width, height)),
        'Roboto', 
        'center', 
        0, 
        'black', 
        'bold')

    //containerB3    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(428.89, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(428.89, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'FUENTES DE APROVISIONAMIENTO'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
        1, 
        'text'+i, 
        (rp(629.51, 'x', width, height)),
        ((rp(440.37, 'x', width, height))+(i*width/100)),
        (rp(225.89, 'x', width, height)),
        (rp(480, 'x', width, height)),
        text[i], 
        (rp(14.77, 'x', width, height)),
        'Roboto', 
        'center', 
        0, 
        'black', 
        'bold')

    //containerB4    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(489.85, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(489.85, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'CREACIÓN Y SEGUIMIENTO DE',
      'ORDEN DE COMPRA/CONTRATO'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
        1, 
        'text'+i, 
        (rp(629.51, 'x', width, height)),
        ((rp(498.71, 'x', width, height))+(i*width/100)),
        (rp(225.89, 'x', width, height)),
        (rp(480, 'x', width, height)),
        text[i], 
        (rp(14.77, 'x', width, height)),
        'Roboto', 
        'center', 
        0, 
        'black', 
        'bold')

    //containerB5    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(551.12, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(551.12, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'EJECUCIÓN DEL SERVICIO Y',
      'ADMINISTRACIÓN DE CONTRATO'
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
        1, 
        'text'+i, 
        (rp(629.51, 'x', width, height)),
        ((rp(561.41, 'x', width, height))+(i*width/100)),
        (rp(225.89, 'x', width, height)),
        (rp(480, 'x', width, height)),
        text[i], 
        (rp(14.77, 'x', width, height)),
        'Roboto', 
        'center', 
        0, 
        'black', 
        'bold')

    //containerB6
    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(611.54, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(611.54, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))

    text = [
      'RECEPCIÓN DE MERCANCÍAS -',
      'SERVICIOS'      
    ]    
    for(var i=0; i < text.length; i++)      
    setHtmlText(svg, 
      1, 
      'text'+i, 
      (rp(629.51, 'x', width, height)),
      ((rp(623.38, 'x', width, height))+(i*width/100)),
      (rp(225.89, 'x', width, height)),
      (rp(480, 'x', width, height)),
      text[i], 
      (rp(14.77, 'x', width, height)),
      'Roboto', 
      'center', 
      0, 
      'black', 
      'bold')

    //containerB7    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(672.48, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(672.48, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'RECEPCIÓN DE FACTURAS'      
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
      1, 
      'text'+i, 
      (rp(629.51, 'x', width, height)),
      ((rp(690.65, 'x', width, height))+(i*width/100)),
      (rp(225.89, 'x', width, height)),
      (rp(480, 'x', width, height)),
      text[i], 
      (rp(14.77, 'x', width, height)),
      'Roboto', 
      'center', 
      0, 
      'black', 
      'bold') 

    //containerB8
    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(733.29, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(733.29, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'VERIFICACIÓN DE FACTURAS'      
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
      1, 
      'text'+i, 
      (rp(629.51, 'x', width, height)),
      ((rp(752.95, 'x', width, height))+(i*width/100)),
      (rp(225.89, 'x', width, height)),
      (rp(480, 'x', width, height)),
      text[i], 
      (rp(14.77, 'x', width, height)),
      'Roboto', 
      'center', 
      0, 
      'black', 
      'bold')

    //containerB9
    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(794.24, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(794.24, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))

    text = [
      'PROCESO DE PAGO'      
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
      1, 
      'text'+i, 
      (rp(629.51, 'x', width, height)),
      ((rp(812.88, 'x', width, height))+(i*width/100)),
      (rp(225.89, 'x', width, height)),
      (rp(480, 'x', width, height)),
      text[i], 
      (rp(14.77, 'x', width, height)),
      'Roboto', 
      'center', 
      0, 
      'black', 
      'bold') 

    //containerB10    
    this.shadow(svg, 
      rp(581.82, 'x', width, height),
      rp(856.26, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(581.82, 'x', width, height),
      rp(856.26, 'x', width, height),
      rp(320, 'x', width, height),
      rp(54.52, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))

    text = [
      'EVALUACIÓN Y CIERRE'      
    ]    
    for(var i=0; i < text.length; i++)      
      setHtmlText(svg, 
          1, 
          'text'+i, 
          (rp(629.51, 'x', width, height)),
          ((rp(874.72, 'x', width, height))+(i*width/100)),
          (rp(225.89, 'x', width, height)),
          (rp(480, 'x', width, height)),
          text[i], 
          (rp(14.77, 'x', width, height)),
          'Roboto', 
          'center', 
          0, 
          'black', 
          'bold')

    //containerC
    //containerC1    
    this.shadow(svg, 
      rp(1005.24, 'x', width, height),
      rp(360.75, 'x', width, height),
      rp(480, 'x', width, height),
      rp(175.46, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(1005.24, 'x', width, height),
      rp(360.75, 'x', width, height),
      rp(480, 'x', width, height),
      rp(175.46, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'IDENTIFICACIÓN DE SEIS NIVELES COMPLEMENTARIOS DE',
      'PRÁCTICAS:',
      '<ul style="padding-left: 5%"><li> Cumplimiento Legalidad vigente</li>'+
      '<li> Compromisos y cumplimientos extra legalidad</li>'+
      '<li> Petición o adscripción internacional</li>'+
      '<li> Mecanismos de aseguramiento /eficiencia gestión operacional</li>'+
      '<li> Metodología de trabajo con el proveedor/ gestión operacional ASG</li>'+
      '<li> Métodos de trabajo colaborativo/ integrado</li></ul>'
    ]
    for(var i=0; i < 2; i++)      
      setHtmlText(svg, 1, 'text'+i,             
                  rp(1021,'x', width, height), 
                  (rp(376,'x', width, height)+
                  (i*rp(14,'x', width, height))), 
                  rp(440,'x', width, height), 
                  rp(480,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'justify', 0, 'black', 'bold')
    for(var i=2; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  rp(1021,'x', width, height), 
                  (rp(380,'x', width, height)+
                  (i*rp(14,'x', width, height))), 
                  rp(440,'x', width, height), 
                  rp(480,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'justify', 0, 'black', '')

    //containerC2    
    this.shadow(svg, 
      rp(1005.24, 'x', width, height),
      rp(543.67, 'x', width, height),
      rp(480, 'x', width, height),
      rp(175.46, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
          rp(1005.24, 'x', width, height),
          rp(543.67, 'x', width, height),
          rp(480, 'x', width, height),
          rp(175.46, 'x', width, height),
          rp(8.05, 'x', width, height),
          rp(8.05, 'x', width, height))
    text = [
      'IDENTIFICACIÓN DE PRÁCTICAS CONCRETAS PARA CADA UNO DE LOS SEIS NIVELES COMPLEMENTARIOS:',
      'Total de 40 prácticas'
    ]
    for(var i=0; i < 1; i++)
      
      setHtmlText(svg, 1, 'text'+i, 
                  rp(1021,'x', width, height), 
                  (rp(560,'x', width, height)+
                  (i*rp(14,'x', width, height))), 
                  rp(440,'x', width, height), 
                  rp(480,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'justify', 0, 'black', 'bold')
    for(var i=1; i < text.length; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  rp(1021,'x', width, height), 
                  (rp(585,'x', width, height)+
                  (i*rp(14,'x', width, height))), 
                  rp(450,'x', width, height), 
                  rp(40,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'justify', 0, 'black', '')

    //containerC3    
    this.shadow(svg, 
      rp(1005.24, 'x', width, height),
      rp(728.31, 'x', width, height),
      rp(480, 'x', width, height),
      rp(175.46, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(1005.24, 'x', width, height),
      rp(728.31, 'x', width, height),
      rp(480, 'x', width, height),
      rp(175.46, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      'PARA CADA NIVEL Y PRÁCTICA',
      '<ul style="padding-left: 5%"><li> Asociación a dimensiones OCDE: DD.HH., Trabajo, Medio ambiente y ética, probidad y resolución de conflictos.</li><br/>'+
      '<li> Rol del proveedor y mandante en cada práctica: competencia proveedor, mandante o compartida.</li><br/>'+
      '<li> Asociación a principios de pacto global (10)</li><br/>'+
      '<li> Asociación a objetivo de desarrollo disponible</li></ul>'
    ]
    for(var i=0; i < 1; i++)      
      setHtmlText(svg, 1, 'text'+i, 
                  rp(1021,'x', width, height), 
                  (rp(742,'x', width, height)+
                  (i*rp(14,'x', width, height))), 
                  rp(450,'x', width, height), 
                  rp(20,'x', width, height),
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'left', 0, 'black', 'bold')
    for(var i=1; i < text.length; i++)
      
      setHtmlText( svg, 1, 'text'+i, 
                  rp(1021,'x', width, height), 
                  (rp(740,'x', width, height)+
                  (i*rp(14,'x', width, height))), 
                  rp(450,'x', width, height), 
                  rp(480,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'justify', 0, 'black', '')

    //containerD
    //containerD1    
    this.shadow(svg, 
      rp(1523.81, 'x', width, height),
      rp(360.75, 'x', width, height),
      rp(270.43, 'x', width, height),
      rp(539.11, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    this.gradientRect(svg, 
      rp(1523.81, 'x', width, height),
      rp(360.75, 'x', width, height),
      rp(270.43, 'x', width, height),
      rp(539.11, 'x', width, height),
      rp(8.05, 'x', width, height),
      rp(8.05, 'x', width, height))
    text = [
      '¿QUÉ PERMITE ESTA EXPLORACIÓN?',
      '<ul style="padding-left: 15%"><li>Posicionarse en la cadena de suministro sostenible, desde la estrategia, los objetivos de área y sus desafíos.</li><br/>'+
      '<li> Posicionarse en los distintos niveles de buenas prácticas.</li><br/>'+
      '<li> Identificar los puntos de encuentro entre mandante y proveedor en los distintas niveles de buenas prácticas de la cadena de suministro.</li><br/>'+
      '<li> Identificar buenas prácticas que permitan robustecer la cadena de suministro.</li><br/>'+
      '<li> Identificar desafíos de desarrollo para potenciar y/o extender el plan de gestión de la cadena de suministro.</li><br/>'+
      '<li> Identificar oportunidades para fortalecer la gestión de la cadena suministro propia.</li><br/>'+
      '<li> Conocer e identificar el alcance a la contribución al desarrollo sostenible de las buenas prácticas, en el marco de la guía de la debida diligencia de la OCDE para una conducta empresarial responsable, los principios de Pacto Global y Los Objetivos de Desarrollo Sostenible (ODS)</li></ul>'
    ]
    for(var i=0; i < 1; i++)      
      setHtmlText( svg, 1, 'text'+i, 
                  rp(1524,'x', width, height), 
                  (rp(376.4,'x', width, height)+
                  (i*rp(192,'x', width, height))), 
                  rp(270.4,'x', width, height), 
                  rp(480,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'center', 0, 'black', 'bold')

    for(var i=1; i < text.length; i++)      
      setHtmlText( svg, 1, 'text'+i, 
                  rp(1520,'x', width, height), 
                  (rp(390,'x', width, height)+
                  (i*rp(15,'x', width, height))), 
                  rp(250,'x', width, height), 
                  rp(600,'x', width, height), 
                  text[i], 
                  rp(12,'x', width, height), 
                  'Roboto', 'justify', 0, 'black', '')
    
    /******************************
    Containers - Finish
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
          <div ref={this.secondPart}></div>
      </div>
    )
  }
}
export default Metodologia