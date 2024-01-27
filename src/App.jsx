import './App.css'
import { Signin } from './Routes/Signin'
import { Signup } from './Routes/Signup'
import { Home } from './Routes/Home'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import { Protected } from './Routes/Protected'
import Index from './Routes/index.jsx'
import Collab from './Routes/collab.jsx'
import Forgetpass from './Routes/forgetpass.jsx'
import Collabedtask from './Routes/collabedtask.jsx'
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Index/>
    },
    {
      path:"/home",
      element:<Protected><Home/></Protected>
    },
    {
      path:"/signin",
      element:<Signin></Signin>
    },
    {
      path:"/signup",
      element:<Signup></Signup>
    },
    {
      path:'/collab',
      element:<Protected><Collab></Collab></Protected>
    }
    ,
    {
      path:'/forgetpass',
      element:<Forgetpass></Forgetpass>
    },
    {
      path:'/collabedtasks',
      element:<Protected><Collabedtask></Collabedtask></Protected>
    }
  ])

  return (
    <AuthContext>
    <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  )
}

export default App
