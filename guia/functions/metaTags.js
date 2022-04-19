import React from "react";

export function OpenGraph(title, description, image) {
    const site_name = "CCS - Gestión cadena de suministro"
    const _title = title;
    const _description = description;
    const _image = image;
    const type = "website";
    const url = "https://www.ccs.cl/";

    if (_title == null)
        _title = "titulo";
    if (_description == null)
        _description = "description";
    if (_image == null)
        _image = "image";
    return(
         <>
            <meta property="og:site_name" content={site_name} />
            <meta property="og:title" content={_title} />
            <meta property="og:description" content={_description} />
            <meta property="og:image" itemprop="image" content={_image} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
        </>
    )
};

export function MetaData(title, description) {
    const _title = title;
    const _description = description;

    if (_title == null)
        _title = "CCS - Gestión cadena de suministro";
    if (_description == null)
        _description = "Guía para la Gestión Cadena de Suministro Sostenible";
    return(
         <>
            <meta charSet="UTF-8" />
            <title>{_title}</title>
            <meta name="description" content={_description} />
            <link rel="icon" href="/favicon.ico" />
            <meta name="keywords" content="Cámara, Comercio, Santiago, CCS, Gestión, Cadena, Suministro, Sostenible" />
            <meta name="author" content="vicobusiness.com" />

            {/*start: Favicon and Touch Icons */}
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="imag/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="imag/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="imag/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="imag/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            {/*end: Favicon and Touch Icons */}
        </>
    )
};
