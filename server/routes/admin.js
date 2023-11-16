const express = require('express')
const { User, Course, Admin } = require("../db/models")
const { authenticateJwt } = require("../middleware/auth")

// CONTROLLERS
const controllers = require('../controllers/admin-controllers')
const router = express.Router()

router.get('/me', authenticateJwt, controllers.me)

// ADMIN SIGNUP
router.post('/signup', controllers.signup)

// ADMIN LOGINS
router.post('/login', controllers.login)

// ADMIN CREATES COURSES
router.post('/courses', authenticateJwt, controllers.addNewCourse)

// ADMIN UPDATES COURSES
router.put('/courses/:courseId', authenticateJwt, controllers.updateCourse)

// DISPLAY ALL THE COURSES
router.get('/courses', authenticateJwt, controllers.displayAllCourses)

// DISPLAY A PARTICULAR COURSE
router.get('/courses/:courseId', authenticateJwt, controllers.displayParticularCourse)


module.exports = router