import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Loader from '../Loader/Loader';
import s from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <main className={s.main}>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default Layout;
