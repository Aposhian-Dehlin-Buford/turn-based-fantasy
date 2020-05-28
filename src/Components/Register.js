import React from "react"
import useInput from "../hooks/useInput"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { setUser } from "../redux/authReducer"
import { useDispatch } from "react-redux"

const Register = () => {
  const { push } = useHistory()
  const dispatch = useDispatch()
  const [{ username, email, password }, { setInput }] = useInput({
    username: "",
    email: "",
    password: "",
  })
  const register = (e) => {
    e.preventDefault()
    axios
      .post("/auth/register", { email, username, password })
      .then(({ data }) => {
        dispatch(setUser(data))
        push("/dashboard")
      })
  }
  return (
    <div>
      <div>Register</div>
      <form onSubmit={register}>
        <input
          name="email"
          placeholder="enter email"
          value={email}
          onChange={setInput}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
