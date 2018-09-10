// const Notifications = require('../../services/mongo/models/notifications')
// const User = require('../../services/mongo/models/users')

const db = require('../../services/app-services')

// const duplicateRemove =  async () => { //Remove os dados duplicados no banco MONGODB

//     var duplicates = [];

//     try {
//         let data = await Notifications.aggregate([
//             {
//                 "$group": { 
//                     _id:{"title": "$title", "classroom": "$classroom", "message": "$message"},
//                     dups: { $addToSet: "$_id"},
//                     count: {$sum: 1} 
//                 }
//             },
//             {
//                 "$match": {
//                     count: { "$gt": 1 }
//                 }
//             }
//         ])

//         data.forEach( doc => {
//             doc.dups.shift()
//             doc.dups.forEach( dupId => {
//                 duplicates.push(dupId)
//             })
//         })

//         Notifications.remove({_id:{$in: duplicates}}).exec()

//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports = function notifications(server) {

    server.post('/notifications/classroom', async (req, res, next) => {
        const { register, title, classroom, student, message, urlfile } = req.body
        try {
            const notification = await db.notifications().save(register, title, classroom, student, message, urlfile)
            res.header('Content-Type', 'application/json');
            res.send(200, { message: notification })      
        } catch(error) {
            res.send(404, { error: error });
        }
        
    })

    server.get('/notifications', async (req, res, next ) => {

        try {
            const notifications = await db.notifications().FindAll()
            res.send({ notifications: notifications })
        } catch(error) {
            res.send(422, {error})
        }

        return next()
    })

    server.del('/notifications/:id', async (req, res, next ) => {

        const { id } = req.params
        const notification = await db.notifications().del(id) 

        if(!notification) {
            res.send(400, { error : 'Notificação não encontrada'})
            next()
        }

        if(notification) {
            await Notifications.deleteOne({  id: id })
            res.send({ messages: 'Notificação removida com sucesso'})
            next()
        }
    })

    server.get('/notifications/:classroom', async (req, res, next ) => {
        const { classroom } = req.params 

        try {
            const notifications = await db.notifications().FindByClass(classroom)
            res.send({ notifications: notifications })
        } catch(error) {
            res.send({error: error})
        }
        return next()
    })
    
    server.get('/notifications/teacher/:register', async (req, res, next ) => {
        const { register } = req.params 
        
        try {
            const notifications = await db.notifications().FindByRegister(register)
            res.send({ notifications: notifications })

        } catch(error) {
            res.send({error: error})
        }
        return next()
    })    
}