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
      }
    }catch (error) {
      console.error(error);
      await swal("Registration Failed", (error as any).response.data.message, "error");
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
      const response = await axios.post(`${API_URL}Jobs/post-job`, form,{
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
    }
  }catch (error) {
    console.error(error);
    await swal("Posting failed", (error as any).response.data.message, "error");
    return false;
  }
};
export const fetchMyJobs = async (token: string, id: string) => {
  try {
    console.log('Before API call');
    const response = await axios.get(`${API_URL}Jobs/get-my-jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('After API call', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log('API call failed');
  }
};

export const deleteJob = async (token: string,id :string) => {
  try {
    const response = await axios.delete(`${API_URL}Jobs/delete-job/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      console.log(response.data);
      if (response.data.status === "Success") {
        await swal(
        "Job deleted succesfully!",
        response.data.message,
        "success"
        );
      }
    }catch (error) {
      await swal("Delete failed", (error as any).response.data.message, "error");
    }
}

export const fetchEmployers = async () => {
  try {
    const response = await axios.get(`${API_URL}Employer/get-employers`);
      console.log(response.data);
      return response.data;
    }catch (error) {
      console.error(error);
    }
}
export const fetchCandidates = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${API_URL}Jobs/get-job-applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      console.log(response.data);
      return response.data;
    }catch (error) {
      console.error(error);
    }
}
export const updateStatus = async (token: string, id: string, status: string) => {
  try {
    const response = await axios.put(`${API_URL}Jobs/update-job-application/${id}`, status, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'  // Set content type to JSON
      }
    });

    if (response.data.status === "Success") {
      await swal("Successfully updated!", response.data.message, "success");
    }
  } catch (error) {
    await swal("Update failed", (error as any).response.data.message, "error");
    console.error(error);
  }
}
