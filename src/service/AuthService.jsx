import Cookies from "js-cookie";

const AuthService = {
  // Registrazione
  register: async (userData) => {
    const jsonData = JSON.stringify(userData);

    const response = await fetch(
      "http://localhost:8080/api/utente/registrazione",
      {
        mode: "cors",
        method: "POST",
        body: jsonData,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  },

  // Login --> ritorna i token di accesso e il resto
  login: async (credentials) => {
    const jsonData = JSON.stringify(credentials);

    const response = await fetch("http://localhost:8080/api/utente/login", {
      mode: "cors",
      method: "POST",
      body: jsonData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  },

  // Logout
  logout: () => {
    //rimuovo token
    Cookies.remove("token");
    Cookies.remove("email");
  },

  // Verifica stato di autenticazione
  isAuthenticated: () => {
    if (Cookies.get("token") != undefined) {
      return true;
    }
    return false;
  },

  getUtente: async (email) => {
    const url = `http://localhost:8080/api/utente?email=${email}`;

    const response = await fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  },
  // Funzione per verificare periodicamente la validità del cookie
  checkTokenExpiration: () => {
    const token = Cookies.get("token");

    if (token) {
      const expirationTime = new Date(Cookies.get("token_expiration"));
      const currentTime = new Date();

      // Se il cookie è scaduto, esegui il logout
      if (expirationTime < currentTime) {
        AuthService.logout();
      }
    }
  },

  // Funzione per inizializzare il controllo periodico
  startTokenExpirationCheck: () => {
    // Esegue il controllo ogni 10 minuti
    setInterval(() => {
      AuthService.checkTokenExpiration();
    }, 60 * 10 * 1000);
  },

  getExpireSecond: (ttl, creation) => {
    const ttlTimestamp = new Date(ttl).getTime();
    const creationTimestamp = new Date(creation).getTime();

    // Calcola la durata del cookie in millisecondi
    const duration = ttlTimestamp - creationTimestamp;

    //converto duration da millisecondi a secondi
    return duration * 1000;
  },
};

export default AuthService;
