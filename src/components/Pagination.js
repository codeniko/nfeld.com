import React, { Component } from 'react'
import classNames from 'classnames'

import Button from './Button'
import Link from './Link'

import './Pagination.css'

export default class Pagination extends Component {

  // TODO
  insertEllipsis(pageItems, maxPages) {
    //<li><span>&hellip;</span></li>
  }

  render() {
    const { maxPages = 3, pageUrls = [] } = this.props
    const paginationItemComponents = pageUrls.map((url, i) => {
      const page = i + 1
      const isActive = false
      return <PaginationItem page={page} url={url} isActive={isActive} />
    })
    this.insertEllipsis(paginationItemComponents, maxPages)

    return (
      <ul className="pagination">
        <Button renderContainer={false} small disabled>Prev</Button>
        {paginationItemComponents}
        <Button renderContainer={false} small>Next</Button>
      </ul>
    )
  }
}

class PaginationItem extends Component {
  render() {
    const { url = '#', isActive, page } = this.props
    const pageClassName = classNames('page', {
      active: isActive,
    })

    return (
      <li><Link href={url} className={pageClassName}>{page}</Link></li>
    )
  }
}
