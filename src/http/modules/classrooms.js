const db = require('../../services/mysql')

module.exports = function classrooms(server) {

      server.get('/classrooms', async(req, res, next) => {

        try {
            res.send(
                await db.turmas().FindClasses()
            )

        } catch (error) {

            console.log(error)

            res.send({ error: error })
        }
        return next()
    })  


    server.get('/classrooms/disciplines/:codturm', async(req, res, next) => {

        const { codturm } = req.params

        try {
            res.send(
                await db.turmas().FindDisciplineByClass(codturm)
            )

        } catch (error) {

            console.log(error)

            res.send({ error: error })
        }
        return next()
    })

    server.get('/classrooms/students/:codturm', async(req, res, next) => {

        const { codturm } = req.params

        try {
            res.send(
                await db.turmas().FindStudentsByClass(codturm)
            )

        } catch (error) {

            console.log(error)

            res.send({ error: error })
        }
        return next()
    })

    

}