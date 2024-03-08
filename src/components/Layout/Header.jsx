import "./Header.css";
import lockKeyIcon from "../../assets/lock-key.svg";
import logout from "../../assets/logout-icon.svg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Cookies from "js-cookie";
import AuthService from "../../service/AuthService";

export default function Header() {
  const { isLogged, setIsLogged } = useContext(AuthContext);

  const logoutClick = () => {
    AuthService.logout();

    //gestistio il loguot dello stato
    setIsLogged(false);

    //cancello lo stato dell'utente
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      ruoli: [],
    });
  };

  return (
    <header>
      <nav>
        <div className="navbar">
          <div className="logo">My coruses page</div>
          <ul className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={isLogged ? "/profile" : "/login"}>Profile</Link>
            </li>

            {!isLogged ? (
              <li>
                <Link to="/login">
                  Login{" "}
                  <img
                    id="imageLockKey"
                    src={lockKeyIcon}
                    alt={"image key and lock"}
                  ></img>
                </Link>
              </li>
            ) : (
              <li onClick={logoutClick}>
                <Link to="/">
                  Logout{" "}
                  <img
                    id="imageLockKey"
                    src={logout}
                    alt={"image for a logout"}
                  ></img>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
