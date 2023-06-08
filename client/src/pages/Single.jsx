import React from 'react'
import Logo from '../img/logo.jpg'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import { useEffect, useState} from 'react'
import moment from 'moment'
import Menu from '../components/Menu'

const Single = ()=>{
    const [post,setPost]=useState([])

    const location=useLocation()
    const postID=location.pathname.split('/')[2]
    
    const {currentUser}=useContext(AuthContext)

    const navigate=useNavigate();
    const dateToday=moment(post.date).fromNow();

    const getText=(html)=>{
        const doc=new DOMParser().parseFromString(html,"text/html")
        return doc.body.textContent
    }
    useEffect(()=>{
        const fetchData=async()=>{
            
            try {
                const res=await axios.get(`/posts/${postID}`);
                
                setPost(res.data)
                
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[postID])

    const handleDelete= async()=>{
        try {
            await axios.delete(`/posts/${postID}`)
            navigate('/')
        } catch (error) {
            
        }
    }
    return (
        <>
        {post && (<div className="single">
            <div className="content">
                <img src={`../upload/${post?.img}`}/>
                <div className="user">
                    {post.img && <img src={`../upload/${post.img}`}/>}
                
                <div className="info">
                    <span>{post.username}</span>
                    <p>Posted {dateToday}</p>
                </div>
                {currentUser.username == post.username && (
                <div className="edit">

                    <Link to={`/write?edit=${postID}`} state={post}>
                        <img src={Edit} alt=""/>
                    </Link>
                    
                        <img src={Delete} alt="" onClick={handleDelete}/>
                    
                </div>)}
                </div>

              <h1>{post.title}</h1>
              {getText(post.description)}
            </div>

            <Menu cat={post.category}/>
        </div>
         )}
         </>

    )
}

export default Single;