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
import { getSideBarPracticas, animaSidebarPracticas, getTimeOut, getSideBarLines, getDurationAnim } from "../../functions/sideBar";
import { setHtmlText, setHtmlTextLink, setHtmlTextInclinado } from "../../functions/htmlText";
import { OpenGraph, MetaData } from "../../functions/metaTags";

class BuenasPracticas extends Component {
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
    const practicasColorEspiral = [
      '#C134FC',
      '#886AFC',
      '#9980FA',
      '#F9764A',
      '#F89574',
      '#43F98D'
    ];
    const practicasColor = [
      '#C134FC',
      '#886AFC',
      '#9980FA',
      '#F9764A',
      '#F89574',
      '#43F98D'
    ];/**/
    const practicasLabel = [
      ['Cumplimiento Legalidad vigente'],
      ['Compromisos y cumplimientos extra legalidad'],
      ['Petición o adscripción internacional'],
      ['Mecanismos de aseguramiento /eficiencia gestión operacional'],
      ['Metodología de trabajo con el proveedor/ gestión operacional ASG'],
      ['Metodos de trabajo colaborativo/ integrado'],
    ];
    
     
    const x_practicasLabel = [
      [rp(1450, 'x', width, height)],
      [rp(1350, 'x', width, height)],
      [rp(1450, 'x', width, height)],
      [rp(1450, 'x', width, height)],
      [rp(1450, 'x', width, height)],
      [rp(1450, 'x', width, height)]
    ];
    const w_practicasLabel = [
      [rp(450, 'x', width, height)],
      [rp(550, 'x', width, height)],
      [rp(450, 'x', width, height)],
      [rp(450, 'x', width, height)],
      [rp(450, 'x', width, height)],
      [rp(450, 'x', width, height)]
    ];

    const practica_1 = [0, 1, 2, 3, 4, 5, 6, 7];
    const practica_2 = [0, 1, 2, 3];
    const practica_3 = [0, 1, 2, 3, 4, 5];
    const practica_4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const practica_5 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const practica_6 = [0, 1, 2, 3, 4];
    const practicasAreaClick = [
      practica_6,
      practica_5,
      practica_4,
      practica_3,
      practica_2,
      practica_1
    ];

    const paginaUno = [];
    paginaUno['titulo'] = 'MATRIZ DE BUENAS PRÁCTICAS PARA LA GESTIÓN DE CADENA DE SUMINISTRO SOSTENIBLE';
    paginaUno['contenido'] = 'Esta Matriz nos permite observar todos los niveles donde podemos revisra nuestras acciones e interacciones para analizar en qué estado estamos, qué podemos mejorar y hacia donde vamos, con una mirada conjunta entre mandantes y proveedores.';

    const paginaDos = [];
    paginaDos['titulo'] = 'COMPETENCIAS Y BUENAS PRÁCTICAS';
    paginaDos['contenido'] = 'Para cada item en cada nivel es importante tener en cuenta qué acciones, responsabilidades y normativas le atañen a cada actor, y cuáles son compartidas, para poder generar interacciones coordinadas hacia metas comunes de mejora.';


    /****************************************
     Contenido de etapas - end
    ****************************************/

    // Estados
    var selectedRol = 0;
    var selectedEtapa = 0;

    /*****************************************
     Posicionamiento y tamaño relativo - Begin
    *****************************************/

    const radio = rp(40, 'x', width, height);
    const radio_small = rp(20, 'x', width, height);

    const paginasPracticas = [];
    paginasPracticas['paginaUno'] = paginaUno;
    paginasPracticas['paginaDos'] = paginaDos;
    var paginaSeleccionada = 'paginaUno';

