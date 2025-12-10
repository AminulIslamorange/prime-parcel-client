import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import Coverage from "../pages/Coverage/Coverage";
import PrivetRoutes from "./PrivetRoutes";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    children:[
        {path:'/',
            element:<Home></Home>
        },
        {
          path:'/coverage',
          element:<Coverage></Coverage>,
          loader:()=>fetch('serviceCenter.json')
        },
        {
          path:'/sendParcel',
          element:<PrivetRoutes><SendParcel></SendParcel></PrivetRoutes>,
          loader:()=>fetch('serviceCenter.json')
        }
    ]
  },
  // authentication layout
  {
    path:'/',
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'signUp',
        element:<SignUp></SignUp>
      }
    ]

  },

  // dashboard layout 
  {
    path:'dashboard',
    element:<PrivetRoutes>
      <DashBoardLayout></DashBoardLayout>
      </PrivetRoutes>,
      children:[
        {
          path:'myParcels',
          element:<MyParcels></MyParcels>
        },
        {
          path:'payment/:parcelId',
          element:<Payment></Payment>
        },
        {
          path:'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        },
        {
          path:'track',
          element:<TrackParcel></TrackParcel>
        },
       
      ]
  }
]);