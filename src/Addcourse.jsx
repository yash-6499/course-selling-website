import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';


function Addcourse(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    return <>
    
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px'
    }}>
      <Card variant="outlined" style={{
        padding: '20px',
        width: '500px',
      }}>
        <Typography variant='h5' style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Course</Typography>
        <TextField
          style={{ width: '100%', marginBottom: '10px' }}
          label="Title"
          variant="outlined"
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
          />

        <TextField
          onChange={(e)=>{
            setDescription(e.target.value)
          }}
          style={{ width: '100%', marginBottom: '10px' }}
          label="Description"
          variant="outlined" />


        <TextField
          onChange={(e)=>{
            setImage(e.target.value)
          }}
          style={{ width: '100%', marginBottom: '10px' }}
          label="ImageLink"
          variant="outlined" />

        <Button
          style={{ width: 'fit-content' }}
          variant='contained'
          onClick={async () => {
            const res = await axios.post("http://localhost:3000/admin/courses", {
              title: title,
              description: description,
              imageLink: image,
              published: true
            }, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
              }
            })
            // const data = res.data;
            // localStorage.setItem("token", data.token)
          }}

        >Add Course</Button>

      </Card>
    </div>

    </>
}

export default Addcourse