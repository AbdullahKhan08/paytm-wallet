import { RecoilRoot, useSetRecoilState } from 'recoil'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { userState } from './store/atoms/user'
import axios from 'axios'
import { BASE_URL } from './config'
import { useEffect } from 'react'
import './App.css'
import './index.css'
import SendMoney from './pages/SendMoney'
import Appbar from './Components/utils/Appbar'

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
          firstName: '',
          lastName: '',
          username: '',
        })
      }
    } catch (e) {
      setUser({
        isLoading: false,
        id: null,
        firstName: '',
        lastName: '',
        username: '',
      })
    }
  }

  useEffect(() => {
    init()
  }, [])

  return <></>
}
export default App
