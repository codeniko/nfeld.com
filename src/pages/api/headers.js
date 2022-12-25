export default async function handler(req, res) {
    console.log('/api/headers Request Headers: ', req.headers)

    res.status(200).json(req.headers)
}
