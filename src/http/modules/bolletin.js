const db = require('../../services/mysql')

module.exports = function bolletin(server) {

    // Rotas usadas pelo adm e professor
    
    // server.get('/bolletin/:codturm', async(req, res, next) => {

    //     const { codturm } = req.params

    //     try {
    //         res.send(
    //             await db.bolletin().FindGradesByClass(codturm)
    //         )

    //     } catch (error) {

    //         console.log(error)

    //         res.send({ error: error })
    //     }
    //     return next()
    // })

    // server.get('/bolletin/:codturm/:coddisc', async(req, res, next) => {
    //     const { codturm, coddisc } = req.params

    //     try {
    //         res.send(
    //             await db.bolletin().FindGradesByDiscipline(codturm, coddisc)
    //         )
    //     } catch (error) {
    //         console.log(error)
    //         res.send({ error: error })
    //     }
    //     return next()
    
    // })

    // Rotas usadas por alunos 

    server.get('/bolletin/:register', async(req, res, next) => {
        const {register } = req.params

        try {
            res.send(
                await db.bolletin().FindGradesByStudent(register)
            )
        } catch (error) {
            console.log(error)
            res.send({ error: error })
        }
        return next()
    
    })

    server.get('/bolletin/:register/:coddisc', async(req, res, next) => {
        const { coddisc, register } = req.params

        try {
            res.send(
                await db.bolletin().FindGradesByStudentAndDiscipline(register, coddisc)
            )
        } catch (error) {
            console.log(error)
            res.send({ error: error })
        }
        return next()
    
    })

}