import { getAuthorizationHeader } from "../common-utils";
import axios from "axios";
import { baseUrl } from "../const";
import { BaseApi } from "../baseApi";

class UserApi extends BaseApi {
  onUserLogin = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  onCreateUser = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}register`, data, {
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        cancelToken: this.cancelToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getCurrentUserDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}getCurrentUser`,
        {
          headers: { Authorization: getAuthorizationHeader() },
          cancelToken: this.cancelToken,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  updateUserDetails = async (data, recordId) => {
    try {
      const response = await axios.patch(`${baseUrl}user/${recordId}/`, data, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      });

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