    // Posición y tamaño de fondo del "contenido" de la matriz de etapas
    let x_bg_matriz = rp(350, 'x', width, height); //width / 6
    let y_bg_matriz = rp(90, 'x', width, height); //165
    let width_bg_matriz = rp(550, 'x', width, height); //width / 6
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
    const x_circleP1 = x_content + rp(20, 'x', width, height);
    const y_circleP1 = y_content + rp(360, 'x', width, height);
    const r_circleP1 = rp(20, 'x', width, height);
    const x_textP1 = x_circleP1 + rp(35, 'x', width, height);
    const y_textP1 = y_circleP1 - rp(25, 'x', width, height);//y_circleP1 + rp(5, 'x', width, height);
    const w_textP1 = width_bg_matriz - (3 * margen_h);
    const h_textP1 = rp(60, 'x', width, height);
    const x_circleNumberP1 = x_circleP1 - rp(4, 'x', width, height);
    const y_circleNumberP1 = y_circleP1 + rp(4, 'x', width, height);
    const fonSize_circleNumberP1 = rp(13, 'x', width, height);
    const practicasLink = [];
    practicasLink[0] = 'buenas_practicas/1_cumplimiento_legalidad';
    practicasLink[1] = 'buenas_practicas/2_compromisos_y_cumplimientos';
    practicasLink[2] = 'buenas_practicas/3_peticion_o_adscripcion_internacional';
    practicasLink[3] = 'buenas_practicas/4_mecanismos_de_aseguramiento';
    practicasLink[4] = 'buenas_practicas/5_metodologia_de_trabajo';
    practicasLink[5] = 'buenas_practicas/6_metodos_de_trabajo_colaboratico';

    const fonSize_textP1 = rp(16, 'x', width, height);

    // Posición de la lista de la página 2
    const delta_y_circleP2 = rp(60, 'x', width, height);
    const x_circleP2 = x_content + rp(20, 'x', width, height);
    const y_circleP2 = y_content + rp(360, 'x', width, height);
    const r_circleP2 = rp(15, 'x', width, height);
    const x_textP2 = x_circleP1 + rp(35, 'x', width, height);
    const y_textP2 = y_circleP1 - rp(25, 'x', width, height);//y_circleP1 + rp(5, 'x', width, height);
    const w_textP2 = width_bg_matriz - (3 * margen_h);
    const h_textP2 = rp(60, 'x', width, height);
    const x_circleNumberP2 = x_circleP2 - rp(4, 'x', width, height);
    const y_circleNumberP2 = y_circleP2 + rp(4, 'x', width, height);
    const fonSize_circleNumberP2 = rp(13, 'x', width, height);
    const fonSize_textP2 = fonSize_textP1;


    // estapasContentFO
    const contentFontSize = rp(18, 'x', width, height);
    const content_w = width_bg_matriz - (2 * margen_h);
    const content_h = height_bg_matriz - (2 * margen_v);

    // Posición y tamaño de del "espiral" de la matriz de buenas prácticas
    const x_rosca = x_bg_matriz + rp(400, 'x', width, height);
    const y_rosca = y_bg_matriz - rp(90, 'x', width, height);
    const w_rosca = rp(1100, 'x', width, height); //200
    const h_rosca = rp(850, 'x', width, height); //200
    const scale_rosca = 1.11;


    // Selector página
    const w_selectorPag = width_bg_matriz - (1.5 * margen_h);
    const h_selectorPag = rp(55, 'x', width, height);;
    const x_selectorPag = x_bg_matriz + (width_bg_matriz / 2) - (w_selectorPag / 2);
    //const y_selectorPag = y_content + rp(700, 'x', width, height);
    const y_selectorPagRef = y_content + rp(270, 'x', width, height);
    const y_selectorPag = [
      y_selectorPagRef + rp(60, 'x', width, height),
      y_selectorPagRef + (2 * rp(60, 'x', width, height)),
      y_selectorPagRef + (3 * rp(60, 'x', width, height)),
      y_selectorPagRef + (4 * rp(60, 'x', width, height)),
      y_selectorPagRef + (5 * rp(60, 'x', width, height)),
      y_selectorPagRef + (6 * rp(60, 'x', width, height))
    ]
    const r_selectorPag = rp(10, 'x', width, height);
    const stroke_selectorPag = 'url(#bgLinGradB)';
    const border_selectorPag = rp(1, 'x', width, height);


    // Posición y tamaño de textos de titulos de etapas
    var paso = rp(65, 'x', width, height);

