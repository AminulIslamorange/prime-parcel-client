import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import { router } from './router/router.jsx';
import 'aos/dist/aos.css';
import AOS from 'aos';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='max-w-7xl mx-auto font-urbanist'>
     <AuthProvider>
      
      <RouterProvider router={router} />

      </AuthProvider>

   </div>
  </StrictMode>,
)
