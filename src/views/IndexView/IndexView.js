import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import NoSsr from '@mui/material/NoSsr'
import Image from 'next/future/image'
import useMediaQuery from '@mui/material/useMediaQuery'

import Main from 'layouts/Main'
import Container from 'components/Container'
import {
    About,
    YahooMail,
    YahooSearch,
    CryptoFace,
    Popchat,
    KungFuChess,
} from './components'

// import NikoImage from './images/nikolay_feldman.jpg'
import TopImage from './images/top-bg.jpg'
// import NikoPortraitImage from './images/nikolay_feldman_portrait.jpg'
import CryptoFaceImage from './images/cryptoface.png'
import PopchatImage from './images/popchat1.jpg'

const IndexView = () => {
    useEffect(() => {
        const jarallaxInit = async () => {
            const jarallaxElems = document.querySelectorAll('.jarallax')
            if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
                return
            }

            const { jarallax, jarallaxVideo } = await import('jarallax')
            jarallaxVideo()
            jarallax(jarallaxElems, { speed: 0.2 })
        }

        jarallaxInit()
    })

    const scrollTo = (id) => {
        setTimeout(() => {
            const element = document.querySelector(`#${id}`)
            if (!element) {
                return
            }

            window.scrollTo({ left: 0, top: element.offsetTop, behavior: 'smooth' })
        })
    }

    const theme = useTheme()

    const styles = (bgImage, brightness = '0.7', objectFit = 'cover', additionalStyles) => ({
        position: 'absolute',
        objectFit,
        /* support for plugin https://github.com/bfred-it/object-fit-images */
        fontFamily: `object-fit: ${objectFit};`,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundRepeat: 'no-repeat',
        backgroundSize: objectFit,
        backgroundPosition: 'center center',
        backgroundImage: `url(${bgImage})`,
        filter: `brightness(${brightness})`,
        ...additionalStyles,
        // filter: theme.palette.mode === 'dark' ? `brightness(${brightness})` : 'none',
    })

    const yahooStyles = (bgImage) => ({
        position: 'absolute',
        objectFit: 'contain',
        /* support for plugin https://github.com/bfred-it/object-fit-images */
        fontFamily: 'object-fit: contain;',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundImage: `url(${bgImage})`,
        backgroundColor: '#430297',
        filter: `brightness(0.35)`,
        opacity: 0.85,
        // filter: theme.palette.mode === 'dark' ? 'brightness(0.6)' : 'none',
    })

    const isMd = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true, })
    const yahooVideoBackground = isMd ? '/yahoo_landscape.mp4' : '/yahoo_portrait.mp4'

    const backgroundImage = (image, alt, brightness, objectFit = 'cover', additionalStyles = {}) => (
        <Image
            priority={image === TopImage}
            placeholder={'blur'}
            src={image}
            fill
            style={{
                objectFit: objectFit,
                /* support for plugin https://github.com/bfred-it/object-fit-images */
                fontFamily: `object-fit: ${objectFit}`,
                filter: `brightness(${brightness})`,
                ...additionalStyles,
            }}
            className={'jarallax-img'}
            alt={alt}
        />
    )


    return (
        <Main>
            {/*<Box*/}
            {/*    minHeight={'100vh'}*/}
            {/*    display={'flex'}*/}
            {/*    alignItems={'center'}*/}
            {/*    bgcolor={'alternate.main'}*/}
            {/*    marginTop={-13}*/}
            {/*    paddingTop={13}*/}
            {/*>*/}
            {/*    <Container>*/}
            {/*        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>*/}
            {/*            <About/>*/}
            {/*            <Box marginTop={4}>*/}
            {/*                <NoSsr>*/}
            {/*                    <Box*/}
            {/*                        component={'svg'}*/}
            {/*                        xmlns="http://www.w3.org/2000/svg"*/}
            {/*                        viewBox="0 0 20 20"*/}
            {/*                        fill="currentColor"*/}
            {/*                        width={{ xs: 30, sm: 40 }}*/}
            {/*                        height={{ xs: 30, sm: 40 }}*/}
            {/*                        onClick={() => scrollTo('portfolio-item--js-scroll')}*/}
            {/*                        sx={{ cursor: 'pointer' }}*/}
            {/*                    >*/}
            {/*                        <path*/}
            {/*                            fillRule="evenodd"*/}
            {/*                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"*/}
            {/*                            clipRule="evenodd"*/}
            {/*                        />*/}
            {/*                    </Box>*/}
            {/*                </NoSsr>*/}
            {/*            </Box>*/}
            {/*        </Box>*/}
            {/*    </Container>*/}
            {/*</Box>*/}

            <Box
                className={'jarallax'}
                data-jarallax
                data-speed="0.2"
                position={'relative'}
                minHeight={'100vh'}
                display={'flex'}
                alignItems={'center'}
            >
                {backgroundImage(TopImage, '', 0.3, 'cover', { backgroundColor: '#000000' })}
                <Container>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <About/>
                        <Box marginTop={4}>
                            <NoSsr>
                                <Box
                                    component={'svg'}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    width={{ xs: 30, sm: 40 }}
                                    height={{ xs: 30, sm: 40 }}
                                    onClick={() => scrollTo('portfolio-item--js-scroll')}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </Box>
                            </NoSsr>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box
                className={'jarallax'}
                position={'relative'}
                minHeight={'100vh'}
                display={'flex'}
                alignItems={'center'}
                id="portfolio-item--js-scroll"
            >
                {/*<Box*/}
                {/*    className={'jarallax'}*/}
                {/*    data-jarallax*/}
                {/*    // data-video-src={`mp4:/yahoo_portrait.mp4`}*/}
                {/*    data-video-src={`mp4:${yahooVideoBackground}`}*/}
                {/*    data-video-loop={false}*/}
                {/*    data-video-lazy-loading={false}*/}
                {/*    data-speed="0.2"*/}
                {/*    sx={{*/}
                {/*        position: 'absolute',*/}
                {/*        objectFit: 'cover',*/}
                {/*        fontFamily: 'object-fit: cover;',*/}
                {/*        top: 0,*/}
                {/*        left: 0,*/}
                {/*        width: '100%',*/}
                {/*        height: '100%',*/}
                {/*        // zIndex: -1, // seems to break the parallax video*/}
                {/*        backgroundRepeat: 'no-repeat',*/}
                {/*        backgroundSize: 'cover',*/}
                {/*        backgroundPosition: 'center center',*/}
                {/*        backgroundColor: '#7500fe',*/}
                {/*        filter: `brightness(0.5)`,*/}
                {/*    }}*/}
                {/*/>*/}
                <Box
                    className={'jarallax-img'}
                    sx={yahooStyles('/yahoo_mail.png')}
                />
                <Container zIndex={2}>
                    <YahooMail/>
                </Container>
            </Box>
            <Box
                className={'jarallax'}
                data-jarallax
                data-speed="0.2"
                position={'relative'}
                minHeight={'100vh'}
                display={'flex'}
                alignItems={'center'}
            >
                <Box
                    className={'jarallax-img'}
                    sx={styles('/kungfuchess.jpg', '0.4', 'contain', { backgroundColor: '#000000' })}
                />
                <Container>
                    <KungFuChess/>
                </Container>
            </Box>
            <Box
                className={'jarallax'}
                data-jarallax
                data-speed="0.2"
                position={'relative'}
                minHeight={'100vh'}
                display={'flex'}
                alignItems={'center'}
            >
                {backgroundImage(PopchatImage, 'Popchat bot on Kik', 0.4, 'cover', { backgroundColor: '#ffffff' })}
                <Container
                    paddingY={{ xs: 8 }}
                >
                    <Popchat/>
                </Container>
            </Box>
            <Box
                className={'jarallax'}
                data-jarallax
                data-speed="0.2"
                position={'relative'}
                minHeight={'100vh'}
                display={'flex'}
                alignItems={'center'}
                id="agency__portfolio-item--js-scroll"
            >
                {backgroundImage(CryptoFaceImage, 'CryptoFace watchface for fitbit', 0.45, 'cover', { backgroundColor: '#ffffff' })}
                <Container>
                    <CryptoFace/>
                </Container>
            </Box>
            <Box
                className={'jarallax'}
                data-jarallax
                data-speed="0.2"
                position={'relative'}
                minHeight={'100vh'}
                display={'flex'}
                alignItems={'center'}
            >
                <Box
                    className={'jarallax-img'}
                    sx={yahooStyles('/yahoo_search.png')}
                />
                <Container>
                    <YahooSearch/>
                </Container>
            </Box>
        </Main>
    )
}

export default IndexView
