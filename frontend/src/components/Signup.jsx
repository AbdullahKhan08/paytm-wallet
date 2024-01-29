import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userState } from '../store/atoms/user'
import { BASE_URL } from '../config'
const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useRecoilState(userState)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.id) {
      navigate('/dashboard')
    }
  })

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/signup`,
        {
          firstName,
          lastName,
          username: email,
          password,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      )

      if (response.status === 201) {
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
          <h2 className="card-title font-extrabold text-3xl justify-center">
            Sign Up
          </h2>
          <div className="pt-1 px4 pb-4">
            <p className="text-slate-500 text-md">
              Enter your information to create an account
            </p>
          </div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">First Name</span>
            </div>
            <input
              type="text"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="input input-bordered w-full max-w-xs border rounded border-slate-200"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Email</span>
            </div>
            <input
              type="email"
              placeholder="johndoe@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Password</span>
            </div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <button
            className="btn my-3 btn-neutral text-white"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p className="text-slate-950 flex justify-center">
            Already have an account?
            <span className="justify-center">
              <a
                className="underline pointer cursor-pointer mx-2 hover:text-slate-700"
                href="/signin"
              >
                Signin
              </a>
            </span>
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  )
}

export default Signup
