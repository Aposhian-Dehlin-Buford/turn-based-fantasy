import React, { useState, useEffect } from "react"
import useAxios from "../hooks/useAxios"
import { useSelector } from "react-redux"
import useAuth from "../hooks/useAuth"

const UserList = () => {
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
        if(c.length === 0) return [body]
        else return c.push(body)
      })
    })
    return () => {
      socket.emit("leave", user)
      socket.disconnect()
    }
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

export default UserList