    // Posición y tamaño selección de rol
    let textRol = ['Competencias mandante', 'Competencias proveedor', 'Competencias compartidas'];
    let colorRol = ['#9E6F9E', '#B3BABD', '#D9E021']; // mandante, compartido, proveedor,

    // Posición y tamaño de título de página "tool tip"
    const x_pageTitleBg = rp(548.5, 'x', width, height);
    const y_pageTitleBg = rp(10, 'x', width, height);
    const w_pageTitleBg = rp(550, 'x', width, height);
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

    // Posición y tamaño de la paginación
    const fonSize_pagination = rp(20, 'x', width, height);
    const space_ButtonPag = rp(15, 'x', width, height);
    const ancho_paginacion = (2 * h_selectorPag) + space_ButtonPag;
    const x_ButtonPag = x_bg_matriz + (width_bg_matriz / 2) - (ancho_paginacion / 2);
    const y_ButtonPag = y_selectorPagRef + (7 * rp(60, 'x', width, height));
    const w_ButtonPag = h_selectorPag;
    const h_ButtonPag = h_selectorPag;
    const r_ButtonPag = (delta_y_circleP1 / 2);// * rp(0.95, 'x', width, height);
    const x_textPag = x_ButtonPag + rp(20, 'x', width, height);
    const y_textPag = y_ButtonPag - rp(5, 'x', width, height);
    const w_textPag = w_ButtonPag / 2;
    const h_textPag = h_ButtonPag;
    const fill_buttonPagH = 'url(#bgLinGradF)';
    const fill_buttonPagN = '#fdfdfd';
    const currentPagination = 0;
    const color_pagination = '#111111';
    const color_paginationH = '#ffffff';
    const color_paginationN = color_pagination;
    var x_button;

    /*********************************************
      Renderiza elementos del "espiral" - Begin
    *********************************************/

    const svgSegmentos = svg.append('g')
      .attr('id', 'segmentosEspiral')
      .attr("transform", "scale(" + scale_rosca + ")")
      .attr('opacity', 1);

    // Renderiza líneas discontinuas
    svgSegmentos.append("image")
      .attr('id', 'lineasDiscontinuas')
      .attr('xlink:href', window.location.origin + '/svg/practicas_lineas.svg')
      .attr('x', x_rosca)
      .attr('y', y_rosca)
      .attr('width', w_rosca)
      .attr('height', h_rosca)
      .attr('opacity', 1);

    // Renderiza segmentos
    var segmentIndex = 0;
    for (let l = 0; l < 44; l++) {
      segmentIndex = l + 1;
      svgSegmentos.append("image")
        .attr('id', 'segmentos' + segmentIndex)
        .attr('xlink:href', window.location.origin + '/svg/practicas_segmentos_' + segmentIndex + '.svg')
        .attr('x', x_rosca)
        .attr('y', y_rosca)
        .attr('width', w_rosca)
        .attr('height', h_rosca)
        .style("cursor", "pointer")
        .on('mouseover', function (d, i) {
          // hace transparente la etapa bajo el cursos
          d3.select("#s" + segmentIndex)
            .transition()
            .duration(100)
            .attr('opacity', 0.7);
        })
        .on('mouseout', function (d, i) {
          d3.select("#s" + segmentIndex)
            .transition()
            .duration(100)
            .attr('opacity', 1);
        })
        .on('click', function () {
          d3.select(this)
            .transition()
            .duration(100)
            .attr('opacity', 0.5);
        });
    }
    // Renderiza círculos de responsabilidades
    svgSegmentos.append("image")
      .attr('id', 'resonsabilidadesSegmentos')
      .attr('xlink:href', window.location.origin + '/svg/practicas_responsabilidades.svg')
      .attr('x', x_rosca)
      .attr('y', y_rosca)
      .attr('width', w_rosca)
      .attr('height', h_rosca)
      .attr('opacity', 0);

    // Renderiza textos
    svgSegmentos.append("image")
      .attr('id', 'contenidoSegmentos')
      .attr('xlink:href', window.location.origin + '/svg/practicas_contenido.svg')
      .attr('x', x_rosca)
      .attr('y', y_rosca)
      .attr('width', w_rosca)
      .attr('height', h_rosca);

