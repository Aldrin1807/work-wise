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
      }else{
        await swal("Registration Failed", response.data.message, "error");
        return false;
      }
    }catch (error) {
      return false;
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
    } else {
      await swal("Login Failed", response.data.message, "error");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchUser = async (token: string,id :string) => {
  try {
    const response = await axios.get(`${API_URL}Users/get-user/${id}`, {
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
    const response = await axios.put(`${API_URL}Users/update-additional-info/`, data, {
      headers: {
        Authorization: `Bearer ${token}`
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
    return false;
  }
}
