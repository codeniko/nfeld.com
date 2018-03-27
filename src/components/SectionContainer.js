import React, { Component } from 'react'
import classNames from 'classnames'
import Section from './Section'

export default class SectionContainer extends Component {

  // automatically alternates styles of sections
  render() {
    const sectionComponents = this.props.sections.map((obj, i) => {
      if (obj instanceof Section) {
        return obj
      } else {
        // append order if no order set already
        const order = i + 1
        obj.order = obj.order || order

        // alternate
        obj.alt = i % 2 === 1

        return <Section {...obj} />
      }
    })

    return (
      <section id="wrapper">
        {sectionComponents}
      </section>
    )
  }
}
