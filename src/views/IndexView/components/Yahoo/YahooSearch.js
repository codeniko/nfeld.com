/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const YahooSearch = () => {
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
                Yahoo Search
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
                Development on scalable, ReactJs based search.yahoo.com optimized for mobile browsers utilized by hundreds of millions of users.
                <br/><br/>
                A/B testing of all new features, continuous delivery and strive for >90% code coverage.
                <br/><br/>
                Acquired ownership of Yahoo's native iOS Yahoo Search app and backends. Redesigned the app in the direction of contextual search, exploration, and personalization, which increased user engagement on the home screen by 3x.
                <br/><br/>
                Contributed to implementation and tracking to Mobile Web Search for Yahoo's partnership with DoSomething.org, where Yahoo donated 10 cents per search in an effort to raise awareness and drive support for global issues.
            </Typography>
        </Box>
    )
}

export default YahooSearch
