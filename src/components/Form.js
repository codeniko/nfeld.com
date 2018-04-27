import React, { Component } from 'react'
import classNames from 'classnames'
import uuidv4 from 'uuid/v4'

import './Form.css'

export class Form extends Component {
  render() {
    const { onSubmit, ...props } = this.props

    return (
      <form onSubmit={onSubmit}>
        {/*<div className="row uniform">*/}
        {props.children}
        {/*</div>*/}
      </form>
    )
  }
}

class LabeledInput extends Component {
  //6u 12u$(xsmall)
  render() {
    const { noLabel, labelAfterInput = false, inputId, labelText, extraClasses = '12u', ...props } = this.props
    const className = classNames(extraClasses)
    return (
      <div className={className}>
        { !noLabel && !labelAfterInput && <label htmlFor={inputId}>{labelText}</label> }
        {props.children}
        { !noLabel && labelAfterInput && <label htmlFor={inputId}>{labelText}</label> }
      </div>
    )
  }
}

export class LabeledText extends Component {
  render() {
    const { id, onChange, value, name, ...props } = this.props

    return (
      <LabeledInput inputId={id} {...props} >
        <input type="text" name={name || id} id={id} onChange={onChange} value={value} />
      </LabeledInput>
    )
  }
}

export class LabeledSelect extends Component {

  renderOptions(options) {
    return options.map(this.renderOption).filter((o) => o) // filter out undefined options
  }

  // only value is required in option
  renderOption(option) {
    const {text, value} = option
    if (value || value === '')
      return <option key={uuidv4()} value={value}>{text || value}</option>
    else
      console.error('LabeledSelect option component is missing values 1', option)
  }

  render() {
    const { value, id, name, selectOptions, onChange, ...props } = this.props

    const optionComponents = selectOptions.map(o => {
      const {text, value, group, groupLabel} = o
      if (group && (groupLabel || text || value || value === '')) {
        const options = this.renderOptions(group)
        return <optgroup label={groupLabel || text || value}>{options}</optgroup>
      } else if (value || (typeof value === 'string' && value.length >= 0)) {
        return this.renderOption(o)
      } else {
        console.error('LabeledSelect option component is missing values 2', o)
        return null
      }
    })

    return (
      <LabeledInput inputId={id} {...props} >
        <div class="select-wrapper">
          <select name={name || id} id={id} onChange={onChange}>
            {optionComponents}
          </select>
        </div>
      </LabeledInput>
    )
  }
}

export class LabeledRadio extends Component {
  render() {
    return <LabeledCheckbox type="radio" {...this.props}/>
  }
}

export class LabeledCheckbox extends Component {
  render() {
    const { id, name, onChange, checked = false, type = 'checkbox', ...props } = this.props

    return (
      <LabeledInput inputId={id} labelAfterInput {...props} >
        <input type={type} id={id} name={name || id} checked={checked} onChange={onChange} />
      </LabeledInput>
    )
  }
}

export class LabeledTextArea extends Component {
  render() {
    const { id, name, onChange, rows, ...props } = this.props

    return (
      <LabeledInput inputId={id} {...props} >
        <textarea name={name || id} id={id} rows={rows} onChange={onChange} />
      </LabeledInput>
    )
  }
}
