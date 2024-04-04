import { useContext, useState } from "react"
import {Navigate} from 'react-router-dom'
import { UserContext } from "../usercontext"

export default function LoginPage(){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [redirect,setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)
    async function login(e){
        e.preventDefault();
       const response = await fetch('http://localhost:4000/login',{
            method: 'POST',
            body: JSON.stringify({userName,password}),
            headers: {'Content-Type':'application/json'},
            // saving cookie token from index.js
            credentials: 'include'
        });
        if(response.ok)
        {
            console.log("done");
            response.json().then(userInfo =>{
                setUserInfo(userInfo)
                setRedirect(true)
            })
            
        }
        else{
            
            alert('wrong credentials')
        }
    }

    if(redirect){
        return <Navigate to ={'/'} />
    }



    return(
        <form className="login" onSubmit={login}>
        <h1>Login</h1>
            <input type="text" 
            placeholder="username" 
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}/>
            <input type="password" 
            placeholder="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} />
            <button>login</button>
        </form>
    )
}