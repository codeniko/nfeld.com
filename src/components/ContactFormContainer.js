import React, { Component } from 'react'
import { checkStatus, parseJson } from '../lib/fetch-helpers'

import { Form, LabeledTextArea, LabeledText } from './Form'
import Button from './Button'
import Spinner from './Spinner'

export default class ContactFormContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      message: '',
      submitted: false,
      spinner: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  validateForm() {
    const { name, email, message } = this.state
    return email.match(/^.+@.+\..+$/) && name && message
  }

  handleSubmit(e) {
    e.preventDefault()
    console.debug('handling submit')

    if (!this.validateForm()) {
      console.debug('Form is missing fields or email is formatted incorrectly.')
      alert('You must fill out all the fields and provide a valid email.')
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

    // show spinner
    this.setState({ spinner: true })
    const that = this

    fetch(endpoint, reqOptions)
      .then(checkStatus)
      .then(parseJson)
      .then(function(response) {
        const nextState = { spinner: false }
        if (response.error) {
          console.error('Received error on server side', response.error)
          alert('An error occured, please try again in a little bit.')
        } else {
          console.info('Contact submission server response', response)
          nextState.submitted = true
        }
        that.setState(nextState)
      })
      .catch(function(e) {
        console.error('Exception submitting contact form', e)
        that.setState({ spinner: false })
        alert('An error occured, please try again in a little bit.')
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
    const {spinner, submitted, name, email, message} = this.state

    if (submitted) {
      return (
        <div className="contact-submitted">
          <h3>Thanks! I'll get back to you soon!</h3>
        </div>
      )
    } else {
      return (
        <Form onSubmit={this.handleSubmit}>
          <LabeledText extraClasses="field" value={name} onChange={this.handleNameChange} id="name" labelText="Name" />
          <LabeledText extraClasses="field" value={email} onChange={this.handleEmailChange} id="email" labelText="Email" />
          <LabeledTextArea extraClasses="field" value={message} onChange={this.handleMessageChange} id="message" labelText="Message" rows="4" />
          <Button>{ spinner ? <Spinner /> : "Send Message"}</Button>
        </Form>
      )
    }
  }
}
