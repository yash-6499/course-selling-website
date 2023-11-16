const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,

    // this explains the line below " https://chat.openai.com/share/6e0d3b48-e981-47ae-ac58-50ae91617be3 "
    purchasedCourses: [
        { 
            type: mongoose.Schema.Types.ObjectId, ref: 'Course'
        }
    ]

})

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
})

const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)

module.exports = {
    User,
    Admin,
    Course
}