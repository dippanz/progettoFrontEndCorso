import { useContext } from "react";
import "./Profile.css";
import { AuthContext } from "../../components/context/AuthContextProvider";
import imageProfile from "../../assets/icon-profile.png";
import UsersList from "../UsersList/UsersList.jsx";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const { isLogged, setIsLogged } = useContext(AuthContext);

  return (
    <>
      {/* questa parte serve per qualsiasi utente loggato, sotto metto solo quella per gli admin */}
      <div className="containerProfile">
        <div className="containerImageProfile">
          <img src={imageProfile} alt="profile image" />
        </div>

        <div className="containerDataProfile">
          <p>
            <b>First Name:</b> {user.firstName}{" "}
          </p>
          <p>
            <b>Last Name:</b> {user.lastName}
          </p>
          <p>
            <b>Email:</b> {user.email}{" "}
          </p>

          <div>
            <p>
              <b>Ruoli:</b>
              {user.ruoli.map((role) => (
                <span key={role.id != null ? role.id : Math.random()}>
                  {" "}
                  {role.tipologia},
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <UsersList></UsersList>
    </>
  );
}
