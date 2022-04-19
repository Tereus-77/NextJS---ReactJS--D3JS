import React, { Component } from "react";
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from "next/link";
import * as d3 from 'd3';

class BuenasPracticas extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  main = (element) => {
    

  }

  footer = (element) => {
    const width = window.innerWidth - 20
    const height = 70

    const svg = d3.select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "white")

    svg.append("image")
      .attr("xlink:href", window.location.origin + "/img/repositorio_web-07.png")
      .attr("x", width / 1.15)
      .attr("y", 0)
      .attr("width", width / 10)
  }

  render() {


    return (
      <div className={styles.container}>
        <Head>
          <title>Guía para la Gestión Cadena de Suministro Sostenible</title>
          <meta name="description" content="Guía para la Gestión Cadena de Suministro Sostenible" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.container}>
          <div ref={this.main}></div>
          <div ref={this.footer}></div>
        </div>
      </div>
    )
  }

}

export default BuenasPracticas
