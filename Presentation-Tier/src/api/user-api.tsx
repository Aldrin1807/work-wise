import axios from 'axios';
import swal from 'sweetalert'; 

const API_URL = import.meta.env.VITE_BackendLink;;

export const Registration = async (form:FormData) => {
    try {
        const response = await axios.post(`${API_URL}Auth/register-user`, form);
        console.log(response.data);

        if (response.data.status === "Success") {
            await swal(
            "Account registered successfully!",
            response.data.message,
            "success"
            );
        return true
      }else{
        await swal("Registration Failed", response.data.message, "error");
        return false;
      }
    }catch (error) {
      console.error(error);
      return false;
    }
};