const users = deps => {
    return {
        FindAll: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT users FROM aluno LIMIT 10', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar  usuarios', reject)
                        return false
                    }
                    resolve({ users: results }) 
                })
            })
        },

        FindByRegister: (register) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(`SELECT * FROM users WHERE register = ${register}`, (error, results) => {
                    if (error) {
                        reject(error, 'Falha ao encontrar usuario', reject)
                        return false
                    }
                    resolve({ user: results }) 
                })
            })
        },
    }
}

module.exports = users;