import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';




function Signup() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

    return (
        <div style={{
          display: 'flex',
          justifyContent:'center',
          marginTop: '100px'
        }}>
            <Card variant="outlined" style={{
              padding:'20px',
              width: '500px',
            }}>
                <Typography variant='h5' style={{textAlign:'center', marginBottom:'20px'}}>Welcome to Think with Yash, Signup below</Typography>
                <TextField 
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
                style={{width:'100%', marginBottom:'10px'}} 
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                />

                <TextField 
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                style={{width:'100%', marginBottom:'10px'}} 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                />

                <Button 
                onClick={async ()=>{
                  const res = await axios.post("http://localhost:3000/admin/signup", {
                    username: email,
                    password: password
                  })
                  let data = res.data;
                  localStorage.setItem("token", data.token)
                }}
                style={{width:'fit-content'}} 
                variant='contained'>Sign up</Button>

            </Card>
        </div>
    )
}

export default Signup