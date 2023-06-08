import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'
const Register = ()=>{

    const [inputs,setInputs]=useState({username:"",email:"",password:""})
    const [err,setErr]=useState('')
    const handleChange=(e)=>{
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    const navigate=useNavigate();
    const handleSubmit=async e=>{
        e.preventDefault();
        try{
        const res=await axios.post("auth/register",inputs)
        navigate('/login')
        console.log(res)
        }
        catch(err){
          setErr(err.response.data);
        }
    }
    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input type="text" required placeholder="Username" onChange={handleChange}name="username"/>
                <input type="email" required placeholder="Email" onChange={handleChange} name="email"/>
                <input type="password" placeholder="Password" onChange={handleChange}name="password"/>
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default Register;