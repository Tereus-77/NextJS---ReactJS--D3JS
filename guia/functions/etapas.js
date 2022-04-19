import React, { Component } from "react";
import * as d3 from 'd3';

export function setEtapasTextosMatriz(svg, width, pos_m_x, pos_m_y, delta_m_y, delta_m_v, opacity_m, array, txt_width, txt_height, margen_h, margen_v, id) {
    // Etapas Indicador GRI Descripcion
    for (let i = 0; i < array.length; i++) {
        svg.append("g")
            .attr('opacity', opacity_m)
            .attr("id", id + i)
            .append("foreignObject")
            .attr('x', pos_m_x)
            .attr('y', pos_m_y + (delta_m_v * delta_m_y))
            .attr("width", txt_width - (margen_h * 2))
            .attr("height", txt_height - (margen_v * 2))
            .html(function (d) {
                return '<div style=""><p align="justify">' + array[i] + '</p></div>'
            })
            .attr("fill", "red")
            .attr("font-size", width / 120);
    }
} /**/

// Funciones para activar/desactivar el contenido de las etapas
export function toggleEtapasTextosMatrizB(opacity, etapa_index, roleIndex, arrayTitle) {
    d3.select('#estapasTitleFO')
        .attr('opacity', opacity)
        .html(function () {
            return '<div style="font-family:Oswald;color:#FFFFFF"><p align="justify">' + arrayTitle[etapa_index] + '</p></div>';
        });
    /*if (roleIndex == 3 || roleIndex == 0) 
            d3.select('#estapasTitleFO')
                .attr('opacity', opacity)
                .html(function () {
                    return '<div style="font-family:Oswald;color:#FFFFFF"><p align="justify">' + arrayTitle[etapa_index] + '</p></div>';
                });
         else
            d3.select('#estapasTitleFO')
                .attr('opacity', opacity)
                .html(function () {
                    return '<div style="font-family:Oswald;color:#111111"><p align="justify">' + arrayTitle[etapa_index] + '</p></div>';
                });/**/

}
// Funciones para activar/desactivar el contenido de las etapas
export function toggleEtapasTextosMatrizC(opacity, array, etapaIndex, roleIndex, colorRol, maginTop, radio) {
    //console.log('export function toggleEtapasTextosMatriz(opacity, array) opacity ' + opacity + ' ' + id);
    var div_a = '<div style="font-family:Roboto;color:#111111">';
    var div_b = '';
    var div_c = '';
    var div_d = '</div>';

    var color_background = 'background-color: ' + colorRol[roleIndex];
    if (roleIndex == 3) {
        color_background = 'background: linear-gradient(90deg, #22B573 0%, #3B569D 50%, #92288F 100%)';
    }


    div_b += '<h2 style="font-family:Oswald;color:#737373">Descripción</h2>';
    div_b += '<p align="justify">' + array['arcSegmentEtapasDescription'][etapaIndex] + '</p>';
    div_b += '<style>.dot {margin-top: ' + maginTop + 'px; height: ' + radio + 'px;width: ' + radio + 'px;' + color_background + ';border-radius: 50%;display: inline-block;}</style >';



    switch (roleIndex) {
        case 0: // Mandante
            if (array['arcSegmentEtapasRolMandante'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Rol Mandante</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasRolMandante'][etapaIndex] + '</p>';
            }
            if (array['arcSegmentEtapasOportunidadGestionMandante'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Oportunidad Gestion Mandante</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionMandante'][etapaIndex] + '</p>';
            }
            break;
        case 1: // Proveedor
            if (array['arcSegmentEtapasRolProveedor'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Rol Proveedor</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasRolProveedor'][etapaIndex] + '</p>';
            }
            if (array['arcSegmentEtapasOportunidadGestionProveedor'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Oportunidad Gestion Proveedor</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionProveedor'][etapaIndex] + '</p>';
            }
            break;
        case 2: // Compartido
            if (array['arcSegmentEtapasRolCompartido'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Rol Compartido</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasRolCompartido'][etapaIndex] + '</p>';
            }
            if (array['arcSegmentEtapasOportunidadGestionCompartido'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Oportunidad Gestion Compartida</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionCompartido'][etapaIndex] + '</p>';
            }
            break;

        case 3: // Todos
            if (array['arcSegmentEtapasRolMandante'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Rol Mandante</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasRolMandante'][etapaIndex] + '</p>';
            }
            if (array['arcSegmentEtapasOportunidadGestionMandante'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Oportunidad Gestion Mandante</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionMandante'][etapaIndex] + '</p>';
            }
            if (array['arcSegmentEtapasRolProveedor'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Rol Proveedor</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasRolProveedor'][etapaIndex] + '</p>';
            }
            if (array['arcSegmentEtapasOportunidadGestionProveedor'][etapaIndex] != '-') {
                div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Oportunidad Gestion Proveedor</h2>';
                div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionProveedor'][etapaIndex] + '</p>';
            }
            break;
    }
    if (array['arcSegmentEtapasRiesgoAsociado'][etapaIndex] != '-') {
        div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Riesgo Asociado</h2>';
        div_b += '<p align="justify">' + array['arcSegmentEtapasRiesgoAsociado'][etapaIndex] + '</p>';
    }
    if (array['arcSegmentEtapasKPISugerido'][etapaIndex] != '-') {
        div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> KPI Sugerido</h2>';
        div_b += '<p align="justify">' + array['arcSegmentEtapasKPISugerido'][etapaIndex] + '</p>';
    }
    if (array['arcSegmentEtapasIndicadorGRI'][etapaIndex] != '-') {
        div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Indicador GRI</h2>';
        div_b += '<p align="justify">' + array['arcSegmentEtapasIndicadorGRI'][etapaIndex] + '</p>';
    }
    if (array['arcSegmentEtapasIndicadorGRIDescripcion'][etapaIndex] != '-') {
        div_b += '<h2 style="font-family:Oswald;color:#737373"><span class="dot"></span> Indicador GRI Descripcion</h2>';
        div_b += '<p align="justify">' + array['arcSegmentEtapasIndicadorGRIDescripcion'][etapaIndex] + '</p>';
    }

    // Actualiza contenido
    d3.select('#estapasContentFO')
        .attr('opacity', opacity)
        .html(function () {
            return div_a + div_b + div_c + div_d;
        });

    /**/
}
export function toggleEtapasTextosMatrizD(array, etapaIndex, roleIndex) {
    //console.log('export function toggleEtapasTextosMatriz(opacity, array) opacity ' + opacity + ' ' + id);
    var div_a = '<div style="font-family:Roboto;color:#111111">';
    var div_b = '';
    var div_c = '';
    var div_d = '</div>';
    //for (let e = 0; e < .length; e++) {


    div_b += '<h3>Description</h3>';
    div_b += '<p align="justify">' + array['arcSegmentEtapasDescription'][etapaIndex] + '</p>';
    div_b += '<h3>Riesgo Asociado</h3>';
    div_b += '<p align="justify">' + array['arcSegmentEtapasRiesgoAsociado'][etapaIndex] + '</p>';
    div_b += '<h3>KPI Sugerido</h3>';
    div_b += '<p align="justify">' + array['arcSegmentEtapasKPISugerido'][etapaIndex] + '</p>';
    div_b += '<h3>Indicador GRI</h3>';
    div_b += '<p align="justify">' + array['arcSegmentEtapasIndicadorGRI'][etapaIndex] + '</p>';
    div_b += '<h3>Indicador GRI Descripcion</h3>';
    div_b += '<p align="justify">' + array['arcSegmentEtapasIndicadorGRIDescripcion'][etapaIndex] + '</p>';


    switch (roleIndex) {
        case 0: // Mandante
            div_b += '<h3>Indicador GRI Descripcion</h3>';
            div_b += '<p align="justify">' + array['arcSegmentEtapasRolMandante'][etapaIndex] + '</p>';
            div_b += '<h3>Indicador GRI Descripcion</h3>';
            div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionMandante'][etapaIndex] + '</p>';
            break;
        case 1: // Compartido

            break;
        case 2: // Proveedor
            div_b += '<h3>Rol Proveedor</h3>';
            div_b += '<p align="justify">' + array['arcSegmentEtapasRolProveedor'][etapaIndex] + '</p>';
            div_b += '<h3>Oportunidad Gestion Proveedor</h3>';
            div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionProveedor'][etapaIndex] + '</p>';
            break;
        case 3: // Todos
            div_b += '<h3>RolMandante</h3>';
            div_b += '<p align="justify">' + array['arcSegmentEtapasRolMandante'][etapaIndex] + '</p>';
            div_b += '<h3>Oportunidad Gestion Mandante</h3>';
            div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionMandante'][etapaIndex] + '</p>';
            div_b += '<h3>Rol Proveedor</h3>';
            div_b += '<p align="justify">' + array['arcSegmentEtapasRolProveedor'][etapaIndex] + '</p>';
            div_b += '<h3>Oportunidad Gestion Proveedor</h3>';
            div_b += '<p align="justify">' + array['arcSegmentEtapasOportunidadGestionProveedor'][etapaIndex] + '</p>';

            break;
    }
    // Actualiza contenido
    return div_a + div_b + div_c + div_d;
}
// Modifica la altura del contenedor del contenido de las etapas
export function changeHeight(id, height) {
    console.log('changeHeight(id, height)' + height);

    d3.select('#' + id)
        .transition()
        .duration(100)
        .attr("height", height);
}
// Funciones para activar/desactivar el contenido de las etapas
export function toggleEtapasTextosMatriz(opacity, array, etapa_index, id, txt_height, margen_v) {
    //console.log('export function toggleEtapasTextosMatriz(opacity, array) opacity ' + opacity + ' ' + id);
    if (opacity == 1) {
        d3.select('#' + id + etapa_index)
            .transition()
            .duration(100)
            .attr('opacity', opacity);
        d3.select('#contentRectShadow')
            .transition()
            .duration(100)
            .attr("height", txt_height - (margen_v * 2));
        d3.select('#contentRect')
            .transition()
            .duration(100)
            .attr("height", txt_height - (margen_v * 2));
        //console.log('#' + id + etapa_index + ' ' + opacity);
    } else {
        for (let i = 0; i < array.length; i++) {
            d3.select('#' + id + i).attr('opacity', opacity);
            //console.log('#' + id + i + ' ' + opacity);
        }
    }
}
// Mueve el selector y Cambia color del titulo
export function roleClick(roleIndex, selectorPos, colorRol, etapaIndex) {
    d3.select('#selection')
        .transition()
        .duration(100)
        .attr('y', selectorPos[roleIndex]);
    d3.select('#estapasTitleBackground')
        .transition()
        .duration(100)
        .style('fill', colorRol[etapaIndex]);

}
export function etapaClickColor(colorEtapa, etapaIndex) {
    d3.select('#estapasTitleBackground')
        .transition()
        .duration(100)
        .style('fill', colorEtapa[etapaIndex]);

}
export function etapaClick(e, circle_pos_y, circle_text_x, circle_text_y, menu_circle_paso,
    dx_one_number, dx_two_numbers, animacionCircleDuration, menu_circle_radio_n, menu_circle_radio_h,
    menu_circle_selected_x, menu_circle_selected_y, menu_circle_text_selected_y, menu_circle_text_size) {
    var dx = dx_one_number;
    // regresar circulos y textos a su posición original
    for (let k = 0; k < 10; k++) {
        if (k == 9) {
            dx = dx_two_numbers;
        } else
            dx = dx_one_number;
        // regresa el circulo
        d3.select('#circle' + k)
            .attr('regreso', 0)
            .attr('opacity', 0.3)
            .transition()
            .duration(animacionCircleDuration)
            .attr('regreso', 100)
            .attr('opacity', 0.8)
            .attr('r', menu_circle_radio_n)
            //.attr("cx", circle_pos_x)
            .attr("cy", circle_pos_y);

        // regresa el texto
        d3.select('#circle_text' + k)
            .attr('regreso', 0)
            .transition()
            .duration(animacionCircleDuration)
            .attr('regreso', 100)
            .attr('opacity', 1)
            .attr("x", circle_text_x)
            .attr("y", circle_text_y)
            .attr("dx", dx)
            .attr("dy", "0px")
            .text(k + 1)
            .attr("font-size", menu_circle_text_size)//width / 73.8
            .attr("fill", "white")
            .attr("font-weight", "bold");
        // calcula cambio
        circle_pos_y = circle_pos_y + menu_circle_paso;
        circle_text_y = circle_text_y + menu_circle_paso;
    }/**/
    // posición de selección
    if (e == 9)
        dx = dx_two_numbers;
    else
        dx = dx_one_number;
    d3.select('#circle' + e)
        .transition()
        .duration(100)
        .attr('opacity', 1)
        .attr('r', menu_circle_radio_h)
        .attr("cx", menu_circle_selected_x)
        .attr("cy", menu_circle_selected_y);

    d3.select('#circle_text' + e)
        .transition()
        .duration(100)
        .attr('opacity', 1)
        .attr("y", menu_circle_text_selected_y)
        .attr("dx", dx)
        .attr("dy", "0px")
        .text(e + 1)
        .attr("font-size", menu_circle_text_size)//width / 73.8
        .attr("fill", "white")
        .attr("font-weight", "bold");
}


export function mouseOverOut(e, opacity, movingCircleRegreso, menu_circle_radio_h, menu_circle_radio_n, arcSegmentEtapasLabel) {
    var notopacity = 0;
    if (opacity == 1) {
        notopacity = 0;
        if (movingCircleRegreso == 0 || movingCircleRegreso == 100) {
            // agranda el radio del circulo que le corresponde a la etapa
            d3.select('#circle' + e)
                .transition()
                .duration(100)
                .attr('regreso', 0)
                .attr('opacity', opacity).attr('r', menu_circle_radio_h);
            // Hace visible el nombre de la etapa
            d3.select('#estapasTitleFO')
                .html(function (d) {
                    return '<div style="font-family:Oswald;color:#111111"><p align="justify">' + arcSegmentEtapasLabel[e] + '</p></div>'
                })
                .attr('opacity', notopacity)
                .transition()
                .duration(100)
                .attr('opacity', opacity);
        }
    } else {
        if (movingCircleRegreso == 0 || movingCircleRegreso == 100) {
            d3.select('#circle' + e)
                .transition()
                .duration(100)
                .attr('regreso', opacity)
                .attr('opacity', 0.8).attr('r', menu_circle_radio_n);
            d3.select('#etapaLabel' + e)
                .transition()
                .duration(100)
                .attr('opacity', opacity);
        }
    }
}
