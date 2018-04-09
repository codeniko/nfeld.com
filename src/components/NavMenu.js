import React, { Component } from 'react'
import classNames from 'classnames'

import Link from './Link'

export default class NavMenu extends Component {
  render() {
    const { showMenu, closeMenuHandler } = this.props
    const className = classNames({ 'is-menu-visible': showMenu })

    return (
      <nav id="menu" className={className} onClick={closeMenuHandler}>
        <div className="inner" onClick={(e) => { e.stopPropagation() }}>
          <h2>Menu</h2>
          <ul className="links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
          <Link href="#" extraClasses="close" onClick={closeMenuHandler}>Close</Link>
        </div>
      </nav>
    )
  }
}
