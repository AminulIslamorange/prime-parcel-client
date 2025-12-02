import { Outlet } from "react-router-dom";
import authImg from '../assets/authImage.png';
import ProFastLogo from "../pages/shared/ProFastLogo/ProFastLogo";


const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-base-200 relative flex flex-col">

            {/* 🔥 Top Left Logo */}
            <div className="p-4 absolute top-0 left-0">
                <ProFastLogo />
            </div>

            {/* Main Content (two columns) */}
            <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto p-4 gap-8 mt-20">

                {/* Left side: Outlet */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <Outlet />
                </div>

                {/* Right side: Image */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <img
                        src={authImg}
                        className="w-full max-w-sm rounded-lg"
                    />
                </div>

            </div>

        </div>


    );
};

export default AuthLayout;