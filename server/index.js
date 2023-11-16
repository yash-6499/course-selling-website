// https://github.com/100xDevs-hkirat/Week-5-with-axios-and-backend/blob/master/server/routes/admin.js

const express = require('express')
const mongoose = require('mongoose')
const adminRouter = require("./routes/admin")
const cors = require('cors')
const app = express();
app.use(cors())

app.use(express.json())




app.use("/admin", adminRouter)

/*============
 CONNECTION MONGODB
============== */

mongoose
    .connect("mongodb://127.0.0.1:27017/course-selling")
    .then(() => console.log("Mongo is connected"))
    .catch(err => console.log("Mongo got some error", err))

// // user routes

// app.post('/users/signup', async (req, res) => {
//     const { username, password } = req.body
//     try {
//         const userExists = await User.findOne({ username })

//         if (userExists) {
//             res.status(403).json({ message: 'User already exists' })
//         } else {
//             const newUser = new User({ username, password })
//             newUser.save()
//             //token here
//             const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' })
//             res.json({ message: 'Admin created successfully', token });

//         }
//     } catch (error) {
//         console.log(error)
//     }
// })


// app.post('/users/login', async (req, res) => {
//     const { username, password } = req.headers;
//     try {
//         const user = await User.findOne({ username, password })

//         if (user) {
//             const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' })
//             res.json({ message: 'Logged in successfully', token });
//         } else {
//             res.status(403).json({ message: 'Invalid username or password' });
//         }
//     } catch (error) {
//         console.log(error)

//     }
// })

// app.get('/users/courses', authenticateJwt, async (req, res) => {
//     const courses = await Course.find({ published: true })
//     res.json({ courses })
// })


// app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
//     const courseId = req.params.courseId
//     const course = await Course.findById(courseId);
//     // console.log(course)
//     if (course) {

//         const user = await User.findOne({ username: req.user.username });
//         if (user) {
//             user.purchasedCourses.push(course)
//             await user.save();
//             res.json({ message: 'Course purchased successfully' });
//         } else {
//             res.status(403).json({ message: 'User not found' });
//         }
//     } else {
//         res.status(404).json({ message: 'Course not found' });
//     }
// })


// app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
//     const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses')
//     if (user) {
//         // this conversation with chatgpt explain the line below " https://chat.openai.com/share/6e0d3b48-e981-47ae-ac58-50ae91617be3 "
//         res.json({ purchasedCourses: user.purchasedCourses || [] });

//     } else {
//         res.status(403).json({ message: 'User not found' });
//     }
// })



app.listen(3000, () => console.log(' server is running on port 3000'))