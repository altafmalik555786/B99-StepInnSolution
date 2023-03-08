import { flow, types } from "mobx-state-tree";
import { userApi } from "../../api";
import { notification } from "../../utils/notifications";
import { toJS } from 'mobx'
import { constRoute } from "@utils/route";
import { catchApiError } from "@utils/common-functions";
import { LOWER_TOKEN } from "@utils/const";

export const userData = types.model({
  role: types.maybeNull(types.union(types.string, types.number)),
  userName: types.maybeNull(types.string),
})

export const user = types

  .model({
    userInfo: types.maybeNull(userData),
    data: types.maybeNull(types.array(types.string)),
    loading: types.optional(types.boolean, false),
    count: types.maybeNull(types.number),
  })
  .views((self) => ({
    get getUserInfo() {
      return toJS(self.userInfo);
    },
    get isLoading() {
      return self.loading;
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
            userName: res?.userName
          }
          self.userInfo = userData;
          localStorage.setItem(LOWER_TOKEN, res?.token)
          notification.success(res?.message);
          navigate(`${constRoute.dashboard}`)
        }
      } catch (error) {
        catchApiError(error, "onUserLoginInfo")
      } finally {
        self.loading = false;
      }
    });

    const loadUserInfo = flow(function* (num = 1) {
      self.loading = true;
      try {
        self.loading = true;
        const res = yield userApi.getUserDetails(num);
        self.data = res.results;
        self.count = res.count;
      } catch (error) {
        catchApiError(error)
      } finally {
        self.loading = false;
      }
    });
    const updateClientDetails = flow(function* (data, recordId) {
      try {
        self.loading = true;
        const res = yield userApi.updateUserDetails(data, recordId);
        self.data = res;
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
        self.data = res.results;
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
    };
  });

export function initUser() {
  return user.create({});
}
