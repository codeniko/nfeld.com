import React, { Component } from 'react'
import ga from '../lib/ga-utils'
import log from 'loglevel'

//import NavHeader from './NavHeader'
import Modal from 'react-modal'
import Banner from './Banner'
import Button from './Button'
import SectionContainer from './SectionContainer'
import FooterSection from './FooterSection'
import Link from './Link'

import './Homepage.css'

const popchat = {
  imgUrl: 'images/popchat.jpg',
  title: 'PopChat',
  subtitle:
    <span>
      <p>Inception and development of PopChat - a fun chatbot designed to provide personal assistance through a chat platform (Kik/Facebook). Ranked 2nd overall on Kik's bot shop, handling over 25 Million messages, peaking at ~500 requests per minute. Proxied over 200k messages between users before being discontinued November 30, 2017.</p>
      <p>Development with Scala, Play framework, and Akka clustering with focus on scalable functional programming.</p>
      <p>Developed separate backend in python to utilize dlib and tensorflow to peform on-the-fly transformations on images given by users. <Link target="_blank" href="https://github.com/codeniko/shape_predictor_81_face_landmarks">Trained a facial recognition model containing 13 points around the forehead, totalling 81 facial landmarks which enabled more accurate transformations around the head.</Link> Used Protobuf for communication between the two backends. Created a QA tool for contractors to evaluate bot's image operation results on thousands of images.</p>
      <p><Link special target="_blank" href="https://yahoo.tumblr.com/post/153480238449/yahoo-brings-on-the-fun-bots-trivia-with-friends">See the bot's promotional post</Link></p>
    </span>,
}

const iosSearchApp = {
  imgUrl: 'images/ysearch.png',
  title: 'Yahoo Search App (iOS)',
  subtitle:
    <span>
      <p>Acquired ownership of Yahoo's native iOS Yahoo Search app and backends. Redesigned the app in the direction of contextual search, exploration, and personalization.</p>
      <p>Increased user engagement on the homescreen by 3X, before the app was abandoned and sunk to 2.5 stars.</p>
    </span>
}

const mobileWeb = {
  imgUrl: 'images/ysearch.png',
  title: 'Yahoo Search (Mobile web)',
  subtitle:
    <span>
      <p>Development on scalable, ReactJs based search.yahoo.com optimized for mobile browsers utilized by hundreds of millions of users.</p>
      <p>A/B testing of all new features, continuous delivery and strive for >90% code coverage.</p>
      <p>Contributed to implementation and tracking to Search for Yahoo's partnership with DoSomething.org, where Yahoo donated 10 cents per search in an effort to raise awareness and drive support for global issues.</p>
      <p><Link special target="_blank" href="https://bit.ly/searchtober">See our launch Announcement</Link></p>
  </span>,
}

const androidMail = {
  imgUrl: 'images/ymail.jpg',
  title: 'Yahoo Mail (Android)',
  subtitle: 'Currently wowing 200k+ users with new experiences on the Yahoo Mail app for Android.',
}

Modal.setAppElement('#root')

export default class Homepage extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }

    this.alert = this.alert.bind(this)
    this.closeAlertModal = this.closeAlertModal.bind(this)
  }

  componentDidMount() {
    setTimeout(function() {
      if (!window.ga) {
        log.info('ga not loaded')
        ga.refetchGtagOrLogThroughServer()
      }
    }, 1000)
  }

  alert(alert) {
    this.setState({ alert })
  }

  closeAlertModal() {
    this.setState({ alert: undefined })
  }

  render() {
    const sections = [
      androidMail,
      popchat,
      mobileWeb,
      iosSearchApp,
    ]

    const {alert} = this.state

    return (
      <div className="Homepage page-wrapper">
        <Modal
          isOpen={alert && true}
          className='alert-modal'
          overlayClassName='alert-modal-overlay'
          contentLabel='message modal'
          onRequestClose={() => { this.closeAlertModal() }}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}>
          {typeof alert === 'object' && alert.__html ? <span dangerouslySetInnerHTML={alert}></span> : alert}
          <div className='confirm-button-container'>
            <Button onClick={() => this.closeAlertModal()} text='Close' extraClasses={{'confirm-button': true}}/>
          </div>
        </Modal>

        {/* <NavHeader /> */}
        <Banner title="Nikolay Feldman" subtitle="Fullstack Software Engineer -- Scala+Play, ReactJS, iOS, and now Android" />

        <SectionContainer sections={sections} />

        <FooterSection alert={this.alert}/>

      </div>
    )
  }
}