    /*********************************************
     Renderiza elementos del "espiral" - End
    *********************************************/

    /*******************************************************
     Renderiza Base para contenidos - Begin
    ******************************************************/
    // recuadro de contenido
    this.shadow(svg, x_bg_matriz, y_bg_matriz + contenido_delta, width_bg_matriz, height_bg_matriz, radio, radio, 'contentRectShadow');

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
      .attr("width", content_w)
      .attr("height", content_h)
      .attr("font-size", contentFontSize);

    /*******************************************************
     Renderiza Base para contenidos - End
    ******************************************************/



    /******************************************************
     Renderiza contenidos página dos - Begin
    ******************************************************/
    const svgPaginaDos = svg.append("g")
      .attr('id', 'paginaDos')
      .attr('opacity', 0);

    // Render lista
    var deltaCircle = 0;
    var deltaCircleDoubleLine = 3;
    for (let i = 0; i < textRol.length; i++) {

      svgPaginaDos.append("circle")
        .attr("id", 'circleP1' + i)
        .attr("cx", x_circleP2)
        .attr("cy", y_circleP2 + deltaCircle)
        .attr("r", r_circleP2)
        .style("stroke", "white")
        .attr('opacity', 1)
        .style("fill", colorRol[i]);

      svgPaginaDos.append("text")
        .attr('id', 'circleNumberP2')
        .attr('x', x_circleNumberP2)
        .attr('y', y_circleNumberP2 + deltaCircle)
        .attr("font-size", fonSize_circleNumberP2)
        .attr("font-weight", "bold")
        .text(i + 1)
        .style('fill', 'white');

      svgPaginaDos.append("foreignObject")
        .attr('id', 'circleTextP1')
        .attr('x', x_textP2)
        .attr('y', y_textP2 + deltaCircle)
        .attr("width", w_textP2)
        .attr("height", h_textP2)
        .html(function (d) {
          return '<div style="font-family:Roboto;font-weight:bold;color:#111111;font-size:' + fonSize_textP2 + 'px"><p align="justify">' + textRol[i] + '</p></div>'
        })

      deltaCircle = deltaCircle + delta_y_circleP2;
    }
    /******************************************************
     Renderiza contenidos página dos - End
    ******************************************************/



    /*******************************************
     Renderiza selector de página - Begin
    ********************************************/
    // Activa página Uno
    practica.togglePaginaPracticas(1, paginasPracticas, paginaSeleccionada, y_selectorPag);
    // Paginación
    const svgPagination = svg.append("g")
      .attr('id', 'pagination')
      .attr('opacity', 1);

