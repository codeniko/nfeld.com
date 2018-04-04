const emailjs = require('emailjs')
const config = require('config')

const TEST_EMAIL = 'niko+tests@nfeld.com'
const smtpAgentEmail = config.get('smtp.user')
const to = 'niko@nfeld.com'

const originWhitelist = [
  'https://www.nfeld.com',
  'http://www.nfeld.com',
  'https://nfeld.com',
  'http://nfeld.com',
]

function sendMail(event, context, callback) {
  const {from, name, message} = event.body

  console.info('POST payload:', event.body)

  const text = `Name: ${name}\nEmail: ${from}\n\n${message}`

  return new Promise(() => {
    let hadOkResponse = false // smtp.send is weird and calls callback twice. Once for successful message sent, in which case we should set this flag to true, and again ~1 second later with an error once stmp connection had already been disconnected. Don't log the error in this case since message was successful

    const password = config.get('smtp.pass')
    const smtp = emailjs.server.connect({
      user: smtpAgentEmail,
      password,
      host: config.get('smtp.host'),
      port: parseInt(config.get('smtp.port')),
      tls: config.get('smtp.tls') === 'true',
    })

    const smtpPayload = {
      sender: smtpAgentEmail,
      'return-path': smtpAgentEmail,
      from,
      'reply-to': from,
      to: event.isSmtpTest ? TEST_EMAIL : to,
      subject: `Message from ${name}`,
      text,
    }

    smtp.send(smtpPayload, (error, message) => {
      if (error && hadOkResponse) {
        console.warn('Received error after 200 response was sent (should be safe to ignore)', error)
      } else if (error) {
        if (event.isSmtpTest) {
          console.error('Failed Smtp test! error:', error)
        } else {
          console.error({error})
        }
        callback({error})
      } else {
        if (event.isSmtpTest) {
          console.info('Successful Smtp test! Response:', message)
        } else {
          console.info('Success!', message)
        }
        hadOkResponse = true
        callback(null, {
          statusCode: 200,
          body: {success: true}
        })
      }
    })
  })
}

  /*
function testSmtp(req, res) {
  // Unfortunately can't hit endpoint to test e2e as free firebase doesn't allow external network requests outside of google services (apparently they don't consider firebase a google service...)

  console.info('Testing smtp')

  const json = {
    name: 'Smtp',
    from: 'testsmtp@yahoo.com',
    message: 'This is an Smtp Test request.'
  }

  req.body = json
  req.isSmtpTest = true

  return sendMail(req, res)
}
*/

exports.handler = function(event, context, callback) {
  console.info('event obj', event)
  const origin = '' 
  console.info('CONFIG', config.get('smtp'))
  console.info(`Received ${event.httpMethod} request from, origin: ${origin}`)

  const isOriginWhitelisted = originWhitelist.indexOf(origin) >= 0

  if (event.httpMethod !== 'POST') {
    callback({error: 'Not found'})
      /*
  } else if (!req.is('application/json')) {
    callback({error: 'Unexpected content type'})
    */
  } else {
    return sendMail(event, context, callback)
      .catch((error) => {
        console.error({error})
        callback({error})
      })
  }
}
