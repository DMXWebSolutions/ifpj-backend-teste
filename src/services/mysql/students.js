
const students = deps => {
    return {
        FindAllStudents: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT codalun, nome, codturm FROM aluno LIMIT 10', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar  alunos', reject)
                        return false
                    }
                    resolve({ students: results }) 
                })
            })
        },

        FindAllFuncs: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT nome, matricula FROM funcionario', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar  funcionarios', reject)
                        return false
                    }
                    resolve({ employees: results }) 
                })
            })
        },
        FindByRegister: (register) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(`SELECT codalun, nome, codturm FROM aluno WHERE codalun = ${register}`, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    resolve({ student: results }) 
                })
            })
        },
    }
}



module.exports = students