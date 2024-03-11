import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContextProvider";
import UsersService from "../../service/UsersService";
import buttonModify from "../../assets/button-modify.svg";
import buttonTrush from "../../assets/trush.svg";
import { Link } from "react-router-dom";

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

  const removeUser = (emailUserToRemove) => {
    const response = UsersService.remove(emailUserToRemove);
    response.then((response) => {
      if (response.ok) {
        //elimino l'utente anche dallo stato
        setUsers(users.filter((user) => user.email !== emailUserToRemove));
      }
    })
    
    
  };

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
                <th scope="col"></th>
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
                  <td>
                    {/* per modificare gli utenti basta farlo inline e uso una select a scelta multipla (per i ruoli), vedi copilot c'era un idea */}
                      <img
                        src={buttonModify}
                        alt="button modify"
                        style={{ marginRight: "30px" }}
                      />
                   

                    <img
                      src={buttonTrush}
                      alt="button trush"
                      onClick={() => {
                        removeUser(user.email);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ marginBottom: "30rem" }}></div>
      )}
    </>
  );
}
