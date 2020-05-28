import React from "react"
import "./App.css"
import routes from "./routes"
import Header from "./Components/Header"
import {useLocation} from 'react-router-dom'
import Map from './Components/Map/Map';

const App = () => {
  const {pathname} = useLocation()
  return (
    <div className="App">
      <Map />
      {/* {pathname !== '/login' && pathname !== '/register' && <Header />}
      {routes} */}
    </div>
  )
}

export default App
