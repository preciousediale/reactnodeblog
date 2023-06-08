import axios from 'axios'
import { useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

const Home = ()=>{
    const [posts,setPosts]=useState([])

    const cat=useLocation().search

    const getText=(html)=>{
        const doc=new DOMParser().parseFromString(html,"text/html")
        return doc.body.textContent
    }
    useEffect(()=>{
        const fetchData=async()=>{
            
            try {
                const res=await axios.get(`posts${cat}`);
                
                setPosts(res.data)
                
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[cat])
    return (
        <div className="home">
            <div className="posts">
               {posts.map((post)=>(
                    <div className="post" key={post.id}>
                        <div className="img" alt="">
                            <img src={`../upload/${post.img}`} alt=""/>
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>
                                    {post.title}
                                </h1>
                            </Link>
                            {getText(post.description)}
                            <button>Read more</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;