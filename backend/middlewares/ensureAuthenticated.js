import JWT from 'jsonwebtoken'

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization']
    if (!auth) {
        return res.status(403).json({
            message: 'Unauthorized... Login Required'
        })
    }
    try {
        const decodedData = JWT.verify(auth, process.env.JWT_SECRET)
        req.user = decodedData
        next()
    } catch (error) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token wrong or expired'
        })
    }
}
export {ensureAuthenticated}