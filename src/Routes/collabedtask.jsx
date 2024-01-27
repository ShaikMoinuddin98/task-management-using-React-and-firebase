import { getAuth } from "firebase/auth"
import { database } from "../fbconfig"
import { getDoc,doc, collection,updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import Taskcard from "./taskcard"
import Collabcard from "./collabcard"
const Collabedtask = () => {
    let auth=getAuth()
    let cuid=auth.currentUser.uid
    let docref=doc(database,'users',cuid)
   let [colluid,setuid]=useState('')
    let [ctask,setctask]=useState([])
    let [tasks,settasks]=useState([])
    let cref
    useEffect(()=>{
        async function get()
        {
            await getDoc(docref)
            .then((res)=>{
                let narr=res.data().collabs
                let carr=[...narr]
                settasks(carr)
                console.log(tasks)
                  console.log(narr[0].collab)
                  setuid(narr[0].collab)

                  console.log(colluid)
                
            })
           cref=doc(database,"users",colluid)
            await getDoc(cref)
            .then((res)=>{
              let newarr=res.data().collabs
              let uparr=[...newarr]
              setctask(uparr)
              console.log(ctask)
            })
            

        }
        get()
    },[])

   
   


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
      let updatedtasks=[...tasks]
      let uparr=ctask.filter((i)=>i.name!=item.name)
      console.log(uparr)
      settasks(updatedtasks)
      console.log(ctask)
      await updateDoc(docref,{collabs:updatedtasks})
      .then(async (res)=>{
        console.log(item)
        let nar=[...uparr,item]
        console.log(nar)
        console.log(colluid)
        cref=doc(database,"users",colluid)
      await updateDoc(cref,{collabs:nar})
      console.log(updatedtasks)
      })
     }

     async function remove(item)
     {
       
       let ind=tasks.indexOf(item)
       console.log(ind)
       let updatedtasks=tasks.filter((i)=>tasks.indexOf(i)!=ind)
       let uparr2=ctask.filter((i)=>ctask.indexOf(i)!=ctask.indexOf(item))
       settasks(updatedtasks)
       setctask(uparr2)
    console.log(updatedtasks)
    console.log(uparr2)
   
       await updateDoc(docref,{collabs:updatedtasks})
      .then(async (res)=>{
        cref=doc(database,"users",colluid)
        await updateDoc(cref,{collabs:uparr2})
        .then((res)=>{
         
        })
      })
      
   
       console.log(data.tasks)
     }
   
  return (
      <>
      {(!tasks.length)?<h2>No Collabs</h2>:<h2>Collabs</h2>}
    <div>
      {
      tasks.map((i)=> <><Collabcard ind={tasks.indexOf(i)} data={tasks}/> <div style={{display:"flex",justifyContent:"space-around"}}>
      <input checked={i.status} onClick={()=>check(i)} style={{margin:"0%",padding:"0%", width:"auto"}} type="checkbox"  id="checkstat" />  <a  onClick={()=>remove(i)}>Remove</a> </div><br /><br /></> )
      }
    </div>
      </>
  )
}

export default Collabedtask
