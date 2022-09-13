/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ThemedLink from 'components/ThemedLink'
import StarIcon from 'components/StarIcon'
import GithubIcon from 'components/GithubIcon'

const CryptoFace = () => {
    const theme = useTheme()

    return (
        <Box>
            <Typography
                variant="h2"
                align={'center'}
                gutterBottom
                sx={{
                    fontWeight: 900,
                    color: theme.palette.common.white,
                    textTransform: 'uppercase',
                }}
            >
                CryptoFace
            </Typography>
            <Typography
                variant="h6"
                component="p"
                color="text.primary"
                align={'center'}
                sx={{
                    color: theme.palette.common.white,
                }}
            >
                An open-source Fitbit Sense/Versa 3 watchface to track crypto, stock, and forex prices using Yahoo Finance APIs.
                Customize up to 6 tickers to track with frequent updates. You may optionally refresh prices yourself with the "Refresh" button.
                <br/><br/>
                Rated 4.8 <StarIcon/> with 50+ ratings. 400+ crypto enthusiasts hitting Yahoo APIs more than 15k times per day for price refreshes. Logged more than 2 million total API hits since inception.
                <br/><br/>
                Developed the first Google Analytics 4 npm module specifically designed for fitbit projects. Simplifies the communication needed between the client-side watchface and the companion
                responsible for sending data to GA4.
                <br/><br/>
                <ThemedLink secondary bold href={'https://github.com/codeniko/CryptoFace'} target={'_blank'}><GithubIcon/> See watchface code</ThemedLink><br/>
                <ThemedLink secondary bold href={'https://github.com/codeniko/fitbit-ga4'} target={'_blank'}><GithubIcon/> See Google Analytics 4 module code</ThemedLink><br/>
            </Typography>
        </Box>
    )
}

export default CryptoFace
