import React, { Component } from "react";
import * as d3 from 'd3';
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "./referenceSize";
import { setHtmlText, setHtmlTextLink } from "./htmlText";
const width = getReferenceSizeWidth();
const height = getReferenceSizeHeight();

const stdDeviation_filter_1 = rp(3, 'x', width, height); // x_node_1
const dx_filter_1 = rp(-5, 'x', width, height); // x_node_1
const dy_filter_1 = rp(3, 'x', width, height); // x_node_1
const floodColor_filter_1 = '#717171';

export function behindHorizontalLine(svg, width, height, fill) {
    // header line menu behind circles horizontal
    svg.append('rect')
        .attr('id', 'behindHorizontalLine')
        .attr('fill', fill) //'url(#bgLinGradHorizontal)'
        .attr('x', rp(548.58, 'x', width, height))
        .attr('y', rp(51.5, 'x', width, height))
        .attr('width', rp(1156.63, 'x', width, height))
        .attr('height', rp(10.3, 'x', width, height))
        .attr("rx", rp(8.05, 'x', width, height))
        .attr("ry", rp(8.05, 'x', width, height))
}

export function curvedLine(svg, width, height) {
    const curve = d3.line().curve(d3.curveNatural);
    // const points = [[200, 281], [389, 279], [445, 230], [500, 100], [520, 60], [540, 56]];
    const points = [[rp(202.11, 'x', width, height),
                    rp(289.79, 'x', width, height)],
                    [rp(393.45, 'x', width, height),
                    rp(288.06, 'x', width, height)],
                    [rp(449.65, 'x', width, height),
                    rp(237.11, 'x', width, height)],
                    [rp(505.27, 'x', width, height),
                    rp(102.99, 'x', width, height)],
                    [rp(526.03, 'x', width, height),
                    rp(61.86, 'x', width, height)],
                    [rp(547.01, 'x', width, height),
                    rp(57.79, 'x', width, height)]]

    svg.append('path')
        .attr('id', 'curvedLine')
        .attr('d', curve(points))
        .attr('stroke', 'url(#bgLinGradCurved)') //bgLinGradA
        .attr('stroke-width', rp(9.65, 'x', width, height))
        .attr('fill', 'none');
}


