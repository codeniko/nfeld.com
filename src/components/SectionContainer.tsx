import React, { Component } from 'react'
import Section, {SectionProps} from './Section'

type SectionContainerProps = {
  sections: object[];
}

export default class SectionContainer extends Component<SectionContainerProps> {

  // automatically alternates styles of sections
  render() {
    const sectionComponents = this.props.sections.map((obj: object, i: number) => {
      if (obj instanceof Section) {
        return obj
      } else {
        // append order if no order set already
        const order = i + 1
        const props = obj as SectionProps
        props.order = props.order || order

        // alternate
        props.alt = i % 2 === 1

        return <Section key={`section_${i}`} {...props} />
      }
    })

    return (
      <section id="wrapper">
        {sectionComponents}
      </section>
    )
  }
}
