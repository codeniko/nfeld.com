import React, { Component } from 'react'
import { checkStatus, parseJson } from '../lib/fetch-helpers'
import tracker from 'simple-tracker'
import log from 'loglevel'

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
    log.debug('handling submit')
    const alert = this.props.alert

    if (!this.validateForm()) {
      log.debug('Form is missing fields or email is formatted incorrectly.')
      alert('You must fill out all the fields and provide a valid email.')
      return
    }
    tracker.logEvent('submit_contact_form')

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
    const self = this

    const metricKey = 'contact_submit_time'
    tracker.startTimer(metricKey)
    fetch(endpoint, reqOptions)
      .then(checkStatus)
      .then(parseJson)
      .then(function(response) {
        const nextState = { spinner: false }
        tracker.stopTimer(metricKey)
        if (response.error) {
          log.error('Received error on server side', response.error)
          alert('An error occured, please try again in a little bit.')
        } else {
          log.info('Contact submission server response', response)
          alert("Message sent, thanks! I'll get back to you soon!")
          nextState.submitted = true
        }
        self.setState(nextState)
      })
      .catch(function(e) {
        tracker.stopTimer(metricKey)
        log.error('Exception submitting contact form', e)
        self.setState({ spinner: false })
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
