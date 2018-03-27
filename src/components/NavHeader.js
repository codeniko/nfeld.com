import React, { Component } from 'react'

import NavMenu from './NavMenu'
import Link from './Link'

import './NavHeader.css'

export default class NavHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showMenu: false,
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  showMenu() {
    this.setState({ showMenu: true })
  }

  closeMenu() {
    this.setState({ showMenu: false })
  }

  render() {
    return (
      <div>
        <header id="header" className="alt">
          <h1><Link href="/">Nikolay Feldman</Link></h1>
          <nav onClick={this.showMenu}>
            <Link href="#menu">Menu</Link>
          </nav>
        </header>

        <NavMenu showMenu={this.state.showMenu} closeMenuHandler={this.closeMenu} />
      </div>
    )
  }
}
