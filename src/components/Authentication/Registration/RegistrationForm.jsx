import "./RegistrationForm.css";
import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import AuthService from "../../../service/AuthService";
import { AuthContext } from "../../context/AuthContextProvider";

export default function RegistrationForm() {

  const { user, setUser } = useContext(AuthContext);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    //setto i dati del form
    setFormData({ ...formData, [name]: value });
  };

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

    if (
      !isEmailValid ||
      !isPasswordValid ||
      formData.firstName == "" ||
      formData.lastName == ""
    ) {
      alert("dati non corretti");
      return;
    }

    //controllo se un utente con quella password esiste gia
    let userDb = await AuthService.getUtente(formData.email);

    if (userDb.status == undefined || userDb.status != 400) {
      //l'utente esiste allora butto errore
      alert("Non è possibile registrarsi con questa email");
      return;
    }

    //i dati sono corretti allora inserisco l'utente e lo autentico direttamente
    const responseReg = await AuthService.register({
      nome: formData.firstName,
      cognome: formData.lastName,
      email: formData.email,
      password: formData.password
    });

    console.log(responseReg)
    debugger;

    if(responseReg.status == undefined || (responseReg.status != 200 && responseReg.status != 201) ){
      alert("errore nella registrazione")
      return;
    }

    //la registrazione è andata a buon fine, prendo l'utente e lo setto
    userDb = await AuthService.getUtente(formData.email);
    const logDb = await AuthService.login({
      email: formData.email,
      password: formData.password,
    });

    document.cookie = "token=" + logDb.token + ";";


    setUser({
      ...user,
      id: userDb.id,
      firstName: userDb.nome,
      lastName: userDb.cognome,
      email: userDb.email,
    });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center container">
        <Card style={{ width: "33rem", boxShadow: "8px 8px 8px gray" }}>
          <Card.Body>
            <Card.Title
              style={{
                marginBottom: "3rem",
                textAlign: "center",
                fontSize: "28px",
              }}
            >
              Registration
            </Card.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 ms-4 me-4">
                <label htmlFor="firstname" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Insert your first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 ms-4 me-4">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Insert your last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 ms-4 me-4">
                <label htmlFor="email2" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email2"
                  placeholder="Insert e-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 ms-4 me-4">
                <label htmlFor="pass2" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass2"
                  placeholder="Insert password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="divButton">
                <button
                  type="submit"
                  className="btn btn-primary registerButton"
                >
                  REGISTER
                </button>
              </div>
            </form>

            <div className="registrationContainer">
              <Link to="/login">Are you already registered? Log in!</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
