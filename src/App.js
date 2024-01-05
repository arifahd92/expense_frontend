import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';

// Lazy-loaded components
const RedirectComponent = lazy(() => import('./components/user/higherOrderComponents/Redirect'));
const Signup = lazy(() => import('./components/user/Signup'));
const Login = lazy(() => import('./components/user/Login'));
const Expense = lazy(() => import('./components/expense/Expense'));
const ForgotPassword = lazy(() => import('./components/user/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/user/ResetPassword'));

const App = () => {
  const { darkFlag } = useSelector((state) => state.user);

  return (
    <div className={darkFlag ? 'bg-black text-primary min-vh-100 min-vw-100' : ''}>
      
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading/>}>
              <RedirectComponent Component={Login} />
            </Suspense>
          }
        />
        <Route
          path="/expense"
          element={
            <Suspense fallback={<Loading/>}>
              <RedirectComponent Component={Expense} />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading/>}>
              <RedirectComponent Component={Signup} />
            </Suspense>
          }
        />
        <Route
          path="/password/forgot"
          element={
            <Suspense fallback={<Loading/>}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path="password/reset-password/:reqId"
          element={
            <Suspense fallback={<Loading/>}>
              <ResetPassword />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
