import React, { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import io from "socket.io-client"
import { setSocket } from "../redux/socketReducer"
import { useDispatch, useSelector } from "react-redux"
import UserList from "./UserList"
import Game from "./Game"
// let sock = io.connect("http://localhost:3333")

const Dashboard = () => {
  useAuth()
  const dispatch = useDispatch()
  const [sock, setSock] = useState(() => io.connect('http://localhost:3333'))
  const { socket } = useSelector(({ socketReducer }) => socketReducer)
  const {gameState} = useSelector(({gameReducer}) => gameReducer)
  useEffect(() => {
    dispatch(setSocket(sock))
    // return () => {
    //   socket.disconnect()
    // }
  }, [])
  return (
    <div>
      {socket && (
        <>
          <UserList />
          {gameState.gameStart && <Game />}
        </>
      )}
    </div>
  )
}

export default Dashboard
