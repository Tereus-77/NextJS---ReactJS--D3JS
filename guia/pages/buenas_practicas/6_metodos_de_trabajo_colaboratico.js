import React, { Component } from "react";
import Head from 'next/head';
import Link from "next/link";
import styles from '../../styles/Home.module.css';
import FooterGuia from "../components/FooterGuia";
import { breadcrumb, headerCornerLogo, gradients, shadowFilters } from "../../functions/headerMenu";
import * as etapa from "../../functions/etapas";
import * as practica from "../../functions/practicas";
import { getReferenceSizeWidth, getReferenceSizeHeight, rp } from "../../functions/referenceSize";
import * as d3 from 'd3';
import { getSideBarPracticasDetalle } from "../../functions/sideBar";
import { OpenGraph, MetaData } from "../../functions/metaTags";

class DetalleSeis extends Component {

    main = (element) => {


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
export default DetalleSeis;