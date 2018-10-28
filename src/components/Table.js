import React, { Component } from 'react'
import classNames from 'classnames'

import './Table.css'

export class Table extends Component {
  render() {
    const { title, columnHeaders, footerComponent, alt, ...props } = this.props

    const columnHeaderComponents = columnHeaders.map(header => <th key={`header_${header}`}>{header}</th>)
    const tableClassName = classNames({ alt })

    return (
      <section>
        { title && <h4>{title}</h4> }
        <div className="table-wrapper">
          <table className={tableClassName}>
            <thead>
              <tr>{columnHeaderComponents}</tr>
            </thead>
            <tbody>{props.children}</tbody>
            { footerComponent && <tfoot>{footerComponent}</tfoot> }
          </table>
        </div>
      </section>
    )
  }
}

export class Row extends Component {
  render() {
    const { span, ...props } = this.props
    return <tr rowSpan={span}>{props.children}</tr>
  }
}

export class Column extends Component {
  render() {
    const { span, ...props } = this.props
    return <td colSpan={span}>{props.children}</td>
  }
}
