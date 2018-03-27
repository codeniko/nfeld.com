import React, { Component } from 'react'
import classNames from 'classnames'

import Link from './Link'

import './Section.css'

export default class Section extends Component {
  render() {
    const { order, alt, imgUrl, imgAnchor = '#', title, subtitle, ...props } = this.props
    const sectionClassName = classNames('wrapper', 'spotlight', {
      alt,
      style1: order === 1,
      style2: order === 2,
      style3: order === 3,
      style4: order === 4,
    })

    // subtitle could be a string or a Component
    const subtitleComponent = typeof subtitle === 'string' ? <p>{subtitle}</p> : subtitle

    return (
      <section id="one" className={sectionClassName}>
        <div className="inner">
          { imgUrl && <Link href={imgAnchor} className="image"><img src={imgUrl} alt="" /></Link> }
          <div className="content">
            <h2 className="major">{title}</h2>
            { subtitleComponent }
          </div>
        </div>
      </section>
    )
  }
}
