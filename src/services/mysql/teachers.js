
const teachers = deps => {
    return {


        FindClassesByTeacher: (register) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT * FROM grade where codfunc = ? GROUP BY codturm ORDER BY codturm', [register] ,(error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar  turmas', reject)
                        return false
                    }
                    resolve({ classes: results }) 
                })
            })
        },
    }
}



module.exports = teachers