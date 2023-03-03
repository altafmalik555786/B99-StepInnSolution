import { getAuthorizationHeader } from "../common-utils";
import axios from "axios";
import { baseUrl } from "../const";
import { BaseApi } from "../baseApi";

class LocationApi extends BaseApi {
  setLocationDetails = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}location/`, data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: getAuthorizationHeader(),
        },
        cancelToken: this.cancelToken,
      });

      return response.data;
    } catch (error) {
      throw Promise.reject(error);
    }
  };

  getLocationDetails = async (num = 1) => {
    try {
      const response = await axios.get(
        `${baseUrl}location/?page=${num ? num : 1}`,
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
  updateLocationDetails = async (data, recordId) => {
    try {
      const response = await axios.patch(
        `${baseUrl}location/${recordId}/`,
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
  deleteLoctionDetails = async (id: Number) => {
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

export default LocationApi;
