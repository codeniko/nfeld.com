import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import ThemeModeToggler from 'components/ThemeModeToggler'

const TopNav = ({ colorInvert = false }) => {
    return (
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            <Box marginRight={{ xs: 1, sm: 2 }}>
                <Link
                    underline="none"
                    component="a"
                    href="/nav1"
                    color={colorInvert ? 'common.white' : 'text.primary'}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    Nav1
                    <Box
                        padding={0.5}
                        display={'inline-flex'}
                        borderRadius={1}
                        bgcolor={'primary.main'}
                        marginLeft={1}
                    >
                        <Typography
                            variant={'caption'}
                            sx={{ color: 'common.white', lineHeight: 1 }}
                        >
                            new
                        </Typography>
                    </Box>
                </Link>
            </Box>
            <Box marginRight={{ xs: 1, sm: 2 }}>
                <Link
                    underline="none"
                    component="a"
                    href="/nav2"
                    color={colorInvert ? 'common.white' : 'text.primary'}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    Nav2
                </Link>
            </Box>
            <Box marginRight={{ xs: 1, sm: 2 }}>
                <Link
                    underline="none"
                    component="a"
                    href="/nav3"
                    color={colorInvert ? 'common.white' : 'text.primary'}
                >
                    Nav3
                </Link>
            </Box>
            <Box>
                <ThemeModeToggler/>
            </Box>
        </Box>
    )
}

TopNav.propTypes = {
    colorInvert: PropTypes.bool,
}

export default TopNav
