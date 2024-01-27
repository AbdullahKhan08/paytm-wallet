import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/signin'
import Dashboard from './components/Dashboard'
import './index.css'
import Appbar from './components/Appbar'
import { userState } from './store/atoms/user'
import { BASE_URL } from './config'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <InitUser />
          <Appbar />
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState)
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/me`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })

      if (response.data.id) {
        setUser({
          isLoading: false,
          id: response.data.id,
        })
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
