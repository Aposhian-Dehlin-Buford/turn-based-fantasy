import React from 'react'
import useInput from '../hooks/useInput'

const Login = () => {
  const [{username, password}, setValues] = useInput({username: '', password: ''})
  return (
    <div>Login</div>
  )
}

export default Login