import { database } from "../fbconfig"
import { getDocs,collection,updateDoc, getDoc, doc } from "firebase/firestore";
import Table from 'react-bootstrap/Table'
import { useLocation } from 'react-router-dom';
import "./collab.css"
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Collab = () => {
  let navigate=useNavigate()
  
  const location = useLocation();
  const data = location.state?.data;
  const ind=location.state?.ind
  console.log(ind)
    const collectionref=collection(database,"users")
  let [dataarr,setarr]=useState([])
    useEffect(()=>{
    async function getdata()
    {
        try {
            const querySnapshot = await getDocs(collectionref);
            let tarr=[]
            querySnapshot.forEach((doc) => {
              // Access each document's data using doc.data()
              let d=doc.data()
              console.log(Array.isArray(d.collabs))
              if(Array.isArray(d.collabs))
              {
              if(d.collabs.length==0)
              {
              tarr.push({name:d.name,mail:d.email,collabstat:d.colstat,id:doc.id})
              console.log(tarr)
              }
            }
            
              
    console.log(dataarr)

            //   console.log(doc.id, " => ", doc.data().name);
            }
           
            );
          setarr(tarr)
          
        
        } catch (error) {
            console.error("Error getting documents: ", error);
          }
    };
   
    getdata();
   
    
   },[])
   let count=0
   console.log(dataarr)
    async function collab(id)
    {

      let curuserdata;
      let dref=doc(database,"users",id)
      let curdref=doc(database,'users',getAuth().currentUser.uid)
      let puserdata
      let newarr=data.filter((i)=>data.indexOf(i)!=ind)
      console.log(newarr)
      await getDoc(dref)
      .then(async (res)=>{
        puserdata=res.data().collabs

      
      let obj={...data[ind]}
      console.log(obj)
      obj.collab=getAuth().currentUser.uid
      console.log(obj)
      await updateDoc(dref,{collabs:[...puserdata,obj]})
      .then(async (res)=>{
        console.log("added")
        let obj2={...data[ind]}
        console.log(obj2)
        obj2.collab=id
        console.log(obj2)
        
        
          await getDoc(curdref)
          .then(async (res)=>{
          let curuserdata=res.data().collabs
          await updateDoc(curdref,{tasks:newarr,collabs:[...curuserdata,obj2]})
          .then((res)=>{
            console.log("updated")
          })
         
          console.log(curuserdata)
          })
        })
       
      })
      navigate('/home')
    }
    
      // let obj2={...data[ind]}
      // console.log(obj2)
      // obj2.collabwith=id
      // console.log(obj2)
   
      // await updateDoc(curdref,{tasks:newarr,collabs:[...curuserdata,obj2]})
      // .then((res)=>{
      //   console.log("updated")
      // })
      
    
  return (
    <>
    <h1>Users Ready To Collab</h1>
       <Table striped width={"600px"} height={"300px"}>
      <thead>
        <tr>
          <th>S.No</th>
          <th>User Name</th>
          <th>Email</th>
        

        </tr>
      </thead>
      <tbody>
        {/* <tr>

          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>status</td>
          <button>Collab</button>
        </tr>
        <>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <button>Collab</button>
        </tr>
        </>
        <tr>
          <td>3</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
          <td></td>
          <button>Collab</button>
        </tr> */}
        {dataarr.map((i)=>
        ((i.id!=getAuth().currentUser.uid))?
         <>
        <tr>
          <td>{count+=1}</td>
          <td>{i.name}</td>
          <td>{i.mail}</td>
          
          <button onClick={()=>collab(i.id)}>Collab</button>
        </tr>
        </>
        :
        ""
        )}
      </tbody>
    </Table>
    </>
  )
}

export default Collab
