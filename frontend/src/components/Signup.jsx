const Signup = () => {
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
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Doe"
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
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <button className="btn my-3 btn-neutral text-white">Sign Up</button>
          <p className="text-slate-950 flex justify-center">
            Already have an account?
            <span className="justify-center">
              <a className="underline mx-2 hover:text-slate-600" href="/signin">
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
