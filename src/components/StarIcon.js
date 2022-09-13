import React from 'react'
import { StarRate as Star } from '@mui/icons-material'

function StarIcon(props) {

    return (
        <Star color={'secondary'} sx={{
            transform: 'scale(0.9)',
            position: 'relative',
            top: '4px',
        }} />
    )
}

export default StarIcon
