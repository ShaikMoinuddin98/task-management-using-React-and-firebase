import { useState } from "react"
import "./login.css"
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { collection,setDoc,doc ,updateDoc} from "firebase/firestore"
import {database} from "../fbconfig"
import { useNavigate } from "react-router-dom"
export function Signup(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setname]=useState("")
    const auth = getAuth()
    const navigate=useNavigate()
    const collectionRef=collection(database,'users')

    async function handleSignUp(e){

    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
    .then(async (user) => {
        const docref=doc(database,'users',user.user.uid)
       await setDoc(docref,{
            name:name,
            email: user.user.email,
            tasks:[],
            collabs:[]
           })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
       
        console.log(user.user.uid)
        navigate("/home")
        //...
    })
    .catch((error) => {
        // Error
        console.log(error)
        alert(error.message)
    })
    }

    return <div>
           {/* <h1>This is the sign up page</h1>
           <form action="#">
            <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="Email" />
            <input onChange={(e) => {setPassword(e.target.value)}} type="text" placeholder="Password" />
            <button onClick={(e) => {handleSignUp(e)}}>Sign Up</button>
           </form> */}
           <h2>Sign up</h2>
        <div>
        <form action="#">
        <span>Enter Your Name</span>
        <br />
        <input onChange={(e) => {setname(e.target.value)}} type="text" placeholder="Name" id="name" />
        <br />
        <span>Enter Your Email</span>
        <br />
        <input onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" id="email"/>
        <br />
        <span>Enter Your Password</span>
        <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" id="password"/>
        <br />
        <button onClick={(e) => {handleSignUp(e)}}>sign up</button>
        </form>
        </div>
    </div>
 
}