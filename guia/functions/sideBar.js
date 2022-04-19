import React, { Component } from "react";
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "./referenceSize";
import * as d3 from 'd3';
const width = getReferenceSizeWidth();
const height = getReferenceSizeHeight();

const x_node_1 = rp(160, 'x', width, height); // x_node_1
const x_node_2 = rp(250, 'x', width, height); // x_node_2
const x_node_3 = rp(67.36, 'x', width, height); // x_node_3
const y_node_1 = rp(380, 'x', width, height); // y_node_1
const y_node_2 = rp(230, 'x', width, height); // y_node_2
const y_node_3 = rp(206.19, 'x', width, height); //y_node_3

const w_nodePrimary = rp(192, 'x', width, height);
const w_nodeSecundary = rp(128, 'x', width, height);
const w_nodeIntro = 320; // x_node_1
const x_nodeIntro = 213.33;
const y_nodeIntro = 266.61;

const x_nodeUp = rp(67.36, 'x', width, height); // x_node_1
const y_nodeUp = rp(201.56, 'x', width, height); // x_node_1
const x_nodeMiddle = rp(96, 'x', width, height); // x_node_1
const y_nodeMiddle = rp(417.57, 'x', width, height); // x_node_1
const x_nodeDown = rp(96, 'x', width, height); // x_node_2
const y_nodeDown = rp(568.55, 'x', width, height); // x_node_2

const durationAnim = 350;
const timeOut = 650;

export function getSideBarGuia(svg, width, height, styles_grow) {

    // first image
    svg.append("image")
        .attr('id', 'linkGuia')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
        .attr("x", rp(x_nodeUp, 'x', width, height))
        .attr("y", rp(y_nodeUp, 'x', width, height))
        .attr("width", rp(w_nodePrimary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1)

            d3.select('#behindHorizontalLine')
            .transition()
            .duration(durationAnim)
                .attr("width", 0)

            d3.select('#sideBarLines')
            .transition()
            .duration(durationAnim)
                .attr("height", 0)

            d3.select('#curvedLine')
                .transition()
                .duration(durationAnim)
                .attr('stroke', '#ffffff');
                
            d3.select('#circleGradient')
                .transition()
                .duration(durationAnim)
                .attr("radio", 0)
                .attr('opacity', 0.5)
                .attr('cx', rp(565, 'x', width, height))

            d3.select('#circleGradientShadow')
                .transition()
                .duration(durationAnim)
                .attr("radio", 0)
                .attr('opacity', 0.5)
                .attr('cx', rp(565, 'x', width, height))

            for( let i=0; i < 10; i++){
                d3.select('#circle'+i)
                    .transition()
                    .duration(durationAnim)
                    .attr("radio", 0)
                    .attr('opacity', 0)
                    .attr('cx', rp(565, 'x', width, height))
            }

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeIntro, 'x', width, height))
                .attr("y", rp(y_nodeIntro, 'x', width, height))
                .attr("width", rp(w_nodeIntro, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 0);

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr('opacity', 0);

            setTimeout(function () {
                window.location.href = "/guia_de_gestion";
            }, timeOut)
        });
        
    // second image
    svg.append("image")
        .attr('id', 'linkEtapas')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
        .attr("x", rp(x_nodeDown, 'x', width, height))
        .attr("y", rp(y_nodeDown, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1)
            
            d3.select('#behindHorizontalLine')
            .transition()
            .duration(durationAnim)
                .attr("width", 0)

            d3.select('#sideBarLines')
            .transition()
            .duration(durationAnim)
                .attr("height", 0)

            d3.select('#curvedLine')
                .transition()
                .duration(durationAnim)
                .attr('stroke', '#ffffff');
                
            d3.select('#circleGradient')
                .transition()
                .duration(durationAnim)
                .attr("radio", 0)
                .attr('opacity', 0.5)
                .attr('cx', rp(565, 'x', width, height))

            d3.select('#circleGradientShadow')
                .transition()
                .duration(durationAnim)
                .attr("radio", 0)
                .attr('opacity', 0.5)
                .attr('cx', rp(565, 'x', width, height))

            for( let i=0; i < 10; i++){
                d3.select('#circle'+i)
                    .transition()
                    .duration(durationAnim)
                    .attr("radio", 0)
                    .attr('opacity', 0)
                    .attr('cx', rp(565, 'x', width, height))
            }

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeMiddle, 'x', width, height))
                .attr("y", rp(y_nodeMiddle, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeUp, 'x', width, height))
                .attr("y", rp(y_nodeUp, 'x', width, height))
                .attr("width", rp(w_nodePrimary, 'x', width, height));

            setTimeout(function () {
                window.location.href = "/etapas";
            }, timeOut)
        });

    // third image
    svg.append("image")
        .attr('id', 'linkPracticas')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
        .attr("x", rp(x_nodeMiddle, 'x', width, height))
        .attr("y", rp(y_nodeMiddle, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height))
        
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1)
                
            d3.select('#behindHorizontalLine')
            .transition()
            .duration(durationAnim)
                .attr("width", 0)

            d3.select('#sideBarLines')
            .transition()
            .duration(durationAnim)
                .attr("height", 0)

            d3.select('#curvedLine')
                .transition()
                .duration(durationAnim)
                .attr('stroke', '#ffffff');
                
            d3.select('#circleGradient')
                .transition()
                .duration(durationAnim)
                .attr("radio", 0)
                .attr('opacity', 0.5)
                .attr('cx', rp(565, 'x', width, height))

            d3.select('#circleGradientShadow')
                .transition()
                .duration(durationAnim)
                .attr("radio", 0)
                .attr('opacity', 0.5)
                .attr('cx', rp(565, 'x', width, height))

            for( let i=0; i < 10; i++){
                d3.select('#circle'+i)
                    .transition()
                    .duration(durationAnim)
                    .attr("radio", 0)
                    .attr('opacity', 0)
                    .attr('cx', rp(565, 'x', width, height))
            }

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeMiddle, 'x', width, height))
                .attr("y", rp(y_nodeMiddle, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeUp, 'x', width, height))
                .attr("y", rp(y_nodeUp, 'x', width, height))
                .attr("width", rp(w_nodePrimary, 'x', width, height))

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height));

            setTimeout(function () {
                window.location.href = "/buenas_practicas";
            }, timeOut)
        });
}

