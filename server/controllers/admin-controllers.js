const { User, Course, Admin } = require("../db/models")
const jwt = require('jsonwebtoken')
const { SECRET } = require("../middleware/auth")


const me = async (req, res)=>{
    try {
        const admin = await Admin.findOne({ username: req.user.username})
        if(!admin){
            res.status(403).json({msg: "Admin doesnt exist"})
            return
        }
        res.json({
            username: admin.username
        })
    } catch (error) {
        console.log(error)
    }
}

const signup = async (req, res) => {
    try {
        const { username, password } = req.body
        const adminExist = await Admin.findOne({ username })

        if (username === undefined || password === undefined) {

            res.status(403).json({ message: 'Required field must be filled' })
        }

        

        if (adminExist) {
            res.status(403).json({ message: 'Admin already exists' })
        } else {
            const newAdmin = new Admin({ username, password })
            newAdmin.save();
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' })
            res.json({ message: 'Admin created successfully', token });
        }

    } catch (error) {
        console.log(error)

    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password)

    if (username === "" || password === "") {
        res.status(403).json({ message: 'Required field must be filled' })
    }

    if (username === undefined || password === undefined) {

        res.status(403).json({ message: 'Required field must be filled' })
    }

    try {
        const admin = await Admin.findOne({ username, password })
        if (admin) {
            //token
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' })
            res.json({ message: 'Logged in successfully', token });

        } else {
            res.status(403).json({ message: 'Invalid username or password' });
        }

    } catch (error) {
        console.log(error)

    }


}

const addNewCourse = async (req, res) => {
    try {
        const course = await Course(req.body)
        await course.save()
        res.json({ message: 'Course created successfully', courseId: course.id });
    } catch (error) {
        console.log(error)

    }
}

const updateCourse = async (req, res) => {
    console.log('helo from update backend');
    try {
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (course) {
            res.json({ message: 'Course updated successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.log(error)

    }
}

// DELETE COURSE
const deleteCourse = async (req, res) => {
    console.log('helo from delete backend');
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId)
        res.json({message: course + 'course deleted succesfully'})
    } catch (error) {
        console.log(error)
        
    }
}

const displayAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({})
        res.json({ allCourses });
    } catch (error) {
        console.log(error)
    }
}

const displayParticularCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId)
        res.json({ course });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    me,
    signup,
    login,
    addNewCourse,
    updateCourse,
    deleteCourse,
    displayAllCourses,
    displayParticularCourse
}