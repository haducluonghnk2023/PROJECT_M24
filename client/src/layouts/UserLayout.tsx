import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserHeader, UserNavbar, UserFooter } from '../components/layout';
import { Carousel } from '../components/layout';

export const UserLayout: React.FC = () => {
  return (
    <div>
      <UserHeader />
      <UserNavbar />
      <Carousel />
      <Outlet />
      <UserFooter />
    </div>
  );
};
