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
import { getSideBarPracticasDetalle } from "../../functions/sideBar";
import { OpenGraph, MetaData } from "../../functions/metaTags";

class DetalleDos extends Component {
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
        const refWidth = 1920;
        const refHeight = 941;
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
            .attr("viewBox", "0 0 " + width + " " + specialHeight)
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

        const arrayPracticaDetalle = [];
        arrayPracticaDetalle[0] = 'Declaración y monitoreo salario justo';
        arrayPracticaDetalle[1] = 'Monitoreo de cumplimiento de leyes sociales';
        arrayPracticaDetalle[2] = 'Monitoreo prevención trebajo infantil';
        arrayPracticaDetalle[3] = 'Monitoreo de prevención trabajo esclavo';

        const posicionEnElArco = [];
        posicionEnElArco[0] = 10;
        posicionEnElArco[1] = 10;
        posicionEnElArco[2] = 10;
        posicionEnElArco[3] = 10;

        const arrayEtapas = []
        arrayEtapas[0] = 'Necesidad (interna)';
        arrayEtapas[1] = 'Solicitud pedido (riesgo propio)';
        arrayEtapas[2] = 'Fuentes de aprovisionamiento';
        arrayEtapas[3] = 'Creación y seguimiento orden de compra/contrato';
        arrayEtapas[4] = 'Ejecución del servicio y administración del contrato';
        arrayEtapas[5] = 'Recepción de mercancias - Recepción del servicio';
        arrayEtapas[6] = 'Recepción de facturas';
        arrayEtapas[7] = 'Verificación de facturas';
        arrayEtapas[8] = 'Proceso de pago';
        arrayEtapas[9] = 'Evaluación y cierre';

        /****************************************
         Pacto Global y ODS - begin
        ****************************************/
        // arrayPracticaDetalle [0] = 'Leyes sociales'; 0_0 -> [etapa, detalle practica]

        // Etapa Necesidad 0
        const arrayPactoGlobal_0_0 = ['3-o', '4-o', '5-o', '6-o'];  // Declaración y monitoreo salario justo
        const arrayPactoGlobal_0_1 = ['3-o', '4-o', '5-o', '7-o'];  // Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_0_2 = ['3-o', '4-o', '5-o', '8-o'];  // Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_0_3 = ['1-o', '2-o'];  // Monitoreo de prevención trabajo esclavo

