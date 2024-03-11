import { useOutlet } from "react-router-dom";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import { useContext, useEffect, useRef } from "react";
import AuthService from "../service/AuthService.jsx";
import { AuthContext } from "./context/AuthContextProvider.jsx";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { removeSession } from "../Store/Reducers/Login/index.jsx";

export default function Layout() {
  const outlet = useOutlet();

  const { user, setUser } = useContext(AuthContext);
  const { isLogged, setIsLogged } = useContext(AuthContext);

  let dataToken = useSelector((state) => state.login);

  const dispatch = useDispatch();

  //serve per avere una ref anche dopo l'aggiornamento della pagina
  const interval = useRef(null);

  const checkExpire = () => {
    interval.current = setInterval(() => {
      const ttl = DateTime.fromISO(dataToken.dataExpiration);
      const ttlNow = DateTime.now();

      if (ttl > ttlNow) {
        //elimino il setInterval con il suo id salvato dentro la ref
        clearInterval(interval.current);

        dispatch(removeSession());

        setUser({
          firstName: "",
          lastName: "",
          email: "",
          ruoli: [],
        });

        setIsLogged(false);
      }
    }, 30 * 1 * 1000);
  };

  //uso questo all'avvio della pagina per controllare se il cookie del token è ancora presente cosi da loggare l'utente all'avvio
  useEffect(() => {
    /*if (AuthService.isAuthenticated()) {
      const email = Cookies.get("email");
      const token = Cookies.get("token");
      
      if (email != undefined) {
        AuthService.getUtente(email).then((userDb) => {
          if (userDb.id != undefined && userDb.id != "") {
            setUser({
              id: userDb.id,
              firstName: userDb.nome,
              lastName: userDb.cognome,
              email: userDb.email,
              ruoli: userDb.ruoli,
            });

            //sono sicuro che l'utente è stato preso e lo loggo
            setIsLogged(true);
          }
        });
      }
    }*/

    if (dataToken != undefined && dataToken.dataExpiration != "") {
      AuthService.getUtente(dataToken.email).then((userDb) => {
        if (userDb.id != undefined && userDb.id != "") {
          setUser({
            firstName: userDb.nome,
            lastName: userDb.cognome,
            email: userDb.email,
            ruoli: userDb.ruoli,
          });

          //sono sicuro che l'utente è stato preso e lo loggo
          setIsLogged(true);
        }
      });

      checkExpire();
    }
  }, [dataToken]);

  return (
    <>
      <Header></Header>
      {outlet}
      <Footer></Footer>
    </>
  );
}
