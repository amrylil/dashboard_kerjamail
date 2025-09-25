const SettingsPage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="space-y-8">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-4">
            Profile
          </h2>
          <form className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue="John Doe"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue="john.doe@kerjamail.co"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* API Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-4">
            API Keys
          </h2>
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Your secret API key for integrations.
            </p>
            <div className="mt-2 flex items-center space-x-4 bg-gray-100 p-3 rounded-md">
              <span className="font-mono text-sm text-gray-700">
                km_sk_********************abcd
              </span>
              <button className="text-sm text-blue-600">Copy</button>
              <button className="text-sm text-blue-600">Regenerate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
