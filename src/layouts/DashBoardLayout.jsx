import { Link, Outlet } from "react-router-dom";
import ProFastLogo from "../pages/shared/ProFastLogo/ProFastLogo";
import {
  FiPackage,
  FiClock,
  FiMapPin,
  FiUser,
  FiUsers,
  FiSettings
} from "react-icons/fi";
import { MdOutlineRoute } from "react-icons/md";
import { TbRouteOff } from "react-icons/tb";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT AREA */}
      <div className="drawer-content flex flex-col bg-base-100">

        {/* Mobile Navbar */}
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

        {/* TOP FIXED SECTION */}
        <div className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
          <div className="bg-base-200 p-4 rounded-xl shadow-sm mb-6">
            Your content goes here…
          </div>
        </div>

        {/* PAGE ROUTE CONTENT */}
        <div className="p-4 lg:p-6">
          <Outlet></Outlet>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 w-80 min-h-full p-4 text-base-content overflow-y-auto">
          <ProFastLogo></ProFastLogo>
          <h2 className="text-xl font-bold mb-4 px-2 mt-4 flex items-center gap-2">
            <FiPackage /> Menu
          </h2>

          <li>
            <Link to="/dashboard/myParcels" className="rounded-lg flex items-center gap-2">
              <FiPackage /> My Parcels
            </Link>
          </li>

          <li>
            <Link to="/dashboard/paymentHistory" className="rounded-lg flex items-center gap-2">
              <FiClock /> Payment History
            </Link>
          </li>

          <li>
            <Link to="/dashboard/track" className="rounded-lg flex items-center gap-2">
              <FiMapPin /> Track a Package
            </Link>
          </li>


          <li>
            <Link
              to="/dashboard/activeRider"
              className="rounded-lg flex items-center gap-2"
            >
              <MdOutlineRoute className="text-green-500 text-lg" />
              Active Rider
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/pendingRider"
              className="rounded-lg flex items-center gap-2"
            >
              <TbRouteOff className="text-yellow-500 text-lg" />
              Pending Rider
            </Link>
          </li>
          <li>
            <Link to="/dashboard/updateProfile" className="rounded-lg flex items-center gap-2">
              <FiUser /> Update Profile
            </Link>
          </li>

          <li>
            <a className="rounded-lg flex items-center gap-2">
              <FiUsers /> Users
            </a>
          </li>

          <li>
            <a className="rounded-lg flex items-center gap-2">
              <FiSettings /> Settings
            </a>
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
