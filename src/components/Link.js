import React, { Component } from 'react'
import classNames from 'classnames'

export default class Link extends Component {
  render() {
    const { children, special, additionalClasses, ...props } = this.props

    const className = classNames({
      special,
    }, additionalClasses)

    return <a className={className} {...props}>{children}</a>
  }
}
