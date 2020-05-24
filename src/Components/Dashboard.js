import React, { useState, useEffect } from "react"
import {Route} from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import io from "socket.io-client"
import { setSocket } from "../redux/socketReducer"
import { connect, useSelector } from "react-redux"
import UserList from "./UserList"
import Game from "./Game"
let sock = io.connect("http://localhost:3333")

const Dashboard = ({ setSocket }) => {
  useAuth()
  const [toggleUsers, setToggleUsers] = useState(true)
  const { socket } = useSelector(({ socketReducer }) => socketReducer)
  const {gameState} = useSelector(({gameReducer}) => gameReducer)
  useEffect(() => {
    setSocket(sock)
    // return () => {
    //   socket.disconnect()
    // }
  }, [])
  console.log(gameState)
  return (
    <div>
      {socket && (
        <>
        <button
        onClick = {() => setToggleUsers((t) => !t)}
        >Toggle Active User List</button>
          {toggleUsers && <UserList />}
          {gameState.gameStart && <Game />}
          {/* <Route path="/userlist" component={UserList} />
          <Route path="/game" component={Game} /> */}
        </>
      )}
    </div>
  )
}

export default connect(null, { setSocket })(Dashboard)
