import React from "react"
import useInput from "../hooks/useInput"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { setUser } from "../redux/authReducer"
import { useDispatch } from "react-redux"

const Login = () => {
  const { push } = useHistory()
  const dispatch = useDispatch()
  const [{ username, password }, { setInput }] = useInput({
    username: "",
    password: "",
  })
  const login = (e) => {
    e.preventDefault()
    axios
      .post("/auth/login", { username, password })
      .then(({ data }) => {
        dispatch(setUser(data))
        push("/dashboard")
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <div>Login</div>
      <form onSubmit={login}>
        <input
          name="username"
          placeholder="enter username"
          value={username}
          onChange={setInput}
        />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          value={password}
          onChange={setInput}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
