import { useRecoilState, useSetRecoilState } from 'recoil'
import BottomWarning from './Auth/BottomWarning'
import Button from './Auth/Button'
import Heading from './Auth/Heading'
import InputBox from './Auth/InputBox'
import SubHeading from './Auth/SubHeading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userState } from '../store/atoms/user'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../config'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user.id) {
      navigate('/dashboard')
    }
  })

  const handleEmailChange = async (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = async (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/signin`,
        {
          username: email,
          password,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        const data = response.data
        localStorage.setItem('token', data.token)
        setUser({ isLoading: false, id: data.id })
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="my-8">
      <div className="card w-96 bg-base-100 shadow-xl mx-auto my-auto max-w-4xl">
        <div className="card-body">
          <Heading label={'Sign In'}></Heading>
          <SubHeading label={'Enter Your credentials to access your account'} />
          <InputBox
            onChange={(e) => handleEmailChange(e)}
            value={email}
            placeholder={'johndoe@example.com'}
            label={'Email'}
            type={'text'}
          ></InputBox>
          <InputBox
            type={'password'}
            label={'password'}
            onChange={(e) => handlePasswordChange(e)}
            value={password}
          />
          <Button label={'Sign In'} onClick={handleSubmit} />
          <BottomWarning
            buttonText={'SignUp'}
            label={'Dont have an account?'}
            to={'/signup'}
          />
        </div>
      </div>
    </div>
  )
}

export default Signin
