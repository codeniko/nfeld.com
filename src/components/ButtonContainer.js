import React, { Component } from 'react'
import classNames from 'classnames'

export default class ButtonContainer extends Component {
  render() {
    const className = classNames('actions', {
      small: this.props.small,
      fit: this.props.fit,
      vertical: this.props.vertical,
    }, this.props.extraClasses)

    return ( <ul className={className}>{this.props.children}</ul> )
  }
}
