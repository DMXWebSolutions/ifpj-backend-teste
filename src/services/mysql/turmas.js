
const turmas = deps => {
    return {

        FindByClass: (codturm) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT * FROM turma where codplan > 0;', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar  turmas', reject)
                        return false
                    }
                    resolve({ classes: results }) 
                })
            })
        },

        FindClasses: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT * FROM turma where codplan > 0;', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar  turmas', reject)
                        return false
                    }
                    resolve({ classes: results }) 
                })
            })
        },

        FindStudentsByClass: (codturm) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT codalun, nome FROM aluno WHERE codturm = ?', [codturm], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar  alunos', reject)
                        return false
                    }
                    resolve({ students: results }) 
                })
            })
        },
        FindDisciplineByClass: (codturm) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(
                    `SELECT 
                        nomedisc, disciplina.coddisc, funcionario.nome 
                    FROM 
                        disciplina 
                    INNER JOIN 
                        grade 
                    ON 
                        disciplina.coddisc = grade.coddisc 
                    INNER JOIN
                        funcionario
                    ON
                        funcionario.matricula = grade.codfunc
                    WHERE 
                        (codturm = ? AND disciplina.coddisc < 200) 
                    GROUP BY coddisc ORDER BY coddisc`, [codturm], (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    resolve({ disciplines: results }) 
                })
            })
        },
        
    }
}



module.exports = turmas