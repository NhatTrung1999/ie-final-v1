import login from '../../assets/login.svg';

const Login = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white flex rounded-lg shadow-lg">
        <div className="flex-1 p-2">
          <img
            src={login}
            className="size-96 bg-amber-50 p-2 rounded-lg shadow-2xs h-full"
          />
        </div>
        <div className="flex-1 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-sm text-gray-500">
              Please login to your account
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="factory"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Factory
              </label>
              <select
                id="factory"
                name="factory"
                className="w-full px-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
              >
                <option value="">Choose option</option>
                <option value="LYV">LYV</option>
                <option value="LHG">LHG</option>
                <option value="LVL">LVL</option>
                <option value="LYM">LYM</option>
              </select>
            </div>
            <button
              type="button"
              className="w-full px-2 py-2 cursor-pointer font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
