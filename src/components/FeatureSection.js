import React, { Component } from 'react'

import Link from './Link'

export default class FeatureSection extends Component {
  render() {
    return (
      <div>
        <section className="features">
          {this.props.children}
        </section>
        <ul className="actions">
          <li><Link href="#" className="button">Browse All</Link></li>
        </ul>
      </div>
    )
  }
}
