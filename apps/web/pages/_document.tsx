import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" type="image/x-icon" href="/indicators/pending.svg" />
                    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
                    <style>
                        {`
                    * {
                        font-family: 'Poppins', sans-serif;
                    }
            
                    body {
                        scrollbar-width: none;
                    }
                    ::-webkit-scrollbar {
                        width: '0px';
                        background: transparent;
                        display: none;
                    }
                    `}
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
