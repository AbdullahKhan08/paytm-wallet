import { userState } from '../store/atoms/user'
import { useRecoilState } from 'recoil'
import { Link, useNavigate } from 'react-router-dom'
const Appbar = () => {
  const [user, setUser] = useRecoilState(userState)

  const navigate = useNavigate()

  if (user.isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loading h-screen justify-center loading-spinner loading-lg"></div>
      </div>
    )
  }

  if (user.id) {
    return (
      <div className="shadow navbar bg-base-100 justify-between">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl" href="/">
            PayTM App
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-slate-200">
                <div className="flex flex-col justify-center h-full text-xl">
                  {user.firstName[0].toUpperCase()}
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={() => {
                    localStorage.setItem('token', null)
                    setUser({
                      isLoading: false,
                      id: null,
                    })
                    navigate('/signin')
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="shadow navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl" href="/">
            Paytm app
          </a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <div className="flex flex-col justify-center h-full text-xl">
                  U
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/signup">SignUp</Link>
              </li>

              <li>
                <Link to="/signin">SignIn</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appbar
