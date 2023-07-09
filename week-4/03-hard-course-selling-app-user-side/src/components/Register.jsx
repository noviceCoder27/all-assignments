import{useState } from "react";
import  axios  from 'axios';
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    async function register() {
        const input = {username: email,password};
        try {
            const response = await axios.post('http://localhost:3000/users/signup',input);
            const data = await response.data;
            console.log(data);
            const token = data.token;
            localStorage.setItem("token",JSON.stringify(token));
        } catch(err) {
            console.log("Registration failed " + err.message);
        }
        
    }

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <div>Email:</div>
        <input type={"text"} onChange={e => setEmail(e.target.value)} value = {email}/>
        <br/>
        <div>Password:</div>
        <input type={"text"} onChange={e => setPassword(e.target.value)} value = {password}/>
        <button onClick={register}>Register</button>
        <br />
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;