import { useContext, useEffect, useState } from "react";
import CourseService from "../../service/CourseService";
import "./CoursesList.css";
import { AuthContext } from "../../components/context/AuthContextProvider";
import ErrorPage from "../ErrorPage/ErrorPage";
import { Link } from "react-router-dom";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  const { isLogged, setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    CourseService.getAllCourses().then((response) => {
      if (response.status != undefined && response.status == 200) {
        response.json().then((coursesData) => {
          setCourses(coursesData);
        });
      }
    });
  }, []);

  return (
    <>
      {isLogged ? (
        // controllo se l'utente loggato è un admin ovvero ha le autorizzazzioni per accedere
        user.ruoli.filter((ruolo) => ruolo.tipologia == "Admin").length == 1 ? (
          <div className="containerCourses">
            <h2 className="titleCourses">Lista dei Corsi</h2>
            <table className="table table-striped myTableCourses">
              <thead>
                <tr>
                  <th scope="col">Nome del Corso</th>
                  <th scope="col">Descrizione Breve</th>
                  <th scope="col">Darata (in mesi)</th>
                  <th scope="col">Categoria Corso</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.nomeCorso}</td>
                    <td>{course.desc}</td>
                    <td>{course.durata}</td>
                    <td>{course.categoria.nomeCategoria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <ErrorPage
              messageError="Non hai le autorizzazioni per accedere"
              paraError="Per favore, torna alla home per vedere altri contenuti"
            >
              <Link className="linkErrorPage" to="/">
                Vai alla home
              </Link>
            </ErrorPage>
          </div>
        )
      ) : (
        <div>
          <ErrorPage
            messageError="Sessione di autenticazione scaduta"
            paraError="Per favore, effettua il login per accedere a questa pagina."
          >
            <Link className="linkErrorPage" to="/login">
              Vai alla pagina di login
            </Link>
          </ErrorPage>
        </div>
      )}
    </>
  );
}
