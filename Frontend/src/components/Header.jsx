import { Bell, Search } from "lucide-react";

export default function Header({ onHamburgerClick }) {
  return (
    <header className="w-[88%] flex items-center justify-between 
      px-4 py-3 bg-gray-200 shadow-sm ml-[6%] rounded-lg 
      md:py-2 md:h-14">

      {/* Left side: Hamburger + Title */}
      <div className="flex items-center space-x-2">
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden p-2 rounded bg-gray-100"
          onClick={onHamburgerClick}
        >
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>

        {/* Dashboard title */}
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Right side: Search, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        {/* Search input */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-sm bg-gray-100"
          />
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Notification Bell */}
        <button>
          <Bell className="w-6 h-6 text-gray-600" />
        </button>

        {/* Profile picture */}
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?pid=Api&P=0&h=180"
          alt="profile"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
}
