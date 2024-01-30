import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../store/atoms/user'
import { ChangeEvent } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config'
import Heading from '../Components/Auth/Heading'
import SubHeading from '../Components/Auth/SubHeading'
import InputBox from '../Components/Auth/InputBox'
import Button from '../Components/Auth/Button'
import BottomWarning from '../Components/Auth/BottomWarning'

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

  const handleEmailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
        setUser({
          isLoading: false,
          id: data.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          username: email,
        })
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
            onChange={handleEmailChange}
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
