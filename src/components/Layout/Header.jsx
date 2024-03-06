import "./Header.css";
import lockKeyIcon from "../../assets/lock-key.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="navbar">
          <div className="logo">My coruses page</div>
          <ul className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Dashboard</li>

            <li>
              <Link to="/login">
                Login{" "}
                <img
                  id="imageLockKey"
                  src={lockKeyIcon}
                  alt="image key and lock"
                ></img>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
