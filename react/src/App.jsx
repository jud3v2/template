
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";import viteLogo from '/vite.svg'
import Auth from './pages/admin/Auth';
import Home from './pages/client/Home';
import ClientLayout from './components/layout/ClientLayout';
import AdminLayout from './components/layout/AdminLayout';


function App() {

  const clientRoutes = [
    { path: "/", component: Home, protected: false },
  ];

  const adminRoutes = [
    { path: "/admin/auth", component: Auth, protected: false },
  ];

  const BuildAdminLayout = (C, props) => {
    return <AdminLayout Component={C} props={props} />;
  }

  const BuildClientLayout = (C, props) => {
    return <ClientLayout Component={C} props={props} />;
  }


  return (
    <Router>
       <Routes>
            {clientRoutes.map(({ path, component, props}) => (
              <Route
                key={path}
                path={path}
                element={BuildClientLayout(component, props)}
              />
            ))}
            {adminRoutes.map(({ path, component, props}) => (
              <Route
                key={path}
                path={path}
                element={BuildAdminLayout(component, props)}
              />
            ))}
          </Routes>
          <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition="Bounce"
        />
    </Router>
  )
}

export default App
