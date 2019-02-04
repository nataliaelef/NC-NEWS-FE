import React from 'react';
import { Router, Link } from '@reach/router';

const Nav = () => {
  return (
    <nav className="nav-bar">
      <Link className="navLink" to="/">
        Home
      </Link>

      <Link className="navLink" to="/articles">
        Articles
      </Link>
      <Link className="navLink" to="/users">
        Users
      </Link>
      <Link className="navLink" to="/topics">
        Topics
      </Link>
    </nav>
  );
};

export default Nav;