    // Recuadro contenedor principal
    var deltaPagination = 0;
    for (let i = 0; i < 2; i++) {

      // Paginación botones
      svgPagination.append('rect')
        .attr("id", "pag" + i)
        .attr('x', x_ButtonPag + deltaPagination)
        .attr('y', y_ButtonPag)
        .attr('rx', r_selectorPag)
        .attr('ry', r_selectorPag)
        .style("fill", "#fdfdfd")
        .style("stroke", stroke_selectorPag)
        .style("stroke-width", border_selectorPag)
        .attr("filter", "url(#shadowFilter)")
        //.style("cursor", "pointer")
        .attr('width', w_ButtonPag) //width / 4.5
        .attr('height', h_ButtonPag) //height / 20
        ;

      var indexPagination = i + 1;
      if (i == currentPagination)
        color_pagination = color_paginationH;
      else
        color_pagination = color_paginationN;
      // paginación textos
      svgPagination.append("foreignObject")
        .attr('id', 'pagText' + i)
        .attr('x', x_textPag + deltaPagination)
        .attr('y', y_textPag)
        .attr("width", w_textPag)
        .attr("height", h_textPag)
        //.style("cursor", "pointer")
        .html(function (d) {
          return '<div style="font-family:Roboto;font-weight:bold;color:' + color_pagination + ';font-size:' + fonSize_pagination + 'px"><p align="justify">' + indexPagination + '</p></div>'
        });

      svgPagination.append('rect')
        .attr("id", "pagClick" + i)
        .attr('x', x_ButtonPag + deltaPagination)
        .attr('y', y_ButtonPag)
        .attr('rx', r_selectorPag)
        .attr('ry', r_selectorPag)
        .style("fill", "#ffffff")
        .attr('opacity', 0)
        .style("cursor", "pointer")
        .attr('width', w_ButtonPag) //width / 4.5
        .attr('height', h_ButtonPag) //height / 20
        .on('mouseover', function () {
          // Resalta
          if (i != currentPagination) {
            practica.setButtonMouseStatus('#pag' + i, 100, 0.7, fill_buttonPagH);
            practica.setTextColor('#pagText' + i, 100, color_paginationH, fonSize_pagination, indexPagination);
          }
        })
        .on('mouseout', function () {
          // Deja normal
          if (i != currentPagination) {
            practica.setButtonMouseStatus('#pag' + i, 50, 1, fill_buttonPagN);
            practica.setTextColor('#pagText' + i, 50, color_paginationN, fonSize_pagination, indexPagination);
          }
        }).on('click', function () {
          if (i != currentPagination) {
            if (paginaSeleccionada == 'paginaDos') {
              currentPagination = 0;
              paginaSeleccionada = 'paginaUno';
            }
            else {
              currentPagination = 1;
              paginaSeleccionada = 'paginaDos';
            }
            practica.togglePaginaPracticas(1, paginasPracticas, paginaSeleccionada, y_selectorPag);
            practica.toggleMouseStatus('#pag' + currentPagination, 0, 0.7, fill_buttonPagH, fill_buttonPagN);
            practica.toggleTextColor('#pagText' + currentPagination, 100, color_paginationH, color_paginationN, fonSize_pagination, indexPagination);
          }
        });

      deltaPagination = space_ButtonPag + w_ButtonPag;
    }
    practica.setButtonMouseStatus('#pag' + currentPagination, 0, 0.7, fill_buttonPagH);

    /*****************************************
     Renderiza selector de página - End
    ******************************************/

    /*******************************************************
     Renderiza contenidos página uno - Begin
    ******************************************************/
    const svgPaginaUno = svg.append("g")
      .attr('id', 'paginaUno')
      .attr('opacity', 1);

    // renderiza los fondos de botón de listaa
    for (let i = 0; i < y_selectorPag.length; i++) {

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
    }/**/

    // Render lista
    var deltaCircle = 0;
    for (let i = 0; i < practicasLabel.length; i++) {

      svgPaginaUno.append("circle")
        .attr("id", 'circleP1' + i)
        .attr("cx", x_circleP1)
        .attr("cy", y_circleP1 + deltaCircle)
        .attr("r", r_circleP1)
        .style("stroke", "white")
        .attr('opacity', 1)
        .style("fill", practicasColor[i])
        ;

      svgPaginaUno.append("text")
        .attr('id', 'circleNumberP1')
        .attr('x', x_circleNumberP1)
        .attr('y', y_circleNumberP1 + deltaCircle)
        .attr("font-size", fonSize_circleNumberP1)
        .attr("font-weight", "bold")
        .text(i + 1)
        .style('fill', 'white')
        ;
      if (i == 3 || i == 4)
        deltaCircleDoubleLine = rp(10, 'x', width, height);//10;
      else
        deltaCircleDoubleLine = 0;
      svgPaginaUno.append("foreignObject")
        .attr('id', 'circleTextP1' + i)
        .attr('x', x_textP1)
        .attr('y', y_textP1 + deltaCircle - deltaCircleDoubleLine)
        .attr("width", w_textP1)
        .attr("height", h_textP1)
        .html(function (d) {
          return '<div style="font-family:Roboto;font-weight:bold;color:#111111;font-size:' + fonSize_textP1 + 'px"><p align="justify">' + practicasLabel[i] + '</p></div>'
        });

      deltaCircle = deltaCircle + delta_y_circleP1;
    }

