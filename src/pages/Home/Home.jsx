import { Link } from "react-router-dom";
import "./Home.css";
import backEnd from "../../assets/back-end.jpeg";
import frontEnd from "../../assets/front-end.png";
import deepL from "../../assets/deep-learning.png";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContextProvider";

export default function Home() {
  const { isLogged, setIsLogged } = useContext(AuthContext);

  return (
    <>
      <div className="home-banner">
        <h1 className="title">Benvenuto nella Piattaforma di Corsi IT</h1>

        <p className="sub-title">
          Esplora i migliori corsi in ambito IT per sviluppare le tue
          competenze. Basta premere su uno dei corsi sotto per avere più
          informazioni.
        </p>
      </div>

      <div className="containerHome" style={{ height: "50rem" }}>
        <div className="card-group">
          <div className="card border-0" style={{ width: "18rem" }}>
            <h4 className="card-title">BackEnd</h4>

            <Link to={isLogged ? "/courses" : "/login"}>
              <img
                src={backEnd}
                className="card-img-top rounded-circle"
                alt="città di Chicago"
              />
            </Link>
          </div>

          <div className="card border-0 ms-5" style={{ width: "18rem" }}>
            <h4 className="card-title">FrontEnd</h4>
            <Link to={isLogged ? "/courses" : "/login"}>
              <img
                src={frontEnd}
                className="card-img-top rounded-circle"
                alt="città di New York"
              />
            </Link>
          </div>

          <div className="card border-0 ms-5" style={{ width: "18rem" }}>
            <h4 className="card-title">Deep Learning</h4>
            <Link to={isLogged ? "/courses" : "/login"}>
              <img
                src={deepL}
                className="card-img-top rounded-circle"
                alt="città di Denver"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