export function getSideBarEtapas(svg, width, height, styles_grow) {

    // first image
    svg.append("image")
        .attr('id', 'linkGuia')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
        .attr("x", rp(x_nodeMiddle, 'x', width, height))
        .attr("y", rp(y_nodeMiddle, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeIntro, 'x', width, height))
                .attr("y", rp(y_nodeIntro, 'x', width, height))
                .attr("width", rp(w_nodeIntro, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 0);

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr('opacity', 0);

            setTimeout(function () {
                window.location.href = "/guia_de_gestion";
            }, timeOut)
        });

    // second image
    svg.append("image")
        .attr('id', 'linkEtapas')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
        .attr("x", rp(x_nodeUp, 'x', width, height))
        .attr("y", rp(y_nodeUp, 'x', width, height))
        .attr("width", rp(w_nodePrimary, 'x', width, height))
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeMiddle, 'x', width, height))
                .attr("y", rp(y_nodeMiddle, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeUp, 'x', width, height))
                .attr("y", rp(y_nodeUp, 'x', width, height))
                .attr("width", rp(w_nodePrimary, 'x', width, height));

            setTimeout(function () {
                window.location.href = "/etapas";
            }, timeOut)
        });

    // third image
    svg.append("image")
        .attr('id', 'linkPracticas')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
        .attr("x", rp(x_nodeDown, 'x', width, height))
        .attr("y", rp(y_nodeDown, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeMiddle, 'x', width, height))
                .attr("y", rp(y_nodeMiddle, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeUp, 'x', width, height))
                .attr("y", rp(y_nodeUp, 'x', width, height))
                .attr("width", rp(w_nodePrimary, 'x', width, height))

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height));

            setTimeout(function () {
                window.location.href = "/buenas_practicas";
            }, timeOut)
        });
}

export function getSideBarPracticas(svg, width, height, styles_grow) {

    // first image
    svg.append("image")
        .attr('id', 'linkGuia')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
        .attr("x", rp(x_nodeMiddle, 'x', width, height))
        .attr("y", rp(y_nodeMiddle, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeIntro, 'x', width, height))
                .attr("y", rp(y_nodeIntro, 'x', width, height))
                .attr("width", rp(w_nodeIntro, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 0);

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                //s.attr("x", rp(x_nodeDown, 'x', width, height))
                //.attr("y", rp(y_nodeDown, 'x', width, height))
                .attr('opacity', 0);

            setTimeout(function () {
                window.location.href = "/guia_de_gestion";
            }, timeOut)
        });

    // second image
    svg.append("image")
        .attr('id', 'linkEtapas')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
        .attr("x", rp(x_nodeDown, 'x', width, height))
        .attr("y", rp(y_nodeDown, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {

            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeMiddle, 'x', width, height))
                .attr("y", rp(y_nodeMiddle, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeUp, 'x', width, height))
                .attr("y", rp(y_nodeUp, 'x', width, height))
                .attr("width", rp(w_nodePrimary, 'x', width, height));

            setTimeout(function () {
                window.location.href = "/etapas";
            }, timeOut)
        });

    // third image
    svg.append("image")
        .attr('id', 'linkPracticas')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
        .attr("x", rp(x_nodeUp, 'x', width, height))
        .attr("y", rp(y_nodeUp, 'x', width, height))
        .attr("width", rp(w_nodePrimary, 'x', width, height))
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeMiddle, 'x', width, height))
                .attr("y", rp(y_nodeMiddle, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeUp, 'x', width, height))
                .attr("y", rp(y_nodeUp, 'x', width, height))
                .attr("width", rp(w_nodePrimary, 'x', width, height))

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height));

            setTimeout(function () {
                window.location.href = "/buenas_practicas";
            }, timeOut)
        });
}

