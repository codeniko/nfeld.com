import React, { Component } from 'react'
import classNames from 'classnames'
import {ExtraClassesProps} from '../index'

type LinkProps = {
  special: boolean;
  href: string;
} & ExtraClassesProps

export default class Link extends Component<LinkProps> {
  static defaultProps = {
    special: false
  }

  render() {
    const { children, special, extraClasses, ...props } = this.props

    const className = classNames({
      special,
    }, extraClasses)

    return <a className={className} {...props}>{children}</a>
  }
}
