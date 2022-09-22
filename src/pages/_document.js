/* eslint-disable react/display-name */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'
import * as gtag from '../lib/gtag'
import seo from 'lib/seo'


const getCache = () => {
    const cache = createCache({ key: 'css', prepend: true })
    cache.compat = true

    return cache
}

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/*SEO*/}
                    <meta charSet="utf-8"/>
                    <meta name="theme-color" content="#000000"/>
                    <meta name="keywords" content={seo.keywords}/>
                    <meta name="description" content={seo.description}/>
                    {seo.shouldIndex ?
                        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/> :
                        <meta name="robots" content="noindex"/>}
                    {seo.siteName ? <meta property="og:site_name" content={seo.siteName}/> : ''}
                    <meta property="og:locale" content="en_US"/>
                    <meta property="og:type" content={seo.type}/>
                    <meta property="og:title" content={seo.title}/>
                    <meta property="og:description" content={seo.description}/>
                    <meta property="og:url" content={seo.homeUrl}/>
                    <meta property="og:image" content={seo.homeUrl + seo.image}/>
                    {seo.imageAlt ? <meta property="og:image:alt" content={seo.imageAlt} /> : ''}
                    {/*END OF SEO*/}

                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
                        rel="stylesheet"
                    />

                    <link rel="manifest" href="/manifest.json"/>
                    <link rel="shortcut icon" href="/favicon.ico"/>
                </Head>
                <body>
                <noscript>
                    <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtag.GA_TRACKING_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const originalRenderPage = ctx.renderPage

    const cache = getCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
        originalRenderPage({
            // Take precedence over the CacheProvider in our custom _app.js
            enhanceComponent: (Component) => (props) => (
                <CacheProvider value={cache}>
                    <Component {...props} />
                </CacheProvider>
            ),
        })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ))

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            ...React.Children.toArray(initialProps.styles),
            ...emotionStyleTags,
        ],
    }
}
