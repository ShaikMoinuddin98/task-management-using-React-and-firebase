import {Link} from 'react-router-dom'
import "./home.css"
function Index()
{
  return (
    <div>
      <h1>Welcome To Task Management Sytem</h1>
      <p>You Can Add Your Tasks and Manage it Seamlessly</p>
      <div className='links'>
      <Link to='signin' className='loginlink'><button>Go To Login</button></Link>
      <Link to='signup' className='signuplink'><button>Go To Signup</button></Link>
      </div>
    </div>
  )
}

export default Index
