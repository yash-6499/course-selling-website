import { Card, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function AllCourses() {
    const [courses, setCourses] = useState([])

    useEffect(() => {



        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setCourses(data.allCourses)
        })
    },[])


    // console.log(courses)

    return <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    }}>

        {courses.map((course) => {
            return <Course key={course._id} course={course} />
        })}

    </div>

}

export function Course({course}) {
    const navigate = useNavigate();
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit and delete</Button>
        </div>
    </Card>
}

export default AllCourses