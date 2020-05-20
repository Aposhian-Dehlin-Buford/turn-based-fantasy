import React, { useEffect } from "react"
import useAxios from "../hooks/useAxios"
import { useSelector } from "react-redux"
import useAuth from "../hooks/useAuth"

const UserList = () => {
  useAuth()
  const { users, setUsers } = useAxios("user")
  const { socket } = useSelector(({ socketReducer }) => socketReducer)
  const { user } = useSelector(({ authReducer }) => authReducer)
  useEffect(async () => {
    await socket.emit("join", user)
    socket.on("users", (body) => setUsers(body))
    socket.on("send-challenge", (body) => alert(`you were challenged by ${body.challenger.user_id}`))
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
          <div
            key={user_id}
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
            {username}
          </div>
        ))}
    </div>
  )
}

export default UserList
