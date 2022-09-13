import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Script from 'next/script'
import * as gtag from '../lib/gtag'
import { useRouter } from 'next/router'

import Page from '../components/Page'

import 'react-lazy-load-image-component/src/effects/blur.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-image-lightbox/style.css'
import 'aos/dist/aos.css'
import '../styles/global.css'

export default function App({ Component, pageProps }) {

    // track page views for navigation within app
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [ router.events ])

    return (
        <React.Fragment>
            <Head>

                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}/>
                <script
                    // id="gtag-init"
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                    }}
                />

                {/*<Script*/}
                {/*    strategy={'afterInteractive'}*/}
                {/*    dangerouslySetInnerHTML={{*/}
                {/*    __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':*/}
                {/*    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],*/}
                {/*    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=*/}
                {/*    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);*/}
                {/*})(window,document,'script','dataLayer','GTM-N8WR8NZ');`*/}
                {/*}} />*/}

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>{process.env.NEXT_PUBLIC_MAIN_TITLE}</title>
            </Head>
            <Page>
                <Component {...pageProps} />
            </Page>
        </React.Fragment>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}
