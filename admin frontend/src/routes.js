import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
// import Products from './pages/Products';
// import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Setting from './pages/Setting';
import Enquiry from './pages/Enquiry';
import Forgot from './pages/Forgot';
import DisplayLawCodes from './pages/DisplayLawCodes';
// ----------------------------------------------------------------------

export default function Router() {
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
    async function checkauth() {
      const res = await axios.post('http://localhost:4000/auth', {
        Authentication_token: `${localStorage.getItem('token')}`
      });
      console.log(res);
      if (res.data.message === 'You are Authorisexd user') {
        setisAuth(true);
        // getusers();
      } else setisAuth(false);
    }
    checkauth();
  }, []);

  const [allusers, setallusers] = useState();

  const [allenquiries, setallenquiries] = useState();
  const [alllawcodes, setalllawcodes] = useState();

  useEffect(() => {
    async function fetchdata() {
      const alluser = await axios.post('http://localhost:4000/getusers', {
        Authentication_token: `${localStorage.getItem('token')}`
      });
      setallusers(alluser.data);

      const allenquiry = await axios.post('http://localhost:4000/allenquiry', {
        Authentication_token: `${localStorage.getItem('token')}`
      });
      console.log(allenquiry);
      setallenquiries(allenquiry.data);

      const lawcodes = await axios.get('http://localhost:4000/categoryshow');
      // console.log(lawcodes.data.data);
      setalllawcodes(lawcodes.data.data);
    }
    fetchdata();
  }, []);
  console.log(isAuth);
  return useRoutes([
    {
      path: '/dashboard',
      element: isAuth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User allusers={allusers} /> },
        // { path: 'products', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
        { path: 'lawcodes', element: <DisplayLawCodes alllawcodes={alllawcodes} /> },
        { path: 'setting', element: <Setting /> },
        { path: 'enquiry', element: <Enquiry allenquiries={allenquiries} /> }
      ]
    },
    {
      path: '/',
      element: !isAuth ? <LogoOnlyLayout /> : <Navigate to="/dashboard" />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgotpassword', element: <Forgot /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
