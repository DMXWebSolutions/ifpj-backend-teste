// const mongoose = require('../index')
// const bcrypt = require('bcrypt')

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     register: {
//         type: String,
//         unique: true,
//         required: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         required: true,
//         select: false
//     },
//     class: {
//         type: String,
//         required: false
//     },
//     passwordResetToken: {
//         type: String,
//         select: false
//     },
//     passwordResetExpires: {
//         type: Date,
//         select: false
//     },
//     profiles: {
//         type: String,
//         required: false,
//         enum: ['ALUNO', 'PROFESSOR', 'ADMIN']
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     }
// });

// UserSchema.methods.hasAny = function(...profiles) {
//     return profiles.some(profile => this.profiles.indexOf(profile) !== -1)
// }

// UserSchema.pre('save', async function(next) {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
//     next();
// }) 

// const User = mongoose.model('User', UserSchema)

// module.exports = User;