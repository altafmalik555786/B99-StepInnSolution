import { cast, flow, types } from "mobx-state-tree";
import { userApi } from "../../api";
import { notification } from "../../utils/notifications";
import { toJS } from "mobx";
import { constRoute } from "@utils/route";
import { catchApiError, onLogOutClearAll } from "@utils/common-functions";
import { LOWER_TOKEN } from "@utils/const";

export const userData = types.model({
  role: types.maybeNull(types.union(types.string, types.number)),
  userName: types.maybeNull(types.string),
  userId: types.maybeNull(types.number),
  balance: types.maybeNull(types.number),
});

export const userInfo = types.model({
  balance: types.maybeNull(types.number),
  bettingAllowed: types.maybeNull(types.boolean),
  canSettlePL: types.maybeNull(types.boolean),
  createdAt: types.maybeNull(types.number),
  createdBy: types.maybeNull(types.string),
  downLineShare: types.maybeNull(types.number),
  isActive: types.maybeNull(types.boolean),
  notes: types.maybeNull(types.string),
  password: types.maybeNull(types.string),
  passwordChanged: types.maybeNull(types.boolean),
  phone: types.maybeNull(types.string),
  reference: types.maybeNull(types.string),
  role: types.maybeNull(types.union(types.string, types.number)),
  status: types.maybeNull(types.number),
  token: types.maybeNull(types.string),
  updatedAt: types.maybeNull(types.number),
  userId: types.maybeNull(types.number),
  userName: types.maybeNull(types.string),
});

export const user = types

  .model({
    userLoginData: types.maybeNull(userData),
    userInfo: types.maybeNull(userInfo),
    loading: types.optional(types.boolean, false),
    loadingCreatUser: types.optional(types.boolean, false),
    count: types.maybeNull(types.number),
  })
  .views((self) => ({
    get getUserLoginData() {
      return toJS(self.userLoginData);
    },
    get getUserInfo() {
      return toJS(self.userInfo);
    },
    get isLoading() {
      return self.loading;
    },
    get isLoadingCreateUser() {
      return self.loadingCreatUser;
    },
  }))
  .actions((self) => {
    const onUserLoginInfo = flow(function* (data, navigate) {
      self.loading = true;
      try {
        const res = yield userApi.onUserLogin(data);
        if (res?.success) {
          const userData = {
            role: res?.role,
            userName: res?.userName,
            userId: res?.userId,
            balance: res?.balance,
          };
          self.userLoginData = userData;
          localStorage.setItem(LOWER_TOKEN, res?.token);
          notification.success(res?.message);
          navigate(`${constRoute.dashboard}`);
        }
      } catch (error) {
        catchApiError(error, "onUserLoginInfo");
      } finally {
        self.loading = false;
      }
    });

    const createUser = flow(function* (data) {
      self.loadingCreatUser = true;
      let response = null;
      try {
        const res = yield userApi.onCreateUser(data);
        response = res;
        if (res?.success) {
          notification.success("User created successfully");
        }
      } catch (error) {
        catchApiError(error, "createUser");
      } finally {
        self.loadingCreatUser = false;
        return response;
      }
    });

    const loadUserInfo = flow(function* (navigate = null) {
      self.loading = true;
      let response = null;
      try {
        self.loading = true;
        const res = yield userApi.getCurrentUserDetails();
        response = res;
        self.userInfo = res?.user
      } catch (error) {
        response = error.response;
        catchApiError(error, "loadUserInfo");
        if (response?.status === 404) {
          onLogOutClearAll(navigate);
        }
      } finally {
        self.loading = false;
        return response;
      }
    });

    const updateClientDetails = flow(function* (data, recordId) {
      try {
        self.loading = true;
        const res = yield userApi.updateUserDetails(data, recordId);
        self.userLoginData = res;
        notification.info("User Updated Successfully");
      } catch (error) {
        catchApiError(error, "updateClientDetails");
      } finally {
        self.loading = false;
      }
    });
    const deleteUserDetails = flow(function* (id) {
      try {
        self.loading = true;
        const res = yield userApi.deleteUserDetails(id);
        self.userLoginData = res.results;
        notification.info("User Deleted Successfully");
      } catch (error) {
        catchApiError(error);
      } finally {
        self.loading = false;
      }
    });
    return {
      onUserLoginInfo,
      loadUserInfo,
      deleteUserDetails,
      updateClientDetails,
      createUser,
    };
  });

export function initUser() {
  return user.create({});
}
