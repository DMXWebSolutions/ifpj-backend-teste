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
        save: (name, register, password, classroom = null, profiles) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
      
                connection.query('INSERT INTO users (name, register, password, class, profiles) VALUES (?, ?, ?, ?, ?)', [ name, register, password, classroom, profiles ], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao cadastrar usuario`, reject)
                        return false
                    }
                    resolve({ message: 'Usuario Cadastrado com Sucesso!', results: results})
                })
            })
        },

        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
      
                connection.query('DELETE FROM notifications WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao remover a a notificação de id ${id}`, reject)
                        return false
                    }
                    resolve({ message: 'Notificação removida com sucesso!', affectedRows: results.affectedRows })
                })
            })
        }
    }
}

module.exports = users;