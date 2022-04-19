import React, { Component } from "react";
import * as d3 from 'd3';

//2021-12-28
export function getReferenceSizeWidth() {
    const width = 1920

    return width
}
//2021-12-28
export function getReferenceSizeHeight() {
    const height = 965

    return height
}

// 2021-12-29
// rp "Relative Position" Returns the relative value base on the reference size by axis
export function rp(absolut, axis, width, height) {
    var relative;
    const width_ref = 1920;
    const height_ref = 965;
    if (axis == 'x') {
        relative = width / (width_ref / absolut);
    } else if(axis == 'y') {
        relative = height / (height_ref / absolut);
    } else {
        console.log('export function rp(absolut, NULL, width, height) ' + axis);
        return 0;
    }
    //console.log('export function rp(' + absolut + ', ' + axis + ', '+width+', '+height+') ' + relative);
    return relative;
}