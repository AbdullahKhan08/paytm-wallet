import React, { useEffect, useState } from 'react'
import Button from '../Auth/Button'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  const [filteredRequest, setFilteredrequest] = useState('')

  const fetchUsers = async () => {
    const response = await axios.get(
      `${BASE_URL}/user/bulk?filter=${filteredRequest}`,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    )
    if (response.status === 200) {
      setUsers(response.data.user)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [filteredRequest])

  return (
    <div className="mt-4 ml-4 py-2 px-2">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setFilteredrequest(e.target.value)}
          value={filteredRequest}
          className="w-full px-2 py-1 border border-rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  )
}

function User({ user }) {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName
              ? user.firstName[0].toUpperCase()
              : user.lastName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => navigate(`/send/${user._id}/${user.firstName}`)}
          label={'Send Money'}
        />
      </div>
    </div>
  )
}

export default Users
