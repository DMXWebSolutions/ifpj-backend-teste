const db = require('../../services/mysql')
const authorize = require('../../server/authz')

module.exports = function students(server) {
    server.get('/students', async(req, res, next) => {

        try {
            res.send(
                await db.students().FindAllStudents()
            )

        } catch (error) {
            res.send({ error: error })
        }

        return next()
    
    })

    server.get('/employees', async(req, res, next) => {

        try {
            res.send(
                await db.students().FindAllFuncs()
            )

        } catch (error) {
            res.send({ error: error })
        }

        return next()
    
    })

    server.get('/students/:register', async(req, res, next) => {

        const {register } = req.params

        try {
            res.send(
                await db.students().FindByRegister(register)
            )
        } catch (error) {

            res.send({ error: error })
        }
        return next()
    })
    
}