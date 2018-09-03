// const mongoose = require('../index')

// const NotificationsSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: false,
//     },
//     classroom: {
//         type: String,
//         required: true
//     },
//     student: {
//         type: String,
//         required: false
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     message: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// })

// const Notifications = mongoose.model('Notifications', NotificationsSchema)

// module.exports = Notifications