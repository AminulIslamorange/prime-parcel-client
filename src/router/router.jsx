import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import Coverage from "../pages/Coverage/Coverage";

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

  }
]);