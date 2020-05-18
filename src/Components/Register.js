import React from "react"
import useInput from "../hooks/useInput"

const Register = () => {
  const [{ username, email, password }, setValues] = useInput({
    username: "",
    email: "",
    password: "",
  })
  return <div>Register</div>
}

export default Register
