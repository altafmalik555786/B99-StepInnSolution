import { flow, types } from "mobx-state-tree";
import { locationApi } from "../../api";
import { notification } from "../../utils/notifications";

export const locationDetails = types

  .model({
    data: types.maybeNull(types.array(types.string)),
    loading: types.optional(types.boolean, false),
    count: types.maybeNull(types.number),
  })
  .views((self) => ({
    get getLocationsData() {
      return self.data;
    },
    get isLoading() {
      return self.loading;
    },
  }))
  .actions((self) => {
    const setLocationInfo = flow(function* (data) {
      self.loading = true;
      try {
        const res = yield locationApi.setLocationDetails(data);
        notification.info("Location Added Successfully");
        self.data = res;
      } catch (error) {
        console.log("error", error);
      } finally {
        self.loading = false;
      }
    });

    const loadLocationInfo = flow(function* (num = 1) {
      self.loading = true;
      try {
        self.loading = true;
        const res = yield locationApi.getLocationDetails(num);
        self.data = res.results;
        self.count = res.count;
      } catch (error) {
        console.log("error", error);
      } finally {
        self.loading = false;
      }
    });
    const updateClientDetails = flow(function* (data, recordId) {
      try {
        self.loading = true;
        const res = yield locationApi.updateLocationDetails(data, recordId);
        self.data = res;
        notification.info("Location Updated Successfully");
      } catch (error) {
        console.log("error", error);
      } finally {
        self.loading = false;
      }
    });
    const deleteClientDetails = flow(function* (id) {
      try {
        self.loading = true;
        const res = yield locationApi.deleteLoctionDetails(id);
        self.data = res.results;
        notification.info("Location Deleted Successfully");
      } catch (error) {
        console.log("error", error);
      } finally {
        self.loading = false;
      }
    });
    return {
      setLocationInfo,
      loadLocationInfo,
      deleteClientDetails,
      updateClientDetails,
    };
  });

export function initLocationDetails() {
  return locationDetails.create({});
}
