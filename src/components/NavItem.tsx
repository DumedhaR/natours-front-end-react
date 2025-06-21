import React from 'react';

interface NavItemProps {
  link: string;
  text: string;
  icon: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ link, text, icon, active }) => (
  <li className={active ? 'side-nav--active' : ''}>
    <a href={link}>
      <svg>
        <use xlinkHref={`img/icons.svg#icon-${icon}`} />
      </svg>
      {text}
    </a>
  </li>
);

export default NavItem;
