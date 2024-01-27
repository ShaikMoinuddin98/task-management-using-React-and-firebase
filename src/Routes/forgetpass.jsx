import { sendPasswordResetEmail,getAuth } from "firebase/auth"
const Forgetpass = () => {
    let auth=getAuth()
    function changepass()
    {
        let inp=document.querySelector("#mail")
        sendPasswordResetEmail(auth,inp.value)
        .then((res)=>{
            alert("check Ur mail")
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
      <h2>Reset Password</h2>
      <h3>Enter Your Email</h3>
      <input id="mail" type="email" />
      <button onClick={changepass}>submit</button>
    </div>
  )
}

export default Forgetpass
