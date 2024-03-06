import "./RegistrationForm.css";
import React, { useState } from "react";
import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function RegistrationForm() {
  const handleChange = () => {};

  const handleSubmit = () => {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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
                  name="firstname"
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
                  name="lastname"
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
                <button type="submit" className="btn btn-primary registerButton">
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