    // Renderiza superficie clickeable
    for (let i = 0; i < y_selectorPag.length; i++) {
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
          // Resalta
          practica.setButtonMouseStatus('#buttonSelector' + i, 100, 0.7, 'url(#bgLinGradB)');
          d3.select('#circleEspiral' + i)
            .transition()
            .duration(100)
            .attr('r', r_circleP2 * 1.5);
        })
        .on('mouseout', function () {
          // Deja normal
          practica.setButtonMouseStatus('#buttonSelector' + i, 50, 1, '#fdfdfd');
          d3.select('#circleEspiral' + i)
            .transition()
            .duration(100)
            .attr('r', r_circleP2);
        })
        .on('click', function () {
          animaSidebarPracticas(svg, width, height);
          practica.animaTooltipTitle(getDurationAnim(), practica.getXPracticasLabel(i, width, height), rp(10, 'x', width, height), rp(1490, 'x', width, height), rp(5, 'x', width, height), practica.getWPracticasLabel(i, width, height));
          setTimeout(function () {
            window.location.href = '/' + practicasLink[i];
          }, getTimeOut())
        });
    }/**/
    /******************************************************
     Renderiza contenidos página uno - End
    ******************************************************/
    const x_circleEspiral = rp(1420, 'x', width, height);
    const y_circleEspiral = [
      rp(46, 'x', width, height),
      rp(111, 'x', width, height),
      rp(178, 'x', width, height),
      rp(245, 'x', width, height),
      rp(315, 'x', width, height),
      rp(390, 'x', width, height)
    ];

    for (let i = 0; i < practicasColorEspiral.length; i++) {
      svg.append("circle")
        .attr("id", 'circleEspiral' + i)
        .attr("cx", x_circleEspiral)
        .attr("cy", y_circleEspiral[i])
        .attr("r", r_circleP2)
        .style("stroke", "white")
        .attr('opacity', 1)
        .style("fill", practicasColorEspiral[i]);
      setHtmlText(
        svg, 1, 'textGradientBold' + i,
        x_circleEspiral - rp(5, 'x', width, height),
        y_circleEspiral[i] - rp(9, 'x', width, height),
        (width / 30),
        rp(36, 'x', width, height),
        i + 1,
        rp(15, 'x', width, height), 'roboto', 'justify', 0, 'white', '', '')
    }

    /******************************************************
     Área clickeable del espiral - begin
    ******************************************************/
    var space_segment = rp(10, 'x', width, height);;
    const outerRadius = [];
    outerRadius[0] = rp(120, 'x', width, height);
    outerRadius[1] = outerRadius[0] + rp(70, 'x', width, height);
    outerRadius[2] = outerRadius[1] + rp(65, 'x', width, height);
    outerRadius[3] = outerRadius[2] + rp(65, 'x', width, height);
    outerRadius[4] = outerRadius[3] + rp(70, 'x', width, height);
    outerRadius[5] = outerRadius[4] + rp(60, 'x', width, height);
    outerRadius[6] = outerRadius[5] + rp(60, 'x', width, height);

    const innerRadius = [];
    innerRadius[0] = rp(40, 'x', width, height);
    innerRadius[1] = space_segment + outerRadius[0];
    innerRadius[2] = space_segment + outerRadius[1];
    innerRadius[3] = space_segment + outerRadius[2];
    innerRadius[4] = space_segment + outerRadius[3];
    innerRadius[5] = space_segment + outerRadius[4];
    innerRadius[6] = space_segment + outerRadius[5];

    const arcPad = [];
    arcPad[0] = 0.01;
    arcPad[1] = 0.01;
    arcPad[2] = 0.01;
    arcPad[3] = 0.01;
    arcPad[4] = 0.01;
    arcPad[5] = 0.01;
    arcPad[6] = 0.01;

    const arcLen = [];
    arcLen[0] = 0.523;
    arcLen[1] = 0.523;
    arcLen[2] = 0.523;
    arcLen[3] = 0.523;
    arcLen[4] = 0.523;
    arcLen[5] = 0.523;
    arcLen[6] = 0.523;

    // Posición y tamaño superficie clickeable de etapas "caracol"
    const x_clickAreaEspiral = rp(1442, 'x', width, height);
    const y_clickAreaEspiral = rp(472, 'x', width, height);
    const svgClicklAreaEspiral = svg.append("g")
      .attr('id', 'clickAreaEspiral')
      .attr('opacity', 0)
      .attr("transform", "translate(" + x_clickAreaEspiral + "," + y_clickAreaEspiral + ")");

    var segmentId = '';
    for (let p = 0; p < practicasAreaClick.length; p++) {
      var startAngle = 0;
      var endAngle = 0.523;
      for (let s = 0; s < practicasAreaClick[p].length; s++) {
        var indexR = [
          5, 4, 3, 2, 1, 0
        ]
        var arcSegment = d3.arc()
          .innerRadius(innerRadius[p])
          .outerRadius(outerRadius[p])
          .startAngle(startAngle)     // It's in radian, so Pi = 3.14 = bottom.
          .endAngle(endAngle);        // 2*Pi = 6.28 = top        
        segmentId = 'segment_' + p + '_' + s;
        svgClicklAreaEspiral.append("path")
          .attr("id", segmentId)
          .attr("d", arcSegment)
          .attr("fill", practicasColorEspiral[p])
          .attr("indexPractica", p) // Por qué?, porque el índice p, no tiene el alcance para ser utilizado dentro de la función de mouseover, mouseout y click anidado dentro de 2 for
          .on('mouseover', function () {
            d3.select(this).attr('opacity', 0.4)
            // Resalta
            var index = d3.select(this).attr("indexPractica"); // así que se pasa como parámetro y se lee desde dentro del objeto           
            practica.setButtonMouseStatus('#buttonSelector' + indexR[index], 100, 0.7, 'url(#bgLinGradB)');
            d3.select('#circleEspiral' + indexR[index])
              .transition()
              .duration(100)
              .attr('r', r_circleP2 * 1.5);

          })
          .on('mouseout', function (i) {
            d3.select(this).attr('opacity', 0.8)
            // Deja normal
            var index = d3.select(this).attr("indexPractica");
            practica.setButtonMouseStatus('#buttonSelector' + indexR[index], 50, 1, '#fdfdfd');
            d3.select('#circleEspiral' + indexR[index])
              .transition()
              .duration(100)
              .attr('r', r_circleP2);
          })
          .on('click', function () {
            animaSidebarPracticas(svg);
            practica.animaTooltipTitle(getDurationAnim(), rp(1450, 'x', width, height), rp(10, 'x', width, height), rp(1490, 'x', width, height), rp(5, 'x', width, height), rp(450, 'x', width, height));
            var idx = d3.select(this).attr("indexPractica");
            setTimeout(function () {
              window.location.href = '/' + practicasLink[indexR[idx]];
            }, getTimeOut())
          });
        startAngle = endAngle + arcPad[p];
        endAngle = arcLen[p] + endAngle;
        //endAngle = startAngle + arcLen[p];
      }
      //innerRadius = innerRadius + h_segment[p] + space_segment;
      //outerRadius = outerRadius + h_segment[p];
    }

    /******************************************************
     Área clickeable del espiral - end
    ******************************************************/

    /******************************
    Section 3 - breadcrumb - Start
    //*******************************/
    breadcrumb(svg, width, height, 'Inicio', 'Matríz de buenas prácticas', '/guia_de_gestion', '');
    /******************************
    Section 3 - breadcrumb - End
    *******************************/



    /******************************
     Sidebar - Start
    *******************************/
    getSideBarLines(svg, width);
    svg.append('rect')
      .attr('id', 'rectWhiteFade')
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr('opacity', 1)
      .attr("fill", 'white');

    getSideBarPracticas(svg, width, heightCorrected, styles.grow);
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

    d3.select('#rectWhiteFade')
      .transition()
      .duration(getDurationAnim())
      .attr('opacity', 0)
      .duration(10)
      .attr("height", 1);

    /**********************************
     Título tooltip rectangle - begin
    **********************************/
    svg.append('rect')
      .attr('id', 'pageTitle')
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
      .attr("width", w_pageTitle)
      .attr("height", h_pageTitle)
      .html(function (d) {
        return '<div style="' + style_pageTitle + '"><p align="justify">MATRÍZ DE BUENAS PRÁCTICAS</p></div>'
      })

    /**********************************
     Título tooltip rectangle - end
    **********************************/
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

export default BuenasPracticas;