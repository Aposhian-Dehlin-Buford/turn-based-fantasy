import React, { useEffect } from "react"
import useAxios from "../hooks/useAxios"
import { useSelector } from "react-redux"
import useAuth from "../hooks/useAuth"

const UserList = () => {
  useAuth()
  const { users, setUsers } = useAxios("user")
  const { socket } = useSelector(({ socketReducer }) => socketReducer)
  const { user } = useSelector(({ authReducer }) => authReducer)
  useEffect(() => {
    socket.emit("join", user)
    socket.on("users", (body) => setUsers(body))
    return () => {
      socket.emit("leave", user)
      socket.disconnect()
    }
  }, [])
  return (
    <div>
      <div>Active Users:</div>
      {users.length > 0 &&
        users.map(({ username, user_id }) => (
          <div key={user_id}>{username}</div>
        ))}
    </div>
  )
}

export default UserList
