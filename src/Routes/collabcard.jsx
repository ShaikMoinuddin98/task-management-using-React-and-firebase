
import { signOut,getAuth } from "firebase/auth"
import { collection,addDoc ,doc, getDoc, updateDoc} from "firebase/firestore"
import {database} from "../fbconfig"
import { useEffect, useState } from "react"
import "./taskcard.css"
const Collabcard = ({ind,data}) => {
    

    let name=data[ind].name
  let description=data[ind].description
  let date=data[ind].date
  const auth = getAuth()
  const collectionRef=collection(database,'users')
  const docref=doc(database,'users',auth.currentUser.uid)
  const collref=doc(database,'users',data[ind].collab)
  let colltasks;
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
  let tobj={...data[ind]}
  let colltasks
  await getDoc(collref)
  .then((res)=>{
    colltasks=res.data().collabs
    colltasks=colltasks.filter(i=>i.name!=tobj.name)
    console.log(colltasks)
  })
  console.log(ninp)
  data[index].name=ninp.value
  data[index].description=dinp.value
  data[index].date=datinp.value
  console.log(data)
  let updatedtasks=[...data]
  await updateDoc(docref,{collabs:data})
  
  .then(async (res)=>{
    data[index].collab=auth.currentUser.uid
    await updateDoc(collref,{collabs:[...colltasks,data[index]]})
  })

 
  
  
  let namcont=document.querySelectorAll(".heading")
  let descont=document.querySelectorAll(".desc")
  let datcont=document.querySelectorAll(".date")
  namcont[index].innerText=ninp.value
  descont[index].innerText=dinp.value
  datcont[index].innerText=datinp.value
  let sav=document.querySelectorAll(".save")
  sav[index].style.display="none"
  }

 

  return (
    <>
    
    <a onClick={()=>update(ind)} >update</a>
    
    

    
    <a onClick={()=>save(ind)} style={{display:"none"}} className="save">save</a>
  <div className='cont' >
    <h3 style={{margin:"0%"}}>Task name</h3>
      <h4 style={{margin:"0%"}} className='heading'>{name}</h4> 
      <h3 style={{margin:"0%"}}>Description</h3>
     
      <span className='desc'>{description}</span>
      <h3 id="due" style={{margin:"0%"}}>Due</h3>
      <p style={{margin:"0%"}} className='date'>{date}</p>
    </div>

    </>
  )
}

export default Collabcard
