import React from "react"
import useInput from "../hooks/useInput"

const Login = () => {
  const [{ username, password }, setValues] = useInput({
    username: "",
    password: "",
  })
  const login = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <div>Login</div>
      <form
      onSubmit={login}
      >
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
        <button
        type='submit'
        >Login</button>
      </form>
    </div>
  )
}

export default Login
