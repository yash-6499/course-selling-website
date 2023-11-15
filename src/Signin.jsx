import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'




function Signin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // console.log(email, password)

  return (
   
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px'
    }}>
      <Card variant="outlined" style={{
        padding: '20px',
        width: '500px',
      }}>
        <Typography variant='h5' style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome back, Signin below</Typography>
        <TextField
          style={{ width: '100%', marginBottom: '10px' }}
          label="Name"
          variant="outlined"
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          />

        <TextField
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          style={{ width: '100%', marginBottom: '10px' }}
          label="Email"
          variant="outlined" />

        <Button
          style={{ width: 'fit-content' }}
          variant='contained'
          onClick={async () => {
            const res = await axios.post("http://localhost:3000/admin/login", {
              username: email,
              password: password
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            })
            const data = res.data;
            localStorage.setItem("token", data.token)
            window.location = "/courses"
          }}

        >Sign in</Button>

      </Card>
    </div>
  )
}

export default Signin