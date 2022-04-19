import React, { Component } from "react";
import * as d3 from 'd3';

export function getArrowEnd(svg, height) {

    svg.append("svg:defs").append("svg:marker")
      .attr("id", "triangle")
      .attr("refX", height / 70)
      .attr("refY", height / 107)
      .attr("markerWidth", height / 25)
      .attr("markerHeight", height / 25)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 " + height / 50 + " " + height / 110 + " 0 " + height / 50 + " " + height / 200 + " " + height / 120 + "")
      .style("fill", "#93278F")
}