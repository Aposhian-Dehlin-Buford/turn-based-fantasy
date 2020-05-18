import React from "react"
import useInput from "../hooks/useInput"

const Register = () => {
  const [{ username, email, password }, setValues] = useInput({
    username: "",
    email: "",
    password: "",
  })
  const register = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <div>Register</div>
      <form
      onSubmit={register}
      >
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
        <button
        type='submit'
        >Login</button>
      </form>
    </div>
  )
}

export default Register
