import {useState} from "react";
import axios from "axios";


/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    async function login() {
        const input = {username: email,password};
        const headers = {
            "Content-Type" : "application/json",
            "username": email,
            "password": password
        }
        try {
            const response = await axios.post('http://localhost:3000/users/login',input,{headers});
            const data = await response.data;
            const token = data.token;
            localStorage.setItem("token",JSON.stringify(token));
        } catch(err) {
            console.log("Registration failed " + err.message);
        }
        
    }
    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        <div>Email:</div>
        <input type={"text"} onChange={e => setEmail(e.target.value)} value = {email}/>
        <br/>
        <div>Password:</div>
        <input type={"text"} onChange={e => setPassword(e.target.value)} value = {password}/>
        <button onClick={login}>Login</button>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;