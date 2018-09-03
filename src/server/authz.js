const restify = require('restify')
const errors = require('restify-errors')
const error =  require('restify-errors')
const user = require('../services/mongo/models/users')

const authorize = (...profiles) => {
    return (req, resp, next) => {
        if(req.authenticated !== undefined && req.authenticated.hasAny(...profiles)) {
            next()
        } else {
            next( new error.ForbiddenError('Permissão negada!'))
        }

    }
}

module.exports = authorize