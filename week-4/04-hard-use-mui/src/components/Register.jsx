import{useState } from "react";
import  axios  from 'axios';
import { Flex,Box,Text } from '@mantine/core';
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    async function register() {
        const input = {username: email,password};
        try {
            const response = await axios.post('http://localhost:3000/admin/signup',input);
            const data = await response.data;
            console.log(data);
            const token = data.token;
            localStorage.setItem("token",JSON.stringify(token));
            window.location.href = '/courses'
        } catch(err) {
            console.log("Registration failed " + err.message);
        }
        
    }

    return (
        <div>
        <Box sx = {{marginTop: "3rem", marginLeft: "32rem"}}>
            <h1 style = {{fontFamily: "monospace"}}>Create Account</h1>
            <Text >Already registered? <a href = '/register' style={{textDecorationLine: "none",color: "blue"}}>Login</a></Text>
        </Box>
        <Flex direction={"column"} justify={"center"} align={"center"} sx = {{marginTop: "2rem",marginRight: "1rem"}} gap={"0.5rem"} >
            <div style = {{marginRight: "26rem"}}>Email:</div>
            <input type={"text"} onChange={e => setEmail(e.target.value)} value = {email} style = {{width: "30vw", padding: "0.5rem"}}/>
            <div style = {{marginRight: "25rem"}}>Password:</div>
            <input type={"text"} onChange={e => setPassword(e.target.value)} value = {password} style = {{width: "30vw", padding: "0.5rem"}}/>
            <button onClick={register} style = {{marginTop: "2rem", width: "31vw",padding: "0.8rem 0.5rem",backgroundColor: "darkorange",border: "none", borderRadius: "5px",fontSize: "1.2rem",color: "white",cursor: "pointer"}}>Login</button>
        </Flex>
     
    </div>
    )
}

export default Register;