import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import MuiLink from '@mui/material/Link'

const Footer = () => {
    const theme = useTheme()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box
                    display={'flex'}
                    justifyContent={'end'}
                    alignItems={'center'}
                    width={1}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                >
                    <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
                        <Box marginTop={1} marginRight={4}>
                            <Link href="/" passHref>
                                <MuiLink
                                    underline="none"
                                    component="a"
                                    color="text.primary"
                                    variant={'subtitle2'}
                                >
                                    Home
                                </MuiLink>
                            </Link>
                        </Box>
                        <Box marginTop={1} marginRight={0}>
                            <Link href="/photos" passHref>
                                <MuiLink
                                    underline="none"
                                    component="a"
                                    color="text.primary"
                                    variant={'subtitle2'}
                                >
                                    How does Niko even look like?
                                </MuiLink>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    align={'center'}
                    variant={'subtitle2'}
                    color="text.secondary"
                    gutterBottom
                >
                    &copy; 2022, Nikolay Feldman (codeniko). All rights reserved
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer
