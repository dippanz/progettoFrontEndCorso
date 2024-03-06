import { useEffect, useState } from "react";
import CourseService from "../../service/CourseService";
import "./CoursesList.css";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    CourseService.getAllCourses().then((response) => {
      if (response.status != undefined && response.status == 200) {
        response.json().then((coursesData) => {
          setCourses(coursesData);
          console.log(coursesData)
        });
      }
    });
  }, []);

  return (
    <>
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
    </>
  );
}
