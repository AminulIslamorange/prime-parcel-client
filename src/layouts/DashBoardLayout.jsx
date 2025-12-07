import { Outlet } from "react-router-dom";


const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT AREA */}
      <div className="drawer-content flex flex-col bg-base-100">
        
        {/* Top Navbar (Visible only on mobile/tablet) */}
        <div className="navbar bg-base-300 sticky top-0 z-50 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 font-semibold text-lg">Dashboard</div>
        </div>

        {/* PAGE CONTENT */}
        <Outlet></Outlet>
        {/* hare will be change ui */}
        <div className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
          <div className="bg-base-200 p-4 rounded-xl shadow-sm">
            Your content goes here…
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 w-80 min-h-full p-4 text-base-content overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 px-2">Menu</h2>

          <li>
            <a className="rounded-lg">Dashboard Home</a>
          </li>

          <li>
            <a className="rounded-lg">Orders</a>
          </li>

          <li>
            <a className="rounded-lg">Users</a>
          </li>

          <li>
            <a className="rounded-lg">Settings</a>
          </li>

          <div className="divider"></div>

          <li>
            <a className="rounded-lg text-red-500 font-semibold">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