export function getSideBarLines(svg, width) {
    var svgDefs = svg.append('defs');
    var mainGradient = svgDefs.append('linearGradient')
        .attr('id', 'mainGradient');

    mainGradient.append('stop')
        .attr('class', 'stop-left')
        .attr('offset', '0');

    mainGradient.append('stop')
        .attr('class', 'stop-right')
        .attr('offset', '1');

    /*svg.append('rect')
        .classed('filled', true)
        //.style("fill", "url(#sideBardGradient)")
        .attr('x', width / 12.3)
        .attr('y', height / 3.12)
        .attr('width', width / 190)
        .attr('height', height / 2.67);
    /**/
    svg.append('rect')
        .attr('id', 'sideBarLines')
        .classed('filled', true)
        //.style("fill", "url(#sideBardGradient)")
        .attr('x', rp(156, 'x', width, height))//width / 12.3)
        .attr('y', rp(309, 'x', width, height))//height / 3.12)
        .attr('width', rp(10, 'x', width, height))//width / 190)
        .attr('height', rp(316, 'x', width, height));//height / 2.67);


    return true;
}
export function getSideBarPracticasDetalle(svg, width, height, styles_grow) {

    // second image Etapas
    svg.append("image")
        .attr('id', 'linkEtapas')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
        .attr("x", rp(x_node_2, 'x', width, height))
        .attr("y", rp(y_node_2, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {

            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeMiddle, 'x', width, height))
                .attr("y", rp(y_nodeMiddle, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeUp, 'x', width, height))
                .attr("y", rp(y_nodeUp, 'x', width, height))
                .attr("width", rp(w_nodePrimary, 'x', width, height));

            setTimeout(function () {
                window.location.href = "/etapas";
            }, timeOut)
        });

    // first image Guia
    svg.append("image")
        .attr('id', 'linkGuia')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
        .attr("x", rp(x_node_1, 'x', width, height))
        .attr("y", rp(y_node_1, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeIntro, 'x', width, height))
                .attr("y", rp(y_nodeIntro, 'x', width, height))
                .attr("width", rp(w_nodeIntro, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 0);

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr('opacity', 0);

            setTimeout(function () {
                window.location.href = "/guia_de_gestion";
            }, timeOut)
        });


    // third image Buenas practicas
    svg.append("image")
        .attr('id', 'linkPracticas')
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
        .attr("x", rp(x_node_3, 'x', width, height))
        .attr("y", rp(y_node_3, 'x', width, height))
        .attr("width", rp(w_nodePrimary, 'x', width, height))
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            d3.select('#rectWhiteFade')
                .attr("height", height)
                //.attr("fill", 'URL(#bgRadGrad)')
                .transition()
                .duration(durationAnim)
                .attr('opacity', 1);

            // First image
            d3.select('#linkGuia')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeMiddle, 'x', width, height))
                .attr("y", rp(y_nodeMiddle, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height))

            // Second image
            d3.select('#linkPracticas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeUp, 'x', width, height))
                .attr("y", rp(y_nodeUp, 'x', width, height))
                .attr("width", rp(w_nodePrimary, 'x', width, height))

            // Third image etapas
            d3.select('#linkEtapas')
                .transition()
                .duration(durationAnim)
                .attr("x", rp(x_nodeDown, 'x', width, height))
                .attr("y", rp(y_nodeDown, 'x', width, height))
                .attr("width", rp(w_nodeSecundary, 'x', width, height));

            setTimeout(function () {
                window.location.href = "/buenas_practicas";
            }, timeOut)
        });
}
export function animaSidebarPracticas(svg, width, height) {
    d3.select('#rectWhiteFade')
        .attr("height", height)
        .transition()
        .duration(durationAnim)
        .attr('opacity', 1);

    d3.select('#linkEtapas')
        .transition()
        .duration(durationAnim)
        .attr("x", rp(x_node_2, 'x', width, height))
        .attr("y", rp(y_node_2, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height));
    d3.select('#linkGuia')
        .transition()
        .duration(durationAnim)
        .attr("x", rp(x_node_1, 'x', width, height))
        .attr("y", rp(y_node_1, 'x', width, height))
        .attr("width", rp(w_nodeSecundary, 'x', width, height));
    d3.select('#linkPracticas')
        .transition()
        .duration(durationAnim)
        .attr("x", rp(x_nodeUp, 'x', width, height))
        .attr("y", rp(y_nodeUp, 'x', width, height))
        .attr("width", rp(w_nodePrimary, 'x', width, height));

    return true;
}
export function animaSidebarEtapas(svg) {

    return true;
}
export function getTimeOut() {
    return timeOut;
}
export function getDurationAnim() {
    return durationAnim;
}/**/