export function menuCircles(svg, width, height, selectedPosition, opacity) {

    var tooltipPosition = [
        {
            x: rp(520, 'x', width, height),
            w: rp(130, 'x', width, height),
        },
        {
            x: rp(645, 'x', width, height),
            w: rp(140, 'x', width, height),
        },
        {
            x: rp(710, 'x', width, height),
            w: rp(170, 'x', width, height),
        },
        {
            x: rp(858, 'x', width, height),
            w: rp(90, 'x', width, height),
        },
        {
            x: rp(980, 'x', width, height),
            w: rp(80, 'x', width, height),
        },
        {
            x: rp(1080, 'x', width, height),
            w: rp(190, 'x', width, height),
        },
        {
            x: rp(1135, 'x', width, height),
            w: rp(300, 'x', width, height),
        },
        {
            x: rp(1235, 'x', width, height),
            w: rp(330, 'x', width, height),
        },
        {
            x: rp(1205, 'x', width, height),
            w: rp(500, 'x', width, height),
        },
        {
            x: rp(1560, 'x', width, height),
            w: rp(150, 'x', width, height),
        },
    ]

    var menuLabel = [
        {
            label: '¿Por qué esta guía?',
            label2: '',
        },
        {
            label: '¿Qué busca esta guía?',
            label2: '',
        },
        {
            label: '¿Para quién es esta guía?',
            label2: '',
        },
        {
            label: 'Metodología',
            label2: '',
        },
        {
            label: 'Contenido',
            label2: '',
        },
        {
            label: '¿De dónde vienen las práctica',
            label2: '',
        },
        {
            label: '¿Cómo mirar la cadena de suministro sostenible?',
            label2: '',
        },
        {
            label: '¿Por qué gestionar cadenas de suministro sostenible?',
            label2: '',
        },
        {
            label: '¿Cuáles son los beneficios de una gestión sostenible',
            label2: 'de la cadena de suministro?',
        },
        {
            label: '¿Cómo usar esta guía?',
            label2: '',
        },
    ];

    svg.append("circle")
        .attr("id", 'circleGradientShadow')
        .attr("cx", selectedPosition)
        .attr("cy", rp(56.75, 'x', width, height))
        .attr("r", rp(32, 'x', width, height))
        .style("fill", "#b3b3b3")
        .attr("filter", "url(#selectedcircleshadow)");

    for (var i = 0; i < 10; i++) {

        svg.append('rect')
            .attr('id', 'tooltip' + i)
            .attr('style', 'position: absolute; opacity: 0;')
            .attr('fill', '#b3b3b3')
            .attr('stroke', '#b3b3b3')
            .attr("x", tooltipPosition[i].x)
            .attr("y", rp(95, 'y', width, height))
            .attr("rx", rp(10.67, 'x', width, height))
            .attr("ry", rp(10.67, 'x', width, height))
            .transition()
            .delay(200)
            .attr('width', tooltipPosition[i].w)
            .attr('height', rp(24, 'x', width, height))

            setHtmlText(svg,
                0,
                'menuLabel'+i,
                tooltipPosition[i].x,
                rp(99,
                'y',
                width,
                height),
                tooltipPosition[i].w,
                (rp(16, 'x', width, height)),
                menuLabel[i].label + ' ' + menuLabel[i].label2,
                (rp(12.8, 'x', width, height)),
                'Roboto',
                'center',
                0,
                'white',
                '')

        svg.append("circle")
            .attr("transform", "translate(" + 
                    rp(564.71, 'x', width, height)+
                    ", " + 
                    rp(56.77, 'x', width, height)+
                    ")")
            .attr("id", 'circle'+i)
            .attr("cx", i * (rp(120, 'x', width, height)))
            .attr("cy", 0)
            .attr("r", rp(17.55, 'x', width, height))
            .style("cursor", "pointer")
            .style("fill", "#b3b3b3")
            .style("stroke", "#4d4d4d")
            .attr("filter", "url(#circleshadow)")
            .style("stroke-width", rp(1.61, 'x', width, height))
            .on("click", function () {
                d3.select('#rectWhiteFade')
                    .attr("height", height)
                    .transition()
                    .duration(50)
                    .attr('opacity', 1);
                switch (i + 1) {
                    case 1:
                        window.location.href = '/guia_de_gestion/5_por_que_una_guia'
                        break
                    case 2:
                        window.location.href = '/guia_de_gestion/4_que_busca_la_guia'
                        break
                    case 3:
                        window.location.href = '/guia_de_gestion/6_para_quien_es_esta_guia'
                        break
                    case 4:
                        window.location.href = '/guia_de_gestion/1_metodologia'
                        break
                    case 5:
                        window.location.href = '/guia_de_gestion/2_contenido'
                        break
                    case 6:
                        window.location.href = '/guia_de_gestion/3_de_donde_vienen_las_practicas'
                        break
                    case 7:
                        window.location.href = '/guia_de_gestion/7_como_mirar_la_cadena'
                        break
                    case 8:
                        window.location.href = '/guia_de_gestion/8_por_que_gestionar_cadenas'
                        break
                    case 9:
                        window.location.href = '/guia_de_gestion/9_beneficios'
                        break
                    case 10:
                        window.location.href = '/guia_de_gestion/10_como_usar_la_guia'
                        break
                    default:
                        return
                }
            })
            .on('mouseover', function () {
                svg.select('#tooltip' + i).style('opacity', 1)
                svg.select('#menuLabel' + i).style('opacity', 1)
            })
            .on('mouseout', function () {
                svg.select('#tooltip' + i).style('opacity', 0)
                svg.select('#menuLabel' + i).style('opacity', 0)
            })
    }
    svg.append("circle")
            .attr("cx", selectedPosition)
            .attr("cy", rp(56.75, 'x', width, height))
            .attr("r", rp(32, 'x', width, height))
            .attr("id", 'circleGradient')
            .style("stroke", 'url(#bgLinGradB)')
            .style("stroke-width", rp(9.65, 'x', width, height))
            .style("fill", "#b3b3b3")
            .style("opacity", opacity);
}

