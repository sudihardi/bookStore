const hyperId = require('hyperid')

function authentication (req, res, next) {
// Bearer c6F30AanQKS+oNZ+nDgTEg/0
    const authorization = req.headers.authorization
    const token = authorization.split(' ')[1]
    const isValidToken = hyperId.decode(token)
    if (!isValidToken){
        res.status(401).send('token is wrong')
    }
    next();
}

module.exports = authentication