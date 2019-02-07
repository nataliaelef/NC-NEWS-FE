import React from 'react';

const Header = props => {
  return (
    <div className="main-header">
      {props.user ? `NC NEWS - Welcome ${props.user}` : 'NC NEWS'}
    </div>
  );
};

export default Header;
