import React, { Component } from 'react'
import classNames from 'classnames'

import { Form, LabeledTextArea, LabeledText } from './Form'
import Button from './Button'
import Link from './Link'
import ContactFormContainer from './ContactFormContainer'

import './FooterSection.css'

export default class FooterSection extends Component {
  render() {
    return (
      <section id="footer">
        <div className="inner">
          <h2 className="major">Get in touch</h2>

          <ContactFormContainer />

          <ul className="contact">
            <li className="fa-envelope"><Link href="mailto:niko@nfeld.com">niko@nfeld.com</Link></li>
            <li className="fa-phone">(347) 603-2438</li>
            <li className="fa-github"><Link target="_blank" href="https://www.github.com/codeniko">github.com/codeniko</Link></li>
            <li className="fa-linkedin"><Link target="_blank" href="https://www.linkedin.com/in/nikofeld">linkedin.com/in/nikofeld</Link></li>
            <li className="fa-facebook"><Link target="_blank" href="https://www.facebook.com/nfeld">facebook.com/nfeld</Link></li>
          </ul>
          <ul className="copyright">
            <li>&copy; Nikolay Feldman</li>
            <li>All rights reserved.</li>
            <li>Practicing my ReactJitsu, check out the <Link target="_blank" href="https://github.com/codeniko/nfeld.com">source code</Link></li>
          </ul>
        </div>
      </section>
    )
  }
}
