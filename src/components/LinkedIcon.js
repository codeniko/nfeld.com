import React, { useState } from 'react'
import './LinkedIcon.module.scss'
// import { Link } from '@material-ui/core'
import { Link } from '@mui/material'

/*
Linked icons with padding for a greater tap surface.
Includes helpers to set hover color.
 */

// interface LinkedIconProps {
//     href: string;
//     color?: string;
//     hoverColor?: string;
//     target?: string;
//     shiftIcon?: boolean;
//     children?: any;
// }

function LinkedIcon(props) {
    const [ isHovering, setIsHovering ] = useState(false)

    const setPrimaryColor = props.color === undefined
    let hoverColor = props.color
    if (props.hoverColor !== undefined) {
        hoverColor = props.hoverColor
    }

    const iconColor = isHovering ? hoverColor : props.color
    const className = `padded-icon-link ${props.shiftIcon ? 'shift-padded-icon' : ''}`
    const target = props.target || '_self'

    const coloredChildren = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            const childProps = {}
            if (setPrimaryColor) {
                // @ts-ignore
                childProps.color = 'primary'
            } else {
                // @ts-ignore
                childProps.htmlColor = iconColor
            }
            return React.cloneElement(child, childProps)
        }
        return child
    })

    return (
        <Link className={className} href={props.href} target={target}
              onMouseLeave={() => setIsHovering(false)}
              onMouseEnter={() => setIsHovering(true)}
        >
            {coloredChildren}
        </Link>
    )
}

export default LinkedIcon
