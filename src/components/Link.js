import React, { Component } from 'react'
import classNames from 'classnames'

export default class Link extends Component {
  render() {
    const { children, special, extraClasses, ...props } = this.props

    const className = classNames({
      special,
    }, extraClasses)

    return <a className={className} {...props}>{children}</a>
  }
}
