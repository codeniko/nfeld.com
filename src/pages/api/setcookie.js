import Cookies from 'cookies'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(404).end()
        return
    }

    console.log('/api/setcookie Request Headers: ', req.headers)

    const cookies = new Cookies(req, res)
    const cookieNames = Object.keys(req.query)

    const httpOnly = !!cookieNames.find(it => it.toLowerCase() === 'httponly')
    const deleteCookie = req.query.delete
    if (deleteCookie) {
        if (Array.isArray(deleteCookie)) {
            deleteCookie.forEach(it => cookies.set(it))
        } else {
            cookies.set(deleteCookie)
        }
    }

    cookieNames.forEach(cookie => {
        // ignore certain names
        if (cookie.toLowerCase() === 'delete' || cookie.toLowerCase() === 'httponly') {
            return
        }

        const value = req.query[cookie]
        const isArrayValue = Array.isArray(value)

        if (isArrayValue) {
            return // ignore duplicate cookie names
        }
        cookies.set(cookie, value, {
            domain: '.nfeld.com',
            path: '/',
            maxAge: 600000,
            httpOnly,
        })
    })


    res.status(200).json(req.headers)
}
