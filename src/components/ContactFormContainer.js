import React, { Component } from 'react'
import classNames from 'classnames'

import { Form, LabeledTextArea, LabeledText } from './Form'
import Button from './Button'

export default class ContactFormContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      message: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
  }

  handleSubmit() {
    //TODO
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }
  handleMessageChange(e) {
    this.setState({ message: e.target.value })
  }

  render() {
    const {name, email, message} = this.state
    return (
      <Form>
        <LabeledText extraClasses="field" value={name} onChange={this.handleNameChange} id="name" labelText="Name" />
        <LabeledText extraClasses="field" value={email} onChange={this.handleEmailChange} id="email" labelText="Email" />
        <LabeledTextArea extraClasses="field" value={message} onChange={this.handleMessageChange} id="message" labelText="Message" rows="4" />
        <Button onClick={this.handleSubmit} text="Send Message" />
      </Form>
    )
  }
}
