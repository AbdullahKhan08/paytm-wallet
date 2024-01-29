import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/signin'
import Dashboard from './components/Dashboard'
import './index.css'
import Appbar from './components/Appbar'
import { userState } from './store/atoms/user'
import { BASE_URL } from './config'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import axios from 'axios'
import SendMoney from './components/SendMoney'

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/send/:id/:name" element={<SendMoney />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState)
  const navigate = useNavigate()
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/me`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })

      console.log(response.data)

      const userData = response.data.user

      if (userData) {
        setUser({
          isLoading: false,
          id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
        })
        navigate('/dashboard')
      } else {
        setUser({
          isLoading: false,
          id: null,
        })
      }
    } catch (e) {
      setUser({
        isLoading: false,
        id: null,
      })
    }
  }

  useEffect(() => {
    init()
  }, [])

  return <></>
}

export default App
