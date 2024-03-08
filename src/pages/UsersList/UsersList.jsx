import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContextProvider";
import UsersService from "../../service/UsersService";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    UsersService.getAllUsers().then((response) => {
      if (response.status != undefined && response.status == 200) {
        response.json().then((usersData) => {
          setUsers(usersData);
        });
      }
    });
  }, []);

  return (
    <>
      {user.ruoli.filter((ruolo) => ruolo.tipologia == "Admin").length == 1 ? (
        <div className="containerCourses">
          <h2 className="titleCourses">User list</h2>
          <table className="table table-striped myTableCourses">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.cognome}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.ruoli.map((role) => (
                      <span key={role.id != null ? role.id : Math.random()}>
                        {" "}
                        {role.tipologia},
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{marginBottom:"30rem"}}></div>
      )}
    </>
  );
}
