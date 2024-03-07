import { useOutlet } from "react-router-dom";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import { useContext, useEffect } from "react";
import AuthService from "../service/AuthService.jsx";
import { AuthContext } from "./context/AuthContextProvider.jsx";
import Cookies from "js-cookie";

export default function Layout() {
  const outlet = useOutlet();

  const { user, setUser } = useContext(AuthContext);

  //uso questo all'avvio della pagina per controllare se il cookie del token è ancora presente cosi da loggare l'utente all'avvio
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      const email = Cookies.get("email");
      if (email != undefined) {
        AuthService.getUtente(email).then((userDb) => {
          setUser({
            id: userDb.id,
            firstName: userDb.nome,
            lastName: userDb.cognome,
            email: userDb.email,
            ruoli : userDb.ruoli
          });
        });
      }
    }
  }, []);

  return (
    <>
      <Header></Header>
      {outlet}
      <Footer></Footer>
    </>
  );
}
