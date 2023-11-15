import Signup from './Signup'
import Signin from './Signin'
import Addcourse from './Addcourse'
import AllCourses from './Courses'
import UpadateCourse from './UpdateCourse'
import './App.css'
import Appbar from './Appbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
 return (
  <>
    <Router>
      <Appbar />
      <Routes>
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/course/:courseId' element={<UpadateCourse />} />
        <Route path='/addcourse' element={<Addcourse />} />
        <Route path='/courses' element={<AllCourses />} />

      </Routes>

    </Router>
  </>
 )
}

export default App
