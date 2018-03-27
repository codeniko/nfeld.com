import React, { Component } from 'react'
import classNames from 'classnames'
import { pick } from '../lib/utils'

import ButtonContainer from './ButtonContainer'

import './Button.css'

export default class Button extends Component {
  render() {
    const { renderContainer = true, onClick, text, ...props } = this.props
    const classMap = {
      special: props.accent,
      fit: props.fit,
      big: props.big,
      small: props.small,
      icon: props.isIcon,
      disabled: props.disabled,
      ...props.extraClasses,
    }
    const buttonClassName = classNames('button', classMap)
    const buttonComponent = ( <li><button onClick={onClick} className={buttonClassName}>{text || props.children}</button></li> )

    if (renderContainer) {
      const containerClasses = pick(classMap, ['fit', 'small', 'big'])
      return ( <ButtonContainer extraClasses={containerClasses}>{buttonComponent}</ButtonContainer>)
    } else {
      return buttonComponent
    }
  }
}
