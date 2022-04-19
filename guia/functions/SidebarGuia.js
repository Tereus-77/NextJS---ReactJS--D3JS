import React, { Component } from "react";
import * as d3 from 'd3';
export function SidebarGuia(svg,width, height, styles_grow) {
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
        .attr('x', width / 12.3)
        .attr('y', height / 3.12)
        .attr('width', width / 190)
        .attr('height', height / 2.67);

    // first image
    svg.append("image")
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
        .attr("x", width / 28.5)
        .attr("y", height / 4.68)
        .attr("width", width / 10)
        .style("cursor", "pointer").attr("class", styles_grow)
        .on("click", function () {
            window.location.href = '/guia_de_gestion'
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
    //svg.append("text")
    //    .attr("xlink:href", window.location.origin + "/img/repositorio_web-01.png")
    //    .attr("x", width / 28.5)
    //   .attr("y", height / 4.68)
     //   .text(height+'//'+width)

     
    // second image
    svg.append("image")
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-03.png")
        .attr("x", width / 20)
        .attr("y", height / 2.3)
        .attr("width", width / 15)
        .style("cursor", "pointer").attr("class", styles_grow)
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
              .attr('opacity', 1);*/
        });

    // third image
    svg.append("image")

        .attr("xlink:href", window.location.origin + "/img/repositorio_web-02.png")
        .attr("x", width / 20)
        .attr("y", height / 1.7)
        .attr("width", width / 15)
        .style("cursor", "pointer").attr("class", styles_grow)
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
}