import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./taskcard.css"
import { signOut,getAuth } from "firebase/auth"
import { collection,addDoc ,doc, getDoc, updateDoc} from "firebase/firestore"
import {database} from "../fbconfig"
import { useEffect, useState } from "react"

function Taskcard({ind,data})
{
  let name=data.name
  let description=data.description
  let date=data.date
  const auth = getAuth()
  const collectionRef=collection(database,'users')
  const docref=doc(database,'users',auth.currentUser.uid)
  let [arr,settasks]=useState([])
  useEffect(()=>{
   async function get()
   {
   let getdata=await getDoc(docref)
  
   settasks(getdata.data().tasks)
   }
   get()
  },[])


function update(index)
{
  let ninp=document.querySelectorAll(".heading")
  let dinp=document.querySelectorAll(".desc")
  let datinp=document.querySelectorAll(".date")
  console.log(ninp)
  console.log(index)
  ninp[ind].innerHTML=`<input class='nameinp' type='text' value=${name} >`
  dinp[ind].innerHTML=`<input class='descinp' type='text' value=${description} >`
  datinp[ind].innerHTML=`<input class='datinp' type='date' value=${date} >`
  let sav=document.querySelectorAll(".save")
  sav[index].style.display="block"
  console.log(sav) 
}
async function save(index)
{
  let ninp=document.querySelector(".nameinp")
  let dinp=document.querySelector(".descinp")
  let datinp=document.querySelector(".datinp")
  console.log(ninp)
  arr[index].name=ninp.value
  arr[index].description=dinp.value
  arr[index].date=datinp.value
  console.log(arr)
  let updatedtasks=[...arr]
  await updateDoc(docref,{tasks:arr})
  settasks(updatedtasks)
  let namcont=document.querySelectorAll(".heading")
  let descont=document.querySelectorAll(".desc")
  let datcont=document.querySelectorAll(".date")
  namcont[index].innerText=ninp.value
  descont[index].innerText=dinp.value
  datcont[index].innerText=datinp.value
  let sav=document.querySelectorAll(".save")
  sav[index].style.display="none"

}
    let styling={backgroundColor:'white'}
  return (
    
    <>
    
    <a onClick={()=>update(ind)} >update</a>
    
  

    
    <a onClick={()=>save(ind)} style={{display:"none"}} className="save">save</a>
    <div className='cont' >
      <h4 style={{margin:"0%"}}>Task name</h4>
      <h3 style={{margin:"0%"}} className='heading'>{name}</h3> 
      <h4 style={{margin:"0%"}}>Description</h4>
      <span className='desc'>{description}</span>
      <h4 id="due" style={{margin:"0%"}}>Due</h4>
      <p style={{margin:"0%"}} className='date'>{date}</p>
    </div>

    </>
    
   
  )
}

export default Taskcard
