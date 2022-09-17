import React from 'react'
import PropTypes from 'prop-types'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const leftGrid = [
    {
        image: '/photos/nikolay_feldman.jpg',
        title: 'Nikolay Feldman',
        description: `He uses this photo everywhere. It's not even good...`,
        alt: 'Photo of Nikolay Feldman'
    },
    {
        image: '/photos/nikolay_feldman_recent.jpg',
        title: 'Nikolay looking all cool',
        description: 'All the chicken is burnt though.',
    },
    {
        image: '/photos/nikolay_feldman1.jpg',
        title: 'Nikolay Feldman + Marissa Mayer',
        description: `Probably Nikolay's biggest achievement at Yahoo.`,
    },
    {
        image: '/photos/nikolay_feldman_belarus.jpg',
        title: 'Can I look any more Russian?',
        description: 'Belarus consulates need to update their website with passport renewal instructions... No I wont call you to figure out how to renew my expired passport.'
    },
]

const middleGrid = [
    {
        image: '/photos/nikolay_feldman2.png',
        title: 'Nikolay is vaccinated',
        description: 'Coronavirus is no joke...',
    },
    {
        image: '/photos/nikolay_feldman3.jpg',
        title: 'Nikolay shops sometimes',
        description: `He doesn't remember the last time he bought a t-shirt though.`,
    },
    {
        image: '/photos/nikolay_feldman_drawing.jpg',
        title: 'Nikolay needs a hobby',
        description: `This isn't it though, he's not talented enough to draw this...`,
    },
]


const rightGrid = [
    {
        image: '/photos/nikolay_feldman4.png',
        title: 'Nikolay likes motorcycles',
        description: `Fun fact: Niko bought his motorcycle the first day after landing in California after graduating Uni.`,
    },
    {
        image: '/photos/nikolay_feldman5.jpg',
        title: 'Is paypal hiring?',
        description: 'Nikolay gets interested in the weirdest of things',
    },
    {
        image: '/photos/nikolay_feldman_little_hacker.jpg',
        title: 'Niko was so cute, what happened?',
        description: 'It was on this day that I realized Nodejs is the only real dev language.',
    },
]

const Column = ({ data }) => {
    const theme = useTheme()
    return (
        <Box>
            {data.map((item, i) => {
                const title = item.title
                const description = item.description || title

                return <Box
                    key={i}
                    sx={{
                        marginBottom: { xs: 2, sm: 3 },
                        '&:last-child': { marginBottom: 0 },
                    }}
                >
                    <Box
                        boxShadow={1}
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: 2,
                            '&:hover': {
                                '& img': {
                                    transform: 'scale(1.2)',
                                },
                                '& .portfolio-massonry__main-item': {
                                    bottom: 0,
                                },
                            },
                            '& .lazy-load-image-loaded': {
                                display: 'flex !important',
                            },
                        }}
                    >
                        <Box
                            component={LazyLoadImage}
                            height={1}
                            width={1}
                            src={item.image}
                            alt={title}
                            effect="blur"
                            maxHeight={{ xs: 400, sm: 600, md: 1 }}
                            sx={{
                                transition: 'transform .7s ease !important',
                                transform: 'scale(1.0)',
                                objectFit: 'cover',
                                filter:
                                    theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                            }}
                        />
                        <Box
                            position={'absolute'}
                            bottom={'-100%'}
                            left={0}
                            right={0}
                            padding={4}
                            bgcolor={'background.paper'}
                            className={'portfolio-massonry__main-item'}
                            sx={{ transition: 'bottom 0.3s ease 0s' }}
                        >
                            <Box
                                component={'svg'}
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 1920 100.1"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    transform: 'translateY(-90%)',
                                    zIndex: 2,
                                    width: 1,
                                }}
                            >
                                <path
                                    fill={theme.palette.background.paper}
                                    d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                                ></path>
                            </Box>
                            <Typography variant={'h6'} fontWeight={700} gutterBottom>
                                {title}
                            </Typography>
                            <Typography>{description}</Typography>
                        </Box>
                    </Box>
                </Box>
            })}
        </Box>
    )
}

Column.propTypes = {
    data: PropTypes.array.isRequired,
}

const Main = () => {
    return (
        <Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Column data={leftGrid}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Column data={middleGrid}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Column data={rightGrid}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Main
