import React, { Component } from "react";
import * as d3 from 'd3';

export function getFooter(svg, width, height) {

    /******************************
    Footer - Start
    *******************************/
    // footer white
    svg.append("rect")
        .attr("width", width)
        .attr("height", height/12)
        .attr("fill", "white")
        .attr("x", 0)
        .attr("y", height - (height / 12))
    
    // footer image
    getFooterImage(svg, width, height)

    /******************************
    Footer - Finish
    *******************************/
}
export function getFooterImage(svg, width, height) {

    /******************************
    Footer - Start
    *******************************/

    // footer image
    svg.append("image")
        .attr("xlink:href", window.location.origin + "/img/repositorio_web-07.png")
        .attr("x", width / 1.15)
        .attr("y", height - (height / 14.5))
        .attr("width", height / 6)

    /******************************
    Footer - Finish
    *******************************/
}