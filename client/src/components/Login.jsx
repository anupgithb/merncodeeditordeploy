import React, { useState } from 'react'
import { Box,Button,styled,TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { sendUserLogin } from '../services/api';
import { toast } from 'react-hot-toast';

const FormStyle=styled(Box)`

display:flex;
justify-content:center;
width:100%;
height:100vh;
background:black;
`

const Container=styled(Box)`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
height:100vh;
`

const LoginForm = styled(Box)`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:40%;
height:80%;
background:white;
`

const Heading = styled(Box)`
font-size:40px;
margin:8px 0px 20px 0px;
font-weight:700;
`

const TextFieldStyled=styled(TextField)`
width:50%;
margin-bottom:2rem;
background:#fff!important;
font-weight:600;
border-radius:.3rem;
label{
  font-size:15px;
  font-weight:600;

}
label.Mui-focused {
  color: black; /* Replace with your desired label color */
  font-weight:600;
}
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: black;
}
`

const LoginButton=styled(Button)`
width:70px;
background:black;
color:white;
`
const ButtonStyled = styled('button')`
&:hover{
    font-size:18px;
}
`

const HomepageLink = styled(Box)`
font-size:23px;
color:blue;
`
const userDetailsIntial={
  email:'',
  password:''
}

const Login = () => {
  const [user,setUser]=useState(userDetailsIntial);

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }

  const handleSubmit=async()=>{
    console.log(user);
    let response = await sendUserLogin(user);
    if(!response) return;
    
    console.log(response,"login");
    if(response.status===200){
    toast.success(response.data.message);
    navigate("/");
    }
    else{
      toast.error(response?.data?.message);
    }
    
  }

  return (
    <FormStyle>
        <Container>
            <LoginForm>
            <Heading>login <Box component="span" style={{fontWeight:300}}>|</Box> <Link to='/' style={{textDecoration:'none'}}> <HomepageLink component="span">Judge0</HomepageLink> </Link></Heading>
            
            <TextFieldStyled id="outlined-basic" label="Email" variant="outlined" name='email' onChange={(e)=>onInputChange(e)}/>
            <TextFieldStyled id="outlined-basic" label="Password" variant="outlined" name='password' onChange={(e)=>onInputChange(e)} />
            
            
              <LoginButton variant="contained" size="large" onClick={handleSubmit}>Login</LoginButton>
              <Box style={{display:"flex",alignItems:"center",marginTop:"24px"}}>
                <Typography style={{fontWeight:'500'}}>Already have an account? </Typography>
                <Link to='/register'>
                <ButtonStyled style={{
                  background:'none',
                  border:'none',
                  color:'blue',
                  fontWeight:'700'
                }}>Register now</ButtonStyled>
                </Link>
              </Box>
              <Link to='/' style={{textDecoration:'none'}}>
              <Box style={{
                margin:'50px 0px 2px 0px',
                color:'grey',
                fontWeight:'700',
                fontSize:'23px',
                textDecoration:'none'
              }}>
                    Code Editor
              </Box>
              </Link>
            </LoginForm>
            
        </Container>
        <Box>

        </Box>
    </FormStyle>
  )
}

export default Login;