import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import env from '../environments/enviroments'

const Login = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')!)
  )

  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const [err, setErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(`${env.api}/users/auth`, input, {
          withCredentials: true,
        })
        .then((res) => setCurrentUser(res.data.data))
        .then(() =>
          setTimeout(() => {
            navigate('/')
            window.location.reload()
          }, 100)
        )
      setIsLoading(true)
    } catch (err: any) {
      setErr(err.response.data.message)
      setTimeout(() => {
        setErr('')
      }, 3000)
    }
  }
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <>
      <form className='login'>
        <h1>Login</h1>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            onChange={handelChange}
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            onChange={handelChange}
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>
        <div>{err}</div>
        <button type='submit' className='btn btn-primary' onClick={handleClick}>
          {!isLoading ? (
            'submit'
          ) : (
            <div className='spinner-border text-light' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          )}
        </button>
      </form>
    </>
  )
}

export default Login
