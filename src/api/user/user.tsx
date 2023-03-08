import { getAuthorizationHeader } from "../common-utils";
import axios from "axios";
import { baseUrl } from "../const";
import { BaseApi } from "../baseApi";

class UserApi extends BaseApi {
  onUserLogin = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}login/`, data, {
        headers: { 
          'Content-Type': 'application/json'
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getUserDetails = async (num = 1) => {
    try {
      const response = await axios.get(
        `${baseUrl}user/?page=${num ? num : 1}`,
        {
          headers: { Authorization: getAuthorizationHeader() },
          cancelToken: this.cancelToken,
        }
      );

      return response.data;
    } catch (error) {
      throw Promise.reject(error);
    }
  };
  updateUserDetails = async (data, recordId) => {
    try {
      const response = await axios.patch(
        `${baseUrl}user/${recordId}/`,
        data,
        {
          headers: { Authorization: getAuthorizationHeader() },
          cancelToken: this.cancelToken,
        }
      );

      return response.data;
    } catch (error) {
      throw Promise.reject(error);
    }
  };
  deleteUserDetails = async (id: Number) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}/`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw Promise.reject(error);
    }
  };
}

export default UserApi;