export function breadcrumb(svg, width, height, string_one, string_two, link_string_two, string_three) {
    
    const breadcrumbPos = width/30;
    setHtmlTextLink(svg, 1, 'breadcrumb1',
                    breadcrumbPos,
                    rp(148.47, 'x', width, height),
                    (rp(1.92, 'x', width, height)) * (string_one.length * 3.5),
                    (rp(14.77, 'x', width, height)),
                    string_one, 
                    (rp(12.8, 'x', width, height)),
                    'Roboto', 'left', 0, '#000000', '', '/')

    let breadcrumb1Width = (rp(1.92, 'x', width, height)) * (string_one.length * 3.5);

    if (string_two.length > 0) {

        var stringW = (rp(1.92, 'x', width, height)) * ((string_two.length + 3) * 3.5)

        if (string_two.length > 35) {

            stringW = (rp(1.92, 'x', width, height)) * (35 * 3.5)
        }

        if (string_three.length > 0) {
            setHtmlTextLink(svg,
                        1,
                        'breadcrumb2',
                        breadcrumbPos + breadcrumb1Width,
                        rp(148.47, 'x', width, height),
                        stringW,
                        (rp(14.77, 'x', width, height)),
                        '\u00A0>\u00A0' + string_two,
                        (rp(12.8, 'x', width, height)),
                        'Roboto',
                        'left',
                        0,
                        '#000000',
                        '',
                        '/' + link_string_two)
        }
        else {
            setHtmlText(svg,
                        1,
                        'breadcrumb2',
                        breadcrumbPos + breadcrumb1Width,
                        rp(148.47, 'x', width, height),
                        stringW,
                        (rp(14.77, 'x', width, height)),
                        '\u00A0>\u00A0' + string_two,
                        (rp(12.8, 'x', width, height)),
                        'Roboto',
                        'left',
                        0,
                        '#666666',
                        '')
        }


    }

    const breadcrumb2Width = (rp(7.12, 'x', width, height)) * string_two.length;

    if (string_three.length > 0) {

        setHtmlText(svg,
            1,
            'breadcrumb3',
            breadcrumbPos + breadcrumb1Width + breadcrumb2Width,
            rp(148.47, 'x', width, height),
            (rp(1.92, 'x', width, height)) * ((string_three.length + 3) * 3.5),
            (rp(14.77, 'x', width, height)),
            '\u00A0>\u00A0' + string_three,
            (rp(12.8, 'x', width, height)),
            'Roboto',
            'left',
            0,
            '#666666',
            '')

    }
}


export function headerCornerLogo(svg, width, height) {
    svg.append("image")
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-08.png")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", rp(496.13, 'x', width, height))

    svg.append("image")
        .attr('id', 'headerLogo')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-05.png")
        .attr("x", rp(30.34, 'x', width, height))
        .attr("y", rp(30.93, 'x', width, height))
        .attr("width", rp(353.6, 'x', width, height))
        .style("cursor", "pointer")
        .on("click", function () {
            window.location.href = '/'
        })
}

