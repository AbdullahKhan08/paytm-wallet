import { useRecoilValue } from 'recoil'
import { userState } from '../store/atoms/user'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../config'
import Balance from '../Components/Dashboard/Balance'
import Users from '../Components/Dashboard/Users'

const Dashboard = () => {
  const user = useRecoilValue(userState)
  const [balance, setBalance] = useState('')
  const navigate = useNavigate()

  const fetchBalance = async () => {
    const response = await axios.get(`${BASE_URL}/account/balance`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })

    if (response.status === 200) {
      setBalance(response.data.balance)
    }
  }

  useEffect(() => {
    if (!user.id) {
      navigate('/signin')
    }
  })

  useEffect(() => {
    fetchBalance()
  }, [])

  return (
    <div>
      <Balance value={balance} />
      <Users />
    </div>
  )
}

export default Dashboard
