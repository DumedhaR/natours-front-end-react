
import { useUser } from "../hooks/useUser";
import { Link } from 'react-router-dom';
import { logout } from "../services/authService";
import axios from "axios";
import { showAlert } from "../utills/alert";

const Header: React.FC = () => {
  const { user, setUser} = useUser();
  // const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await logout();
      setUser(null); 
    }catch (err: unknown) {
      let message = 'Login failed, Please try again!';
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      console.log(message);
      showAlert('error', 'Error logging out! Try again.');
    }  
  }

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
            <a className="nav__el nav__el--logout" onClick={handleLogout} >Log out</a>
            <Link className="nav__el" to="/me">
              <img
                className="nav__user-img"
                src={`http://localhost:8000/img/users/${user.photo}`}
                alt={`Photo of ${user.name}`}
              />
              <span>{user.name.split(' ')[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link className="nav__el" to="/login">Log in</Link>
            <Link className="nav__el nav__el--cta" to="#">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
