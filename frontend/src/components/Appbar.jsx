import { userState } from '../store/atoms/user'
import { useRecoilValue, useSetRecoilState } from 'recoil'
const Appbar = () => {
  const user = useRecoilValue(userState)
  const setUser = useSetRecoilState(userState)

  if (user.isLoading) {
    return (
      <div>
        <span className="loading loading-spinner loading-md"></span>
      </div>
    )
  }

  if (user.id) {
    return (
      <div className="shadow navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl" href="/">
            Paytm app
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button
                className="btn btn-error"
                onClick={() => {
                  localStorage.setItem('token', null)
                  setUser({
                    isLoading: false,
                    id: null,
                  })
                }}
              >
                Logout
              </button>
            </li>
          </ul>
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
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/signup">SignUp</a>
            </li>

            <li>
              <a href="/signin">SignIn</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Appbar
