import React from 'react';
import Header from './header';
import Routers from '../routes/routes';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  // Determine whether to show the header based on the current path
  const showHeader = !['/signup', '/login'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routers />
    </>
  );
};

export default Layout;