export function gradients(svg) {
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
        .attr('style', 'stop-color:#22B573;stop-opacity:0.6')
        .attr('offset', '0%');
    bgLinGradC.append('stop')
        .attr('style', 'stop-color:#3B569D;stop-opacity:0.6')
        .attr('offset', '50%');
    bgLinGradC.append('stop')
        .attr('style', 'stop-color:#92288F;stop-opacity:0.6')
        .attr('offset', '100%');

    const bgLinGradD = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradD")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    bgLinGradD.append('stop')
        .attr('style', 'stop-color:#22B573;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradD.append('stop')
        .attr('style', 'stop-color:#4295B6;stop-opacity:1')
        .attr('offset', '40%');
    bgLinGradD.append('stop')
        .attr('style', 'stop-color:#22B573;stop-opacity:1')
        .attr('offset', '100%');

    const bgLinGradE = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradE")
        .attr("x1", "0%")
        .attr("y1", "80%")
        .attr("x2", "50%")
        .attr("y2", "0%");
    bgLinGradE.append('stop')
        .attr('style', 'stop-color:#22B573;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradE.append('stop')
        .attr('style', 'stop-color:#3B569D;stop-opacity:1')
        .attr('offset', '50%');
    bgLinGradE.append('stop')
        .attr('style', 'stop-color:#92288F;stop-opacity:1')
        .attr('offset', '100%');

    const bgLinGradF = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradF")
        .attr("x1", "0%")
        .attr("y1", "80%")
        .attr("x2", "50%")
        .attr("y2", "0%");
    bgLinGradF.append('stop')
        .attr('style', 'stop-color:#22B573;stop-opacity:0.4')
        .attr('offset', '0%');
    bgLinGradF.append('stop')
        .attr('style', 'stop-color:#3B569D;stop-opacity:0.4')
        .attr('offset', '50%');
    bgLinGradF.append('stop')
        .attr('style', 'stop-color:#92288F;stop-opacity:0.4')
        .attr('offset', '100%');
    
    const bgLinGradG = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradG")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "40%")
        .attr("y2", "80%");
    bgLinGradG.append('stop')
        .attr('style', 'stop-color:#22B573;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradG.append('stop')
        .attr('style', 'stop-color:#3B569D;stop-opacity:1')
        .attr('offset', '50%');
    bgLinGradG.append('stop')
        .attr('style', 'stop-color:#92288F;stop-opacity:1')
        .attr('offset', '100%');

    const bgLinGradCurved = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradCurved")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    bgLinGradCurved.append('stop')
        .attr('style', 'stop-color:#22B573;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradCurved.append('stop')
        .attr('style', 'stop-color:#2D95AB;stop-opacity:1')
        .attr('offset', '50%');
    bgLinGradCurved.append('stop')
        .attr('style', 'stop-color:#3B85AC;stop-opacity:1')
        .attr('offset', '100%');

    const bgLinGradHorizontal = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradHorizontal")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    bgLinGradHorizontal.append('stop')
        .attr('style', 'stop-color:#3B85AC;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradHorizontal.append('stop')
        .attr('style', 'stop-color:#9B83B4;stop-opacity:1')
        .attr('offset', '50%');
    bgLinGradHorizontal.append('stop')
        .attr('style', 'stop-color:#B782B6;stop-opacity:1')
        .attr('offset', '100%');

    const bgLinGradMandante = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradMandante")
        .attr("x1", "10%")
        .attr("y1", "0%")
        .attr("x2", "10%")
        .attr("y2", "90%");
    bgLinGradMandante.append('stop')
        .attr('style', 'stop-color:#9E6F9E;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradMandante.append('stop')
        .attr('style', 'stop-color:#FFFFFF;stop-opacity:1')
        .attr('offset', '20%');
    bgLinGradMandante.append('stop')
        .attr('style', 'stop-color:#FFFFFF;stop-opacity:1')
        .attr('offset', '100%');

    const bgLinGradCompartido = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradCompartido")
        .attr("x1", "10%")
        .attr("y1", "0%")
        .attr("x2", "10%")
        .attr("y2", "90%");
    bgLinGradCompartido.append('stop')
        .attr('style', 'stop-color:#B3BABD;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradCompartido.append('stop')
        .attr('style', 'stop-color:#FFFFFF;stop-opacity:1')
        .attr('offset', '20%');
    bgLinGradCompartido.append('stop')
        .attr('style', 'stop-color:#FFFFFF;stop-opacity:1')
        .attr('offset', '100%');

    const bgLinGradProveedor = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradProveedor")
        .attr("x1", "10%")
        .attr("y1", "0%")
        .attr("x2", "10%")
        .attr("y2", "90%");
    bgLinGradProveedor.append('stop')
        .attr('style', 'stop-color:#D9E021;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradProveedor.append('stop')
        .attr('style', 'stop-color:#FFFFFF;stop-opacity:1')
        .attr('offset', '20%');
    bgLinGradProveedor.append('stop')
        .attr('style', 'stop-color:#FFFFFF;stop-opacity:1')
        .attr('offset', '100%');

    const bgLinGradTodos = svg.append("defs").append("linearGradient")
        .attr("id", "bgLinGradTodos")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    bgLinGradTodos.append('stop')
        .attr('style', 'stop-color:#22B573;stop-opacity:1')
        .attr('offset', '0%');
    bgLinGradTodos.append('stop')
        .attr('style', 'stop-color:#3B569D;stop-opacity:1')
        .attr('offset', '50%');
    bgLinGradTodos.append('stop')
        .attr('style', 'stop-color:#92288F;stop-opacity:1')
        .attr('offset', '100%');

    const sideBarGradient = svg.append("defs").append('linearGradient')
        .attr('id', 'sideBarGradient')
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "0%");/**/
    sideBarGradient.append('stop')
        .attr('style', 'stop-color:#2FAC66;stop-opacity:1')
        .attr('offset', '30%');
    sideBarGradient.append('stop')
        .attr('style', 'stop-color:#82368C;stop-opacity:1')
        .attr('offset', '70%');

}
export function shadowFilters(svg) {
    //var g1 = svg.append('g');
    var defs = svg.append("defs");

    const shadowFilter = defs.append("filter")
        .attr("id", "shadowFilter")

    shadowFilter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", stdDeviation_filter_1)
        .attr("result", "blur");
    shadowFilter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", dx_filter_1)
        .attr("dy", dy_filter_1)
        .attr("result", "offsetBlur");
    shadowFilter.append("feFlood")
        .attr("in", "offsetBlur")
        .attr("flood-color", floodColor_filter_1)
        .attr("flood-opacity", "1")
        .attr("result", "offsetColor");
    shadowFilter.append("feComposite")
        .attr("in", "offsetColor")
        .attr("in2", "offsetBlur")
        .attr("operator", "in")
        .attr("result", "offsetBlur");/**/

    var feMergeShadowFilter = shadowFilter.append("feMerge");

    feMergeShadowFilter.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMergeShadowFilter.append("feMergeNode")
        .attr("in", "SourceGraphic");

}

export function setTriangle(valueSetTriangle) {

    var svg = valueSetTriangle['svg']
    var x = valueSetTriangle['x']
    var y = valueSetTriangle['y']
    var vertexA = valueSetTriangle['vertexA']
    var vertexBX = valueSetTriangle['vertexBX']
    var vertexBY = valueSetTriangle['vertexBY']
    var vertexCX = valueSetTriangle['vertexCX']
    var vertexCY = valueSetTriangle['vertexCY']
    var fill = valueSetTriangle['fill']
    var filter = valueSetTriangle['filter']

    var triangles = svg.append("g")
        .attr("transform", "translate(" + x + "," + y + ")")
    triangles.append("path")
        .attr("d", "M 0 " + vertexA + " L " + vertexBX + " " + vertexBY + "L " + vertexCX + " " + vertexCY + " Z")
        .style("fill", fill)
    if (filter != '') {
        triangles.attr("filter", filter)
    }

}
