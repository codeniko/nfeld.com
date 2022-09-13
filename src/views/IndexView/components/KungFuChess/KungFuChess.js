/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ThemedLink from 'components/ThemedLink'
import StarIcon from 'components/StarIcon'
import PlayStoreSvg from 'assets/icons/playstore.svg'

const KungFuChess = () => {
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
                Kung Fu Chess
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
                Online real-time fast paced variant of chess without player turns for Android.
                Play multiplayer with friends/randoms, or singleplayer against a built-in AI chess engine of varying difficulties.<br/>
                <br/>
                Rated 4.5 <StarIcon/> with 70 reviews on the Play Store. 7k+ total unique users since launch, 700+ monthly active users with 10 minute average engagement time.
                2 million chess moves made and 1.3 million chess pieces captured by users in over 81k+ matches.<br/>
                <br/>
                Built with the LibGDX game framework and Kotlin as the client language, with NodeJs handling the server-side game state, matchmaking state, and logging.
                <br/><br/>
                <ThemedLink secondary href={'https://play.google.com/store/apps/details?id=com.nfeld.kungfuchess'} target={'_blank'}>Find app on the <PlayStoreSvg width={16}/> Play Store</ThemedLink>
            </Typography>
        </Box>
    )
}

export default KungFuChess
