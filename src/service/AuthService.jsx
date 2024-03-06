const AuthService = {
  // Registrazione
  register: async (userData) => {},

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

    return response.json();
  },

  // Logout
  logout: () => {
    // Eliminazione del token JWT dai cookies o dallo stato dell'app
  },

  // Verifica stato di autenticazione
  isAuthenticated: () => {
    // Verifica la presenza del token JWT nei cookies o nello stato dell'app
  },

  getUtente: async (email) => {
    const url = `http://localhost:8080/api/utente?email=${encodeURIComponent(email)}`;
  
    const response = await fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.json();
  },
};

export default AuthService;
