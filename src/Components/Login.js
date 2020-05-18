import React from "react"
import useInput from "../hooks/useInput"
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import setUser from '../redux/authReducer'
import {connect} from 'react-redux'

const Login = ({setUser}) => {
  const [{ username, password }, setValues] = useInput({
    username: "",
    password: "",
  })
  const {push} = useHistory()
  const login = (e) => {
    e.preventDefault()
    axios
      .post("/auth/login", { username, password })
      .then((results) => {
        setUser(results.data)
        push('/dashboard')
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
          onChange={setValues}
        />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          value={password}
          onChange={setValues}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default connect(null, {setUser})(Login)
