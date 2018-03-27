import React, { Component } from 'react'

import './Banner.css'

export default class Banner extends Component {
  render() {
    return (
      <section id="banner">
        <div className="inner">
          {/*<div className="logo"><span className="icon fa-diamond"></span></div>*/}
          <h2>{this.props.title}</h2>
          <p>{this.props.subtitle}</p>
        </div>
      </section>
    )
  }
}
