import React, { Component } from "react"; 
import * as d3 from 'd3';
class FooterGuia extends React.Component {
    footer = (element) => {
        // Obtiene el tamaño de la pantalla en uso
        // Obtiene el tamaño de la pantalla en uso
        const width = window.innerWidth; 
        const height = width / 17; 
        // Calcula el height adecuado para mantener el aspect ratio frente a cualquier resolución
        // En base a una resolución de pantalla de W:1920 H:1080
        const refWidth = 1920; 
        const refHeight = width / 17; 
        const heightCorrected = Math.round((refHeight * width) / refWidth); 
        //const heightCorrected = Math.round(width / aspectRatio);
        if (height > width) { 
            heightCorrected = Math.round((refHeight * width) / refWidth); 
        } 

        const svg = d3.select(element) 
            .append("div") 
            .classed("svg-container", true) //container class to make it responsive 
            .append("svg") 
            //responsive SVG needs these 2 attributes and no width and height attr 
            .attr("preserveAspectRatio", "xMinYMin meet") 
            .attr("viewBox", "0 0 " + width + " " + heightCorrected) 
            //class to make it responsive 
            .classed("svg-content-responsive", true)  
        /******************************
        Footer - Start
        *******************************/

        // footer white
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", width / 17)
            .attr("fill", "white")

        // footer image
        svg.append("image")
            .attr("xlink:href", window.location.origin + "/img/repositorio_web-07.png")
            .attr("x", width / 1.15)
            .attr("y", width / 90)
            .attr("width", width / 10)

        /******************************
        Footer - Finish
        *******************************/

    }

    render() {
        return <div ref={this.footer}></div>;
    }
}

export default FooterGuia;