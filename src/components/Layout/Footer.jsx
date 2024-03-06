import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-light text-center fixed-bottom">
      <div className="py-5">
        <div className="d-flex justify-content-center mb-5">
          <Link>
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-light"
              onclick={scrollToTop}
            />
          </Link>
        </div>

        <div className="row">
          <div className="col-md-3">
            <h6 className="text-uppercase fw-bold mb-4">Company Name</h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <h6 className="text-uppercase fw-bold mb-4">Links</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="#section1" className="text-light">
                      Section 1
                    </a>
                  </li>
                  <li>
                    <a href="#section2" className="text-light">
                      Section 2
                    </a>
                  </li>
                  {/* Aggiungi altri link secondo le tue esigenze */}
                </ul>
              </div>
              <div className="col-md-4">
                <h6 className="text-uppercase fw-bold mb-4">Services</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="#service1" className="text-light">
                      Service 1
                    </a>
                  </li>
                  <li>
                    <a href="#service2" className="text-light">
                      Service 2
                    </a>
                  </li>
                  {/* Aggiungi altri servizi secondo le tue esigenze */}
                </ul>
              </div>
              <div className="col-md-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <ul className="list-unstyled">
                  <li>Email: example@example.com</li>
                  <li>Phone: +123 456 7890</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:{" "}
        <a
          className="text-light fw-bold"
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          example.com
        </a>
      </div>
    </footer>
  );
}
