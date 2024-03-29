import axios from 'axios';
import swal from 'sweetalert'; 
import {store} from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../redux/userSlice';



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
      }
    }catch (error) {
      await swal("Registration Failed", (error as any).response.data.message, "error");
      return false
    }
};
export const LoginUser = async (credentials: object) => {
  try {
    const response = await axios.post(`${API_URL}Auth/login`, credentials);
    console.log(response.data);

    if (response.data.status === "Success") {
      // Decode the token and extract claims
      const token = response.data.message; // Assuming the token is returned in response.data.message

      const decodedToken: any = jwtDecode(token);

      console.log(decodedToken);
      // Save the claims to Redux using the login action
      store.dispatch(setUser({  // Dispatch the setUser action from userSlice
        isAuthenticated: true,
        token,
        userId: decodedToken["Id"],
        role: decodedToken["Role"],
        email: decodedToken["Email"]
      }));

        return true;
    } 
    
  } catch (error) {
    await swal("Login Failed", (error as any).response.data.message, "error");
    return false
  }
};
export const fetchUser = async (token: string,id :string) => {
  try {
    const response = await axios.get(`${API_URL}Candidate/get-user/${id}`, {
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
export const saveAdditionalData = async (token: string, data: object) => {
  try {
    console.log(data);
    const response = await axios.put(`${API_URL}Candidate/update-additional-info/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'  // Set content type to JSON
      }
    });
    console.log(response.data);
    if (response.data.status === "Success") {
        await swal(
        "Successfully updated!",
        response.data.message,
        "success"
        );
        return true
    }
    return false;
  } catch (error) {
    console.error(error);
    await swal("Save failed", (error as any).response.data.message, "error");
    return false;
  }
}
export const fetchJob = async (token: string,id :string) => {
  try {
    const response = await axios.get(`${API_URL}Jobs/get-job/${id}`, {
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
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}Jobs/get-jobs`);
      console.log(response.data);
      return response.data;
    }catch (error) {
      console.error(error);
    }
}
export const fetchFilteredJobs = async (filter:any) => {
  try {
    const response = await axios.get(`${API_URL}Jobs/get-filtered-jobs?keyword=${filter.keyword??''}&location=${filter.location??''}&type=${filter.type??''}`);
      console.log(response.data);
      return response.data;
    }catch (error) {
      console.error(error);
    }
}
export const hasApplied = async (userId: string, jobId: string) => {
  try {
    const response = await axios.get(`${API_URL}JobApplications/has-applied?userId=${userId}&jobId=${jobId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export const ApplyJob = async (token: string, data: object) => {
  try {
    const response = await axios.post(`${API_URL}JobApplications/add-application`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    if (response.data.status === "Success") {
        await swal(
        "Successfully applied!",
        response.data.message,
        "success"
        );
        return true
    }
    return false;
  } catch (error) {
    console.error(error);
    await swal("Application failed", (error as any).response.data.message, "error");
    return false;
  }
}
export const RemoveApplication = async (token: string, id: string) => {
  try {
    const response = await axios.delete(`${API_URL}JobApplications/remove-application/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    if (response.data.status === "Success") {
        await swal(
        "Successfully removed!",
        response.data.message,
        "success"
        );
        return true
    }
    return false;
  } catch (error) {
    console.error(error);
    await swal("Remove failed", (error as any).response.data.message, "error");
    return false;
  }
}
export const fetchApplications = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${API_URL}JobApplications/get-candidate-applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const fetchNotifications = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${API_URL}Notifications/get-notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const updateNotificationStatus = async (token: string, id: string,status:string) => {
  try {
    const response = await axios.put(`${API_URL}Notifications/update-status/${id}`, status, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'  // Set content type to JSON
      }
    });
    if (response.data.status === "Success") {
      await swal(
      "Successfully updated!",
      response.data.message,
      "success"
      );
    }

  } catch (error) {
    await swal("Update failed", (error as any).response.data.message, "error");
    console.error(error);
  }
}
export const deleteNotification = async (token: string, id: string) => {
  try {
    const response = await axios.delete(`${API_URL}Notifications/delete-notification/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.status === "Success") {
      await swal(
      "Successfully removed!",
      response.data.message,
      "success"
      );
    }

  } catch (error) {
    await swal("Update failed", (error as any).response.data.message, "error");
    console.error(error);
  }
}
export const updateStatuses = async (token: string, id: string,status:string) => {
  try {
    const response = await axios.put(`${API_URL}Notifications/update-statuses/${id}`, status, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'  // Set content type to JSON
      }
    });
    if (response.data.status === "Success") {
      await swal(
      "Successfully updated!",
      response.data.message,
      "success"
      );
    }

  } catch (error) {
    await swal("Update failed", (error as any).response.data.message, "error");
    console.error(error);
  }
}
