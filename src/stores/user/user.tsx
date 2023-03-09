import { cast, flow, types } from "mobx-state-tree";
import { userApi } from "../../api";
import { notification } from "../../utils/notifications";
import { toJS } from 'mobx'
import { constRoute } from "@utils/route";
import { catchApiError } from "@utils/common-functions";
import { LOWER_TOKEN } from "@utils/const";

export const userData = types.model({
  role: types.maybeNull(types.union(types.string, types.number)),
  userName: types.maybeNull(types.string),
  userId: types.maybeNull(types.number),
  balance: types.maybeNull(types.number),
})

export const user = types

  .model({
    userLoginData: types.maybeNull(userData),
    userInfo: types.maybeNull(userData),
    loading: types.optional(types.boolean, false),
    loadingCreatUser: types.optional(types.boolean, false),
    count: types.maybeNull(types.number),
  })
  .views((self) => ({
    get getUserInfo() {
      return toJS(self.userLoginData);
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
            balance: res?.balance
          }
          self.userLoginData = userData;
          localStorage.setItem(LOWER_TOKEN, res?.token)
          notification.success(res?.message);
          navigate(`${constRoute.dashboard}`)
          loadUserInfo()
        }
      } catch (error) {
        catchApiError(error, "onUserLoginInfo")
      } finally {
        self.loading = false;
      }
    });

  
    const createUser = flow(function* (data) {
      self.loadingCreatUser = true;
      let response = null;
      try {
        const res = yield userApi.onCreateUser(data);
        response = res
      } catch (error) {
        catchApiError(error, "createUser")
      } finally {
        self.loadingCreatUser = false;
        return response
      }
    });

    const loadUserInfo = flow(function* () {
      self.loading = true;
      try {
        self.loading = true;
        const res = yield userApi.getCurrentUserDetails();
      } catch (error) {
        catchApiError(error, "loadUserInfo")
      } finally {
        self.loading = false;
      }
    });

    const updateClientDetails = flow(function* (data, recordId) {
      try {
        self.loading = true;
        const res = yield userApi.updateUserDetails(data, recordId);
        self.userLoginData = res;
        notification.info("User Updated Successfully");
      } catch (error) {
        console.log("error", error);
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
        catchApiError(error)
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
