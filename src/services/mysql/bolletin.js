const bolletin = deps => {
    return {
        FindGradesByClass: (codturm) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(
                    `SELECT * FROM nota  WHERE codturm = ?`,
                     [codturm], (error, results) => {
                        if(error) {
                            reject(error)
                        }
                        resolve({Grades: results})
                    }
                )
            })
        },
    
        FindGradesByDiscipline: (codturm, coddisc) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(
                    `SELECT * FROM nota  WHERE codturm = ? AND coddisc = ?`,
                     [codturm, coddisc], (error, results) => {
                        if(error) {
                            reject(error)
                        }
                        resolve({Grades: results})
                    }
                )
            })
        },

        FindGradesByStudent: (register) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(
                    `SELECT * FROM nota WHERE matricula = ?`,
                     [register], (error, results) => {
                        if(error) {
                            reject(error)
                        }
                        resolve({Grades: results})
                    }
                )
            })
        },

        FindGradesByStudentAndDiscipline: (register, coddisc) => {
            return new Promise((resolve, reject) => {
                const { connection } = deps
                connection.query(
                    `SELECT * FROM nota WHERE matricula = ? and coddisc = ?`,
                     [register, coddisc], (error, results) => {
                        if(error) {
                            reject(error)
                        }
                        resolve({Grades: results})
                    }
                )
            })
        }




    }

}

module.exports = bolletin

