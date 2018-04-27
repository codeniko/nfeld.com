import React, { Component } from 'react'
import classNames from 'classnames'

import './Section.css'

export default class Section extends Component {
  render() {
    const { order, alt, imgUrl, title, subtitle } = this.props
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
          { imgUrl && <span className="image"><img src={imgUrl} alt="" /></span> }
          <div className="content">
            <h2 className="major">{title}</h2>
            { subtitleComponent }
          </div>
        </div>
      </section>
    )
  }
}
