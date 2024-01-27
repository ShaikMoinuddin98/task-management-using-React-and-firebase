import { signOut,getAuth } from "firebase/auth"
import { collection,addDoc ,doc, getDoc, updateDoc} from "firebase/firestore"
import {database} from "../fbconfig"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Taskcard from "./taskcard.jsx"
export function Home(){
    let navigate=useNavigate()
    const auth = getAuth()
    async function handleSignOut(){
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }
    
    const collectionRef=collection(database,'users')
    const docref=doc(database,'users',auth.currentUser.uid)
    let [data,setdata]=useState('')
    let [arr,settasks]=useState([])
   useEffect(()=>{
    async function get()
    {
    let getdata=await getDoc(docref)
    setdata(getdata.data())
    settasks(getdata.data().tasks)
    }
    get()
   },[])
  async function remove(item)
  {
    
    let ind=arr.indexOf(item)
    console.log(ind)
    let updatedtasks=arr.filter((i)=>arr.indexOf(i)!=ind)
    settasks(updatedtasks)
 console.log(updatedtasks)

    await updateDoc(docref,{tasks:updatedtasks})
   
   

    console.log(data.tasks)
  }
   async function add()
   { 
    let tinp=document.querySelector("#taskinput").value
    let tdesc=document.querySelector("#taskdescription").value
    let tdate=document.querySelector("#taskdate").value
    let taskinp=document.querySelector("#taskinpbox")
    taskinp.style.display="block"
    if(tinp!='' && tdesc!='' && tdate!='')
    {
    let updatedtasks=[...arr,{name:tinp,description:tdesc,date:tdate,status:false}]
    await updateDoc(docref,{tasks:updatedtasks})
    settasks(updatedtasks)
    }
    console.log(updatedtasks)

    
   }
   async function check(item){
    let ch=document.querySelector("#checkstat")
   
    if(item.status==false)
    {
        item.status=true
        
    }
    else
    {
        
        item.status=false
    }
    let updatedtasks=[...arr]
    await updateDoc(docref,{tasks:updatedtasks})
    settasks(updatedtasks)
    console.log(updatedtasks)
   }
   function sortcompletionstat()
   {
   let updatedtasks=[...arr.filter(i=>i.status===false),...arr.filter(i=>i.status===true)]
   settasks(updatedtasks)
   console.log(updatedtasks)
   }


    return ( <div>
        <h2>Welcome,{data.name}</h2>
        <div style={{display:"flex",justifyContent:"space-around"}}>
        
        <button onClick={() => {handleSignOut()}}>Sign Out</button>
        <button onClick={add}>Add Task</button>
        </div>
        <div style={{display:"none"}} id="taskinpbox">
        <input id="taskinput" type="text" placeholder="Enter Task name" />
        <br />
        <input id="taskdescription" type="text" placeholder="Enter Task description" />
        <br />
        <input id="taskdate" type="date" />
        </div>
       
        {(arr=='')?<h3>no tasks</h3>:<div style={{display:"flex",justifyContent:"space-around"}}><h3>Your Tasks</h3> <h3><a onClick={sortcompletionstat}>Sort</a></h3></div>}
        {(arr==[])?<span>No tasks now</span>:
        arr.map((i)=> <><Taskcard ind={arr.indexOf(i)} data={i}/> <div style={{display:"flex",justifyContent:"space-around"}}>
          <input checked={i.status} onClick={()=>check(i)} style={{margin:"0%",padding:"0%", width:"auto"}} type="checkbox"  id="checkstat" />  <a onClick={()=>navigate("/collab",{ state: {data:arr,ind:arr.indexOf(i)} })}>collab</a> <a  onClick={()=>remove(i)}>Remove</a> </div><br /><br /></> )
        }
    </div> 
    )
    
}