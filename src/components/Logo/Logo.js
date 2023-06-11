import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import './Logo.css';

function Logo() {
  return (
    <NavLink className="logo button" to="/" />
  )
}

export default memo(Logo);
