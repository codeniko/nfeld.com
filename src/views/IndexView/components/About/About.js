/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LinkedIcon from 'components/LinkedIcon'
import { Twitter, Instagram, LinkedIn, Facebook, GitHub, EmailSharp as Email } from '@mui/icons-material'
import { alpha } from '@mui/material'


const About = () => {
    const theme = useTheme()

    const socialIconColor = theme.palette.secondary.main
    const socialIconHoverColor = alpha(theme.palette.secondary.main, 0.4)

    const GridItemHeadlineBlock = () => (
        <Box>
            <Typography
                variant="h3"
                align={'center'}
                gutterBottom
                sx={{
                    fontWeight: 900,
                }}
            >
                Nikolay Feldman
            </Typography>
            <Typography
                variant="h5"
                component="p"
                align={'center'}
                sx={{
                    fontWeight: 700,
                }}
            >
                Fullstack software engineer<br/><br/>
            </Typography>
            <Typography
                data-aos={'fade-right'}
                variant="h6"
                component="p"
                color="text.secondary"
                align={'center'}
                sx={{
                    fontWeight: 400,
                }}
            >
                <b>Frontend:</b><br/> ReactJs/NextJs+Redux, Android/Kotlin/Java, iOS/Swift<br/>
                <b>Backend:</b><br/> NodeJs, Scala+Play<br/><br/>
            </Typography>
            <Typography
                data-aos={'fade-left'}
                variant="h6"
                component="p"
                color="text.secondary"
                align={'center'}
                sx={{
                    fontWeight: 400,
                }}
            >
                <b>Additional experience:</b><br/>
                Unit/Integration/UI testing, Reverse engineering, Shell scripting, Unix server management, C/C++, C#, PHP, SQL
            </Typography>
        </Box>
    )

    const GridItemPartnersBlock = () => (
        <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
            {[
                'https://upload.wikimedia.org/wikipedia/commons/3/3a/Yahoo%21_%282019%29.svg',
                // 'https://assets.maccarianagency.com/svg/logos/google-original.svg',
            ].map((item, i) => (
                <Box maxWidth={80} marginTop={2} marginRight={4} key={i}>
                    <Box
                        component="img"
                        height={1}
                        width={1}
                        src={item}
                        alt="..."
                        sx={{
                            filter:
                                theme.palette.mode === 'dark'
                                    ? 'brightness(0) invert(0.7)'
                                    : 'contrast(0) brightness(0)',
                        }}
                    />
                </Box>
            ))}
        </Box>
    )

    return (
        <Box>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent={'center'}
                    >
                        <GridItemHeadlineBlock/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent={'center'}
                    >
                        <Box
                            data-aos={'fade-up'}
                            display="flex"
                            width={200}
                            justifyContent={'space-between'}
                        >
                            <LinkedIcon href={'https://github.com/codeniko'} target="_blank" color={socialIconColor} hoverColor={socialIconHoverColor}>
                                <GitHub/>
                            </LinkedIcon>
                            <LinkedIcon href={'mailto:niko@nfeld.com'} target="_blank" color={socialIconColor} hoverColor={socialIconHoverColor}>
                                <Email/>
                            </LinkedIcon>
                            <LinkedIcon href={'https://www.linkedin.com/in/nikofeld/'} target="_blank" color={socialIconColor} hoverColor={socialIconHoverColor}>
                                <LinkedIn/>
                            </LinkedIcon>
                            <LinkedIcon href={'https://www.instagram.com/codeniko/'} target="_blank" color={socialIconColor} hoverColor={socialIconHoverColor}>
                                <Instagram/>
                            </LinkedIcon>
                            <LinkedIcon href={'https://twitter.com/codeniko'} target="_blank" color={socialIconColor} hoverColor={socialIconHoverColor}>
                                <Twitter/>
                            </LinkedIcon>
                            <LinkedIcon href={'https://facebook.com/nfeld'} target="_blank" color={socialIconColor} hoverColor={socialIconHoverColor}>
                                <Facebook/>
                            </LinkedIcon>
                    {/*        <GridItemPartnersBlock/>*/}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default About
