import React from "react"
import useInput from "../hooks/useInput"
import { useHistory } from "react-router-dom"
import axios from "axios"
import setUser from "../redux/authReducer"
import { connect } from "react-redux"

const Register = ({ setUser }) => {
  const [{ username, email, password }, setValues] = useInput({
    username: "",
    email: "",
    password: "",
  })
  const { push } = useHistory()
  const register = (e) => {
    e.preventDefault()
    axios.post('/auth/register', {email, username, password}).then(results => {
      setUser(results.data)
      push('/dashboard')
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
          onChange={setValues}
        />
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

export default connect(null, { setUser })(Register)
