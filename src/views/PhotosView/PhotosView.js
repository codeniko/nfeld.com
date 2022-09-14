import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiLink from '@mui/material/Link'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import Main from 'layouts/Main'
import Container from 'components/Container'
import { Main as MainSection } from './components'

const PhotosView = () => {
    const theme = useTheme()
    return (
        <Main colorInvert={true}>
            <Container>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography
                        variant="h3"
                        align={'center'}
                        gutterBottom
                        sx={{
                            fontWeight: 900,
                        }}
                    >
                        Nikolay Feldman - codeniko
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        align={'center'}
                        gutterBottom
                        marginBottom={2}
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        These are photos for search indexing. You're likely looking for the homepage.<br/>
                        Tap the photos on mobile for fun facts though!
                    </Typography>
                    <Link href='/' passHref>
                        <Button
                            component={MuiLink}
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Go to homepage
                        </Button>
                    </Link>
                </Box>
            </Container>
            <Container>
                <MainSection/>
            </Container>
        </Main>
    )
}

export default PhotosView
