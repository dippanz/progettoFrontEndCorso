import Cookies from "js-cookie";

const CourseService = {
  getAllCourses: async () => {

    const getToken = () => {
        const token = Cookies.get("token")
        
        if(token != undefined){
            return token
        }

        return ""
    }




    const response = await fetch("http://localhost:8080/api/corso/getAll", {
      mode: "cors",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      }
      
    });

    return response
  },
};

export default CourseService;
