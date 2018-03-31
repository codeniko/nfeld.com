import React, { Component } from 'react'
import classNames from 'classnames'
import { checkStatus, parseJson } from '../lib/fetch-helpers'

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
    this.validateForm = this.validateForm.bind(this)
  }

  validateForm() {
    const { name, email, message } = this.state
    return email.match(/^.+\@.+\..+$/) && name && message
  }

  handleSubmit(e) {
    e.preventDefault()
    console.debug('handling submit')

    if (!this.validateForm()) {
      console.debug('Form is missing fields or email is formatted incorrectly.')
      return
    }

    const { name, email, message } = this.state
    const endpoint = '/sendMail'
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        from: email,
        message,
      })
    }

    // todo show spinner

    fetch(endpoint, reqOptions)
      .then(checkStatus)
      .then(parseJson)
      .then(function(response) {
        // todo hide spinner

        if (response.error) {
          console.error('Received error on server side', response.error)
        } else {
          console.info('Contact submission server response', response)
          // todo remove form and show success message
        }
      })
      .catch(function(e) {
        console.error('Exception submitting contact form', e)
      })
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
      <Form onSubmit={this.handleSubmit}>
        <LabeledText extraClasses="field" value={name} onChange={this.handleNameChange} id="name" labelText="Name" />
        <LabeledText extraClasses="field" value={email} onChange={this.handleEmailChange} id="email" labelText="Email" />
        <LabeledTextArea extraClasses="field" value={message} onChange={this.handleMessageChange} id="message" labelText="Message" rows="4" />
        <Button text="Send Message" />
      </Form>
    )
  }
}
