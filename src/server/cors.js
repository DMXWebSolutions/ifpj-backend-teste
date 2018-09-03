const corsMiddleware = require('restify-cors-middleware')


const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})

module.exports = cors