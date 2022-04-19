import React, { Component } from "react";
import * as d3 from 'd3';

//2022-01-07
export function setHtmlText(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, letterSpacing,lineHeight) {

    const boldParam1 = ''
    const boldParam2 = ''
    if (bold == 'bold') {
        boldParam1 = '<b style="color:' + color + '">'
        boldParam2 = '</b>'
    }
    svg.append("foreignObject")
        .attr("id", id)
        .attr('opacity', opacity)
        .attr('x', x)
        .attr('y', y)
        .attr("width", w)
        .attr("height", h)
        .html(function (d) {
            return '<div style="line-height: '+lineHeight+';"><p align="' + align + '" style="margin: ' + margin + '; color: ' + color + '; letter-spacing:' + letterSpacing + 'px">' + boldParam1 + texto + boldParam1 + '</p></div>'
        })
        .attr("font-size", fontSize)
        .style("font-family", font)
}
export function setHtmlTextBorde(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, letterSpacing, lineHeight) {

    const boldParam1 = ''
    const boldParam2 = ''
    if (bold == 'bold') {
        boldParam1 = '<b style="color:' + color + '">'
        boldParam2 = '</b>'
    }
    svg.append("foreignObject")
        .attr("id", id)
        .attr('opacity', opacity)
        .attr('x', x)
        .attr('y', y)
        .attr("width", w)
        .attr("height", h)
        .html(function (d) {
            return '<div style="border: 1px solid blue;"><p align="' + align + '" style="margin: ' + margin + '; color: ' + color + '; letter-spacing:' + letterSpacing + 'px; line-height:' + lineHeight + '">' + boldParam1 + texto + boldParam1 + '</p></div>'
        })
        .attr("font-size", fontSize)
        .style("font-family", font)
}
export function setHtmlTextLink(svg, opacity, id, x, y, w, h, texto, fontSize, font, align, margin, color, bold, link) {
    //console.log('setHtmlTextLink('+id+') ' + link);
    const boldParam1 = ''
    const boldParam2 = ''
    if (bold == 'bold') {
        boldParam1 = '<b style="color:' + color + '">'
        boldParam2 = '</b>'
    }
    svg.append("foreignObject")
        .attr('opacity', opacity)
        .attr("id", id)
        .attr('x', x)
        .attr('y', y)
        .attr("width", w)
        .attr("height", h)
        .html(function (d) {
            return '<div style=""><p align="' + align + '" style="margin: ' + margin + '; color: ' + color + '">' + boldParam1 + texto + boldParam1 + '</p></div>'
        })
        .attr("font-size", fontSize)
        .style("font-family", font)
        .style("font-family", "Roboto")
        .style("cursor", "pointer")
        .on("click", function () {
            //console.log('window.location.href =' + link);
            window.location.href = link
        })
}

export function setHtmlTextInclinado(svg, opacity, id, w, h, texto, fontSize, font, align, margin, color, bold, tx, ty, dy) {

    const boldParam1 = ''
    const boldParam2 = ''
    if (bold == 'bold') {
        boldParam1 = '<b style="color:' + color + '">'
        boldParam2 = '</b>'
    }
    svg.append("foreignObject")
        .attr('opacity', opacity)
        .attr("id", id)
        .attr('dy', dy)
        .attr("width", w)
        .attr("height", h)
        .attr("transform", 'translate(' + tx + ', ' + ty + '), ' + 'rotate(-45)')
        .html(function (d) {
            return '<div style=""><p align="' + align + '" style="margin: ' + margin + '; color: ' + color + '">' + boldParam1 + texto + boldParam1 + '</p></div>'
        })
        .attr("font-size", fontSize)
        .style("font-family", font)
}