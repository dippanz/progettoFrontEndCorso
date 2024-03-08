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
};

export default UsersService;
