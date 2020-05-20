import React from "react"
import "./App.css"
import routes from "./routes"
import Header from "./Components/Header"
import {useLocation} from 'react-router-dom'

const App = () => {
  const {pathname} = useLocation()
  return (
    <div className="App">
      {pathname !== '/login' && pathname !== '/register' && <Header />}
      {routes}
    </div>
  )
}

export default App
