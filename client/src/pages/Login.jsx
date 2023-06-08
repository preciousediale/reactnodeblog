import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Login = ()=>{


    const [inputs,setInputs]=useState({username:"",password:""})
    const [err,setErr]=useState('')


    const {login}= useContext(AuthContext);

    const handleChange=(e)=>{
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    const navigate=useNavigate();

    const handleSubmit=async e=>{
        e.preventDefault();
        setErr('')
        try{
            const res=await axios.post("auth/login",inputs)
            await login(inputs)
            navigate('/')
            
            }
            catch(err){
               setErr(err.response.data);
            }
    }
    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login;