const notifications = deps => {
    return {
        FindAll: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT * FROM notifications order by id', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar notificações', reject)
                        return false
                    }
                    resolve({ results }) 
                })
            })
        },

        FindByClass: (classroom) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(`SELECT * FROM notifications WHERE classroom = ${classroom}`, (error, results) => {
                    if (error) {
                        reject(error, 'Falha ao listar notificações', reject)
                        return false
                    }
                    resolve({ results }) 
                })
            })
        },

        FindByRegister: (register) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(`SELECT * FROM notifications WHERE register = ${register}`, (error, results) => {
                    if (error) {
                        reject(error, 'Falha ao listar notificações', reject)
                        return false
                    }
                    resolve({ user: results }) 
                })
            })
        },

        save: (register, title, classroom, student = null, message, urlFile = null, ) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
      
                connection.query('INSERT INTO notifications (register, title, classroom, student, message, url_file) VALUES (?, ?, ?, ?, ?, ?)', [ register, title, classroom, student, message, urlFile ], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao enviar notificação`, reject)
                        return false
                    }
                    resolve({ message: 'notificação enviada com sucesso', results: results})
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

module.exports = notifications
