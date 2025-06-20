
import { useUser } from "../hooks/useUser";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { user} = useUser();
  return (
    <header className="header">
      <nav className="nav nav--tours">
      <Link className="nav__el" to="/">All tours</Link>
      </nav>

      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>

      <nav className="nav nav--user">
        {user ? (
          <>
            <a className="nav__el nav__el--logout" href="#">Log out</a>
            <a className="nav__el" href="/me">
              <img
                className="nav__user-img"
                src={`/img/users/${user.photo}`}
                alt={`Photo of ${user.name}`}
              />
              <span>{user.name.split(' ')[0]}</span>
            </a>
          </>
        ) : (
          <>
            <a className="nav__el" href="/login">Log in</a>
            <a className="nav__el nav__el--cta" href="#">Sign up</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
