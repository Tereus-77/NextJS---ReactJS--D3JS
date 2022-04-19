import React, { Component } from "react";
import {useCallback, useState, useEffect, useRef} from "react";
import { behindHorizontalLine, curvedLine, menuCircles, breadcrumb, headerCornerLogo, gradients, setTriangle } from "../../functions/headerMenu";
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import styles from '../../styles/Home.module.css';
import Footer from '../layouts/footer';
import Logo from '../../public/img/repositorio_web-05.png';
import LogoSide from '../../public/img/repositorio_web-12.png';
import {guiaApi} from "../api/guia-api";
import { useMounted } from "../../hooks/use-mounted";
import * as d3 from 'd3';
import { OpenGraph, MetaData} from "../../functions/metaTags";
import { setHtmlText, setHtmlTextLink, setHtmlTextInclinado } from "../../functions/htmlText";
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "../../functions/referenceSize";
import { getTimeOut, getDurationAnim } from "../../functions/sideBar";

class Guia extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    setTimeout(this.set,  500)
  }
  shadow(svg, x, y, w, h,r,s,dx,dy) {
    var g1 = svg.append('g');
    var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "dropshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", s) // 8
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", dx) // -2
        .attr("dy", dy) // -8
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
      .attr('width', w)
      .attr('height', h)
      .style('fill', "white")
      .attr("filter", "url(#dropshadow)")
      .attr("rx", r)								// radius
      .attr("ry", r)	
  }
  //gradient rect
  gradientRect(svg, x, y, w, h, r) {
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
      .attr("rx", r)								// radius
      .attr("ry", r)	

    svg.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', w)
      .attr('height', h)
      .attr("fill", "white")
      .attr("rx", r)								// radius
      .attr("ry", r)
  }
  contect = (element) => {
    // Obtiene el tamaño de la pantalla en uso
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Calcula el height adecuado para mantener el aspect ratio frente a cualquier resolución
    // En base a una resolución de pantalla de W:1920 H:1080
    const refWidth = getReferenceSizeWidth();
    const refHeight = getReferenceSizeHeight();
    const aspectRatio = width / height;
    const aspectRatioRef = refWidth / refHeight;
    const heightCorrected = Math.round((refHeight * width) / refWidth);
    //const heightCorrected = Math.round(width / aspectRatio);
    if (height > width) {
      heightCorrected = Math.round((refHeight * width) / refWidth);
    }

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
      divHR[i] = (divH[i] * heightCorrected) / refHeight;
      if (i == 0) {
        console.log("(divH[0] * heightCorrected) / refHeight " + (divH[0] * heightCorrected) / refHeight);
      }
    }
    for (let i = 0; i < divW.length; i++) {
      divWR[i] = divW[i] * resizeRatioWidth;
    } 
    const data = {
      "nodes": [
        {
          "name": 1,
          "title": "Metodología"
        },
        {
          "name": 2,
          "title": "Contenido"
        },
        {
          "name": 3,
          "title": "¿De dónde vienen las práctica de Gestión?"
        },
        {
          "name": 4,
          "title": "¿Qué busca esta guía?"
        },
        {
          "name": 5,
          "title": "¿Por qué esta guía?"
        },
        {
          "name": 6,
          "title": "¿Para quién es esta guía?"
        },
        {
          "name": 7,
          "title": "¿Cómo mirar la cadena de suministro sostenible?"
        },
        {
          "name": 8,
          "title": "Metodología"
        },
        {
          "name": 9,
          "title": "Cadena de suministro centrada en la vinculación entre mandante y proveedor?"
        },
        {
          "name": 10,
          "title": "sostenible de la cadena de suministro"
        },
        {
          "name": 11,
          "title": "Metodología"
        },
      ],
      "links": [
        {
          "source": 1,
          "target": 2
        },
        {
          "source": 2,
          "target": 3
        },
        {
          "source": 3,
          "target": 4
        },
        {
          "source": 4,
          "target": 5
        },
        {
          "source": 5,
          "target": 6
        },
        {
          "source": 6,
          "target": 7
        },
        {
          "source": 7,
          "target": 8
        },
        {
          "source": 8,
          "target": 9
        },
        {
          "source": 9,
          "target": 10
        },
        {
          "source": 10,
          "target": 11
        }
      ]
    }
    
    const w_nodePrimary = rp(192, 'x', width, height);
    const x_nodeUp = rp(67.36, 'x', width, height); // x_node_1
    const w_nodeSecundary = rp(128, 'x', width, height);
    const y_nodeUp = rp(201.56, 'x', width, height); // x_node_1
    const x_nodeMiddle = rp(96, 'x', width, height); // x_node_1
    const y_nodeMiddle = rp(417.57, 'x', width, height); // x_node_1
    const x_nodeDown = rp(96, 'x', width, height); // x_node_2
    const y_nodeDown = rp(568.55, 'x', width, height); // x_node_2

    const w_guiaIntro = rp(640, 'x', width, height);
    const x_guiaIntro = rp(288.28, 'x', width, height);
    const y_guiaIntro = rp(164.11, 'x', width, height);

    const w_practicasIntro = rp(365.71, 'x', width, height);
    const x_practicasIntro = rp(1043.47, 'x', width, height);
    const y_practicasIntro = rp(48.25, 'x', width, height);

    const w_etapaIntro = rp(365.71, 'x', width, height);
    const x_etapaIntro = rp(914.28, 'x', width, height);
    const y_etapaIntro = rp(561.04, 'x', width, height);

    const w_nodeIntro = rp(320, 'x', width, height);
    const x_nodeIntro = rp(213.33, 'x', width, height);
    const y_nodeIntro = rp(266.61, 'x', width, height);

    const durationAnim = getDurationAnim();
    const timeOut = getTimeOut();

    const svg = d3.select(element)
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      //class to make it responsive
      .classed("svg-content-responsive", true);

    const bgLinGradA = svg.append("defs").append("linearGradient")
      .attr("id", "bgLinGradA")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    bgLinGradA.append('stop')
      .attr('style', 'stop-color:#92288F;stop-opacity:1')
      .attr('offset', '0%');
    bgLinGradA.append('stop')
      .attr('style', 'stop-color:#3B569D;stop-opacity:1')
      .attr('offset', '50%');
    bgLinGradA.append('stop')
      .attr('style', 'stop-color:#22B573;stop-opacity:1')
      .attr('offset', '100%');

    const bgLinGradB = svg.append("defs").append("linearGradient")
      .attr("id", "bgLinGradB")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    bgLinGradB.append('stop')
      .attr('style', 'stop-color:#22B573;stop-opacity:1')
      .attr('offset', '0%');
    bgLinGradB.append('stop')
      .attr('style', 'stop-color:#3B569D;stop-opacity:1')
      .attr('offset', '50%');
    bgLinGradB.append('stop')
      .attr('style', 'stop-color:#92288F;stop-opacity:1')
      .attr('offset', '100%');

    const bgLinGradC = svg.append("defs").append("linearGradient")
      .attr("id", "bgLinGradC")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    bgLinGradC.append('stop')
      .attr('style', 'stop-color:#22B573;stop-opacity:0.5')
      .attr('offset', '0%');
    bgLinGradC.append('stop')
      .attr('style', 'stop-color:#3B569D;stop-opacity:0.5')
      .attr('offset', '50%');
    bgLinGradC.append('stop')
      .attr('style', 'stop-color:#92288F;stop-opacity:0.5')
      .attr('offset', '100%');

    const shadow = svg.append("defs").append("filter")
      .attr("id", "shadow")
    shadow.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", divHR[21]) // 8
      //.attr("stdDeviation", divHR[19]) // 8
      .attr("result", "blur");
    shadow.append("feOffset")
      .attr("in", "blur")
      .attr("result", "offsetBlur");
    shadow.append("feFlood")
      .attr("in", "offsetBlur")
      .attr("flood-color", "grey")
      .attr("flood-opacity", "0,5")
      .attr("result", "offsetColor");
    shadow.append("feComposite")
      .attr("in", "offsetColor")
      .attr("in2", "offsetBlur")
      .attr("operator", "in")
      .attr("result", "offsetBlur");

    // header white
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", rp(133.11, 'x', width, height))
      .attr("fill", "white")

    // footer white
    svg.append("rect")
      .attr("x", 0)
      .attr("y", width/2 - (width/15))
      .attr("width", width)
      .attr("height", rp(128, 'x', width, height))
      .attr("fill", "white")

    console.log(width + " " + height + " " + divH[0] + " = " + height/divH[0]);

      //line
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
      .attr('x', rp(480, 'x', width, height))
      .attr('y', rp(419.57, 'x', width, height))
      .attr('rx', rp(9.6, 'x', width, height))
      .attr('ry', rp(9.6, 'x', width, height))
      .attr('height', divHR[16])
      .attr('width', rp(1136.1, 'x', width, height))
      .style('fill', 'url(#bgLinGradB)')
      .transition()
      .duration(500)    
      
      
    //circlues
    var position1 = [rp(600, 'x', width, height),
                      rp(600, 'x', width, height),
                      rp(600, 'x', width, height),
                      rp(600, 'x', width, height),
                      rp(600, 'x', width, height),
                      rp(600, 'x', width, height),
                      rp(600, 'x', width, height),
                      rp(600, 'x', width, height),
                      rp(600, 'x', width, height),
                      rp(600, 'x', width, height)]
    var position2 = [];
    for (i = 0; i < 10; i ++) {
      position2.push(rp(600, 'x', width, height)+
                     i*(rp(106.67, 'x', width, height)))
    }

    var menuLabel = [
      {
        label: '¿Por qué esta guía?', // 2
        label2: '',
        link: '/guia_de_gestion/5_por_que_una_guia',
        pos: 0
      },
      {
        label: '¿Qué busca esta guía?', // 3
        label2: '',
        link: '/guia_de_gestion/4_que_busca_la_guia',
        pos: 0
      },
      {
        label: '¿Para quién es esta guía?', // 4
        label2: '',
        link: '/guia_de_gestion/6_para_quien_es_esta_guia',
        pos: 0
      },
      {
        label: 'Metodología', // 5
        label2: '',
        link: '/guia_de_gestion/1_metodologia',
        pos: 0
      },
      {
        label: 'Contenido', // 6
        label2: '',
        link: '/guia_de_gestion/2_contenido',
        pos: 0
      },
      {
        label: '¿De dónde vienen las práctica', // 7
        label2: '',
        link: '/guia_de_gestion/3_de_donde_vienen_las_practicas',
        pos: 0
      },
      {
        label: '¿Cómo mirar la cadena de suministro sostenible?', // 8
        label2: '',
        link: '/guia_de_gestion/7_como_mirar_la_cadena',
        pos: 0
      },
      {
        label: '¿Por qué gestionar cadenas de suministro sostenible?', // 9
        label2: '',
        link: '/guia_de_gestion/8_por_que_gestionar_cadenas',
        pos: 0
      },
      {
        label: '¿Cuáles son los beneficios de una gestión sostenible de la cadena de suministro?', // 10
        label2: '',
        link: '/guia_de_gestion/9_beneficios',
        pos: 0
      },
      {
        label: '¿Cómo usar esta guía?', // 11
        label2: '',
        link: '/guia_de_gestion/10_como_usar_la_guia',
        pos: 0
      },
    ];
    for (i = 0; i < menuLabel.length; i++) {
      menuLabel[i].pos = (rp(600, 'x', width, height) +  
      i * (rp(106.67, 'x', width, height)))
    }


    //first position
    svg
      .selectAll("mycircles")
      .data(position1)
      .enter()
      .append("circle")
      .attr("cx", function(d){return d})
      .attr("cy", rp(428.89, 'x', width, height))
      .attr("r", divWR[23])
      .style("fill", "#b3b3b3")
      .style("stroke", "#4d4d4d")
      .style("stroke-width", divWR[26]);

    //animation position
    var u = svg.selectAll('circle')
      .data(position2)
      //.on('click', fnclick).style("cursor", "pointer")
    u
      .transition()
      .duration(400)
      .attr('cx', function(d){return d});

    //animation position
    var a = svg.selectAll('circle')
      .data(position2)
      //.on('click', fnclick).style("cursor", "pointer")
    a
      .transition()
      .duration(400)
      .attr('cx', function (d) { return d });
    const r_menuCircle = rp(20, 'x', width, height);
    for (let i = 0; i < menuLabel.length; i++) {
      svg.append('circle')
        .attr("cx", menuLabel[i].pos)
        .attr("cy", rp(428.89, 'x', width, height))
        .attr("r", r_menuCircle)
        .style("fill", "#b3b3b3")
        .style("stroke", "#4d4d4d")
        .style("stroke-width", divWR[26])
        .attr('opacity', 0)
        .style("cursor", "pointer")
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(150)
            .attr("r", r_menuCircle*1.5)
            .attr('opacity', 1);
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(50)
            .attr("r", r_menuCircle)
            .attr('opacity', 0);
        })
        .on('click', function () {
          circleClick(menuLabel, i);
        });

        setHtmlTextInclinado(svg, 1, 'text'+i, 
                              rp(350,'x', width, height), 
                              rp(40,'x', width, height), 
                              menuLabel[i].label, 
                              rp(14,'x', width, height), 
                              'Roboto', 'left', 0, 'black', '',
                              menuLabel[i].pos, 
                              rp(386, 'x', width, height),
                              0)
      
    }
    var t = svg.selectAll('text')
      .data(position2)
    t
      .transition()
      .duration(400)
      .attr('cx', function (d) { return d });
    
    function circleClick(arr_Labels, index) {
      d3.select('#rectWhiteFade')
        .attr("height", height)
        .transition()
        .duration(durationAnim)
        .attr('opacity', 1);

      // First image
      d3.select('#linkGuia')
        .transition()
        .duration(durationAnim)
        .attr("x", x_nodeUp)
        .attr("y", y_nodeUp)
        .attr("width", w_nodePrimary)
      
      
      setTimeout(function () {
        window.location.href = arr_Labels[index].link;
      }, 300)
    }
    //headerButton
    setHtmlText(svg, 1, 'textBienvenida', 
                  (rp(1160, 'x', width, height)),
                  (rp(60, 'x', width, height)),
                  (rp(95, 'x', width, height)),
                  (rp(13.72, 'x', width, height)),
                  'Bienvenida', 
                  (rp(13.72, 'x', width, height)),
                  'Roboto', 'right', 0, 'black', '') 
    svg.append('rect')
      .attr('width', rp(450, 'x', width, height))
      .attr('height', rp(4.8, 'x', width, height))
      .attr('x', rp(1150, 'x', width, height))
      .attr('y', rp(75.3, 'x', width, height))
      .attr('rx', rp(3.2, 'x', width, height))
      .attr('ry', rp(3.2, 'x', width, height))
      .style('fill', 'url(#bgLinGradB)')   
    svg.append("circle")
      .attr("cx", rp(1280, 'x', width, height))
      .attr("cy", rp(76.8, 'x', width, height))
      .attr("r", rp(20, 'x', width, height))
      .style("fill", "#EDEDED")
      .style("stroke", "#4d4d4d")
      .style("stroke-width", divWR[26])
      .style("cursor", "pointer")
      .on("click", function () {
            window.location.href = '/guia_de_gestion/12_creditos_a'
        })  
    setHtmlText(svg, 1, 'textColaboradores', 
              (rp(1300, 'x', width, height)),
              (rp(60, 'x', width, height)),
              (rp(95, 'x', width, height)),
              (rp(13.72, 'x', width, height)),
              'Colaboradores', 
              (rp(13.72, 'x', width, height)),
              'Roboto', 'right', 0, 'black', '') 
    svg.append("circle")
      .attr("cx", rp(1420, 'x', width, height))
      .attr("cy", rp(76.8, 'x', width, height))
      .attr("r", rp(20, 'x', width, height))
      .style("fill", "#EDEDED")
      .style("stroke", "#4d4d4d")
      .style("stroke-width", divWR[26])
      .style("cursor", "pointer")
      .on("click", function () {
        window.location.href = '/guia_de_gestion/colaboradores'
      })  
    setHtmlText(svg, 1, 'textEmpresas', 
                (rp(1440, 'x', width, height)),
                (rp(60, 'x', width, height)),
                (rp(95, 'x', width, height)),
                (rp(13.72, 'x', width, height)),
                'Empresas', 
                (rp(13.72, 'x', width, height)),
                'Roboto', 'right', 0, 'black', '')
    svg.append("circle")
      .attr("cx", rp(1560, 'x', width, height))
      .attr("cy", rp(76.8, 'x', width, height))
      .attr("r", rp(20, 'x', width, height))
      .style("fill", "#EDEDED")
      .style("stroke", "#4d4d4d")
      .style("stroke-width", divWR[26])
      .style("cursor", "pointer")
      .on("click", function () {
            window.location.href = '/guia_de_gestion/13_empresas'
        })        

    //footer image
    svg.append("image")
    .attr("xlink:href", window.location.origin + "/img/repositorio_web-07.png")
    .attr("x", width - rp(274.29, 'x', width, height))
      .attr("y", height - rp(74.24, 'x', width, height))
    .attr("width", rp(192, 'x', width, height))

    //third box
    svg.append("rect")
      .attr("x", rp(1443.61, 'x', width, height))
      .attr("y", rp(731.07, 'x', width, height))
      .attr("width", rp(404.22, 'x', width, height))
      .attr("height", rp(137.86, 'x', width, height))
      .attr("fill", "#efefef")
      .style("stroke", "url(#bgLinGradC)")
      .style("stroke-width", divWR[20])
      .attr("rx", divWR[28])
      .attr("ry", divWR[28])
    
    const text = ['Importancia de la Cadena de suministro',
      'Sostenible en el mundo',
      'http://www.industriall-union.org/es/la-ley-alemana-sobre-',
      'cadenas-de-suministro-llega-al-parlamento'
    ]
    for(var i=0; i < 2; i++)
      setHtmlText(svg, 1,
                  'text' + i,
                  (rp(1465.65, 'x', width, height)),
                  (rp(745,
                  'x',
                  width,
                  height) + (i * rp(19.2,
                  'x',
                  width,
                  height))),
                  (rp(349.1, 'x', width, height)),
                  (rp(21.34, 'x', width, height)),
                  text[i],
                  (rp(17.46, 'x', width, height)),
                  'Roboto',
                  'right',
                  0,
                  'black',
                  'bold',)
    for(var i=2; i < text.length; i++)
      setHtmlTextLink(svg, 1,
                  'text' + i,
                  (rp(1465.65, 'x', width, height)),
                  (rp(785,
                  'x',
                  width,
                  height) + (i * rp(17.45,
                  'x',
                  width,
                  height))),
                  (rp(384, 'x', width, height)),
                  (rp(16, 'x', width, height)),
                  text[i],
                  (rp(13.72, 'x', width, height)),
                  'Roboto',
                  'left',
                  0,
                  'black',
                  '',                  
                  'http://www.industriall-union.org/es/la-ley-alemana-sobre-cadenas-de-suministro-llega-al-parlamento')
    svg.append("line")
      .style("stroke", "#82368C")
      .style("stroke-width", divWR[26])
      .attr("x1", rp(960, 'x', width, height))
      .attr("y1", height - rp(160.84, 'x', width, height))
      .attr("x2", width - rp(96, 'x', width, height))
      .attr("y2", height - rp(160.84, 'x', width, height))

    svg.append("circle")
      .attr("cx",width - rp(96, 'x', width, height))
      .attr("cy", height - rp(160.84, 'x', width, height))
      .attr("r", divWR[24])
      .style("fill", "#82368C")

    //second block
    this.shadow(svg, -1 * width/50, height/1.5, width/1.6, height/2.5, divHR[18], divHR[19], -divWR[29], -divHR[19])
    svg.append("rect")
      .attr("x", -1* rp(38.4, 'x', width, height))
      .attr("y", rp(665.52, 'x', width, height))
      .attr("width", rp(1200, 'x', width, height))
      .attr("height", rp(386, 'x', width, height))
      .attr("rx", divHR[18])
      .attr("ry", divHR[18])
      .style("fill", "white")

    //second block content
    text = [
      '¿Qué es la Guía de Gestión de una Cadena de', 'Suministro Sostenible?',
      'Una herramienta que busca contribuir al desarrollo de un enfoque de gestión sostenible basado en la mejora continúa, produciendo impactos positivos ambientales, sociales y de gobernanza (ASG) que permitan optimizar procesos y gerenciar los recursos de manera eficiente, innovadora y con una visión de largo plazo.'
    ]
    
    for(var i=0;i < 2; i++)
      setHtmlText( svg, 1, 'textDescription' + i, 
                    rp(192, 'x', width, height), 
                    (rp(660, 'x', width, height) + (i * rp(41.1, 'x', width, height))),
                    rp(1000, 'x', width, height),
                    rp(60, 'x', width, height),
                    text[i], 
                    rp(36, 'x', width, height), 'Oswald', 'left', 0, '#93278F', '', rp(1, 'x', width, height))
        
    for(var i=2;i < text.length; i++)
    setHtmlText( svg, 1, 'textDescription' + i, 
                  rp(192, 'x', width, height), 
                  (rp(720, 'x', width, height) + (i * rp(41.1, 'x', width, height))),
                  rp(920, 'x', width, height),
                  rp(200, 'x', width, height),
                  text[i], 
                  rp(19, 'x', width, height), 
                  'Roboto', 'justify', 0, 'black', '', rp(1, 'x', width, height))
        
    // line
    svg.append('rect')
      .attr('x', rp(160, 'x', width, height))
      .attr('y', rp(753.91, 'x', width, height))
      .attr('width', rp(960, 'x', width, height))
      .attr('height', divHR[16])
      .style("fill", "url(#bgLinGradA)")
      .attr("rx", divWR[27])
      .attr("ry", divWR[27]);/**/


    // rounded line end
    /*svg.append("circle")
      .attr("cx", width - rp(800, 'x', width, height))
      .attr("cy", (rp(753.91, 'x', width, height)) + divWR[27])
      .attr("r", divWR[27])
      .style("fill", "#22B573");/**/
  
    //dot
    svg.append("circle")
      .attr("cx", rp(160, 'x', width, height))
      .attr("cy", rp(764.66, 'x', width, height))
      .attr("r", divWR[25])
      .style("fill", "#92288F")
    
    
      //triangle
    const x_triangle = rp(376.5, 'x', width, height)
    const y_triangle = rp(644,'x', width, height)
    const vertexA = (-rp(68,'x', width, height)) //valor negativo indica punta arriba
    const vertexBX = (-rp(50,'x', width, height))
    const vertexBY = (0)
    const vertexCX = (rp(50,'x', width, height))
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
        valueSetTriangle['fill'] = 'white'
        valueSetTriangle['filter'] = 'url(#dropshadow)'    
    setTriangle(valueSetTriangle)

    /******************************
     Section 3 - breadcrumb - Start
    //*******************************/
    breadcrumb(svg, width, height, 'Inicio', 'Guía de Gestión', '/guia_de_gestion', '');
    /******************************
    Section 3 - breadcrumb - End
    *******************************/
    svg.append('rect')
      .attr('id', 'rectWhiteFade')
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr('opacity', 1)
      .attr("fill", 'white');

    //main image
    svg.append("image")
      .attr('id', 'linkGuia')
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
      .attr("x", rp(213.34, 'x', width, height))
      .attr("y", height/3 - height/20)
      .attr("width", rp(320, 'x', width, height))
      .on("click", function () {
        window.location.href = '/'
      })

    /******************************
      Brand corner - begin
    *******************************/
    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
      .attr("x", rp(192, 'x', width, height))
      .attr("y", height/divH[2])
      .attr("width", rp(480, 'x', width, height))
      .style("cursor", "pointer")
      .on("click", function () {
        window.location.href = '/guia_de_gestion/12_creditos_a'
      })
    /******************************
     Brand corner - end
    *******************************/
    d3.select('#rectWhiteFade')
      .transition()
      .duration(getDurationAnim())
      .attr('opacity', 0)
      .duration(10)
      .attr("height", 1);
  }

  render() {  
    //const {menuBreadcrumbs, flag} = this.state;
        
    return (
      <>
        <div ref={this.contect} className={styles.containerRoot} style={{zIndex:1}}>   
        <Head>
          {MetaData("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible")}
          {OpenGraph("Gestión Cadena de Suministro Sostenible", "Guía para la Gestión Cadena de Suministro Sostenible", "/img/repositorio_web-01.png")}
        </Head> 
        </div>

      </>
    )
  }
}
export default Guia 
