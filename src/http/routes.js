const db = require('../services/mysql')
const students = require('./modules/students')
const classrooms = require('./modules/classrooms')
const bolletin = require('./modules/bolletin')
const teachers = require('./modules/teachers')
const auth = require('./modules/auth')
const notifications = require('./modules/notifications')


const routes = (server) => {
    auth(server)
    students(server)
    classrooms(server)
    bolletin(server)
    teachers(server)
    notifications(server)
}

module.exports = routes