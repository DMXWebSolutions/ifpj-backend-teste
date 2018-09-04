// const port = 3456
const port = 3001

require('dotenv').config()
const server = require('./server')

server.listen(process.env.PORT || port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})