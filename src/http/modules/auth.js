const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
// const User = require('../../services/mongo/models/users')
const db = require('../../services/app-services')


module.exports = function auth(server) {

    function generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 100000000
        })
    }

    // server.del('/users/:register', async (req, res, next) => {
        
    //     const { register } = req.params
    //     const user = await User.findOne({ register })

    //     if(!user) {
    //         res.send(400, { error : 'Usuario não encontrado'})
    //         next()
    //     }

    //     if(user) {
    //         await User.deleteOne({ register: register })
    //         res.send({ messages: 'Usuario removido com sucesso'})
    //         next()
    //     }

    // })

    // server.post('/register', async (req, res, next) => {

    //     const { register } = req.body

    //     try {
    //         if(await db.users())
    //             return res.send({ error: 'Usuario já registrado'})

    //         const user = await User.create(req.body)

    //         user.password = undefined

    //         // res.send({ user, token: generateToken({ id: user.id })})
    //         res.send({message: 'Usuario Cadastrado com Sucesso!' })

    //     } catch(error) {
    //         console.log(error)
    //         return res.send({ error: 'Falha ao se cadastrar'});
    //     }
    //     next()
    // })

    // server.get('/users', async(req, res, next) => {
    //     try {
    //         const users = await User.find({})
    //         res.send({users: users })
    //     } catch(error) {
    //         res.send({ error: error})
    //     }
    // })

    server.post('/authenticate', async(req, res, next) => {
        const { register, password } = req.body
        
        try {
            const response = await db.users().FindByRegister(register)
            const user = response.user[0]

            if(!user) {
                res.send(400, { error : 'Usuario não encontrado'})
                return next()
            }
    
            if(user.password !== password) {
                res.send(400, { error : 'Senha invalida'})
                return next()
            }
            
            res.send({
                user: {
                    register: user.register,
                    name: user.name,
                    profile: user.profile,
                    class: user.codturm
                },
                token: generateToken({ id: user.id })
            })
            return next()

        } catch(error) {
            console.log(error)
            res.send({error: error})
        }
    })
    
    server.post('/register', async (req, res, next) => {

        const { name, register, password, classroom, profiles  } = req.body

        try {
            if(await db.users().FindByRegister(register))
                return res.send({ error: 'Usuario já registrado'})

            const user = await db.users().save(name, register, password, classroom, profiles)

            // user.password = undefined

            // res.send({ user, token: generateToken({ id: user.id })})
            res.send({message: 'Usuario Cadastrado com Sucesso!' })

        } catch(error) {
            console.log(error)
            return res.send({ error: 'Falha ao se cadastrar usuario'});
        }
        next()
    })
    
    server.del('/users/:register', async (req, res, next) => {
        
        const response = await db.users().FindByRegister(register)
        const user = response.user[0]

        if(!user) {
            res.send(400, { error : 'Usuario não encontrado'})
            next()
        }

        if(user) {
            await User.deleteOne({ register: register })
            res.send({ messages: 'Usuario removido com sucesso'})
            next()
        }

    })

}