        const arrayODS_0_0 = ['1-o', '3-0', '5-o', '8-o', '9-o', '10-o', '16-o', '17-o'];// Declaración y monitoreo salario justo
        const arrayODS_0_1 = ['1-o', '3-0', '5-o', '8-o', '9-o', '10-o', '16-o', '17-o'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_0_2 = ['1-o', '3-0', '5-o', '8-o', '9-o', '10-o', '16-o', '17-o'];// Monitoreo prevención trebajo infantil
        const arrayODS_0_3 = ['1-o', '3-0', '5-o', '8-o', '9-o', '10-o', '16-o', '17-o'];// Monitoreo de prevención trabajo esclavo

        // Etapa Solicitud pedido (riesgo propio) 1
        const arrayPactoGlobal_1_0 = ['3-m', '4-m', '5-m', '6-m'];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_1_1 = ['3-m', '4-m', '5-m', '7-m'];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_1_2 = ['3-m', '4-m', '5-m', '8-m'];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_1_3 = ['3-m', '4-m', '5-m', '6-m'];// Monitoreo de prevención trabajo esclavo

        const arrayODS_1_0 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Declaración y monitoreo salario justo
        const arrayODS_1_2 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_1_1 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo prevención trebajo infantil
        const arrayODS_1_3 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo de prevención trabajo esclavo


        // Etapa Fuentes de aprovisionamiento 2
        const arrayPactoGlobal_2_0 = ['3-c', '4-c', '5-c', '6-c'];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_2_1 = ['3-c', '4-c', '5-c', '7-c'];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_2_2 = ['3-c', '4-c', '5-c', '8-c'];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_2_3 = ['3-c', '4-c', '5-c', '6-c'];// Monitoreo de prevención trabajo esclavo

        const arrayODS_2_0 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Declaración y monitoreo salario justo
        const arrayODS_2_2 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_2_1 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo prevención trebajo infantil
        const arrayODS_2_3 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo de prevención trabajo esclavo

        // Etapa Creación y seguimiento orden de compra/contrato 3
        const arrayPactoGlobal_3_0 = ['3-c', '4-c', '5-c', '6-c'];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_3_1 = ['3-c', '4-c', '5-c', '7-c'];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_3_2 = ['3-c', '4-c', '5-c', '8-c'];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_3_3 = ['3-c', '4-c', '5-c', '6-c'];// Monitoreo de prevención trabajo esclavo

        const arrayODS_3_0 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Declaración y monitoreo salario justo
        const arrayODS_3_2 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_3_1 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo prevención trebajo infantil
        const arrayODS_3_3 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo de prevención trabajo esclavo

        // Etapa Ejecución del servicio y administración del contrato 4
        const arrayPactoGlobal_4_0 = ['3-c', '4-c', '5-c', '6-c'];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_4_1 = ['3-c', '4-c', '5-c', '7-c'];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_4_2 = ['3-c', '4-c', '5-c', '8-c'];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_4_3 = ['3-c', '4-c', '5-c', '6-c'];// Monitoreo de prevención trabajo esclavo

        const arrayODS_4_0 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Declaración y monitoreo salario justo
        const arrayODS_4_2 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_4_1 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo prevención trebajo infantil
        const arrayODS_4_3 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo de prevención trabajo esclavo

        // Etapa Recepción de mercancias – Recepción del servicio 5
        const arrayPactoGlobal_5_0 = ['3-m', '4-m', '5-m', '6-m'];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_5_1 = ['3-m', '4-m', '5-m', '7-m'];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_5_2 = ['3-m', '4-m', '5-m', '8-m'];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_5_3 = ['3-m', '4-m', '5-m', '6-m'];// Monitoreo de prevención trabajo esclavo

        const arrayODS_5_0 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Declaración y monitoreo salario justo
        const arrayODS_5_2 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_5_1 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo prevención trebajo infantil
        const arrayODS_5_3 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo de prevención trabajo esclavo

        // Etapa Recepción de facturas 6
        const arrayPactoGlobal_6_0 = ['3-m', '4-m', '5-m', '6-m'];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_6_1 = ['3-m', '4-m', '5-m', '7-m'];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_6_2 = ['3-m', '4-m', '5-m', '8-m'];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_6_3 = ['3-m', '4-m', '5-m', '6-m'];// Monitoreo de prevención trabajo esclavo

        const arrayODS_6_0 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Declaración y monitoreo salario justo
        const arrayODS_6_2 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_6_1 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo prevención trebajo infantil
        const arrayODS_6_3 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo de prevención trabajo esclavo

        // Etapa Verificación de facturas 7
        const arrayPactoGlobal_7_0 = ['3-m', '4-m', '5-m', '6-m'];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_7_1 = ['3-m', '4-m', '5-m', '7-m'];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_7_2 = ['3-m', '4-m', '5-m', '8-m'];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_7_3 = ['3-m', '4-m', '5-m', '6-m'];// Monitoreo de prevención trabajo esclavo

        const arrayODS_7_0 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Declaración y monitoreo salario justo
        const arrayODS_7_2 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_7_1 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo prevención trebajo infantil
        const arrayODS_7_3 = ['1-m', '3-m', '5-m', '8-m', '9-m', '10-m', '16-m', '17-m'];// Monitoreo de prevención trabajo esclavo

        // Etapa Proceso de pago 8
        const arrayPactoGlobal_8_0 = ['3-c', '4-c', '5-c', '6-c'];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_8_1 = ['3-c', '4-c', '5-c', '7-c'];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_8_2 = ['3-c', '4-c', '5-c', '8-c'];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_8_3 = ['3-c', '4-c', '5-c', '6-c'];// Monitoreo de prevención trabajo esclavo

        const arrayODS_8_0 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Declaración y monitoreo salario justo
        const arrayODS_8_2 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_8_1 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo prevención trebajo infantil
        const arrayODS_8_3 = ['1-c', '3-c', '5-c', '8-c', '9-c', '10-c', '16-c', '17-c'];// Monitoreo de prevención trabajo esclavo

        // Etapa Evaluación y cierre 9
        const arrayPactoGlobal_9_0 = [];// Declaración y monitoreo salario justo
        const arrayPactoGlobal_9_1 = [];// Monitoreo de cumplimiento de leyes sociales
        const arrayPactoGlobal_9_2 = [];// Monitoreo prevención trebajo infantil
        const arrayPactoGlobal_9_3 = [];// Monitoreo de prevención trabajo esclavo

        const arrayODS_9_0 = [];// Declaración y monitoreo salario justo
        const arrayODS_9_2 = [];// Monitoreo de cumplimiento de leyes sociales
        const arrayODS_9_1 = [];// Monitoreo prevención trebajo infantil
        const arrayODS_9_3 = [];// Monitoreo de prevención trabajo esclavo

        // Pacto global para las etapas
        const arrayEtapasPactoGlobal_0 = [
            arrayPactoGlobal_0_0,
            arrayPactoGlobal_0_1,
            arrayPactoGlobal_0_2,
            arrayPactoGlobal_0_3
        ];
        const arrayEtapasPactoGlobal_1 = [
            arrayPactoGlobal_1_0,
            arrayPactoGlobal_1_1,
            arrayPactoGlobal_1_2,
            arrayPactoGlobal_1_3
        ];
        const arrayEtapasPactoGlobal_2 = [
            arrayPactoGlobal_2_0,
            arrayPactoGlobal_2_1,
            arrayPactoGlobal_2_2,
            arrayPactoGlobal_2_3
        ];
        const arrayEtapasPactoGlobal_3 = [
            arrayPactoGlobal_3_0,
            arrayPactoGlobal_3_1,
            arrayPactoGlobal_3_2,
            arrayPactoGlobal_3_3
        ];
        const arrayEtapasPactoGlobal_4 = [
            arrayPactoGlobal_4_0,
            arrayPactoGlobal_4_1,
            arrayPactoGlobal_4_2,
            arrayPactoGlobal_4_3
        ];
        const arrayEtapasPactoGlobal_5 = [
            arrayPactoGlobal_5_0,
            arrayPactoGlobal_5_1,
            arrayPactoGlobal_5_2,
            arrayPactoGlobal_5_3
        ];
        const arrayEtapasPactoGlobal_6 = [
            arrayPactoGlobal_6_0,
            arrayPactoGlobal_6_1,
            arrayPactoGlobal_6_2,
            arrayPactoGlobal_6_3
        ];
        const arrayEtapasPactoGlobal_7 = [
            arrayPactoGlobal_7_0,
            arrayPactoGlobal_7_1,
            arrayPactoGlobal_7_2,
            arrayPactoGlobal_7_3
        ];
        const arrayEtapasPactoGlobal_8 = [
            arrayPactoGlobal_8_0,
            arrayPactoGlobal_8_1,
            arrayPactoGlobal_8_2,
            arrayPactoGlobal_8_3
        ];
        const arrayEtapasPactoGlobal_9 = [
            arrayPactoGlobal_9_0,
            arrayPactoGlobal_9_1,
            arrayPactoGlobal_9_2,
            arrayPactoGlobal_9_3
        ];

        // ODS para las Etapas
        const arrayEtapaODS_0 = [
            arrayODS_0_0,
            arrayODS_0_1,
            arrayODS_0_2,
            arrayODS_0_3
        ];
        const arrayEtapaODS_1 = [
            arrayODS_1_0,
            arrayODS_1_1,
            arrayODS_1_2,
            arrayODS_1_3
        ];
        const arrayEtapaODS_2 = [
            arrayODS_2_0,
            arrayODS_2_1,
            arrayODS_2_2,
            arrayODS_2_3
        ];
        const arrayEtapaODS_3 = [
            arrayODS_3_0,
            arrayODS_3_1,
            arrayODS_3_2,
            arrayODS_3_3
        ];
        const arrayEtapaODS_4 = [
            arrayODS_4_0,
            arrayODS_4_1,
            arrayODS_4_2,
            arrayODS_4_3
        ];
        const arrayEtapaODS_5 = [
            arrayODS_5_0,
            arrayODS_5_1,
            arrayODS_5_2,
            arrayODS_5_3
        ];
        const arrayEtapaODS_6 = [
            arrayODS_6_0,
            arrayODS_6_1,
            arrayODS_6_2,
            arrayODS_6_3
        ];
        const arrayEtapaODS_7 = [
            arrayODS_7_0,
            arrayODS_7_1,
            arrayODS_7_2,
            arrayODS_7_3
        ];
        const arrayEtapaODS_8 = [
            arrayODS_8_0,
            arrayODS_8_1,
            arrayODS_8_2,
            arrayODS_8_3
        ];
        const arrayEtapaODS_9 = [
            arrayODS_9_0,
            arrayODS_9_1,
            arrayODS_9_2,
            arrayODS_9_3
        ];


        const arrayODS = [
            arrayEtapaODS_0,
            arrayEtapaODS_1,
            arrayEtapaODS_2,
            arrayEtapaODS_3,
            arrayEtapaODS_4,
            arrayEtapaODS_5,
            arrayEtapaODS_6,
            arrayEtapaODS_7,
            arrayEtapaODS_8,
            arrayEtapaODS_9
        ];

        //FK Etapas
        const arrayPactoGlobal = [
            arrayEtapasPactoGlobal_0,
            arrayEtapasPactoGlobal_1,
            arrayEtapasPactoGlobal_2,
            arrayEtapasPactoGlobal_3,
            arrayEtapasPactoGlobal_4,
            arrayEtapasPactoGlobal_5,
            arrayEtapasPactoGlobal_6,
            arrayEtapasPactoGlobal_7,
            arrayEtapasPactoGlobal_8,
            arrayEtapasPactoGlobal_9
        ];


        const tituloOds = [];
        tituloOds[0] = 'Poner fin a la POBREZA';
        tituloOds[1] = 'HAMBRE Cero';
        tituloOds[2] = 'Buena SALUD';
        tituloOds[3] = 'EDUCACIÓN de calidad';
        tituloOds[4] = 'IGUALDAD de género';
        tituloOds[5] = 'AGUA limpia y saneamiento';
        tituloOds[6] = 'ENERGÍA asequible y sostenible';
        tituloOds[7] = 'TRABAJO decente y crecimiento económico';
        tituloOds[8] = 'INDUSTRIA, innovación, infraestructura';
        tituloOds[9] = 'Reducir INEQUIDADES';
        tituloOds[10] = 'CIUDADES Y COMUNIDADES SOSTENIBLES';
        tituloOds[11] = 'CONSUMO responsable y producción';
        tituloOds[12] = 'Vida MARINA';
        tituloOds[13] = 'Acción CLIMÁTICA';
        tituloOds[14] = 'Vida en la TIERRA';
        tituloOds[15] = 'Paz, JUSTICIA e instituciones fuertes';
        tituloOds[16] = 'ALIANZAS para los objetivos';

        const descripcionOds = [];
        descripcionOds[0] = 'Poner fin a la pobreza en todas sus formas en todo el mundo.';
        descripcionOds[1] = 'Poner fin al hambre, lograr la seguridad alimentaria y la mejora de la nutrición y promover la agricultura sostenible.';
        descripcionOds[2] = 'Garantizar una vida sana y promover el bienestar para todos en todas las edades.';
        descripcionOds[3] = 'Garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos.';
        descripcionOds[4] = 'Lograr la igualdad entre los géneros y empoderar a todas las mujeres y niñas.';
        descripcionOds[5] = 'Garantizar la disponibilidad de agua y su gestión sostenible y el saneamiento para todos.';
        descripcionOds[6] = 'Garantizar el acceso a una energía asequible, segura, sostenible y moderna para todos.';
        descripcionOds[7] = 'Promover el crecimiento económico sostenido, inclusivo y sostenible, el empleo pleno y productivo y el trabajo decente para todos.';
        descripcionOds[8] = 'Construir infraestructuras resilientes, promover la industrialización inclusiva y sostenible y fomentar la innovación.';
        descripcionOds[9] = 'Reducir la desigualdad en y entre los países.';
        descripcionOds[10] = 'Conseguir que las ciudades y los asentamientos humanos sean inclusivos, seguros, resilientes y sostenibles.';
        descripcionOds[11] = 'Garantizar modalidades de consumo y producción sostenibles.';
        descripcionOds[12] = 'Adoptar medidas urgentes para combatir el cambio climático y sus efectos.';
        descripcionOds[13] = 'Conservar y utilizar en forma sostenible los océanos, los mares y los recursos marinos para el desarrollo sostenible.';
        descripcionOds[14] = 'Proteger, restablecer y promover el uso sostenible de los ecosistemas terrestres, efectuar una ordenación sostenible de los bosques, luchar contra la desertificación, detener y revertir la degradación de las tierras y poner freno a la pérdida de diversidad biológica.';
        descripcionOds[15] = 'Promover sociedades pacíficas e inclusivas para el desarrollo sostenible, facilitar el acceso a la justicia para todos y crear instituciones eficaces, responsables e inclusivas a todos los niveles. ';
        descripcionOds[16] = 'Fortalecer los medios de ejecución y revitalizar la alianza mundial para el desarrollo sostenible.';

        const tituloPactoGlobal = [];
        tituloPactoGlobal[0] = 'Derechos Humanos';
        tituloPactoGlobal[1] = 'Derechos Humanos';
        tituloPactoGlobal[2] = 'Normas laborales';
        tituloPactoGlobal[3] = 'Normas laborales';
        tituloPactoGlobal[4] = 'Normas laborales';
        tituloPactoGlobal[5] = 'Normas laborales';
        tituloPactoGlobal[6] = 'Medioambiente';
        tituloPactoGlobal[7] = 'Medioambiente';
        tituloPactoGlobal[8] = 'Medioambiente';
        tituloPactoGlobal[9] = 'Anticorrupción';

        const descripcionPactoGlobal = [];
        descripcionPactoGlobal[0] = 'Las empresas deben apoyar y respetar la protección de los Derechos Humanos fundamentales, reconocidos internacionalmente, dentro de su ámbito de influencia.';
        descripcionPactoGlobal[1] = 'Las empresas deben asegurarse que sus empresas no son cómplices en la vulneración de los Derechos Humanos.';
        descripcionPactoGlobal[2] = 'Las empresas deben apoyar la libertad de afiliación y el reconocimiento efectivo del derecho a la  negociación colectiva.';
        descripcionPactoGlobal[3] = 'Las empresas deben apoyar la eliminación de toda forma de trabajo forzoso o realizado bajo coacción.';
        descripcionPactoGlobal[4] = 'Las empresas deben apoyar la erradicación del trabajo infantil.';
        descripcionPactoGlobal[5] = 'Las empresas deben apoyar la abolición de las prácticas de discriminación en el empleo y la ocupación.';
        descripcionPactoGlobal[6] = 'Las empresas deberán mantener un enfoque preventivo que favorezca el medio ambiente.';
        descripcionPactoGlobal[7] = 'Las empresas deben fomentar las iniciativas que promuevan una mayor responsabilidad ambiental.';
        descripcionPactoGlobal[8] = 'Las empresas deben favorecer el desarrollo y la difusión de las tecnologías respetuosas con el medioambiente.';
        descripcionPactoGlobal[9] = 'Las empresas deben trabajar contra la corrupción en todas sus formas, incluidas extorsión y soborno.';

        const objetivosOds = [];
        objetivosOds[0] = tituloOds;
        objetivosOds[1] = descripcionOds;

        console.log(' # #  ' + objetivosOds[0])
        console.log(' # #  ' + descripcionOds[0])
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

        /*const paginasPracticas = [];
        paginasPracticas['paginaUno'] = paginaUno;
        paginasPracticas['paginaDos'] = paginaDos;
        var paginaSeleccionada = 'paginaUno';/**/

        const currentPractica = 1;

        //const etapas = d3.select("#container").append("svg").attr("width", widthEtapas).attr("height", heightEtapas);

        // Posición y tamaño etapas "caracol"
        var outerRadius = rp(50, 'x', width, height);//110;
        var innerRadius = rp(100, 'x', width, height);//100;
        var arcPad = 0.05223;
        var startAngle = 0;
        var arcLen = 0.44857; //0.47097
        var endAngle = 0.44857;


        // Posición y tamaño de fondo del "contenido" de la matriz de etapas
        let x_bg_matriz = rp(350, 'x', width, height); //width / 6
        let y_bg_matriz = rp(90, 'y', width, height); //165
        let width_bg_matriz = rp(1920 / 2, 'x', width, height); //width / 6
        let height_bg_matriz = rp(845, 'y', width, height);
        const contenido_delta = rp(60, 'y', width, height);

        const margen_h = 60; // Sin RP a proósito
        const margen_v = 90; // Sin RP a proósito

        // Posición y tamaño de del "arcoiris" de la matriz de practicas
        const x_content = x_bg_matriz + rp(margen_h, 'x', width, height); //350
        const y_content = y_bg_matriz + rp(margen_v, 'y', width, height); //200



        // posición del logo marca de agua
        const margen_h_bg = 80;
        const x_logo_bg = x_bg_matriz + rp(margen_h_bg, 'x', width, height);
        const y_logo_bg = y_bg_matriz + rp(margen_v, 'y', width, height);
        const w_logo_bg = width_bg_matriz - rp(2 * margen_h_bg, 'x', width, height);

        // Posición de la lista de la página 1
        const delta_y_circleP1 = rp(60, 'x', width, height);
        const x_circleP1 = x_content + rp(20, 'x', width, height);
        const y_circleP1 = y_content + rp(360, 'x', width, height);
        const r_circleP1 = rp(20, 'x', width, height);
        const x_textP1 = x_circleP1 + rp(35, 'x', width, height);
        const y_textP1 = y_circleP1 - rp(25, 'x', width, height);;//y_circleP1 + rp(5, 'x', width, height);
        const w_textP1 = width_bg_matriz - (3 * margen_h);
        const h_textP1 = rp(60, 'x', width, height);
        const x_circleNumberP1 = x_circleP1 - rp(4, 'x', width, height);
        const y_circleNumberP1 = y_circleP1 + rp(4, 'x', width, height);
        const FonSize_circleNumberP1 = rp(13, 'x', width, height);

        // Posición de la lista de la página 2
        const delta_y_circleP2 = rp(60, 'x', width, height);
        const x_circleP2 = x_content + rp(20, 'x', width, height);
        const y_circleP2 = y_content + rp(360, 'x', width, height);

        // Posición y tamaño de del "espiral" de la matriz de buenas prácticas
        const x_clickAreaArcoiris = rp(1052, 'x', width, height);
        const y_clickAreaArcoiris = rp(850, 'x', width, height);
        const scale_arcoiris = rp(1.22, 'x', width, height);

        const scale_svgArcoiris = rp(1, 'x', width, height); // 6.32
        const x_svgAreaArcoiris = rp(850, 'x', width, height);
        const y_svgAreaArcoiris = rp(850, 'x', width, height);
        const w_svgAreaArcoiris = rp(803, 'x', width, height);
        const h_svgAreaArcoiris = rp(350, 'x', width, height);

        // Posición y tamaño de practicas content
        const x_practicasContentBG = rp(760, 'x', width, height);
        const y_practicasContentBG = y_clickAreaArcoiris + rp(20, 'x', width, height);//rp(770, 'x', width, height);
        const w_practicasContentBG = rp(1005, 'x', width, height);
        const h_practicasContentBG = rp(420, 'x', width, height);
        const scale_practicasContent = rp(0.5, 'x', width, height);

        // practicasContentFO
        const x_practicasContentFO = rp(1190, 'x', width, height);
        const y_practicasContentFO = rp(143, 'x', width, height);
        const contentFontSize = rp(18, 'x', width, height);
        const content_w = width_bg_matriz - (2 * margen_h);
        const content_h = height_bg_matriz - (2 * margen_v);




        // Selector página
        const w_selectorPag = width_bg_matriz - (6 * margen_h);
        const x_selectorPag = x_bg_matriz + (width_bg_matriz / 2) - (w_selectorPag / 2);
        const y_selectorPag = y_content + rp(700, 'x', width, height);
        const r_selectorPag = rp(30, 'x', width, height);
        const stroke_selectorPag = 'url(#bgLinGradB)';
        const border_selectorPag = rp(1, 'x', width, height);
        const h_selectorPag = delta_y_circleP1;
        const y_ButtonPag = y_selectorPag + (delta_y_circleP1 / 2);
        const r_ButtonPag = (delta_y_circleP1 / 2) * 0.95;
        const x_ButtonPag1 = x_selectorPag + r_ButtonPag;
        const x_ButtonPag2 = x_ButtonPag1 + w_selectorPag - (r_ButtonPag * 2);
        const fill_ButtonPag = 'url(#bgLinGradB)';
        var x_button;

        // Posición y tamaño de textos de titulos de etapas
        var paso = rp(65, 'x', width, height);

        // Posición y tamaño selección de rol
        let textRol = ['Competencias mandante', 'Competencias proveedor', 'Competencias compartidas'];
        const colorRol = ['#9E6F9E', '#B3BABD', '#D9E021']; // mandante, compartido, proveedor,
        const colorObjetivos = 'url(#bgLinGradB)'; // mandante, compartido, proveedor,

        // Posición y tamaño de título de página "tool tip"
        const x_pageTitleBg = practica.getXPracticasLabel(currentPractica, width, height);
        const y_pageTitleBg = rp(10, 'x', width, height);
        const w_pageTitleBg = practica.getWPracticasLabel(currentPractica, width, height);
        const h_pageTitleBg = rp(100, 'x', width, height);
        const margenPageTitle_h = rp(40, 'x', width, height);
        const margenPageTitle_v = rp(60, 'x', width, height);
        const x_pageTitle = (x_pageTitleBg * 1) + margenPageTitle_h;
        const y_pageTitle = y_pageTitleBg - rp(5, 'x', width, height);
        const w_pageTitle = w_pageTitleBg - (2 * margenPageTitle_h);
        const h_pageTitle = h_pageTitleBg;
        const letterSpacing_pageTitle = rp(4, 'x', width, height);
        const fontSize_pageTitle = rp(22, 'x', width, height);
        const fontFamily_pageTitle = 'Oswald';
        const style_pageTitle = 'text-transform: uppercase;font-family:' + fontFamily_pageTitle + ';font-weight:bold;font-size:' + fontSize_pageTitle + 'px;letter-spacing:' + letterSpacing_pageTitle + 'px;color:#FFFFFF';


        const w_simulation = rp(7.5, 'x', width, height);
        const w_forceCenter = rp(2, 'x', width, height);
        const h_forceCenter = rp(19, 'x', width, height);
        const x_node_1 = rp(160, 'x', width, height); // x_node_1
        const x_node_2 = rp(250, 'x', width, height); // x_node_2
        const x_node_3 = rp(67.36, 'x', width, height); // x_node_3
        const y_node_1 = rp(380, 'x', width, height); // y_node_1
        const y_node_2 = rp(230, 'x', width, height); // y_node_2
        const y_node_3 = rp(206.19, 'x', width, height); //y_node_3
        const strokeWidth_lines = rp(8, 'x', width, height);
        const x_link_1 = x_node_1 + rp(64, 'x', width, height); // x_link_1
        const y_link_1 = y_node_1 + rp(64, 'x', width, height); // y_link_1
        const x_link_2 = x_node_2 + rp(64, 'x', width, height); // x = x_link_2
        const y_link_2 = y_node_2 + rp(64, 'x', width, height); // y_link_2
        const x_link_3 = x_node_3 + rp(96, 'x', width, height); // x_link_3
        const y_link_3 = y_node_3 + rp(96, 'x', width, height); // y_link_3



        const arrayDetallePractica = [];

        // Posición y tamaño de del "detalle" de la matriz de practicas
        const x_paginaDetalle = rp(1920 / 2, 'x', width, height) + rp(30, 'x', width, height);
        const y_paginaDetalle = rp(820, 'x', width, height);
        const w_paginaDetalle = width_bg_matriz / 2
        const h_paginaDetalle = rp(6650, 'x', width, height);

        // Posición y tamaño de los rectangulos de las categorías

        const x_rectOds = rp(790, 'x', width, height);
        const y_rectOds = y_clickAreaArcoiris + rp(50, 'x', width, height);//rp(825, 'x', width, height);
        const w_rectOds = rp(715, 'x', width, height);
        const h_rectOds = rp(30, 'x', width, height);

        const x_rectPactoGlobal = x_rectOds + rp(730, 'x', width, height);
        const y_rectPactoGlobal = y_rectOds;
        const w_rectPactoGlobal = rp(215, 'x', width, height);
        const h_rectPactoGlobal = rp(30, 'x', width, height);

        const x_rectOds_2 = rp(330, 'x', width, height);
        const y_rectOds_2 = y_clickAreaArcoiris + rp(10, 'x', width, height);//rp(825, 'x', width, height);
        const w_rectOds_2 = rp(85, 'x', width, height);
        const h_rectOds_2 = rp(30, 'x', width, height);

        const x_rectOdsLabel_2 = rp(330, 'x', width, height);
        const y_rectOdsLabel_2 = y_clickAreaArcoiris + rp(10, 'x', width, height);//rp(825, 'x', width, height);

        const x_rectPactoLabel_2 = rp(400, 'x', width, height);
        const y_rectPactoLabel_2 = y_rectOds_2;

        const x_etapasLabel_2 = rp(540, 'x', width, height);
        const y_etapasLabel_2 = y_rectOds_2

        const x_rectPactoGlobal_2 = rp(420, 'x', width, height);
        const y_rectPactoGlobal_2 = y_rectOds_2;
        const w_rectPactoGlobal_2 = rp(35, 'x', width, height);
        const h_rectPactoGlobal_2 = rp(30, 'x', width, height);

        const x_etapas = rp(460, 'x', width, height);
        const y_etapas = y_rectOds_2
        const w_etapas = rp(260, 'x', width, height);
        const h_etapas = rp(30, 'x', width, height);

        const x_etapas_2 = rp(460, 'x', width, height);
        const y_etapas_2 = y_rectOds_2
        const w_etapas_2 = rp(260, 'x', width, height);
        const h_etapas_2 = rp(30, 'x', width, height);

        const delta_x_OdsPactoGlobal = rp(30, 'x', width, height);
        const delta_y_OdsPactoGlobal = rp(3, 'x', width, height);
        const color_OdsPactoGlobal = '#AAA0AB';
        const fontSize_OdsPactoGlobal = rp(12, 'x', width, height);
        const fontFamily_OdsPactoGlobal = 'Roboto';
        const style_OdsPactoGlobal = 'font-family:' + fontFamily_OdsPactoGlobal + ';font-weight:bold;font-size:' + fontSize_OdsPactoGlobal + 'px;color:#000000';

        const x_listaPactoGlobal = x_rectPactoGlobal + rp(20, 'x', width, height);
        const y_listaPactoGlobal = y_rectPactoGlobal + rp(55, 'x', width, height);
        const w_listaPactoGlobal = rp(240, 'x', width, height);
        const h_listaPactoGlobal = rp(50, 'x', width, height);
        const r_listaPactoGlobal = rp(12, 'x', width, height);
        const delta_x_FO_numUnidadesListaPactoGlobal = rp(4, 'x', width, height);
        const delta_x_FO_numDecenasListaPactoGlobal = rp(9, 'x', width, height);
        const delta_x_FO_numListaPactoGlobal = delta_x_FO_numUnidadesListaPactoGlobal;


        const x_col1_listaOds = x_rectOds + rp(15, 'x', width, height);
        const w_listaOds = rp(340, 'x', width, height);
        const x_col2_listaOds = x_col1_listaOds + w_listaOds + rp(20, 'x', width, height);
        const x_col_listaOds = 0;
        const y_listaOds = y_rectOds + rp(55, 'x', width, height);
        const r_listaOds = r_listaPactoGlobal;
        const h_listaOds = h_listaPactoGlobal;

        const delta_y_listaOds = rp(30, 'x', width, height);
        const delta_y_FO_listaOds = rp(8, 'x', width, height);
        const delta_x_FO_listaOds = rp(20, 'x', width, height);//20;

        const fontSize_listaOds = rp(15, 'y', width, height);
        const fontSize_numListaOds = rp(15, 'y', width, height);
        const estilo_listaOds = 'style="margin:0;font-size:' + fontSize_listaOds + 'px;font-family:Roboto;color:#333333"';
        const estilo_numListaOds = 'style="margin:0;font-size:' + fontSize_numListaOds + 'px;font-family:Roboto;color:#333333"';
        const delta_x_FO_numUnidadesListaOds = rp(4, 'x', width, height);//4;
        const delta_x_FO_numDecenasListaOds = rp(9, 'x', width, height);//9;
        const delta_x_FO_numListaOds = delta_x_FO_numUnidadesListaOds;

        const x_contentDetalle = rp(100, 'x', width, height);
        const y_contentDetalle = y_clickAreaArcoiris + rp(60, 'x', width, height);
        const w_contentDetalle = rp(590, 'x', width, height);
        const h_contentDetalle = rp(350, 'x', width, height);
        const r_contentDetalle = rp(40, 'x', width, height);

        const margen_titleContentDetalle = rp(60, 'x', width, height);
        const x_titleContentDetalle = x_contentDetalle + margen_titleContentDetalle;
        const y_titleContentDetalle = y_contentDetalle + (margen_titleContentDetalle / 2);
        const w_titleContentDetalle = w_contentDetalle - (2 * margen_titleContentDetalle);
        const h_titleContentDetalle = rp(200, 'x', width, height);

        const x_bodyContentDetalle = x_titleContentDetalle;
        const y_bodyContentDetalle = y_contentDetalle + rp(150, 'x', width, height);
        const w_bodyContentDetalle = w_contentDetalle - (2 * margen_titleContentDetalle);
        const h_bodyContentDetalle = rp(200, 'x', width, height);

        const fontSize_titleContentTipo = rp(20, 'y', width, height);
        const fontSize_titleContentDetalle = rp(26, 'y', width, height);
        const fontSize_bodyContentDetalle = rp(18, 'y', width, height);



        const data = {
            "nodes": [
                {
                    "name": 1,
                    "fillColor": "red",
                    "url": "/img/repositorio_web-01.png"
                },
                {
                    "name": 2,
                    "fillColor": "blue",
                    "url": "/img/repositorio_web-02.png"
                },
                {
                    "name": 3,
                    "fillColor": "green",
                    "url": "/img/repositorio_web-03.png"
                },
            ],
            "links": [
                {
                    "source": 1,
                    "target": 2,
                },
                {
                    "source": 2,
                    "target": 3,
                },
                {
                    "source": 3,
                    "target": 1,
                },
            ]
        }

        /*********************************************
          Renderiza elementos del "arcoiris" - Begin
        *********************************************/
        const svgArcoiris = svg.append('g')
            .attr('id', 'arcoiris')
            //.attr("transform", "scale(" + scale_arcoiris + ")")
            .attr("transform", "translate(" + x_clickAreaArcoiris + "," + y_clickAreaArcoiris + ")")
            .attr('opacity', 1);

        //const svgArcoirisSegmentos = svg.append('g')
        //  .attr('id', 'arcoirisSegmentos')
        //  .attr("transform", "scale(" + scale_svgArcoiris + "), translate(" + x_svgAreaArcoiris + "," + y_svgAreaArcoiris + ")")
        //  .attr('opacity', 1);
        //// Renderiza arcoiris desde archivo
        //svgArcoirisSegmentos.append("image")
        //  .attr('id', 'svgAcoirisSegmentos')
        //  .attr('xlink:href', window.location.origin + '/svg/' + practicasSegmentos[currentPractica])
        //  .attr('opacity', 1);




        /*********************************************
         Renderiza elementos del "arcoiris" - End
        *********************************************/

        /*********************************************
          Renderiza área clickeable "arcoiris" - Begin
        *********************************************/
        // Posición y tamaño superficie clickeable de etapas "caracol"


        const svgClicklAreaArcoiris = svg.append("g")
            .attr('id', 'clickAreaArcoiris')
            .attr('opacity', 1)
            .attr('transform', 'translate(' + x_clickAreaArcoiris + ',' + y_clickAreaArcoiris + ')');

        var svgClicklAreaEtapas = svg.append("g")
            .attr('id', 'clickAreaEtapas')
            .attr('opacity', 1)
            .attr("transform", "translate(" + x_clickAreaArcoiris + "," + y_clickAreaArcoiris + ")");
        var svgCirculosPactoGlobal = svg.append("g")
            .attr('id', 'circulosPactoGlobal')
            .attr('opacity', 1)
            .attr("transform", "translate(" + x_clickAreaArcoiris + "," + y_clickAreaArcoiris + ")");
        var svgCirculosOds = svg.append("g")
            .attr('id', 'circulosOds')
            .attr('opacity', 1)
            .attr("transform", "translate(" + x_clickAreaArcoiris + "," + y_clickAreaArcoiris + ")");

        const numPosicionesPorCadaEtapa = 4;
        var parametrosSet = [];
        parametrosSet['svg'] = svg;
        parametrosSet['svgClicklAreaEtapas'] = svgClicklAreaEtapas;
        parametrosSet['svgCirculosPactoGlobal'] = svgCirculosPactoGlobal;
        parametrosSet['svgCirculosOds'] = svgCirculosOds;
        parametrosSet['svgArcoiris'] = svgArcoiris;
        parametrosSet['arrayPracticaDetalle'] = arrayPracticaDetalle;
        parametrosSet['arrayEtapas'] = arrayEtapas;
        parametrosSet['arrayPactoGlobal'] = arrayPactoGlobal;
        parametrosSet['arrayODS'] = arrayODS;
        parametrosSet['x_clickAreaArcoiris'] = x_clickAreaArcoiris;
        parametrosSet['y_clickAreaArcoiris'] = y_clickAreaArcoiris;
        parametrosSet['colorRol'] = colorRol;
        parametrosSet['width'] = width;
        parametrosSet['height'] = height;
        parametrosSet['posicionEnElArco'] = posicionEnElArco;

        practica.setClickDatellaPractica(parametrosSet);
        practica.showClickDatellaPractica(0, svgCirculosPactoGlobal, svgCirculosOds, arrayPracticaDetalle, arrayEtapas, arrayPactoGlobal, arrayODS, width, height, colorRol, x_clickAreaArcoiris, y_clickAreaArcoiris);


        // Área clickeable detalle práctica
        var arcLenA = 3.14 / arrayPracticaDetalle.length;
        // Posición inicial de los segmentos
        var startAngle = -(2 * arcLenA);
        var endAngle = startAngle + arcLenA;
        var innerRadius = rp(113, 'x', width, height);
        var outerRadius = rp(332, 'x', width, height);



        var segmentId = '';
        var segmentClickeableId = '';
        var segmentTexetDetalleId;
        var fonSize_detalle = rp(15, 'x', width, height);
        var divHeight_detalle = 'height:' + rp(80, 'x', width, height) + 'px';
        const rotationAngle_detalle = 190 / arrayPracticaDetalle.length;
        const x_segmentText = rp(-320, 'x', width, height);
        const y_segmentText = rp(-105, 'x', width, height);
        for (let i = 0; i < arrayPracticaDetalle.length; i++) {
            var arcSegment = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(startAngle)     // It's in radian, so Pi = 3.14 = bottom.
                .endAngle(endAngle);        // 2*Pi = 6.28 = top        
            //var [x, y] = arcSegment.centroid(arcSegment);
            //svgClicklAreaArcoiris.append("circle")
            //  .attr("id", 'circle' + i)
            //  .attr("cx", x)
            //  .attr("cy", y)
            //  .attr("r", rp(20, 'x', width, height))
            //  .style("stroke", "black")
            //  .attr('opacity', 1)
            //  .style("fill", "white");

            segmentId = 'segment_' + i;
            svgClicklAreaArcoiris.append("path")
                .attr("id", segmentId)
                .attr("d", arcSegment)
                .attr("fill", practicasColor[currentPractica])
                .style("stroke", '#959B99')
                .style("stroke-dasharray", ("3, 3"))
                .style("stroke-width", rp(2, 'x', width, height))
                .attr('opacity', 1);

            segmentTexetDetalleId = 'segmentTexetDetalleId' + i;
            svgClicklAreaArcoiris.append('foreignObject')
                .attr("id", segmentTexetDetalleId)
                .attr('x', x_segmentText)
                .attr('y', y_segmentText)
                .attr("width", rp(200, 'x', width, height))
                .attr("height", rp(60, 'x', width, height))
                .style("stroke", '#000000')
                .style("stroke-width", rp(1, 'x', width, height))
                .style('cursor', 'context-menu')
                .attr('opacity', 1)
                .html(function (d) {
                    return '<div style="-webkit-transform: rotate(10deg);font-family:Roboto;font-weight:normal;color:#ffffff;font-size:' + fonSize_detalle + 'px;' + divHeight_detalle + '"><p align="left" style="">' + arrayPracticaDetalle[i] + '</p></div>'
                })
                //.transition().duration(animDuration_arcEtapas)
                //.attr('opacity', 1)
                .attr("transform", "rotate(" + rotationAngle_detalle * i + ")");

            segmentClickeableId = 'segmentClickeable_' + i;
            svgClicklAreaArcoiris.append("path")
                .attr("id", segmentClickeableId)
                .attr("d", arcSegment)
                .attr("fill", 'transparent')
                .style("stroke", '#959B99')
                .style("stroke-dasharray", ("3, 3"))
                .style("stroke-width", rp(2, 'x', width, height))
                .attr('opacity', 1)
                .style("cursor", "pointer")
                .on('mouseover', function () {
                    d3.select(this)
                        .style("stroke", '#555555')
                        .style("stroke-width", rp(4, 'x', width, height));
                })
                .on('mouseout', function (i) {
                    d3.select(this)
                        .style("stroke", '#959B99')
                        .style("stroke-width", rp(2, 'x', width, height));
                })
                .on('click', function () {
                    //practica.disableClickDatellaPractica(arrayEtapas, arrayPactoGlobal, arrayODS);
                    practica.showClickDatellaPractica(i, svgCirculosPactoGlobal, svgCirculosOds, arrayPracticaDetalle, arrayEtapas, arrayPactoGlobal, arrayODS, width, height, colorRol, x_clickAreaArcoiris, y_clickAreaArcoiris);
                });

            startAngle = endAngle;
            endAngle = arcLenA + endAngle;

        }


        /*********************************************
          Renderiza área clickeable "arcoiris" - End
        *********************************************/


        /*******************************************************
         Renderiza Base para contenidos - Begin
        ******************************************************/
        // Renderiza textos del contenido de practicas
        const svgPracticasContent = svg.append('g')
            .attr('id', 'practicasContent')
            //.attr("transform", "scale(" + scale_practicasContent + ")")
            .attr('opacity', 1);

        // Renderiza líneas discontinuas
        //svgPracticasContent.append("image")
        //  .attr('id', 'practicasContentBG')
        //  //.attr("transform", "scale(" + scale_practicasContent + ")")
        //  .attr('xlink:href', window.location.origin + '/svg/practicas_detalle_columnas_bg.svg')
        //  .attr('x', x_practicasContentBG)
        //  .attr('y', y_practicasContentBG)
        //  .attr("height", h_practicasContentBG)
        //  .attr("filter", "url(#shadowFilter)")
        //  .attr('opacity', 1);

        svgPracticasContent.append('rect')
            .attr("id", 'contentDetalle')
            .attr("x", x_practicasContentBG)
            .attr("y", y_practicasContentBG)
            .attr('width', w_practicasContentBG)
            .attr('height', h_practicasContentBG)
            .style('fill', "white")
            .attr("filter", "url(#shadowFilter)")
            .attr("rx", r_contentDetalle)								// radius
            .attr("ry", r_contentDetalle);

        //svgPracticasContent.append("foreignObject")
        //  .attr('id', 'practicasContentFO')
        //  .attr('x', x_practicasContentFO)
        //  .attr('y', y_practicasContentFO)
        //  .attr("width", content_w)
        //  .attr("height", content_h)
        //  .attr("font-size", contentFontSize);

        practica.setContentPracticas(arrayDetallePractica);



        // Rect ODS
        svg.append('rect')
            .attr('id', 'rectOds_2')
            .attr('x', x_rectOds_2)
            .attr('y', y_rectOds_2)
            .style("fill", color_OdsPactoGlobal)
            .style("stroke", 'none')
            .attr('width', w_rectOds_2)
            .attr('height', h_rectOds_2);

        // Rect Pacto Global
        svg.append('rect')
            .attr('id', 'rectPactoGlobal_2')
            .attr('x', x_rectPactoGlobal_2)
            .attr('y', y_rectPactoGlobal_2)
            .style("fill", color_OdsPactoGlobal)
            .style("stroke", 'none')
            .attr('width', w_rectPactoGlobal_2)
            .attr('height', h_rectPactoGlobal_2);

        // Rect Etapas
        svg.append('rect')
            .attr('id', 'rectEtapas')
            .attr('x', x_etapas)
            .attr('y', y_etapas)
            .style("fill", color_OdsPactoGlobal)
            .style("stroke", 'none')
            .attr('width', w_etapas)
            .attr('height', h_etapas);

        svg.append("foreignObject")
            .attr('id', 'titleOds_2')
            .attr('x', x_rectOdsLabel_2 + delta_x_OdsPactoGlobal)
            .attr('y', y_rectOdsLabel_2 - delta_y_OdsPactoGlobal)
            .attr('width', w_rectOds)
            .attr('height', h_rectOds)
            .html(function (d) {
                return '<div style="' + style_OdsPactoGlobal + '"><p align="justify">ODS</p></div>'
            })

        svg.append("foreignObject")
            .attr('id', 'titlePactoGlobal_2')
            .attr('x', x_rectPactoLabel_2 + delta_x_OdsPactoGlobal)
            .attr('y', y_rectPactoLabel_2 - delta_y_OdsPactoGlobal)
            .attr('width', w_rectPactoGlobal)
            .attr('height', h_rectPactoGlobal)
            .html(function (d) {
                return '<div style="' + style_OdsPactoGlobal + '"><p align="justify">PG</p></div>'
            })

        svg.append("foreignObject")
            .attr('id', 'titleEtapas')
            .attr('x', x_etapasLabel_2 + delta_x_OdsPactoGlobal)
            .attr('y', y_etapasLabel_2 - delta_y_OdsPactoGlobal)
            .attr('width', w_rectPactoGlobal)
            .attr('height', h_rectPactoGlobal)
            .html(function (d) {
                return '<div style="' + style_OdsPactoGlobal + '"><p align="justify">Etapas</p></div>'
            })

        // Rect ODS
        svg.append('rect')
            .attr('id', 'rectOds')
            .attr('x', x_rectOds)
            .attr('y', y_rectOds)
            .style("fill", color_OdsPactoGlobal)
            .style("stroke", 'none')
            .attr('width', w_rectOds)
            .attr('height', h_rectOds);

        // Rect Pacto Global
        svg.append('rect')
            .attr('id', 'rectPactoGlobal')
            .attr('x', x_rectPactoGlobal)
            .attr('y', y_rectPactoGlobal)
            .style("fill", color_OdsPactoGlobal)
            .style("stroke", 'none')
            .attr('width', w_rectPactoGlobal)
            .attr('height', h_rectPactoGlobal);

        svg.append("foreignObject")
            .attr('id', 'titleOds')
            .attr('x', x_rectOds + delta_x_OdsPactoGlobal)
            .attr('y', y_rectOds - delta_y_OdsPactoGlobal)
            .attr('width', w_rectOds)
            .attr('height', h_rectOds)
            .html(function (d) {
                return '<div style="' + style_OdsPactoGlobal + '"><p align="justify">ODS</p></div>'
            })

        svg.append("foreignObject")
            .attr('id', 'titlePactoGlobal')
            .attr('x', x_rectPactoGlobal + delta_x_OdsPactoGlobal)
            .attr('y', y_rectPactoGlobal - delta_y_OdsPactoGlobal)
            .attr('width', w_rectPactoGlobal)
            .attr('height', h_rectPactoGlobal)
            .html(function (d) {
                return '<div style="' + style_OdsPactoGlobal + '"><p align="justify">PACTO GLOBAL</p></div>'
            })


        /*******************************************************
         Renderiza Base para contenidos - End
        ******************************************************/

        /*******************************************************
         Renderiza contenidos página - begin
         ******************************************************/
        const svgContentDetalle = svg.append("g")
            .attr('id', 'svgContentDetalle')
            .attr('opacity', 1);

        const svgListaOds = svg.append("g")
            .attr('id', 'listaOds')
            .attr('opacity', 1);

        const svgListaPactoGlobal = svg.append("g")
            .attr('id', 'listaPactoGlobal')
            .attr('opacity', 1);

        svgContentDetalle.append('rect')
            .attr("id", 'contentDetalleBG')
            .attr("x", x_contentDetalle)
            .attr("y", y_contentDetalle)
            .attr('width', w_contentDetalle)
            .attr('height', h_contentDetalle)
            .style('fill', "white")
            .attr("filter", "url(#shadowFilter)")
            .attr("rx", r_contentDetalle)								// radius
            .attr("ry", r_contentDetalle)
            .attr('opacity', 0);


        svgContentDetalle.append("foreignObject")
            .attr('id', 'svgContentDetalleTitle')
            .attr('x', x_titleContentDetalle)
            .attr('y', y_titleContentDetalle)
            .attr("width", w_titleContentDetalle)
            .attr("height", h_titleContentDetalle)
            .attr("font-size", fontSize_titleContentDetalle);


        svgContentDetalle.append("foreignObject")
            .attr('id', 'svgContentDetalleBody')
            .attr('x', x_bodyContentDetalle)
            .attr('y', y_bodyContentDetalle)
            .attr("width", w_bodyContentDetalle)
            .attr("height", h_bodyContentDetalle)
            .attr("font-size", fontSize_bodyContentDetalle);

        var index_listaOds = 0;
        for (let i = 0; i < tituloOds.length; i++) {
            if (i == parseInt(tituloOds.length / 2)) {
                index_listaOds = 0;
            }
            if (i >= parseInt(tituloOds.length / 2)) {
                x_col_listaOds = x_col2_listaOds;
            }
            else
                x_col_listaOds = x_col1_listaOds;

            if (i >= 9)
                delta_x_FO_numListaOds = delta_x_FO_numDecenasListaOds;

            svgListaOds.append("circle")
                .attr("id", 'circlelistaOds' + i)
                .attr("cx", x_col_listaOds)
                .attr("cy", y_listaOds + (index_listaOds * delta_y_listaOds))
                .attr("r", r_listaOds)
                .style("stroke", '#000000')
                .style("stroke-width", rp(1, 'x', width, height))
                .attr('opacity', 0.4)
                .style("fill", colorObjetivos);

            svgListaOds.append("foreignObject")
                .attr('id', 'numListaODs' + i)
                .attr('x', x_col_listaOds - delta_x_FO_numListaOds)
                .attr('y', y_listaOds + (index_listaOds * delta_y_listaOds) - delta_y_FO_listaOds)
                .attr("width", r_listaOds * 2)
                .attr("height", r_listaOds * 2)
                .html(function (d) {
                    return '<p ' + estilo_numListaOds + '>' + (i + 1) + '</p>';
                });

            svgListaOds.append("foreignObject")
                .attr('id', 'itemListaODs' + i)
                .attr('x', x_col_listaOds + delta_x_FO_listaOds)
                .attr('y', y_listaOds + (index_listaOds * delta_y_listaOds) - delta_y_FO_listaOds)
                .attr("width", w_listaOds)
                .attr("height", h_listaOds)
                .html(function (d) {
                    return '<p ' + estilo_listaOds + '>' + tituloOds[i] + '</p>';
                });

            svgListaOds.append('rect')
                .attr("id", "areaClickeable" + i)
                .attr('x', x_col_listaOds - r_listaOds)
                .attr('y', y_listaOds + (index_listaOds * delta_y_listaOds) - r_listaOds)
                .attr('rx', r_listaOds)
                .attr('ry', r_listaOds)
                .style("fill", "transparent")
                .style("stroke", 'none')
                .style("stroke-width", 1)
                .attr('width', w_listaOds) //width / 4.5
                .attr('height', r_listaOds * 2) //height / 20
                .attr('opacity', 1)
                .on('mouseover', function () {
                    // Resalta
                    d3.select('#circlelistaOds' + i)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.7);
                    d3.select('#contentDetalleBG')
                        .transition()
                        .duration(400)
                        .attr('opacity', 1);

                    // Actualiza
                    practica.setTitleContentDetalle('#svgContentDetalleTitle', (i + 1) + ' ' + tituloOds[i], 300, 'ods', fontSize_titleContentTipo);
                    practica.setBodyContentDetalle('#svgContentDetalleBody', descripcionOds[i], 600);
                })
                .on('mouseout', function () {
                    d3.select('#circlelistaOds' + i)
                        .transition()
                        .duration(100)
                        .attr('opacity', 0.4);
                    // Deja normal

                });



            index_listaOds++;
        }
        index_listaOds = 0;
        for (let i = 0; i < tituloPactoGlobal.length; i++) {
            if (i >= 9)
                delta_x_FO_numListaPactoGlobal = delta_x_FO_numDecenasListaPactoGlobal;
            // 
            // Pacto Global
            svgListaPactoGlobal.append("circle")
                .attr("id", 'circlelistaPactoGlobal' + i)
                .attr("cx", x_listaPactoGlobal)
                .attr("cy", y_listaPactoGlobal + (index_listaOds * delta_y_listaOds))
                .attr("r", r_listaPactoGlobal)
                .style("stroke", '#0000FF')
                .style("stroke-width", rp(1, 'x', width, height))
                .attr('opacity', 0.4)
                .style("fill", colorObjetivos);

            svgListaPactoGlobal.append("foreignObject")
                .attr('id', 'numListaODs' + i)
                .attr('x', x_listaPactoGlobal - delta_x_FO_numListaPactoGlobal)
                .attr('y', y_listaPactoGlobal + (index_listaOds * delta_y_listaOds) - delta_y_FO_listaOds)
                .attr("width", r_listaOds * 2)
                .attr("height", r_listaOds * 2)
                .html(function (d) {
                    return '<p ' + estilo_numListaOds + '>' + (i + 1) + '</p>';
                });

            svgListaPactoGlobal.append("foreignObject")
                .attr('id', 'itemListaODs' + i)
                .attr('x', x_listaPactoGlobal + delta_x_FO_listaOds)
                .attr('y', y_listaPactoGlobal + (index_listaOds * delta_y_listaOds) - delta_y_FO_listaOds)
                .attr("width", w_listaPactoGlobal)
                .attr("height", h_listaPactoGlobal)
                .html(function (d) {
                    return '<p ' + estilo_listaOds + '>' + tituloPactoGlobal[i] + '</p>';
                });

            svgListaPactoGlobal.append('rect')
                .attr("id", "areaClickeablePactoGlobal" + i)
                .attr('x', x_listaPactoGlobal - r_listaOds)
                .attr('y', y_listaOds + (index_listaOds * delta_y_listaOds) - r_listaOds)
                .attr('rx', r_listaOds)
                .attr('ry', r_listaOds)
                .style("fill", "transparent")
                .style("stroke", 'none')
                .style("stroke-width", 1)
                .attr('width', w_listaPactoGlobal) //width / 4.5
                .attr('height', r_listaOds * 2) //height / 20
                .attr('opacity', 1)
                .on('mouseover', function () {
                    // Resalta
                    d3.select('#circlelistaPactoGlobal' + i)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.7);
                    d3.select('#contentDetalleBG')
                        .transition()
                        .duration(400)
                        .attr('opacity', 1);

                    // Actualiza
                    practica.setTitleContentDetalle('#svgContentDetalleTitle', (i + 1) + ' ' + tituloPactoGlobal[i], 300, 'pactoglobal', fontSize_titleContentTipo);
                    practica.setBodyContentDetalle('#svgContentDetalleBody', descripcionPactoGlobal[i], 400);
                })
                .on('mouseout', function () {
                    d3.select('#circlelistaPactoGlobal' + i)
                        .transition()
                        .duration(100)
                        .attr('opacity', 0.4);
                    // Deja normal

                });
            index_listaOds++;
        }
        /******************************************************
         Renderiza contenidos página - end
        ******************************************************/
        /******************************
         Section 3 - breadcrumb - Start
         //*******************************/
        breadcrumb(svg, width, height, 'Inicio', 'Matríz', '/guia_de_gestion', '');
        /******************************
        Section 3 - breadcrumb - End
        *******************************/

        // Título
        //tooltip rectangle
        svg.append('rect')
            .attr('id', 'pageTitle')
            .attr('x', x_pageTitleBg)
            .attr('y', y_pageTitleBg)
            .attr('rx', radio_small)
            .attr('ry', radio_small)
            .style("fill", "url(#bgLinGradB)")
            //.transition()
            //.delay(200)
            .attr('width', w_pageTitleBg)
            .attr('height', h_pageTitleBg);

        svg.append("foreignObject")
            .attr('id', 'pageTitleFO')
            .attr('x', x_pageTitle)
            .attr('y', y_pageTitle)
            .attr("width", w_pageTitle)
            .attr("height", h_pageTitle)
            .html(function (d) {
                return '<div style="' + style_pageTitle + '"><p align="justify">' + practicasLabel[currentPractica] + '</p></div>'
            })


        // Líneas
        // Lines behind the circles
        const link = svg
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .style("stroke", "url(#sideBarGradient)")
            .style('stroke-width', strokeWidth_lines); // 20


        const simulation = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink()
                .id(function (d) { return d.name; })
                .links(data.links)
            )
            .force("charge", d3.forceManyBody().strength(-600))
            .force('collide', d3.forceCollide(function (d) {          // distance between nodes
                return w_simulation
                //return width / divW[19]
            }))
            .force("center", d3.forceCenter(w_forceCenter, h_forceCenter))     // This force attracts nodes to the center of the svg area
            //.force("center", d3.forceCenter(width / divW[20], heightCorrected / divW[13] - 20))     // This force attracts nodes to the center of the svg area
            .on("end", ticked)
            .tick(300);/**/

        /******************************
         Brand corner - begin
        *******************************/
        svg.append('rect')
            .attr('id', 'rectWhiteFade')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", 1)
            .attr('opacity', 0)
            .attr("fill", 'white')

        headerCornerLogo(svg, width, heightCorrected);
        /******************************
         Brand corner - end
        *******************************/

        /******************************
         Sidebar - begin
        *******************************/
        getSideBarPracticasDetalle(svg, width, specialHeight, styles.grow);

        function ticked() {
            link
                .attr("x1", function (d, i) {
                    var x; (i + 1) == 1 ? x = x_link_1 : (i + 1) == 2 ? x = x_link_2 : x = x_link_3;
                    return x;
                })
                .attr("y1", function (d, i) {
                    var y; (i + 1) == 1 ? y = y_link_1 : (i + 1) == 2 ? y = y_link_2 : y = y_link_3;
                    return y;
                })
                .attr("x2", function (d, i) {
                    var x; (i + 1) == 1 ? x = x_link_2 : (i + 1) == 2 ? x = x_link_3 : x = x_link_1;
                    return x;
                })
                .attr("y2", function (d, i) {
                    var y; (i + 1) == 1 ? y = y_link_2 : (i + 1) == 2 ? y = y_link_3 : y = y_link_1;
                    return y;
                });
            /*
                  node
                    .attr("x", function (d, i) {
                      var x; (i + 1) == 1 ? x = x_node_1 : (i + 1) == 2 ? x = x_node_2 : x = x_node_3;
                      return x;
                    })
                    .attr("y", function (d, i) {
                      var y; (i + 1) == 1 ? y = y_node_1 : (i + 1) == 2 ? y = y_node_2 : y = y_node_3;
                      console.log("i " + i + "d.x " + d.x + "d.y" + d.y);
                      return y;
                    });/**/
        }/**/

        /******************************
        Sidebar - End
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

export default DetalleDos;