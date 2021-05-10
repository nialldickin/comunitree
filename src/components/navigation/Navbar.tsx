import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogout from './LoginLogout';
import { NavbarLink } from './NavbarLink';
import SignUp from './SignUpButton';

const Navbar = () => {
  return (
    <div className="navbar shadow-md">
      <div className="navbar-body">
        <Link className="navbar-hero" to="/">
          <span className="navbar-hero__text">GardenHood</span>
        </Link>
        <div className="navbar-links divide-x-2 divide-white">
          <NavbarLink path="" text="Home" />
          <NavbarLink path="create" text="Create" />
          <NavbarLink path="search" text="Search" />
          <NavbarLink path="about" text="About" />
        </div>
        <div className="flex text-lg flex-auto items-center justify-end divide-x-2 divide-white">
          <SignUp />
          <LoginLogout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
