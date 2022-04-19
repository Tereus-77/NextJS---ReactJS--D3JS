import React, { Component } from "react";
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import FooterGuia from "../components/FooterGuia";
import { breadcrumb, headerCornerLogo, gradients } from "../../functions/headerMenu";
import * as etapa from "../../functions/etapas";
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "../../functions/referenceSize";
import Link from "next/link";
import * as d3 from 'd3';
import { getSideBarEtapas, getTimeOut, getSideBarLines, getDurationAnim } from "../../functions/sideBar";
import { setHtmlText, setHtmlTextLink } from "../../functions/htmlText";
import { OpenGraph, MetaData } from "../../functions/metaTags";

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

    //gradient rect
    gradientRect(svg, x, y, w, h, rx, ry, id, border, bg) {
        if (window.innerHeight > window.innerWidth) {
            var width = window.innerWidth
            var height = (941 / 1920) * window.innerWidth
        } else {
            var width = window.innerWidth
            var height = window.innerHeight
        }
        /*var svgDefs = svg.append('defs');
        var mainGradient = svgDefs.append('linearGradient')
            .attr('id', 'mainGradient');

        mainGradient.append('stop')
            .attr('class', 'sen-stop-left')
            .attr('offset', '0')

        mainGradient.append('stop')
            .attr('class', 'sen-stop-right')
            .attr('offset', '1');/**/

        svg.append('rect')
            //.classed('outlined', true)
            .attr('stroke', border) //bgLinGradA
            .attr('stroke-width', height / 250)
            .attr("fill", "none")
            .attr('x', x)
            .attr('y', y)
            .attr('width', w)
            .attr('height', h)
            .attr("rx", rx)								// radius
            .attr("ry", ry)/**/

        svg.append('rect')
            .attr("id", id)
            .attr('fill', bg) //bgLinGradA
            //.attr("fill", "white")
            .attr('x', x)
            .attr('y', y)
            .attr('width', w)
            .attr('height', h)
            .attr("rx", rx)								// radius
            .attr("ry", ry);
    }

    main = (element) => {
        // Obtiene el tamaño de la pantalla en uso
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Calcula el height adecuado para mantener el aspect ratio frente a cualquier resolución
        // En base a una resolución de pantalla de W:1920 H:1080
        const refWidth = 1920;
        const refHeight = 941;
        const specialHeight = 2600;
        const heightCorrected = Math.round((refHeight * width) / refWidth);
        //const heightCorrected = Math.round(width/aspectRatio);
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

        /****************************************
         Contenido de etapas - begin
        ****************************************/
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
        var arcSegmentEtapasDescription = [
            ['Identificación y formulación de necesidades de aprovisionamiento de productos y servicios, desde la experiencia de distintas áreas de la compañía.'],
            ['Formalización de las condiciones administrativas, operacionales, técnicas y de gestión de comportamientos éticos; de probidad y transparencia asociados al requerimiento de producto/servicio para la licitación a proveedores.'],
            ['Identificación de perfiles y tipos de proveedores posibles para satisfacer los requerimientos del pedido del producto/servicio y que puedan ser invitados a la licitación y/o contrato directo.'],
            ['Formalización de los tiempos, presupuesto, condiciones, requerimientos técnicos, procesos administrativos y de gestión que regirán la prestación o ejecución del producto o servicio.'],
            ['Proceso de ejecución material del servicio o producto contratado y de las etapas administrativas asociadas a la ejecución definida en el documento.'],
            ['Proceso de recepción formal del servicio o producto ejecutado en función de los tiempos y requerimientos definidos.'],
            ['Recepción de facturas de acuerdo a los plazos y modalidades de pago establecidos.'],
            ['Verificación de conformidad del cumplimiento de las especificaciones del producto y servicio, así como los aspectos administrativos asociados.'],
            ['Pago de productos y servicios contratados.'],
            ['Etapa que promueve la identificación de aprendizajes y deltas de mejoras asociadas a la experiencia de aprovisionamiento.'],
        ];
        var arcSegmentEtapasRolMandante = [
            ['Define la necesidad en función de sus objetivos y  procedimientos de la compañía ya sea a nivel de productos o servicios, identificando los aspectos claves de la gestión'],
            ['Formaliza de acuerdo a sus procedimientos internos las necesidades detectadas, cuidando que éstas respeten la legislación, las políticas de la compañía, los impactos ASG asociados, los estándares y  en sus distintos niveles de aplicación: proveedores,  productos y servicios'],
            ['En función de las necesidades formalizadas y la formulación de  requerimientos acordes a las necesidades y políticas de la compañía, identifica en base a su experiencia y mirada del mercado, perfiles de proveedores potenciales a participar en la licitación y/o contrato directo'],
            ['Define y formaliza los requerimientos específicos del producto o servicio adjudicado, considerando los aspectos del cumplimiento de la legalidad existente en torno a consideraciones relativas a: ética/probidad y resolución de conflictos,  aspectos sociales, de DD.HH., laborales y ambientales'],
            ['Acuerda metodologías de trabajo en conjunto con el proveedor para analizar los procesos en la búsqueda de oportunidades y prevención de riesgos asociados al proyecto, así como el monitoreo de  los impactos ambientales, sociales y de gobernanza'],
            ['Dado el trabajo conjunto, coordinado y eficiente con el proveedor, la entrega se desarrolla de manera fluida de acuerdo a los requerimientos formales del contrato'],
            ['Entrega de Orden de Compra (OC) y Hoja Entrada Servicios (HES), en conjunto con las instrucciones y canales necesarias para que el proveedor pueda facturar de manera fluída, incluyendo los contactos para hacer seguimiento a la factura y el pago'],
            ['El encargado del proyecto, mediante firma, valida la recepción conforme del trabajo realizado, quedando de esta manera autorizado el pago frente a posibles otras firmas administrativas, que requieran acompañar la firma del jefe de proyecto'],
            ['Verificación  del pago efectivo al proveedor'],
            ['Revisar en conjunto con el proveedor dinámicas de trabajo compartido, a fin de identificar los aprendizajes obtenidos, identificando aspectos de mejora contínua para ambas partes'],
        ];
        var arcSegmentEtapasRolProveedor = [
            ['Identificar las distintas oportunidades y canales de contacto digitales y presenciales necesarios para posicionarse como una alternativa posible'],
            ['Optimiza la definición de sus productos y servicios, tanto a nivel técnico como comunicacional con el fin de potenciar su perfil de proveedor'],
            ['Realiza las gestiones necesarias para estar vigente como una alternativa frente a las necesidades del mandante'],
            ['Gestiona el conjunto de documentaciones necesarias para responder a los aspectos formales del contrato y de  cumplimiento legal relativo a temáticas laborales, de DD.HH., trabajo infantil, trabajo esclavo y libertad de asociación'],
            ['Ejecuta los aspectos operativos del servicio/producto, identificando los aspectos claves del requerimiento del mandante, a fin de enriquecer de manera proactiva la necesidad de su cliente, yendo más alla del requerimiento abordándolo desde una actitud de mejora contínua'],
            ['Entrega valor la impecabilidad del cumplimiento contractual del servicio/producto contratado, tanto a nivel formal como técnico'],
            ['Antes del envío de factura, verificar que ésta corresponda al detalle de lo definido en la OC. Entender el procedimiento de pago de factura: contactos, mecanismos y procedimientos utilizados para el pago con el que cuenta la empresa. Procurar envío oportuno de la factura. '],
            ['Valida con el jefe de proyecto la firma de verificación de factura y en base a sus conocimiento de los procedimientos de la empresa, inicia el seguimiento de ésta'],
            ['Recibe el pago a conformidad'],
            ['Revisar en conjunto con el proveedor dinámicas de trabajo compartido, a fin de identificar los aprendizajes obtenidos, identificando aspectos de mejora contínua para ambas partes'],
        ];
        var arcSegmentEtapasRolCompartido = [
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['Revisar en conjunto con el proveedor dinámicas de trabajo compartido, a fin de identificar los aprendizajes obtenidos, identificando aspectos de mejora contínua para ambas partes.'],
        ];
        var arcSegmentEtapasRiesgoAsociado = [
            ['Ausencia en la definición clara de la necesidad, a partir de variables y requisitos que permitan prevenir riesgos e impactos negativos en los ámbitos ambientales, sociales o de gobernanza'],
            ['Formulación de pedido sin considerar cómo el proveedor recibe y entiende la necesidad de la compañía. Desconocimiento de las capacidades de autonomía, tiempos de respuesta, innovación y reacción ante imprevistos por parte del proveedor. Incurrir en la mala práctica de invisibilizar al proveedor como contraparte activa del proyecto'],
            ['Deficiente identificación del perfil del proveedor que impacta en la viabilidad, eficiencia, oportunidad, costos y tiempos del  proyecto. Incurrir en malas prácticas de: a. No considerar a proveedores locales.  b. Considerar el precio como criterio clave de elección más alla de los estándares del proveedor'],
            ['Inicio del proyecto sin firma del contrato corriendo el riesgo de que el proveedor no cubra los requerimientos de cumplimiento de la legalidad vigente. Por una parte el proveedor queda sujeto a las condiciones que le imponga el contrato que se firmaría posteriormente al inicio del proyecto. Por otra parte, se corre el riesgo de que el proveedor no esté de acuerdo con el contrato y abandone el proyecto. Incurrir en malas prácticas: cambio de las  condiciones del proyecto ya  en desarrollo'],
            ['Definición de una relación unidireccional, donde el mandante define y el proveedor acata. Se consideran malas prácticas: malos entendidos, descoordinaciones, ausencia de espacios de innovación perdiendo oportunidades y optimización de recursos, tiempos y potenciamiento de riesgos de ejecución y financieros '],
            ['La ausencia de relación Mandante - Proveedor impacta en la consecución de resultados no deseados, los que generan costos en plazos, calidad, oportunidad de la satisfacción de necesidades y presupuesto'],
            ['Generación de demoras en el proceso de pago que implique esté fuera de los plazos que establece la normativa. Incurrir en malas prácticas de búsqueda de resquícios que demoren el pago'],
            ['Existencia de situaciones que deterioran la relación construida con el proveedor. A saber: demoras en la emisión del HES, facturas mal emitidas, retrasos en firmas adicionales al jefe de proyecto'],
            ['Atrasos relativos al pago. Incurrir en malas prácticas de demora en el pago por falta de claridad en requerimientos administrativos a cumplir por el proveedor'],
            ['No identificación de aprendizajes, posibilidades de innovación y mejora contínua. Incurrir en malas prácticas delimitar el desarrollo conjunto de la empresa y el proveedor'],

        ];
        var arcSegmentEtapasOportunidadGestionMandante = [
            ['Contar con un cuerpo de conocimiento sistematizado que permita seleccionar proveedores, estructurar la necesidad a partir de las variables y destrezas claves para el proyecto, considerando las normativas, políticas de la compañía, código de ética,  tiempos de respuesta y consideraciones respecto de tamaño y localización geográfica del proveedor, entre otros'],
            ['Definir proyectos que posibiliten la optimización de los resultados a obtener en términos de la proactividad, tiempos de respuesta, innovación y rendimiento financiero  '],
            ['Trabajar con proveedores en modalidad de equipo que posibiliten la integración de nuevos puntos de vista para la optimización de los resultados, proactividad, innovación y mejores rendimientos financieros '],
            ['Construcción de las bases de relación y vínculo positivo entre el mandante y el proveedor. Definición de espacios de coordinación de expectativas, canales de comunicación, oportunidades, prevención y optimización del proyecto. Definición de procesos de mediación y resolución de conflictos.'],
            ['Generar eficiencia operacional a partir de una relación de beneficio mutuo con el proveedor en donde la innovación, la flexibilidad y los aprendizajes mutuos permiten un impacto positivo a nivel financiero'],
            ['Generación de un cierre de proyecto de manera eficiente que fortalezca la relación entre mandante y proveedor'],
            ['Generación de un cierre de proyecto de manera eficiente que fortalezca la relación entre mandante y proveedor'],
            ['Mantener y consolidar la relación con el proveedor siguiendo el proyecto hasta el momento del pago, como un aspecto importante dentro del cierre'],
            ['Seguimientos de facturas/pagos como acciones que propicien un pago oportuno'],
            ['Generación de un enfoque de gestión basado en la mejora contínua que produzca impactos positivos en la optimización de los procesos y en la gestión de los recursos de manera eficiente, innovadora, con una visión de largo plazo. Esto permitirá establecer mecanismos que faciliten la revisión de procesos y su correcto cumplimiento'],
        ];

        var arcSegmentEtapasOportunidadGestionProveedor = [
            ['Se enfoca en fortalecer su elegibilidad como proveedor, optimizando sus  procesos, el tratamiento de sus riesgos e impactos. Esto genera una oferta de valor estratégica para el potencial proveedor'],
            ['Generación de aprendizajes técnicos y de gestión, evolución y desarrollo como empresa, además de sensibilización frente a las necesidades del mandante'],
            ['Establecimiento de relación de equipos, que potencien el acceso a aprendizajes de la gran empresa, que impacten en la estrategia, crecimiento, innovación y productividad del proveedor'],
            ['Construcción de las bases de relación y vínculo positivo entre el mandante y el proveedor. Definición de espacios de coordinación de expectativas, canales de comunicación, oportunidades, prevención y optimización del proyecto. Definición de procesos de mediación y resolución de conflictos.'],
            ['El trabajo conjunto y proactivo con el mandante permite al proveedor adquirir y profundizar conocimientos y aprendizajes, accediendo a experiencias de calidad que contribuyen al desarrollo de su negocio, aportando a su reputación'],
            ['El trabajo conjunto y proactivo con el mandante permite al proveedor adquirir y profundizar conocimientos y aprendizajes, accediendo a experiencias de calidad que contribuyen al desarrollo de su negocio, aportando a su reputación'],
            ['Cerrar positivamente el proyecto, tanto a nivel de aspectos ejecucionales como administrativos, fortaleciendo la relación con el mandante y una validación positiva mutua '],
            ['Considerar los aspectos de facturación, verificación y pago como parte del proyecto, desarrollando una actitud proactiva frente al mandante en términos de los procedimientos necesarios y el pago'],
            ['Recibir pago en los tiempos acordados'],
            ['Consolidar los aprendizajes obtenidos identificando aspectos de mejora tanto a nivel de sus procesos administrativos, de su relación con clientes y de la ejecución de tarea. Todo lo anterior a fin de tomar acciones que permitan fortalecer su desarrollo y crecimiento como empresa '],
        ];

        var arcSegmentEtapasOportunidadGestionCompartido = [
            ['-'],
            ['-'],
            ['-'],
            ['Construcción de las bases de relación y vínculo positivo entre el mandante y el proveedor. Definición de espacios de coordinación de expectativas, canales de comunicación, oportunidades, prevención y optimización del proyecto. Definición de procesos de mediación y resolución de conflictos.'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
        ];

        var arcSegmentEtapasKPISugerido = [
            ['100% de formalización de necesidades considerando destrezas claves para el proyecto, tomando en cuenta las normativas, políticas de la compañía, código de ética,  tiempos de respuesta y detalles respecto de tamaño y localización geográfica del proveedor, entre otros'],
            ['El 100% de los trabajadores involucrados en la gestión del proyecto, deben tener sus leyes sociales y contratos al día'],
            ['Verificar al 100% potenciales proveedores de leyes sociales, remuneraciones y contratos en regla. Incorporar la variable de equidad de género. Determinar incidencia de la medición de huella de carbono y código de ética en proveedores.'],
            ['100% de proveedores con orden de compra  o contrato firmado al inicio de la ejecución del servicio o producto'],
            ['Definición de formatos de registro que den cuenta de las distintas instancias de la relación con el proveedor, a fin de construir trazabilidad de los procesos para poder comparar experiencias y desempeños'],
            ['Definición de formatos de registro que den cuenta de las distintas instancias de la relación con el proveedor, a fin de construir trazabilidad de los procesos para poder comparar experiencias y desempeños'],
            ['Definición de plazo a cumplir entre recepción y verificación de factura'],
            ['Definición de plazo a cumplir entre recepción y verificación de factura'],
            ['100% de pago a 30 días'],
            ['100% de proyectos con instancias de cierre, formalización de aprendizajes y aspectos de mejora'],
        ];
        var arcSegmentEtapasIndicadorGRI = [
            ['102-9. Cadena de suministro'],
            ['-'],
            ['<ul><li>204-1. Proporción de gasto en proveedores locales</li><li>308 - 1. Nuevos proveedores que han pasado filtros de evaluación y selección de acuerdo con los criterios ambientales</li><li>407 - 1. Operaciones y proveedores cuyo derecho a la libertad de asociación y negociación colectiva podría estar en riesgo</li><li>408 - 1. Operaciones y proveedores con riesgo significativo de casos de trabajo infantil</li><li>409 - 1. Operaciones y proveedores con riesgo significativo de casos de trabajo forzoso u obligatorio</li><li>412 - 1. Operaciones sometidas a revisiones o evaluaciones de impacto sobre los derechos humanos</li><li>414-1. Nuevos proveedores que han pasado filtros de selección de acuerdo con los criterios sociales</li></ul>'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
        ];
        var arcSegmentEtapasIndicadorGRIDescripcion = [
            ['Descripción de la cadena de suministros de la organización, incluidos los elementos principales relacionados con las actividades, marcas principales, productos y servicios de la organización'],
            ['-'],
            ['<ul><li>a. Porcentaje de nuevos proveedores evaluados y seleccionados de acuerdo con los criterios ambientales</li><li>a. Las operaciones y los proveedores en los que los derechos de los trabajadores a ejercer la libertad de asociación y la negociación colectiva puedan infringirse o corran riesgo significativo en cuanto a alguno de los siguientes puntos: el tipo de operación (como una planta de fabricación) y el proveedor: los países o las áreas geográficas con operaciones y proveedores que se considere que están en riesgo.</li><li>b. Las medidas adoptadas por la organización en el período objeto del informe y dirigidas a apoyar el derecho a ejercer la libertad de asociación y negociación colectiva.</li><li>a. Operaciones y proveedores que se ha considerado que corren un riesgo significativo de presentar casos de: trabajo infantil, trabajadores jóvenes expuestos a trabajo peligroso.</li><li>b. Operaciones y proveedores que corran un riesgo significativo de presentar casos de trabajo infantil en cuanto a: tipo de operación(como una planta de fabricación) y proveedor; países o áreas geográficas con operaciones y proveedores que se considere que están en riesgo.</li><li>c. Las medidas adoptadas por la organización en el período objeto del informe y que tengan por objeto contribuir con la abolición del trabajo infantil.</li><li>a. Operaciones y proveedores que corran un riesgo significativo de presentar casos de trabajo forzoso u obligatorio en cuanto a: tipo de operación (como una planta de fabricación) y proveedor; países o áreas geográficas con operaciones y proveedores que se considere que están en riesgo. </li><li>b. Las medidas adoptadas por la organización en el período objetivo del informe y que tengan como finalidad contribuir a la abolición de todas las formas de trabajo forzoso u obligatorio.</li><li>a. Número total y el porcentaje de las operaciones sometidas a evaluación de derechos humanos, o evaluaciones del impacto en los derechos humanos por país</li></ul>'],
            ['a. Porcentaje de nuevos proveedores evaluados y seleccionados de acuerdo con los criterios sociales'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
            ['-'],
        ];

        const conenidoEtapasRol = [];
        conenidoEtapasRol['arcSegmentEtapasDescription'] = arcSegmentEtapasDescription;
        conenidoEtapasRol['arcSegmentEtapasRolMandante'] = arcSegmentEtapasRolMandante;
        conenidoEtapasRol['arcSegmentEtapasRolProveedor'] = arcSegmentEtapasRolProveedor;
        conenidoEtapasRol['arcSegmentEtapasRolCompartido'] = arcSegmentEtapasRolCompartido;
        conenidoEtapasRol['arcSegmentEtapasRiesgoAsociado'] = arcSegmentEtapasRiesgoAsociado;
        conenidoEtapasRol['arcSegmentEtapasOportunidadGestionMandante'] = arcSegmentEtapasOportunidadGestionMandante;
        conenidoEtapasRol['arcSegmentEtapasOportunidadGestionProveedor'] = arcSegmentEtapasOportunidadGestionProveedor;
        conenidoEtapasRol['arcSegmentEtapasOportunidadGestionCompartido'] = arcSegmentEtapasOportunidadGestionCompartido;
        conenidoEtapasRol['arcSegmentEtapasKPISugerido'] = arcSegmentEtapasKPISugerido;
        conenidoEtapasRol['arcSegmentEtapasIndicadorGRI'] = arcSegmentEtapasIndicadorGRI;
        conenidoEtapasRol['arcSegmentEtapasIndicadorGRIDescripcion'] = arcSegmentEtapasIndicadorGRIDescripcion;

        /****************************************
         Contenido de etapas - end
        ****************************************/

        // Estados
        var selectedRol = 0;
        var etepaClickeada = window.location.hash.substring(1);
        var selectedEtapa = 0;
        if (etepaClickeada.length > 0)
            selectedEtapa = etepaClickeada - 1;

        /*****************************************
         Posicionamiento y tamaño relativo - Begin
        *****************************************/

        const radio_big = rp(20, 'x', width, height);
        const radio = rp(40, 'x', width, height);
        const radio_small = rp(20, 'x', width, height);

        const translatex = width - width * 0.35;
        const translatey = height * 0.45;
        const translatex_e = rp(1200, 'x', width, height);
        const translatey_e = rp(195, 'y', width, height);
        const widthEtapas = width - (width * 0.1);
        const heightEtapas = height - (height * 0.1);
        //const etapas = d3.select("#container").append("svg").attr("width", widthEtapas).attr("height", heightEtapas);

        // Posición y tamaño etapas "caracol"
        var outerRadius = rp(50, 'x', width, height);//110;
        var innerRadius = rp(100, 'x', width, height);//100;
        var arcPad = 0.05223;
        var startAngle = 0;
        var arcLen = 0.44857; //0.47097
        var endAngle = 0.44857;


        // Posición y tamaño de línea
        let line_one_stroke_width = rp(10, 'x', width, height);
        const line_one = 'M161.003,394.672C184.333,394.672 147.704,394.672 211.003,394.672C229.105,394.672 258.415,280.672 276.517,280.672L1041.13,280.672C1043.27,280.672 1062.85,279.932 1067.84,281.978C1087.81,290.159 1103.01,304.445 1114.57,310.712C1122.9,315.226 1135,324.014 1135,335.672C1135,391.363 1171.96,415.672 1207.97,415.672L1380.03,415.672';

        // Posiciones y tamaño de recuadro de contenido
        var paso_m = 65;
        let paso_m_t = paso;

        // Posición y tamaño de fondo del "contenido" de la matriz de etapas
        //console.log("x_bg_matriz = rp(320, 'x', width, height)" + rp(320, 'x', width, height));
        let x_bg_matriz = rp(475, 'x', width, height); //width/6
        let y_bg_matriz = rp(250, 'y', width, height);
        let width_bg_matriz = rp(768, 'x', width, height); //width/6
        let height_bg_matriz = rp(455, 'y', width, height);
        const contenido_delta = rp(60, 'y', width, height);

        let margen_h = 30;
        let margen_v = 60;

        let pos_m_x = x_bg_matriz + rp(margen_h, 'x', width, height); //350
        let pos_m_y = y_bg_matriz + rp(margen_v, 'x', width, height); //200
        let delta_m_y = rp(20, 'y', width, height); // entre líneas
        let delta_m_v = rp(70, 'y', width, height); // entre párrafos
        let opacity_m = 0;

        // estapasContentFO
        const contentFontSize = rp(18, 'x', width, height);
        const content_w = width_bg_matriz - (2 * margen_h);

        let contentEtapaMandante_h = [];
        contentEtapaMandante_h[0] = rp(1090, 'x', width, height);
        contentEtapaMandante_h[1] = rp(810, 'x', width, height);
        contentEtapaMandante_h[2] = rp(2040, 'x', width, height);
        contentEtapaMandante_h[3] = rp(1040, 'x', width, height);
        contentEtapaMandante_h[4] = rp(860, 'x', width, height);
        contentEtapaMandante_h[5] = rp(740, 'x', width, height);
        contentEtapaMandante_h[6] = rp(710, 'x', width, height);
        contentEtapaMandante_h[7] = rp(710, 'x', width, height);
        contentEtapaMandante_h[8] = rp(600, 'x', width, height);
        contentEtapaMandante_h[9] = rp(800, 'x', width, height);

        let contentEtapaProveedor_h = [];
        contentEtapaProveedor_h[0] = rp(1050, 'x', width, height);
        contentEtapaProveedor_h[1] = rp(760, 'x', width, height);
        contentEtapaProveedor_h[2] = rp(2040, 'x', width, height);
        contentEtapaProveedor_h[3] = rp(1000, 'x', width, height);
        contentEtapaProveedor_h[4] = rp(870, 'x', width, height);
        contentEtapaProveedor_h[5] = rp(750, 'x', width, height);
        contentEtapaProveedor_h[6] = rp(730, 'x', width, height);
        contentEtapaProveedor_h[7] = rp(710, 'x', width, height);
        contentEtapaProveedor_h[8] = rp(600, 'x', width, height);
        contentEtapaProveedor_h[9] = rp(750, 'x', width, height);

        let contentEtapaCompartido_h = [];
        contentEtapaCompartido_h[0] = rp(750, 'x', width, height);
        contentEtapaCompartido_h[1] = rp(490, 'x', width, height);
        contentEtapaCompartido_h[2] = rp(1750, 'x', width, height);
        contentEtapaCompartido_h[3] = rp(855, 'x', width, height);
        contentEtapaCompartido_h[4] = rp(510, 'x', width, height);
        contentEtapaCompartido_h[5] = rp(470, 'x', width, height);
        contentEtapaCompartido_h[6] = rp(400, 'x', width, height);
        contentEtapaCompartido_h[7] = rp(420, 'x', width, height);
        contentEtapaCompartido_h[8] = rp(380, 'x', width, height);
        contentEtapaCompartido_h[9] = rp(580, 'x', width, height);

        let contentEtapaTodos_h = [];
        contentEtapaTodos_h[0] = rp(1380, 'x', width, height);
        contentEtapaTodos_h[1] = rp(1080, 'x', width, height);
        contentEtapaTodos_h[2] = rp(2330, 'x', width, height);
        contentEtapaTodos_h[3] = rp(1375, 'x', width, height);
        contentEtapaTodos_h[4] = rp(1180, 'x', width, height);
        contentEtapaTodos_h[5] = rp(1030, 'x', width, height);
        contentEtapaTodos_h[6] = rp(1030, 'x', width, height);
        contentEtapaTodos_h[7] = rp(1000, 'x', width, height);
        contentEtapaTodos_h[8] = rp(810, 'x', width, height);
        contentEtapaTodos_h[9] = rp(1180, 'x', width, height);

        // Posición y tamaño de fondos de titulos de etapas "titulo" "fondo"
        const menu_circle_selected_delta = rp(110, 'x', width, height);
        var x_bg_titulo = x_bg_matriz;
        var y_bg_titulo = y_bg_matriz - rp(60, 'x', width, height);
        var w_bg_titulo = width_bg_matriz;
        var h_bg_titulo = rp(60, 'x', width, height);
        const fontSizeTitle = rp(25, 'x', width, height);
        const fontSizeContent = rp(15, 'x', width, height);

        // Renderiza círculos del menú "cuncuna"
        const menu_circle_selected_x = x_bg_titulo - rp(85, 'x', width, height);
        const menu_circle_selected_y = y_bg_titulo + rp(30, 'x', width, height);
        const menu_circle_text_selected_x = x_bg_titulo - rp(108, 'x', width, height);
        const menu_circle_text_selected_y = y_bg_titulo + rp(40, 'x', width, height);
        const menu_circle_text_selected_size = rp(45, 'x', width, height);
        const menu_circle_text_size = rp(40, 'x', width, height);
        const outerRadius2 = x_bg_matriz - rp(360, 'x', width, height);
        const y_circleMenu = y_bg_matriz + contenido_delta + rp(30, 'y', width, height); //height_bg_matriz + rp(90, 'y', width, height);
        const menu_circle_radio_n = rp(45, 'x', width, height);
        const menu_circle_radio_h = rp(50, 'x', width, height);
        const menu_circle_paso = rp(75, 'x', width, height);
        const dx_two_numbers = rp(0, 'x', width, height) + "px";
        const dx_one_number = rp(13, 'x', width, height) + "px";
        const animacionCircleDuration = 900;

        var circle_text_size = menu_circle_text_size;
        var circle_pos_y = y_circleMenu;
        var circle_pos_x = menu_circle_selected_x;
        var circle_text_x = menu_circle_text_selected_x;
        var circle_text_y = menu_circle_text_selected_y;
        var dx = dx_one_number;


        // Posición y tamaño de textos de titulos de etapas
        var paso = rp(65, 'x', width, height);
        let paso_t = paso;
        let pos_x = pos_m_x;
        let pos_y = y_bg_matriz - rp(75, 'y', width, height);
        let delta_y = 15;
        let delta_v = 150;

        // Posición y tamaño selección de rol
        let sel_stroke_width = rp(2, 'x', width, height);
        let sel_x = rp(1290, 'x', width, height);
        let sel_y = y_bg_titulo + rp(120, 'x', width, height);//rp(228, 'y', width, height);
        let delta_text_x = rp(25, 'x', width, height);
        let delta_text_y = rp(25, 'y', width, height);
        let sel_selected_width = rp(150, 'y', width, height);
        let sel_selected_height = rp(50, 'y', width, height);
        let sel_w = sel_selected_width;
        let sel_h = sel_selected_height * 4;
        let selectorPos = [sel_y, sel_y + sel_selected_height, sel_y + (sel_selected_height * 2), sel_y + (sel_selected_height * 3)];
        let textRol = ['Mandante', 'Proveedor', 'Compartido', 'Todos'];
        let colorRol = ['#9E6F9E', '#B3BABD', '#D9E021', 'url(#bgLinGradB)']; // mandante, compartido, proveedor, 
        let gradientRol = ['bgLinGradMandante', 'bgLinGradCompartido', 'bgLinGradProveedor', 'bgLinGradTodos']; // mandante, compartido, proveedor, 
        const bulletMarginTop = rp(5, 'x', width, height);

        // Posición y tamaño de título de página "tool tip"
        const x_pageTitleBg = rp(548.5, 'x', width, height);
        const y_pageTitleBg = rp(10, 'x', width, height);
        const w_pageTitleBg = rp(1150, 'x', width, height);
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

        var duracionAnimacionSelector = 500;


        /****************************************
         Posicionamiento y tamaño relativo - End
        ****************************************/



        /*****************************************
         Renderiza línea - Begin
        ******************************************/
        //const curve = d3.line().curve(d3.curveNatural);
        //const points = [[50, 330], [85, 329], [126, 234], [164, 153], [195, 151], [287, 153]];
        //const points_test = [[200, 281], [389, 279], [445, 230], [500, 100], [520, 60], [540, 56]];



        /* svg.append('path')
             //.attr('d', curve(points)) //MX Y L R
             .attr('d', line_one) //MX Y L R
             .attr("transform", "translate(" + rp(40, 'y', width, height) + "," + rp(-120, 'y', width, height) + "), scale(" + rp(1, 'x', width, height) + ")")
             .attr('stroke', "#495057")
             .attr('stroke-width', line_one_stroke_width)
             .attr('fill', 'none')
             .attr("stroke-dasharray", rp(10, 'x', width, height) + "," + rp(10, 'x', width, height));/**/

        /*svg.append("g")
            .attr("transform", "translate(" + translatex + "," + translatey + ")")
            .selectAll("triangles")
            .enter().append("path")
            .attr("d", "M 0 " + (-rp(87.73, 'x', width, height)) + " L " + ((-width/40) + 10) + " " + (-1 * height/50) + "L " + ((width/40) - 10) + " " + (-1 * height/50) + " Z")
            .style("fill", "#495057");*/

        /*****************************************
         Renderiza línea - End
        ******************************************/

        /*******************************************************
         Renderiza contenidos de la matriz de las etapas - Begin
        ******************************************************/
        // recuadro de contenido
        this.shadow(svg, x_bg_matriz, y_bg_matriz + contenido_delta, width_bg_matriz, contentEtapaMandante_h[0], radio, radio, 'contentRectShadow');
        //gradientRect(svg, x, y, w, h,rx,ry)
        //this.gradientRect(svg, x_bg_matriz, y_bg_matriz + contenido_delta, width_bg_matriz, height_bg_matriz, height/110, height/110, 'contentRect', 'none', 'none');


        // Renderiza fondo de titulos de etapas y Anima fondo de titulo de contenido de etapas
        svg.append('rect')
            .attr('id', 'estapasTitleBackground')
            .style("fill", arcSegmentEtapasColor[selectedEtapa])
            .style('stroke', "url(#bgLinGradB)")
            .attr('stroke-width', rp(2, 'x', width, height))
            .attr('opacity', 0.8)
            .attr('x', x_bg_titulo)
            .attr('y', y_bg_titulo)
            .attr('rx', radio_small)
            .attr('ry', radio_small)
            .attr("width", w_bg_titulo)
            .attr("height", h_bg_titulo);

        selectedRol = 3;

        // Renderiza textos de titulos de etapas en los circulos
        svg.append("g")
            .attr('id', 'estapasTitle')
            .attr('opacity', 1)
            .append("foreignObject")
            .attr('id', 'estapasTitleFO')
            .attr('x', pos_x)
            .attr('y', pos_y)
            .attr("width", content_w)
            .attr("height", rp(width_bg_matriz, 'x', width, height))
            .html(function (d) {
                return '<div style="font-family:Oswald;color:#ffffff"><p align="justify">' + arcSegmentEtapasLabel[0] + '</p></div>'
            })
            .attr("font-size", fontSizeTitle);

        d3.select('#contentRectShadow')
            .attr("height", contentEtapaMandante_h[0])
            .attr("font-size", contentFontSize)
            /*.transition()
            .delay(duracionAnimacionSelector)
            .attr("height", contentEtapaProveedor_h[0]) 
            .transition()
            .delay(duracionAnimacionSelector)
            .attr("height", contentEtapaCompartido_h[0])*/
            .transition()
            .delay(duracionAnimacionSelector)
            .attr("height", contentEtapaTodos_h[0]);

        // Renderiza textos del contenido de etapas
        svg.append("g")
            .attr('id', 'estapasContent')
            .attr('opacity', 1)
            .append("foreignObject")
            .attr('id', 'estapasContentFO')
            .attr('x', pos_x)
            .attr('y', pos_m_y)
            .attr("width", content_w)
            .attr("height", contentEtapaMandante_h[0])
            .attr("font-size", contentFontSize)

            .transition()
            .delay(duracionAnimacionSelector)
            .attr("height", contentEtapaTodos_h[0]);

        console.log('selectedEtapa' + selectedEtapa);
        etapa.toggleEtapasTextosMatrizC(1, conenidoEtapasRol, selectedEtapa, selectedRol, colorRol, bulletMarginTop, rp(28, 'x', width, height));
        etapa.toggleEtapasTextosMatrizB(1, selectedEtapa, selectedRol, arcSegmentEtapasLabel);




        /******************************************************
        Renderiza contenidos de la matriz de las etapas - End
        ******************************************************/

        /*******************************************
        Recorre y renderiza etapas "caracol" - Begin
        ********************************************/
        var circle_pos_y = y_circleMenu;
        var movingCircleRegreso = 0;
        for (var e = 0; e < 10; e++) {

            var id = "segment" + e + 1;
            var circle_pos_x = x_bg_matriz - outerRadius2;
            var arcSegment = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(startAngle)     // It's in radian, so Pi = 3.14 = bottom.
                .endAngle(endAngle);        // 2*Pi = 6.28 = top
            const [x, y] = arcSegment.centroid(arcSegment);
            svg.append("path")
                .attr("id", id)
                .attr("transform", "translate(" + translatex_e + "," + translatey_e + ") scale(" + rp(1, 'x', width, height) + ")")
                .attr("d", arcSegmentEtapas[e])
                .attr('stroke', arcSegmentEtapasColor[e]).attr('fill', arcSegmentEtapasColor[e])
                .style("cursor", "pointer")
                .on('mouseover', function (d, i) {
                    movingCircleRegreso = d3.select('#circle' + e).attr('regreso');
                    // hace transparente la etapa bajo el cursos
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('opacity', 0.7);

                    etapa.mouseOverOut(e, 1, movingCircleRegreso, menu_circle_radio_h, menu_circle_radio_n, arcSegmentEtapasLabel);
                    etapa.toggleEtapasTextosMatrizB(1, selectedEtapa, selectedRol, arcSegmentEtapasLabel);

                })
                .on('mouseout', function (d, i) {
                    movingCircleRegreso = d3.select('#circle' + e).attr('regreso');
                    //var movingCircleY = d3.select('#circle' + e + 'm').attr('cy');
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('opacity', 1);

                    etapa.mouseOverOut(e, 0, movingCircleRegreso, menu_circle_radio_h, menu_circle_radio_n, arcSegmentEtapasLabel);
                    etapa.toggleEtapasTextosMatrizB(1, selectedEtapa, selectedRol, arcSegmentEtapasLabel);

                })
                .on('click', function (d, i) {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('opacity', 1);

                    selectedEtapa = e;

                    circle_pos_y = y_bg_matriz + contenido_delta + rp(30, 'x', width, height);
                    circle_text_y = y_bg_matriz + contenido_delta + rp(40, 'x', width, height);
                    circle_pos_x = menu_circle_selected_x;

                    etapa.etapaClick(e, circle_pos_y, circle_text_x, circle_text_y, menu_circle_paso,
                        dx_one_number, dx_two_numbers, animacionCircleDuration, menu_circle_radio_n, menu_circle_radio_h,
                        menu_circle_selected_x, menu_circle_selected_y, menu_circle_text_selected_y, menu_circle_text_size);
                    etapa.etapaClickColor(arcSegmentEtapasColor, selectedEtapa);
                    etapa.toggleEtapasTextosMatrizB(1, selectedEtapa, selectedRol, arcSegmentEtapasLabel);
                    etapa.toggleEtapasTextosMatrizC(1, conenidoEtapasRol, selectedEtapa, selectedRol, colorRol, bulletMarginTop, rp(28, 'x', width, height));

                    switch (selectedRol) {
                        case 0:
                            etapa.changeHeight('contentRectShadow', contentEtapaMandante_h[e]);
                            etapa.changeHeight('estapasContentFO', contentEtapaMandante_h[e]);
                            break;
                        case 1:
                            etapa.changeHeight('contentRectShadow', contentEtapaProveedor_h[e]);
                            etapa.changeHeight('estapasContentFO', contentEtapaProveedor_h[e]);
                            break;
                        case 2:
                            etapa.changeHeight('contentRectShadow', contentEtapaCompartido_h[e]);
                            etapa.changeHeight('estapasContentFO', contentEtapaCompartido_h[e]);
                            break;
                        case 3:
                            etapa.changeHeight('contentRectShadow', contentEtapaTodos_h[e]);
                            etapa.changeHeight('estapasContentFO', contentEtapaTodos_h[e]);
                            break;
                    }
                    console.log('SelecteedRol ' + selectedRol);


                });
            startAngle = startAngle + arcLen + arcPad;
            endAngle = startAngle + arcLen;
        }

        /*****************************************
        Recorre y renderiza etapas "caracol" - End
        ******************************************/






        /*********************************************
         Renderiza círculos del menú "cuncuna" - Begin
        *********************************************/
        var id = "";
        var regreso = 0;
        var circle_radio = 0;
        circle_text_y = circle_text_y + menu_circle_paso + rp(40, 'x', width, height);
        for (var e = 0; e < 10; e++) {
            id = "circle" + e;
            //circle_text_y = y_circleMenu + rp(10, 'x', width, height);
            if (e == 0) {
                dx = rp(10, 'x', width, height) + "px";
                regreso = 100;
            }
            /*
            if (e == 0) {
                dx = rp(10, 'x', width, height) + "px";
                circle_pos_y = menu_circle_selected_y;
                circle_text_y = menu_circle_text_selected_y;
                circle_radio = menu_circle_radio_h;
                circle_text_size = menu_circle_text_size;
            } else
                circle_text_size = menu_circle_text_size;/**/
            circle_radio = menu_circle_radio_n;
            regreso = 0;

            if (e == 1) {
                circle_pos_y = y_bg_matriz + contenido_delta + menu_circle_paso + rp(30, 'x', width, height);// - outerRadius2;;
                circle_text_y = y_bg_matriz + contenido_delta + menu_circle_paso + rp(40, 'x', width, height);
            }
            if (e == 9) {
                dx = rp(0, 'x', width, height) + "px";
            }
            // Render circle
            svg.append("circle")
                .attr("id", id)
                .attr("regreso", regreso)
                .attr("cx", circle_pos_x)
                .attr("cy", circle_pos_y)
                .attr("r", menu_circle_radio_n)
                .style("stroke", "white")
                .attr('opacity', 0.8)
                .style("fill", arcSegmentEtapasColor[e])
                .style("cursor", "pointer")
                .on('mouseover', function (d, i) {
                    d3.select("#segment" + e + 1)
                        .transition()
                        .duration(100)
                        .attr('opacity', 0.7)
                    /*d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', menu_circle_radio_h);/**/
                    //etapa.mouseOverOutCircle(e, 1, movingCircleRegreso, menu_circle_radio_h, menu_circle_radio_n, arcSegmentEtapasLabel);
                })
                .on('mouseout', function (d, i) {
                    d3.select("#segment" + e + 1)
                        .transition()
                        .duration(100)
                        .attr('opacity', 1)
                    /*d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', menu_circle_radio_n);/**/

                    //etapa.mouseOverOutCircle(e, 0, movingCircleRegreso, menu_circle_radio_h, menu_circle_radio_n, arcSegmentEtapasLabel);
                })
                .on('click', function (d, i) {
                    d3.select("#segment" + e + 1)
                        .transition()
                        .duration(100)
                        .attr('opacity', 1);
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('opacity', 1);

                    selectedEtapa = e;

                    circle_pos_y = y_bg_matriz + contenido_delta + rp(30, 'x', width, height);
                    circle_text_y = y_bg_matriz + contenido_delta + rp(40, 'x', width, height);
                    circle_pos_x = menu_circle_selected_x;

                    // regresa el circulo
                    // regresa el texto
                    etapa.etapaClick(e, circle_pos_y, circle_text_x, circle_text_y, menu_circle_paso,
                        dx_one_number, dx_two_numbers, animacionCircleDuration, menu_circle_radio_n, menu_circle_radio_h,
                        menu_circle_selected_x, menu_circle_selected_y, menu_circle_text_selected_y, menu_circle_text_size);
                    etapa.etapaClickColor(arcSegmentEtapasColor, selectedEtapa);

                    // Activa los textos comunes a los 3 roles
                    etapa.toggleEtapasTextosMatrizB(1, selectedEtapa, selectedRol, arcSegmentEtapasLabel);
                    etapa.toggleEtapasTextosMatrizC(1, conenidoEtapasRol, selectedEtapa, selectedRol, colorRol, bulletMarginTop, rp(28, 'x', width, height));

                });

            // Render Text inside de circle
            svg.append("text")
                .attr('id', 'circle_text' + e)
                .attr("regreso", regreso)
                .attr("x", circle_text_x)
                .attr("y", circle_text_y)
                .attr("dx", dx)
                .attr("dy", "0px")
                .text(e + 1)
                .attr("font-size", circle_text_size)//width/73.8
                .style("cursor", "pointer")
                .attr("fill", "white")
                .attr("font-weight", "bold")
                .on('mouseover', function (d, i) {
                    d3.select("#segment" + e + 1)
                        .transition()
                        .duration(100)
                        .attr('opacity', 0.7)
                    /*d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', menu_circle_radio_h);/**/
                    //etapa.mouseOverOutCircle(e, 1, movingCircleRegreso, menu_circle_radio_h, menu_circle_radio_n, arcSegmentEtapasLabel);
                })
                .on('mouseout', function (d, i) {
                    d3.select("#segment" + e + 1)
                        .transition()
                        .duration(100)
                        .attr('opacity', 1)
                    /*d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', menu_circle_radio_n);/**/

                    //etapa.mouseOverOutCircle(e, 0, movingCircleRegreso, menu_circle_radio_h, menu_circle_radio_n, arcSegmentEtapasLabel);
                })
                .on('click', function (d, i) {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('opacity', 1);

                    selectedEtapa = e;

                    circle_pos_y = y_bg_matriz + contenido_delta + rp(30, 'x', width, height);
                    circle_text_y = y_bg_matriz + contenido_delta + rp(40, 'x', width, height);
                    circle_pos_x = menu_circle_selected_x;

                    // regresa el circulo
                    // regresa el texto
                    etapa.etapaClick(e, circle_pos_y, circle_text_x, circle_text_y, menu_circle_paso,
                        dx_one_number, dx_two_numbers, animacionCircleDuration, menu_circle_radio_n, menu_circle_radio_h,
                        menu_circle_selected_x, menu_circle_selected_y, menu_circle_text_selected_y, menu_circle_text_size);
                    etapa.etapaClickColor(arcSegmentEtapasColor, selectedEtapa);
                    // Activa los textos comunes a los 3 roles
                    etapa.toggleEtapasTextosMatrizB(1, selectedEtapa, selectedRol, arcSegmentEtapasLabel);
                    etapa.toggleEtapasTextosMatrizC(1, conenidoEtapasRol, selectedEtapa, selectedRol, colorRol, bulletMarginTop, rp(28, 'x', width, height));

                });

            if (e == 9) {
                d3.select('#circle' + selectedEtapa)
                    .attr("cy", menu_circle_selected_y)
                    .attr("r", menu_circle_radio_h);
                d3.select('#circle_text' + selectedEtapa).attr("y", menu_circle_text_selected_y);

            }

            circle_pos_y = circle_pos_y + menu_circle_paso;
            circle_text_y = circle_text_y + menu_circle_paso;
        }



        /*********************************************
         Renderiza círculos del menú "cuncuna" - End
        *********************************************/

        /******************************
         Selección de Rol - Begin
        *******************************/

        // Recuadro contenedor principal
        svg.append('rect')
            .attr('x', sel_x)
            .attr('y', sel_y)
            .attr('rx', radio_big)
            .attr('ry', radio_big)
            .style("fill", "#ffffff")
            .style("stroke", "url(#bgLinGradB)")
            .style("stroke-width", rp(sel_stroke_width, 'x', width, height))
            .attr('width', sel_w) //width/4.5
            .attr('height', sel_h); //height/20

        // Recuadro selector y animación Rol seleccionado
        svg.append('rect')
            .attr('id', 'selection')
            .attr('x', sel_x) // Proveedor
            .attr('y', sel_y)
            .attr('rx', radio_big)//height/radio
            .attr('ry', radio_big)//height/radio
            .style("fill", "url(#bgLinGradF)")
            .attr('width', sel_selected_width)
            .attr('height', sel_selected_height)
            .transition()
            .delay(duracionAnimacionSelector)
            .attr('y', selectorPos[1]) // Proveedor
            .transition()
            .delay(duracionAnimacionSelector)
            .attr('y', selectorPos[2]) // Compartido
            .transition()
            .delay(duracionAnimacionSelector)
            .attr('y', selectorPos[3]); // Todos


        for (var i = 0; i < textRol.length; i++) {
            // Título rol
            //setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold)
            setHtmlText(svg, 1,
                'textRol' + i,
                sel_x + (2 * delta_text_x),
                sel_y + (sel_selected_height * i) + rp(14, 'x', width, height),
                (rp(96, 'x', width, height)),
                (rp(14.77, 'x', width, height)),
                textRol[i],
                (rp(12.8, 'x', width, height)), 'Roboto', 'left', 0, '#111111', 'bold')

            svg.append('rect')
                .attr('id', 'rectTextRol' + i)
                .attr("x", sel_x)
                .attr("y", sel_y + (sel_selected_height * i))
                .attr('rx', radio_big)
                .attr('ry', radio_big)
                .style("fill", "transparent")
                .attr('width', sel_selected_width)
                .attr('height', sel_selected_height)
                .style("cursor", "pointer")
                .on('click', function () {
                    selectedRol = i;
                    //console.log('selectedRol: ' + selectedRol + ' selectedEtapa: ' + selectedEtapa);
                    // Mueve el selector y Cambia color del titulo
                    etapa.roleClick(selectedRol, selectorPos, arcSegmentEtapasColor, selectedEtapa);

                    etapa.toggleEtapasTextosMatrizC(1, conenidoEtapasRol, selectedEtapa, selectedRol, colorRol, bulletMarginTop, rp(28, 'x', width, height));
                    etapa.toggleEtapasTextosMatrizB(1, selectedEtapa, selectedRol, arcSegmentEtapasLabel);
                    switch (selectedRol) {
                        case 0:
                            etapa.changeHeight('contentRectShadow', contentEtapaMandante_h[selectedEtapa]);
                            etapa.changeHeight('estapasContentFO', contentEtapaMandante_h[selectedEtapa]);
                            break;
                        case 1:
                            etapa.changeHeight('contentRectShadow', contentEtapaProveedor_h[selectedEtapa]);
                            etapa.changeHeight('estapasContentFO', contentEtapaProveedor_h[selectedEtapa]);
                            break;
                        case 2:
                            etapa.changeHeight('contentRectShadow', contentEtapaCompartido_h[selectedEtapa]);
                            etapa.changeHeight('estapasContentFO', contentEtapaCompartido_h[selectedEtapa]);
                            break;
                        case 3:
                            etapa.changeHeight('contentRectShadow', contentEtapaTodos_h[selectedEtapa]);
                            etapa.changeHeight('estapasContentFO', contentEtapaTodos_h[selectedEtapa]);
                            break;
                    }
                });


            // Círculo rol
            svg.append("circle")
                .attr("id", "s" + i + "sel")
                .attr("cx", sel_x + delta_text_x)
                .attr("cy", sel_y + (sel_selected_height * i) + delta_text_y)
                .attr("r", rp(17.46, 'x', width, height))
                .style("stroke", "white")
                .attr('opacity', 1)
                .style("fill", colorRol[i])
                .style("cursor", "pointer")
                .on('click', function () {
                    selectedRol = i;
                    //console.log('selectedRol: ' + selectedRol + ' selectedEtapa: ' + selectedEtapa);
                    // Mueve el selector y Cambia color del titulo
                    etapa.roleClick(selectedRol, selectorPos, arcSegmentEtapasColor, selectedEtapa);

                    etapa.toggleEtapasTextosMatrizC(1, conenidoEtapasRol, selectedEtapa, selectedRol, colorRol, bulletMarginTop, rp(28, 'x', width, height));
                    etapa.toggleEtapasTextosMatrizB(1, selectedEtapa, selectedRol, arcSegmentEtapasLabel);
                    switch (selectedRol) {
                        case 0:
                            etapa.changeHeight('contentRectShadow', contentEtapaMandante_h[selectedEtapa]);
                            etapa.changeHeight('estapasContentFO', contentEtapaMandante_h[selectedEtapa]);
                            break;
                        case 1:
                            etapa.changeHeight('contentRectShadow', contentEtapaProveedor_h[selectedEtapa]);
                            etapa.changeHeight('estapasContentFO', contentEtapaProveedor_h[selectedEtapa]);
                            break;
                        case 2:
                            etapa.changeHeight('contentRectShadow', contentEtapaCompartido_h[selectedEtapa]);
                            etapa.changeHeight('estapasContentFO', contentEtapaCompartido_h[selectedEtapa]);
                            break;
                        case 3:
                            etapa.changeHeight('contentRectShadow', contentEtapaTodos_h[selectedEtapa]);
                            etapa.changeHeight('estapasContentFO', contentEtapaTodos_h[selectedEtapa]);
                            break;
                    }
                });

        }
        /******************************
         Selección de Rol - End
        *******************************/

        /******************************
         Section 3 - breadcrumb - Start
         *******************************/
        breadcrumb(svg, width, height, 'Inicio', 'ETAPAS RIESGOS Y OPORTUNIDADES EN LA CADENA DE APROVISIONAMIENTO', '/guia_de_gestion', '');
        /******************************
        Section 3 - breadcrumb - End
        *******************************/
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
            .attr("width", w_pageTitle + 50)
            .attr("height", h_pageTitle)
            .html(function (d) {
                return '<div style="' + style_pageTitle + '"><p align="justify">ETAPAS RIESGOS Y OPORTUNIDADES EN LA CADENA DE APROVISIONAMIENTO</p></div>'
            })

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
        getSideBarEtapas(svg, width, heightCorrected, styles.grow);

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
        console.log('getDurationAnim()' + getDurationAnim());
        d3.select('#rectWhiteFade')
            .transition()
            //.duration(900)
            .duration(getDurationAnim())
            .attr('opacity', 0)
            .duration(10)
            .attr("height", 1);

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
