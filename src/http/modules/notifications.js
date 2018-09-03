const Notifications = require('../../services/mongo/models/notifications')
const User = require('../../services/mongo/models/users')
const db = require('../../services/mongo/index')


const duplicateRemove =  async () => { //Remove os dados duplicados no banco MONGODB

    var duplicates = [];

    try {
        let data = await Notifications.aggregate([
            {
                "$group": { 
                    _id:{"title": "$title", "classroom": "$classroom", "message": "$message"},
                    dups: { $addToSet: "$_id"},
                    count: {$sum: 1} 
                }
            },
            {
                "$match": {
                    count: { "$gt": 1 }
                }
            }
        ])

        data.forEach( doc => {
            doc.dups.shift()
            doc.dups.forEach( dupId => {
                duplicates.push(dupId)
            })
        })

        Notifications.remove({_id:{$in: duplicates}}).exec()

    } catch (error) {
        console.log(error)
    }
}

module.exports = function notifications(server) {

    server.post('/notifications/classroom', async (req, res, next) => {

        try {
            const notification = await Notifications.create({ ...req.body, user: req.userId})
            duplicateRemove()

            res.send({ message: notification })   
            
        } catch(error) {
            res.send(400, { error: error });
        }
        return next()
    })

    server.get('/notifications', async (req, res, next ) => {

        try {
            const notifications = await Notifications.find({}).sort({createdAt: -1}).populate(['user'])
            res.send({ notifications: notifications })

        } catch(error) {
            res.send({error: error})
        }
        return next()
    })

    server.del('/notifications/:id', async (req, res, next ) => {

        const { id } = req.params
        const notification = await Notifications.findOne({ _id: id })

        if(!notification) {
            res.send(400, { error : 'Notificação não encontrada'})
            next()
        }

        if(notification) {
            await Notifications.deleteOne({  _id: id })
            res.send({ messages: 'Notificação removida com sucesso'})
            next()
        }
    })

    server.get('/notifications/:classroom', async (req, res, next ) => {

        const { classroom } = req.params 
        const classe = classroom.toString();

        try {
            const notifications = await Notifications.find({ classroom: classe }).sort({createdAt: -1}).populate(['user'])
            res.send({ notifications: notifications })
        } catch(error) {
            res.send({error: error})
        }
        return next()
    })
    
    server.get('/notifications/teacher/:register', async (req, res, next ) => {

        const { register } = req.params 

        try {
            const user = await User.findOne({ register })
            const notifications = await Notifications.find({ user: user._id}).sort({createdAt: -1}).populate(['user'])
            res.send({ notifications: notifications })

        } catch(error) {
            res.send({error: error})
        }
        return next()

        // const { register } = req.params 

        // try {
        //     const user = await User.findOne({ register })
        //     console.log(user)
        //     console.log(user._id)
        //     const notifications = await Notifications.find({ user: user._id }).sort({createdAt: -1}).populate(['user'])
        //     res.send({ notifications: notifications })
        // } catch(error) {
        //     res.send({error: error})
        // }
        // return next()
    })    
}