const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
})

const errorHandler  = (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({ error: msg})
}

const studentsModule = require('./students')({ connection, errorHandler })
const turmaModule = require('./turmas')({ connection, errorHandler })
const teachersModule = require('./teachers')({ connection, errorHandler })
const bolletinModule = require('./bolletin')({ connection, errorHandler})


module.exports = {
    students: () => studentsModule,
    turmas: () => turmaModule,
    bolletin: () => bolletinModule,
    teachers: () => teachersModule,

}