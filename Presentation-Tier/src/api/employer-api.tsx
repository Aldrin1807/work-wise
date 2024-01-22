import axios from 'axios';
import swal from 'sweetalert'; 

const API_URL = import.meta.env.VITE_BackendLink;;

export const Registration = async (form:FormData) => {
    try {
        const response = await axios.post(`${API_URL}Auth/register-employer`, form);
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

export const fetchEmployer = async (token: string,id :string) => {
  try {
    const response = await axios.get(`${API_URL}Employer/get-employer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      console.log(response.data);
      return response.data;
    }catch (error) {
      console.error(error);
    }
};

export const postJob = async (form: any, token: string) => {
  try {
      const response = await axios.post(`${API_URL}Employer/post-job`, form,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);

      if (response.data.status === "Success") {
          await swal(
          "Job posted succesfully!",
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
export const fetchMyJobs = async (token: string,id :string) => {
  try {
    const response = await axios.get(`${API_URL}Employer/get-jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      console.log(response.data);
      return response.data;
    }catch (error) {
      console.error(error);
    }
};