import React, {Component, ReactChild} from 'react'
import classNames from 'classnames'

import './Table.css'

type TableProps = {
  title?: string;
  columnHeaders: string[];
  footerComponent?: ReactChild;
  alt: string;
}

export class Table extends Component<TableProps> {
  render() {
    const { title, columnHeaders, footerComponent, alt, ...props } = this.props

    const columnHeaderComponents = columnHeaders.map((header: string) => <th key={`header_${header}`}>{header}</th>)
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
    return <tr>{this.props.children}</tr>
  }
}

type ColumnProps = {
  span: number
}

export class Column extends Component<ColumnProps> {
  static defaultProps = {
    span: 1
  }

  render() {
    const { span, ...props } = this.props
    return <td colSpan={span}>{props.children}</td>
  }
}
