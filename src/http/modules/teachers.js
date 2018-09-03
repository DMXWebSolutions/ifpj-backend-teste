const db = require('../../services/mysql')

module.exports = function teachers(server) {

      server.get('/teachers/:register/classrooms', async(req, res, next) => {
        const { register } = req.params

        try {
            res.send(
                await db.teachers().FindClassesByTeacher(register)
            )
        } catch (error) {
            console.log(error)
            res.send({ error: error })
        }
        return next()
    })  


    // server.get('/classrooms/disciplines/:codturm', async(req, res, next) => {

    //     const { codturm } = req.params

    //     try {
    //         res.send(
    //             await db.turmas().FindDisciplineByClass(codturm)
    //         )

    //     } catch (error) {

    //         console.log(error)

    //         res.send({ error: error })
    //     }
    //     return next()
    // })

    // server.get('/classrooms/students/:codturm', async(req, res, next) => {

    //     const { codturm } = req.params

    //     try {
    //         res.send(
    //             await db.turmas().FindStudentsByClass(codturm)
    //         )

    //     } catch (error) {

    //         console.log(error)

    //         res.send({ error: error })
    //     }
    //     return next()
    // })

    

}