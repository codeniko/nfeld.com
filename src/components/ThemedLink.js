import React, { useState } from 'react'
import { Link, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';


/*
Themed link
Includes helpers to set hover color.
 */

// interface ThemedLinkProps {
//     href: string;
//     color?: string;
//     hoverColor?: string;
//     target?: string;
//     shiftIcon?: boolean;
//     children?: any;
// }

function ThemedLink(props) {
    const theme = useTheme()
    const [ isHovering, setIsHovering ] = useState(false)

    const setSecondaryColor = props.color === undefined && props.secondary

    const primaryColor = theme.palette.primary.main
    const primaryHoverColor = alpha(theme.palette.primary.main, 0.85)
    const secondaryColor = setSecondaryColor && theme.palette.secondary.main
    const secondaryHoverColor = setSecondaryColor && alpha(theme.palette.secondary.main, 0.85)

    const color = props.color || secondaryColor || primaryColor
    const hoverColor = props.hoverColor || secondaryHoverColor || primaryHoverColor

    const linkColor = isHovering ? hoverColor : color
    const className = ''
    const target = props.target || '_self'
    const fontWeight = (props.bold && 700) || 400

    const coloredChildren = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { color: linkColor })
        }
        return child
    })

    return (
        <Link className={className} href={props.href} target={target}
              underline='none'
              component='a'
              onMouseLeave={() => setIsHovering(false)}
              onMouseEnter={() => setIsHovering(true)}
              sx={{
                  color,
                  fontWeight,
                  '&:link': {
                      color,
                  },
                  '&:visited': {
                      color,
                  },
                  '&:hover': {
                      color: hoverColor,
                  },
                  '&:active': {
                      color,
                  },
              }}
        >
            {coloredChildren}
        </Link>
    )
}

export default ThemedLink
