import React, { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import io from "socket.io-client"
import {setSocket} from '../redux/socketReducer'
import {connect} from 'react-redux'

const Dashboard = ({setSocket}) => {
  useAuth()
  let socket = io.connect("http://localhost:3333")
  useEffect(() => {
    setSocket(socket)
  }, [])
  return <div>Dashboard</div>
}

export default connect(null, {setSocket})(Dashboard)
