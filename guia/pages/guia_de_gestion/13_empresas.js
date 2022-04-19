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
import { behindHorizontalLine, curvedLine, menuCircles, breadcrumb, headerCornerLogo, gradients } from "../../functions/headerMenu";
import { SidebarGuia } from "../../functions/SidebarGuia";
import { getReferenceSizeWidth, getReferenceSizeHeight } from "../../functions/referenceSize";
import { getArrowEnd } from "../../functions/arrowEnd";
import { getFooter, getFooterImage } from "../../functions/footer";
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
      .attr("viewBox", "0 0 " + width + " " + heightCorrected)
      //class to make it responsive
      .classed("svg-content-responsive", true)
      .append("g");
    
    //footer
    getFooter(svg, width, height)

    // header white
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", heightCorrected / 7.25)
      .attr("fill", "white")

    //header image
    svg.append("image")
    .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
    .attr("x", width / divW[8])
    .attr("y", heightCorrected / divH[2])
    .attr("width", width / 4)
    .style("cursor", "pointer")
    .on("click", function () {
          window.location.href = '/guia_de_gestion/12_creditos_a'
      })  

    gradients(svg);

    /******************************
    Section 3 - breadcrumb - Start
    *******************************/
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', 'guia_de_gestion', 'Empresas');
    /******************************
    Section 3 - breadcrumb - End
    *******************************/

    /******************************
    Containers - Start
    *******************************/ 
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
      .attr('x', width/2.3)
      .attr('y', height/7)
      .attr("rx", height/110)								// radius
      .attr("ry", height/110)
      .transition()
      .delay(200)
      .attr('width', width/2)
      .attr('height', height/9);
    
    const textContainer1 = [
        'NUESTRAS EMPRESAS'
      ]
  
      for (var i=0; i < textContainer1.length; i ++)
      svg.append("text")
        .attr("x", width/2.1)
        .attr("y", height/4.8 + i*height/25)
        .attr("dx", "0px")
        .attr("dy", "0px")
        .text(textContainer1[i])
        .style("font-size", width/70)
        .style("font-family", "Oswald")
        .style("font-weight", 400)
        .style("fill","white")
    //fondo con gradiante
    svg.append('rect')
      .attr('fill', 'url(#bgLinGradB)')
      .attr('x', width/60)
      .attr('y', height/3.39)
      .attr("rx", 0)								// radius
      .attr("ry", 0)
      .transition()
      .delay(200)
      .attr('width', width/1.1)
      .attr('height', height/1.7)
    
    svg.append("text")
      .attr("x", width/13)
      .attr("y", height/1.9)
      .attr("dx", "0px")
      .attr("dy", "0px")
      .text('UN TRABAJO EN CONJUNTO')
      .style("font-size", width/100)
      .style("font-family", "Roboto") 
      .style("fill", "White")
      .attr("font-weight","bold")

    svg.data([{ textContainer2:'Porque la colaboración ha sido fundamental para la realización de esta guía, queremos agradecer a las empresas que nos compartieron su experiencia, procesos de abastecimiento, recomendaciones y prácticas, especialmente a Falabella y BCI como integrantes de los comités de Sostenibilidad y Compras CCS'
          }])
          .append("foreignObject")
          .attr('x', width/13)
          .attr('y', height/1.8)
          .attr("width", width/5)
          .attr("height", (height-(height/6.5))+50)
          .html(function (d) {        
            return '<div style="color:white"><p align="justify">'+d.textContainer2+'</p></div>'  
          })
          .style("font-family", "Roboto")
          .style("font-size", width/100) 
          .style("fill", "White")


    //containerGrandesEmpresas
    //fila1 (2x6)
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/2.14, height/3.6, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/2.14, height/3.6, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/falabella.JPG")
      .attr("x", width/2.13)
      .attr("y", height/3.55)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.85, height/3.6, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.85, height/3.6, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/bci.JPG")
      .attr("x", width/1.845)
      .attr("y", height/3.55)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.63, height/3.6, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.63, height/3.6, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/casaideas.JPG")
      .attr("x", width/1.628)
      .attr("y", height/3.55)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.455, height/3.6, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.455, height/3.6, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/centrodeinnovacionuc.JPG")
      .attr("x", width/1.452)
      .attr("y", height/3.55)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.315, height/3.6, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.315, height/3.6, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/codelco.JPG")
      .attr("x", width/1.314)
      .attr("y", height/3.55)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.2, height/3.6, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.2, height/3.6, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    //shadow (svg, x, y, w, h,rx,ry)
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/colbun.JPG")
      .attr("x", width/1.198)
      .attr("y", height/3.55)
      .attr("width", width/16.7)
    
    //fila2 (2x5)
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/2.14, height/2.35, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/2.14, height/2.35, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/natura.JPG")
      .attr("x", width/2.13)
      .attr("y", height/2.32)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.85, height/2.35, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.85, height/2.35, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/salcobrand.JPG")
      .attr("x", width/1.845)
      .attr("y", height/2.32)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.63, height/2.35, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.63, height/2.35, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/sodimac.JPG")
      .attr("x", width/1.628)
      .attr("y", height/2.32)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.455, height/2.35, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.455, height/2.35, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/sura.JPG")
      .attr("x", width/1.452)
      .attr("y", height/2.32)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.315, height/2.35, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.315, height/2.35, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/wallmartchile.JPG")
      .attr("x", width/1.314)
      .attr("y", height/2.32)
      .attr("width", width/16.7)

    svg.append("text")
        .attr("x", width/2.15)
        .attr("y", height/1.68)
        .attr("dx", "0px")
        .attr("dy", "0px")
        .text("Grandes Empresas")
        .style("font-size", width/60)
        .style("font-family", "Oswald")
        .style("font-weight", 400)
        .style("fill","white")
      

    //containerPYMES
    //fila1 (2x4)
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.63, height/1.5, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.63, height/1.5, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/czabogados.JPG")
      .attr("x", width/1.628)
      .attr("y", height/1.49)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.455, height/1.5, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.455, height/1.5, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/demarcacionvialchile.JPG")
      .attr("x", width/1.452)
      .attr("y", height/1.49)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.315, height/1.5, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.315, height/1.5, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/distribuidoracumbres.JPG")
      .attr("x", width/1.314)
      .attr("y", height/1.49)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.2, height/1.5, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.2, height/1.5, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/hand2hand.JPG")
      .attr("x", width/1.198)
      .attr("y", height/1.49)
      .attr("width", width/16.7)

    //fila2 (2x4)
    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.63, height/1.23, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.63, height/1.23, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/mercadocircular.JPG")
      .attr("x", width/1.628)
      .attr("y", height/1.22)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.455, height/1.23, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.455, height/1.23, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/mercadodelqueso.JPG")
      .attr("x", width/1.452)
      .attr("y", height/1.22)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.315, height/1.23, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.315, height/1.23, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/nexttime.JPG")
      .attr("x", width/1.314)
      .attr("y", height/1.22)
      .attr("width", width/16.7)

    //shadow (svg, x, y, w, h,rx,ry)
    this.shadow(svg, width/1.2, height/1.23, width/16, height/8.1,height/110, height/110, 'url(#bgLinGradB)')
    //gradientRect(svg, x, y, w, h,rx,ry)
    this.gradientRect(svg, width/1.2, height/1.23, width/16, height/8.1, height/110, height/110, 'url(#bgLinGradB)')
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/logos_empresas/paletaconsultores.JPG")
      .attr("x", width/1.198)
      .attr("y", height/1.22)
      .attr("width", width/16.7)

    svg.append("text")
        .attr("x", width/1.175)
        .attr("y", height/1.55)
        .attr("dx", "0px")
        .attr("dy", "0px")
        .text("Pymes")
        .style("font-size", width/60)
        .style("font-family", "Oswald")
        .style("font-weight", 400)
        .style("fill","white")
    
    /******************************
    Containers - Finish
    *******************************/ 

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

    // first image
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
      .attr("x",width/15)
      .attr("y", height/6.5)
      .attr("width", width/6)
      .on("click", function() {
        window.location.href = '/guia_de_gestion'
      })

    /******************************
    Section 4 - leftMenu - Finish
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