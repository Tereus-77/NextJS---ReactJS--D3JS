import React, { Component } from "react";
import Head from 'next/head';
import Link from "next/link";
import styles from '../../styles/Home.module.css';
import FooterGuia from "../components/FooterGuia";
import { breadcrumb, headerCornerLogo, gradients, shadowFilters } from "../../functions/headerMenu";
import * as etapa from "../../functions/etapas";
import * as practica from "../../functions/practicas";
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "../../functions/referenceSize";
import * as d3 from 'd3';
import { getSideBarEtapas, getTimeOut, getSideBarLines, getDurationAnim } from "../../functions/sideBar";
import { OpenGraph, MetaData} from "../../functions/metaTags";

class Etapas extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // shadow stuff:
  shadow(svg, x, y, w, h, rx, ry, id) {
    //var g1 = svg.append('g');
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
      .attr("id", id)
      .attr("x", x)
      .attr("y", y)
      .attr('width', w)
      .attr('height', h)
      .style('fill', "white")
      .attr("filter", "url(#dropshadow)")
      .attr("rx", rx)								// radius
      .attr("ry", ry)
  }


  main = (element) => {
    // Obtiene el tamaño de la pantalla en uso
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Calcula el height adecuado para mantener el aspect ratio frente a cualquier resolución
    // En base a una resolución de pantalla de W:1920 H:1080
    const refWidth = getReferenceSizeWidth();
    const refHeight = getReferenceSizeHeight();
    const specialHeight = 2400;
    const heightCorrected = Math.round((refHeight * width) / refWidth);
    //const heightCorrected = Math.round(width / aspectRatio);
    if (height > width) {
      heightCorrected = Math.round((refHeight * width) / refWidth);
    }
    height = heightCorrected;

    const svg = d3.select(element)
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      //.attr("viewBox", "0 0 " + width + " " + specialHeight)
      //class to make it responsive
      .classed("svg-content-responsive", true);

    gradients(svg);
    shadowFilters(svg);

    /****************************************
     Contenido de Practicas - begin
    ****************************************/
    const practicasColor = [
      '#C134FC',
      '#886AFC',
      '#9980FA',
      '#F9764A',
      '#F89574',
      '#43F98D'
    ];
    const practicasLabel = [
      ['Cumplimiento Legalidad vigente'],
      ['Compromisos y cumplimientos extra legalidad'],
      ['Petición o adscripción internacional'],
      ['Mecanismos de aseguramiento /eficiencia gestión operacional'],
      ['Metodología de trabajo con el proveedor/ gestión operacional ASG'],
      ['Metodos de trabajo colaborativo/ integrado'],
    ];

    const paginaUno = [];
    paginaUno['titulo'] = 'ETAPAS RIESGOS Y OPORTUNIDADES EN LA CADENA DE APROVISIONAMIENTO';
    paginaUno['contenido'] = 'Esta Matriz nos permite observar todos los niveles donde podemos revisra nuestras acciones e interacciones para analizar en qué estado estamos, qué podemos mejorar y hacia donde vamos, con una mirada conjunta entre mandantes y proveedores.';

    var arcSegmentEtapas = [
      'M385.548,130.135C361.366,129.025 337.19,134.164 317.8,142.25L354.332,229.849C362.148,226.589 369.76,223.909 381.639,223.945L385.548,130.135Z',
      'M458.278,132.989C439.159,123.72 408.803,119.079 387.584,117.978L381.632,224.971C390.185,225.415 399.253,227.595 406.959,231.331L458.278,132.989Z',
      'M526.148,167.211C512.017,150.255 485.511,126.035 465.744,116.214L407.515,231.604C415.483,235.563 422.539,241.137 428.235,247.972L526.148,167.211Z',
      'M585.695,233.269C579.961,211.636 559.726,171.456 545.657,154.05L428.843,248.713C434.514,255.729 438.639,263.863 440.95,272.583L585.695,233.269Z',
      'M613.897,325.777C615.297,317.256 616,287.635 616,279C616,265.54 612.291,241.134 608.913,228.104L441.039,272.919C442.4,278.171 443.089,283.575 443.089,289C443.089,292.481 442.805,295.955 442.241,299.39L613.897,325.777Z',
      'M600.922,434.252C619.792,408.167 635.848,360.851 639.596,331.545L442.12,300.103C440.609,308.69 437.362,316.88 432.577,324.169L600.922,434.252Z',
      'M539.608,537.342C581.338,508.826 612.593,468.89 624.481,451.408L431.997,325.038C427.205,332.085 421.056,338.105 413.909,342.747L539.608,537.342Z',
      'M428.843,612.273C484.983,603.983 536.709,577.055 555.574,565.008L413.493,343.015C405.889,347.871 397.345,351.066 388.421,352.393L428.843,612.273Z',
      'M283.195,640.675C305.508,649.21 372.298,659.49 432.577,649.475L387.856,352.474C384.922,352.883 381.963,353.089 379,353.089C373.448,353.089 367.919,352.367 362.552,350.942L283.195,640.675Z',
      'M120.855,602.681C139.793,620.646 220.439,669.002 271.555,682L361.489,350.65C352.977,348.232 345.058,344.078 338.231,338.45L120.855,602.681Z'
    ];

    var arcSegmentEtapasColor = [
      'rgb(96,52,255)',
      'rgb(121,90,255)',
      'rgb(153,128,250)',
      'rgb(250,89,28)',
      'rgb(245,121,70)',
      'rgb(247,148,114)',
      'rgb(0,237,107)',
      'rgb(0,255,139)',
      'rgb(87,255,178)',
      'rgb(154,255,207)'
    ];
    var arcSegmentEtapasLabel = [
      ['Necesidad'],
      ['Solicitud del periodo'],
      ['Fuentes de aprovisionamiento'],
      ['Creación y seguimiento de orden de compra/contrato'],
      ['Ejecución del servicio de administración del contrato'],
      ['Recepción de mercancias y recepción del servicio'],
      ['Recepción de facturas'],
      ['Verificación de facturas'],
      ['Proceso de pago'],
      ['Evaluación y cierre'],
    ];




    /****************************************
     Contenido de etapas - end
    ****************************************/

    // Estados
    var selectedRol = 0;
    var selectedEtapa = 0;

    /*****************************************
     Posicionamiento y tamaño relativo - Begin
    *****************************************/

    const durationAnim  = getDurationAnim();
    const timeOut = getTimeOut();

    const translatex_e = rp(990, 'x', width, height);
    const translatey_e = rp(0, 'y', width, height);
    const scale_segments = rp(1.35, 'x', width, height);

    const radio = rp(40, 'x', width, height);
    const radio_small = rp(20, 'x', width, height);
    const radio_big = rp(40, 'x', width, height);

    const paginasPracticas = [];
    paginasPracticas['paginaUno'] = paginaUno;
    var paginaSeleccionada = 'paginaUno';

    // Posición y tamaño de fondo del "contenido" de la matriz de etapas
    let x_bg_matriz = rp(350, 'x', width, height); //width / 6
    let y_bg_matriz = rp(90, 'x', width, height); //165
    let width_bg_matriz = rp(750, 'x', width, height); //width / 6
    let height_bg_matriz = rp(845, 'x', width, height);
    const contenido_delta = rp(60, 'x', width, height);

    const margen_h = rp(60, 'x', width, height);
    const margen_v = rp(90, 'x', width, height);

    // Posición y tamaño de del "contenido" de la matriz de etapas
    let x_content = x_bg_matriz + margen_h; //350
    let y_content = y_bg_matriz + margen_v; //200

    // posición del logo marca de agua
    const margen_h_bg = rp(80, 'x', width, height);
    const x_logo_bg = x_bg_matriz + margen_h_bg;
    const y_logo_bg = y_bg_matriz + margen_v;
    const w_logo_bg = width_bg_matriz - (2 * margen_h_bg);

    // Posición de la lista de la página 1
    const delta_y_circleP1 = rp(60, 'x', width, height);

    //const w_buttonRef = (width_bg_matriz - (3 * margen_h)) / 2.5;
    const w_buttonRef = (width_bg_matriz - (1.5 * margen_h)) / 2.05;
    const h_textP1 = rp(60, 'x', width, height);
    const space_circleP1 = rp(10, 'x', width, height);
    var x_circleP1 = 0;
    const x_circleP1_a = x_content + rp(20, 'x', width, height);
    const x_circleP1_b = x_circleP1_a + space_circleP1 + w_buttonRef;
    const y_circleP1_ref = y_content + rp(350, 'x', width, height);
    const r_circleP1 = rp(20, 'x', width, height);
    const y_circleP1 = [
      y_circleP1_ref + rp(3, 'x', width, height) + (0 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (1 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (2 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (3 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (4 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (0 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (1 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (2 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (3 * delta_y_circleP1),
      y_circleP1_ref + rp(3, 'x', width, height) + (4 * delta_y_circleP1)
    ];
    const space_textP1 = space_circleP1;
    //console.log("x_circleP1 + rp(35, 'x', width, height)" + (x_circleP1 + rp(35, 'x', width, height)));
    let x_textP1 = 0;
    const x_textP1_a = x_circleP1_a + rp(35, 'x', width, height);
    const w_textP1 = w_buttonRef - rp(80, 'x', width, height);
    const x_textP1_b = x_textP1_a + w_buttonRef + space_textP1;
    const y_textP1 = [
      y_circleP1_ref - rp(25, 'x', width, height) + (0 * delta_y_circleP1),
      y_circleP1_ref - rp(25, 'x', width, height) + (1 * delta_y_circleP1),
      y_circleP1_ref - rp(25, 'x', width, height) + (2 * delta_y_circleP1),
      y_circleP1_ref - rp(30, 'x', width, height) + (3 * delta_y_circleP1),
      y_circleP1_ref - rp(30, 'x', width, height) + (4 * delta_y_circleP1),
      y_circleP1_ref - rp(30, 'x', width, height) + (0 * delta_y_circleP1),
      y_circleP1_ref - rp(25, 'x', width, height) + (1 * delta_y_circleP1),
      y_circleP1_ref - rp(25, 'x', width, height) + (2 * delta_y_circleP1),
      y_circleP1_ref - rp(25, 'x', width, height) + (3 * delta_y_circleP1),
      y_circleP1_ref - rp(25, 'x', width, height) + (4 * delta_y_circleP1)
    ];
    const space_circleNumberP1 = space_circleP1;
    let x_circleNumberP1;
    const x_circleNumberP1_a = x_circleP1_a - rp(4, 'x', width, height);
    const x_circleNumberP1_b = x_circleNumberP1_a + space_circleNumberP1 + w_buttonRef;
    const y_circleNumberP1 = [
      y_circleP1_ref + rp(7, 'x', width, height) + (0 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (1 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (2 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (3 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (4 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (0 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (1 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (2 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (3 * delta_y_circleP1),
      y_circleP1_ref + rp(7, 'x', width, height) + (4 * delta_y_circleP1)
    ];

    const fonSize_circleNumberP1 = rp(13, 'x', width, height);
    const etapasLink = [];
    etapasLink[0] = 'etapas/etapas#1';
    etapasLink[1] = 'etapas/etapas#2';
    etapasLink[2] = 'etapas/etapas#3';
    etapasLink[3] = 'etapas/etapas#4';
    etapasLink[4] = 'etapas/etapas#5';
    etapasLink[5] = 'etapas/etapas#6';
    etapasLink[6] = 'etapas/etapas#7';
    etapasLink[7] = 'etapas/etapas#8';
    etapasLink[8] = 'etapas/etapas#9';
    etapasLink[9] = 'etapas/etapas#10';

    const fonSize_textP1 = rp(16, 'x', width, height);

    // Posición del carracol
    const y_circleMenu = y_bg_matriz + contenido_delta + rp(30, 'y', width, height); //height_bg_matriz + rp(90, 'y', width, height);
    const outerRadius2 = x_bg_matriz - rp(360, 'x', width, height);
    const w_textoSegmentos = rp(200, 'x', width, height);
    const h_textoSegmentos = rp(100, 'x', width, height);
    //const x_textoSegmento = rp(1515, 'x', width, height);
    //const y_textoSegmento = rp(390, 'x', width, height);
    const x_textoSegmento = rp(1395, 'x', width, height);
    const y_textoSegmento = rp(210, 'x', width, height);
    const scale_textoSegmento = rp(2.8, 'x', width, height);
    /*const rotation_textoSegmento_ref = -88;
    const rotation_textoSegmento_division_ref = 14;
    const rotation_textoSegmento = [
      rotation_textoSegmento_ref,
      rotation_textoSegmento_ref + (1 * (360 / rotation_textoSegmento_division_ref)),
      rotation_textoSegmento_ref + (2 * (360 / rotation_textoSegmento_division_ref)),
      rotation_textoSegmento_ref + (3 * (360 / rotation_textoSegmento_division_ref)),
      rotation_textoSegmento_ref + (4 * (360 / rotation_textoSegmento_division_ref)),
      rotation_textoSegmento_ref + (5 * (360 / rotation_textoSegmento_division_ref)),
      rotation_textoSegmento_ref + (6 * (360 / rotation_textoSegmento_division_ref)),
      rotation_textoSegmento_ref + (7 * (360 / rotation_textoSegmento_division_ref)),
      rotation_textoSegmento_ref + (8 * (360 / rotation_textoSegmento_division_ref)),
      rotation_textoSegmento_ref + (9 * (360 / rotation_textoSegmento_division_ref))
    ];
    const pivot_textoSegmento = [
      '-15,10', //0
      '-28,6', //1
      '-40,0', //2
      '-90,0', //3
      '20,20', //4
      '5,20', //5
      '10,10', //6
      '10,10', //7
      '10,10', //8
      '10,10' //9
    ];/**/



    // estapasContentFO
    const contentFontSize = rp(18, 'x', width, height);
    const content_w = width_bg_matriz - (2 * margen_h);
    const content_h = height_bg_matriz - (2 * margen_v);

    // Selector página
    const w_selectorPag = w_buttonRef;
    const h_selectorPag = rp(55, 'x', width, height);
    const space_selectorPag = rp(10, 'x', width, height);
    const x_selectorPag_a = x_bg_matriz + rp(50, 'x', width, height);
    const x_selectorPag_b = x_selectorPag_a + w_selectorPag + space_selectorPag;

    const y_selectorPag = [
      y_circleP1_ref - rp(25, 'x', width, height) + (0 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (1 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (2 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (3 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (4 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (0 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (1 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (2 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (3 * rp(60, 'x', width, height)),
      y_circleP1_ref - rp(25, 'x', width, height) + (4 * rp(60, 'x', width, height))
    ]
    const r_selectorPag = rp(10, 'x', width, height);
    const stroke_selectorPag = 'url(#bgLinGradB)';
    const border_selectorPag = rp(1, 'x', width, height);

    // Posición y tamaño de título de página "tool tip"
    const x_pageTitleBg = rp(548.5, 'x', width, height);
    const y_pageTitleBg = rp(10, 'x', width, height);
    const w_pageTitleBg = rp(760, 'x', width, height);
    const h_pageTitleBg = rp(100, 'x', width, height);
    const margenPageTitle_h = rp(60, 'x', width, height);
    const margenPageTitle_v = rp(60, 'x', width, height);
    const x_pageTitle = x_pageTitleBg + margenPageTitle_h;
    const y_pageTitle = y_pageTitleBg + rp(5, 'x', width, height);
    const w_pageTitle = w_pageTitleBg - (2 * margenPageTitle_h);
    const h_pageTitle = h_pageTitleBg;
    const letterSpacing_pageTitle = rp(4, 'x', width, height);
    const fontSize_pageTitle = rp(26, 'x', width, height);
    const fontFamily_pageTitle = 'Oswald';
    const style_pageTitle = 'font-family:' + fontFamily_pageTitle + ';font-weight:bold;font-size:' + fontSize_pageTitle + 'px;letter-spacing:' + letterSpacing_pageTitle + 'px;color:#FFFFFF';

    /*******************************************
      Recorre y renderiza etapas "caracol" - Begin
    ********************************************/
    const svgSegmentos = svg.append("g")
      .attr('id', 'segmentos')
      .attr('opacity', 1);
    const svgTextoSegmentos = svg.append("g")
      .attr('id', 'textoSegmentos')
      .attr('opacity', 1);
    var circle_pos_y = y_circleMenu;
    var movingCircleRegreso = 0;
    for (var e = 0; e < 10; e++) {

      var id = e + 1;

      svgSegmentos.append("path")
        .attr("id", 'segment'+id)
        .attr("transform", "translate(" + translatex_e + "," + translatey_e + ") scale(" + scale_segments + ")")
        .attr("d", arcSegmentEtapas[e])
        .attr('stroke', arcSegmentEtapasColor[e])
        .attr('fill', arcSegmentEtapasColor[e]);

    }


    /*****************************************
    Recorre y renderiza etapas "caracol" - End
    ******************************************/

    /*******************************************************
     Renderiza Base para contenidos - Begin
    ******************************************************/
    // recuadro de contenido
    this.shadow(svg, x_bg_matriz, y_bg_matriz + contenido_delta, width_bg_matriz, height_bg_matriz, radio_big, radio_big, 'contentRectShadow');

    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/bg_creditos_a.png")
      .attr("x", x_logo_bg)
      .attr("y", y_logo_bg)
      .attr("width", w_logo_bg);

    // Renderiza textos del contenido de practicas
    svg.append("g")
      .attr('id', 'practicasContent')
      .attr('opacity', 1)
      .append("foreignObject")
      .attr('id', 'practicasContentFO')
      .attr('x', x_content)
      .attr('y', y_content)
      //.attr('rx', radio_big)
      //.attr('ry', radio_big)
      .attr("width", content_w)
      .attr("height", content_h)
      .attr("font-size", contentFontSize);

    /*******************************************************
     Renderiza Base para contenidos - End
    ******************************************************/





    /*******************************************************
     Renderiza contenidos página uno - Begin
    ******************************************************/
    const svgPaginaUno = svg.append("g")
      .attr('id', 'paginaUno')
      .attr('opacity', 1);

    // renderiza los fondos de botón de listaa
    var x_selectorPag;
    var deltaCircle = 0;
    var deltaDecenas = 0;
    for (let i = 0; i < arcSegmentEtapasLabel.length; i++) {
      if (i < 5) {
        x_selectorPag = x_selectorPag_a;
        x_circleP1 = x_circleP1_a
        x_circleNumberP1 = x_circleNumberP1_a
        x_textP1 = x_textP1_a;
      }
      else {
        x_selectorPag = x_selectorPag_b;
        x_circleP1 = x_circleP1_b
        x_circleNumberP1 = x_circleNumberP1_b
        x_textP1 = x_textP1_b;
      }
      if (i == 9) {
        deltaDecenas = -5;
      }
      svgPaginaUno.append('rect')
        .attr("id", "buttonSelector" + i)
        .attr('x', x_selectorPag)
        .attr('y', y_selectorPag[i])
        .attr('rx', r_selectorPag)
        .attr('ry', r_selectorPag)
        .style("fill", "#fdfdfd")
        .style("stroke", stroke_selectorPag)
        .style("stroke-width", border_selectorPag)
        .attr("filter", "url(#shadowFilter)")
        .attr('width', w_selectorPag) //width / 4.5
        .attr('height', h_selectorPag) //height / 20
        .attr('opacity', 1);
      //}/**/

      // Render lista

      //for (let i = 0; i < arcSegmentEtapasLabel.length; i++) {

      svgPaginaUno.append("circle")
        .attr("id", 'circleP1' + i)
        .attr("cx", x_circleP1)
        .attr("cy", y_circleP1[i])
        .attr("r", r_circleP1)
        .style("stroke", "white")
        .attr('opacity', 1)
        .style("fill", arcSegmentEtapasColor[i])
        ;

      svgPaginaUno.append("text")
        .attr('id', 'circleNumberP1')
        .attr('x', x_circleNumberP1 + deltaDecenas)
        .attr('y', y_circleNumberP1[i])
        .attr("font-size", fonSize_circleNumberP1)
        .attr("font-weight", "bold")
        .text(i + 1)
        .style('fill', 'white');

      svgPaginaUno.append("foreignObject")
        .attr('id', 'circleTextP1')
        .attr('x', x_textP1)
        .attr('y', y_textP1[i])
        .attr("width", w_textP1)
        .attr("height", h_textP1)
        .html(function (d) {
          return '<div style="font-family:Roboto;font-weight:bold;color:#111111;font-size:' + fonSize_textP1 + 'px"><p align="justify">' + arcSegmentEtapasLabel[i] + '</p></div>'
        });

      // Renderiza superficie clickeable
      var id = i+1
      svgPaginaUno.append('rect')
        .attr("id", "buttonSelectorClick" + i)
        .attr('x', x_selectorPag)
        .attr('y', y_selectorPag[i])
        .attr('rx', r_selectorPag)
        .attr('ry', r_selectorPag)
        .style("cursor", "pointer")
        .style("fill", "#fdfdfd")
        .attr('width', w_selectorPag) //width / 4.5
        .attr('height', h_selectorPag) //height / 20
        .attr('opacity', 0)
        .on('mouseover', function () {
          // hace transparente la etapa bajo el cursos
          d3.select('#segment'+id)
            .transition()
            .duration(100)
            .attr('stroke', 'url(#bgLinGradB)')
            .attr('opacity', 0.7);
          // Resalta
          practica.setButtonMouseStatus('#buttonSelector' + i, 100, 0.7, 'url(#bgLinGradB)');
        })
        .on('mouseout', function () {

          d3.select('#segment' + id)
            .transition()
            .duration(100)
            .attr('stroke', arcSegmentEtapasColor[i])
            .attr('opacity', 1);
          // Deja normal
          practica.setButtonMouseStatus('#buttonSelector' + i, 50, 1, '#fdfdfd');
        })
        .style("cursor", "pointer")
        .on('click', function () {
          d3.select('#rectWhiteFade')
            .attr("height", height)
            .transition()
            .duration(durationAnim)
            .attr('opacity', 1);
          setTimeout(function () {
            window.location.href = '/' + etapasLink[i];
          }, timeOut)
          
        });

      deltaCircle = deltaCircle + delta_y_circleP1;
    }

    svgSegmentos.append("image")
      .attr('id', 'lineasDiscontinuas')
      .attr('xlink:href', window.location.origin + '/svg/texto_etapas.svg')
      .attr("transform", 'translate(' + x_textoSegmento + ', ' + y_textoSegmento + '), ' + 'scale(' + scale_textoSegmento + ')')
      .attr('opacity', 1);


    /******************************************************
     Renderiza contenidos página uno - End
    ******************************************************/

    //área clickeable
    for (var e = 0; e < 10; e++) {

      var id = e + 1;
      /*var circle_pos_x = x_bg_matriz - outerRadius2;
      var arcSegment = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)     // It's in radian, so Pi = 3.14 = bottom.
        .endAngle(endAngle);        // 2*Pi = 6.28 = top                     
      const [x, y] = arcSegment.centroid(arcSegment);/**/
      svgSegmentos.append("path")
        .attr("id", 'segmentClick'+id)
        .attr("transform", "translate(" + translatex_e + "," + translatey_e + ") scale(" + scale_segments + ")")
        .attr("d", arcSegmentEtapas[e])
        .attr('opacity', 0)
        .style("cursor", "pointer")
        .on('mouseover', function (d, i) {
          // hace transparente la etapa bajo el cursos
          d3.select('#segment'+id)
            .transition()
            .duration(100)
            .attr('stroke', 'url(#bgLinGradB)')
            .attr('opacity', 0.7);
          // Resalta
          practica.setButtonMouseStatus('#buttonSelector' + e, 100, 0.7, 'url(#bgLinGradB)');

        })
        .on('mouseout', function (d, i) {
          //var movingCircleY = d3.select('#circle' + e + 'm').attr('cy');
          d3.select('#segment' + id)
            .transition()
            .duration(100)
            .attr('stroke', arcSegmentEtapasColor[e])
            .attr('opacity', 1);
          // Deja normal
          practica.setButtonMouseStatus('#buttonSelector' + e, 50, 1, '#fdfdfd')

        })
        .on('click', function () {
          d3.select('#rectWhiteFade')
            .attr("height", height)
            .transition()
            .duration(durationAnim)
            .attr('opacity', 1);
          setTimeout(function () {
            window.location.href = '/' + etapasLink[e];
          }, timeOut)
        });

      /*startAngle = startAngle + arcLen + arcPad;
      endAngle = startAngle + arcLen;/**/
    }
    // Activa página Uno
    practica.togglePaginaPracticas(1, paginasPracticas, paginaSeleccionada, arcSegmentEtapasLabel);


   /******************************
    Section 3 - breadcrumb - Start
    *******************************/
    breadcrumb(svg, width, height, 'Inicio', 'Etapas cadena aprovisionamiento', '/guia_de_gestion', '');
    /******************************
    Section 3 - breadcrumb - End
    *******************************/

    // Título
    //tooltip rectangle
    svg.append('rect')
      //.classed('filled', true)
      .attr('x', x_pageTitleBg)
      .attr('y', y_pageTitleBg)
      .attr('rx', radio_small)
      .attr('ry', radio_small)
      .style("fill", "url(#bgLinGradB)")
      .transition()
      .delay(200)
      .attr('width', w_pageTitleBg)
      .attr('height', h_pageTitleBg);

    svg.append("foreignObject")
      .attr('id', 'pageTitleFO')
      .attr('x', x_pageTitle)
      .attr('y', y_pageTitle)
      .attr("width", w_pageTitle + rp(50, 'x', width, height))
      .attr("height", h_pageTitle)
      .html(function (d) {
        return '<div style="' + style_pageTitle + '"><p align="justify">ETAPAS EN LA CADENA DE APROVISIONAMIENTO</p></div>'
      })



    /******************************
     Sidebar - Start
     *******************************/
    getSideBarLines(svg, width);
    // Para fade in y fade out
    svg.append('rect')
      .attr('id', 'rectWhiteFade')
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr('opacity', 1)
      .attr("fill", 'white');
    getSideBarEtapas(svg, width, heightCorrected, styles.grow);

    /******************************
    Sidebar - End
    *******************************/
    console.log('getDurationAnim()' + getDurationAnim());
   // Ejecuta fade In
    d3.select('#rectWhiteFade')
      .transition()
      .duration(durationAnim)
      .attr('opacity', 0)
      .duration(10)
      .attr("height", 1);
    
    /******************************
     Brand corner - begin
    *******************************/
    headerCornerLogo(svg, width, heightCorrected);
    /******************************
     Brand corner - end
    *******************************/

  }

  render() {


    return (
      <div className={styles.container}>
        <Head>
          {MetaData("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible")}
          {OpenGraph("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible", "/img/repositorio_web-01.png")}
        </Head>
        <div className={styles.container}>
          <div ref={this.main}></div>
          <FooterGuia />
        </div>
      </div>
    )
  }

}

export default Etapas;