import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Appbar() {

    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState(null)


    useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/admin/me", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (!response.ok) { // ".ok " returns boolean value => true or false
                    throw new Error("Failed to fetch data");
                }

                
                // console.log(response)
                const data = await response.json();
                // console.log(data)
                setUserEmail(data.username)

            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error as needed (e.g., show an error message to the user).
            }
        }

        fetchData();
    }, []);




    // useEffect(() => {

    //     function callback2(data) {
    //         if (data.username) {
    //             setUserEmail(data.username)
    //         }
    //     }

    //     function callback1(res) {
    //         res.json().then(callback2)
    //     }

    //     fetch("http://localhost:3000/admin/me", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     }).then(callback1)
    // }, []) // this is using .then method to consume promise 

    if (userEmail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{ marginLeft: 10 }}>
                <Typography variant={"h6"}>Welcome, {userEmail}</Typography>
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 10, display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                        <Button
                            onClick={() => {
                                navigate("/addcourse")
                            }}
                        >Add course</Button>
                    </div>

                    <div style={{ marginRight: 10 }}>
                        <Button
                            onClick={() => {
                                navigate("/courses")
                            }}
                        >Courses</Button>
                    </div>

                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/signin";
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    } else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{ marginLeft: 10 }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 10 }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/signin")
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar