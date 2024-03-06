import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import "./LoginForm.css";
import AuthService from "../../../service/AuthService";
import { AuthContext } from "../../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import RegistrationForm from "../Registration/RegistrationForm";
import Cookies from "js-cookie";

export default function LoginForm() {
  const { user, setUser } = useContext(AuthContext);
  const { isLogged, setIsLogged } = useContext(AuthContext);

  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [formValid, setFormValid] = useState({
    isEmailValid: null,
    isPasswordValid: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid =
      /^[a-zA-Z0-9\.\+_\-]+@[a-zA-Z0-9\.\+_\-]+\.[A-z]{2,5}$/.test(
        formData.email
      );
    const isPasswordValid =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/.test(
        formData.password
      );

    if (!isEmailValid || !isPasswordValid) {
      alert("dati non corretti");
      return;
    }

    //logica per controllare autenticazione in db
    const logDb = await AuthService.login({
      email: formData.email,
      password: formData.password,
    });

    if (logDb == undefined && (logDb.status != 200 || logDb.status != 201)) {
      alert("Dati errati, riprova.");
      return;
    }

    logDb.json().then((dataToken) => {

      console.log(dataToken)
      //i dati sono corretti allora inserisco l'utente e setto il token se lui ha scelto di essere ricordato
      if (formData.remember) {
        Cookies.set("token", dataToken.token, {
          expires: new Date(dataToken.ttl),
        });
      } else {
        // in questo caso l'autenticazione scade quando venie chiusa la sessione
        Cookies.set("token", dataToken.token);
      }

      //setto un cookie con l'email dell'utente che si è loggato
      Cookies.set("email", formData.email, {
        expires: new Date(dataToken.ttl),
      });

      setIsLogged(true);
    });

    //mi prendo i dati dell'utente e li setto nello stato
    const userDb = await AuthService.getUtente(formData.email);

    setUser({
      ...user,
      id: userDb.id,
      firstName: userDb.nome,
      lastName: userDb.cognome,
      email: userDb.email,
    });

    //vai verso la home
    navigateTo("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    //setto i dati del form
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = () => {
    /*// Controllo se i dati sono validi e aggiungo la classe CSS in base al risultato
    const isEmailValid =
      /^[a-zA-Z0-9\.\+_\-]+@[a-zA-Z0-9\.\+_\-]+\.[A-z]{2,5}$/.test(
        formData.email
      );
    const isPasswordValid =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/.test(
        formData.password
      );

    if (!isEmailValid) {
      setFormValid({
        ...formValid,
        isEmailValid: false,
      });
    }

    if (!isPasswordValid) {
      setFormValid({
        ...formValid,
        isPasswordValid: false,
      });
    }*/
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center containerLogin">
        <Card style={{ width: "400px", boxShadow: "8px 8px 8px gray" }}>
          <Card.Body>
            <Card.Title
              style={{
                marginBottom: "3rem",
                textAlign: "center",
                fontSize: "28px",
              }}
            >
              Login
            </Card.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={
                    "form-control "
                    /*(formValid.isEmailValid == null || formValid.isEmailValid ? "" : "border-danger")*/
                  }
                  id="email1"
                  placeholder="Insert e-mail"
                  aria-describedby="emailHelp"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="pass1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={
                    "form-control "
                    /*(formValid.isEmailValid == null || formValid.isPasswordValid ? "" : "border-danger")*/
                  }
                  id="pass1"
                  placeholder="Insert password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="check1"
                  name="check"
                  value={formData.remember}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="check1">
                  Check me out
                </label>
              </div>
              <div className="divButton">
                <button type="submit" className="btn btn-primary loginButton">
                  LOGIN
                </button>
              </div>
            </form>

            <div className="registrationContainer">
              <Link to="/registration">Not registered? Sign in!</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
