import React, { Component } from 'react'
import classNames from 'classnames'

import Link from './Link'

import './FeatureCard.css'

export default class FeatureCard extends Component {
  render() {
    const { imgUrl, imgAnchor = '#', title, subtitle, ...props } = this.props

    return (
      <article>
        <Link href={imgAnchor} className="image"><img src={imgUrl} alt="" /></Link>
        <h3 className="major">{title}</h3>
        <p>{subtitle}</p>
      </article>
    )
  }
}
