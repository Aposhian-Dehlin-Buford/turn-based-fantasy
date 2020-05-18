import React from "react"
import "./App.css"
import routes from './routes'
import Header from './Components/Header'

const App = () => (
  <div className="App">
    <Header />
    {routes}
  </div>)

export default App
