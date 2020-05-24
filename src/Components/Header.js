import React from "react"
import { useHistory } from "react-router-dom"
import { useSelector, connect } from "react-redux"
import axios from 'axios'
import { setUser } from "../redux/authReducer"

const Header = () => {
  const { push } = useHistory()
  const { user } = useSelector(({ authReducer }) => authReducer)
  return (
    <header>
      {user && user.user_id && (
        <div>
          <button onClick={() => push("/dashboard")}>Dashboard</button>
          {/* <button onClick={() => push("/userlist")}>User List</button> */}
          <button
            onClick={() => {
              axios
                .post("/auth/logout")
                .then(({ data }) => {
                  setUser(data)
                  push("/login")
                })
                .catch((err) => console.log(err))
            }}
          >Log Out</button>
        </div>
      )}
      {!user ||
        (!user.user_id && (
          <div>
            <button onClick={() => push("/login")}>Login</button>
            <button onClick={() => push("/register")}>Register</button>
          </div>
        ))}
    </header>
  )
}

export default connect(null, { setUser })(Header)
