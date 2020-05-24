import React, { useState, useEffect } from "react"
import useAxios from "../hooks/useAxios"
import { useSelector, connect } from "react-redux"
import useAuth from "../hooks/useAuth"
import {setGameState} from '../redux/gameReducer'

const UserList = ({setGameState}) => {
  useAuth()
  const { users, setUsers } = useAxios("user")
  const [challenges, setChallenges] = useState([])
  const { socket } = useSelector(({ socketReducer }) => socketReducer)
  const { user } = useSelector(({ authReducer }) => authReducer)
  useEffect(() => {
    socket.emit("join", user)
    socket.on("users", (body) => setUsers(body))
    socket.on("send-challenge", (body) => {
      setChallenges((c) => {
        if (c.length === 0) return [body]
        else return c.push(body)
      })
    })
    socket.on("remove-challenge", (body) => {
      setChallenges((c) => {
        return c.filter((e) => {
          if (e.challenger.user_id === body.user_id) {
            return null
          } else {
            return e
          }
        })
      })
    })
    socket.on("game-start", (body) => {
      console.log(body)
      setGameState(body)
    })
  }, [])
  return (
    <div>
      <div>Active Users:</div>
      {users.length > 0 &&
        users.map(({ username, user_id, email }) => (
          <div key={user_id}>
            <span>{username}</span>
            {user.user_id !== user_id && (
              <button
                onClick={() => {
                  if (user.user_id !== user_id) {
                    socket.emit("challenge", {
                      challenger: user,
                      opponent: { username, user_id, email },
                      gameStart: false,
                    })
                  }
                }}
              >
                Challenge
              </button>
            )}
          </div>
        ))}
      <div>Challenges:</div>
      {challenges.length > 0 &&
        challenges.map(({ challenger, opponent }) => (
          <div key={challenger.user_id}>
            <span>{challenger.username}</span>
            <button
              onClick={() =>
                socket.emit("accept-challenge", {
                  challenger,
                  opponent,
                  gameStart: true,
                })
              }
            >
              Accept
            </button>
          </div>
        ))}
    </div>
  )
}

export default connect(null, {setGameState})(UserList)
