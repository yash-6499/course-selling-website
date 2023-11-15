
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


function Course({ course }) {
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{ width: 300 }} ></img>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Button variant="contained" size="large" onClick={() => {
            }}>Edit</Button>
        </div>
    </Card>
}

function UpdateOneCourse({course, updateCourse}){
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    return <>
            <span style={{
                    display: 'flex',
                    justifyContent : 'center'
                }}>
                    <Course course={course} />
                    <Card
                        variant="outlined"
                        style={{
                            padding: "20px",
                            width: "500px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                textAlign: "center",
                                marginBottom: "20px",
                            }}
                        >
                            Update Course details
                        </Typography>
                        <TextField
                            style={{ width: "100%", marginBottom: "10px" }}
                            label="Title"
                            variant="outlined"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <TextField
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            style={{ width: "100%", marginBottom: "10px" }}
                            label="Description"
                            variant="outlined"
                        />
                        <TextField
                            onChange={(e) => {
                                setImage(e.target.value);
                            }}
                            style={{ width: "100%", marginBottom: "10px" }}
                            label="ImageLink"
                            variant="outlined"
                        />
                        <Button
                            style={{ width: "fit-content" }}
                            variant="contained"
                            onClick={updateCourse}
                        >
                            Update Course
                        </Button>
                    </Card>
                </span>
    </>
}

export default function UpdateCourse() {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState({}); // Add state to store the updated course data

    const courseId = useParams();

    // Fetch the course data when the component mounts
    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/courses/${courseId.courseId}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setCourse(response.data.course);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    const updateCourse = async () => {
        try {
            await axios.put(
                `http://localhost:3000/admin/courses/${courseId.courseId}`,
                {
                    title: title || course.title,
                    description: description || course.description,
                    imageLink: image || course.imageLink,
                    published: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            // Fetch the updated course data after updating
            fetchCourseData();
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return (
        <>
            <Link to={"/courses"}>
                <button>'Go back'</button>
            </Link>
                <UpdateOneCourse course={course} updateCourse={updateCourse} />

                
        </>
    );
}
