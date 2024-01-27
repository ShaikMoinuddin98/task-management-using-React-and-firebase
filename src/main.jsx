import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import fbconfig from './fbconfig.js'
// import { initializeApp} from 'firebase/app'
// import {getFirestore} from 'firebase/firestore'
// const app = initializeApp(fbconfig)

// const database=getFirestore(app)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
