const UsersService = {
  getAllUsers: async () => {
    const response = await fetch("http://localhost:8080/api/utente/get/all", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  },

  remove: async (userEmail) => {
    const response = await fetch(`http://localhost:8080/api/utente/deleteUser/${userEmail}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response
  },
};

export default UsersService;
