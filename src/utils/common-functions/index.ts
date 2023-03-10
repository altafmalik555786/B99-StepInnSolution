import { LOWER_ERROR, LOWER_TOKEN } from "@utils/const";
import { notification } from "@utils/notifications";
import { constRoute } from "@utils/route";
import { resetStore } from "@stores/root-store";

export const addDebounce = (fn, delay) => {
  let timer;
  return (() => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  })();
}

export const catchApiError = (error, at = "_") => {
  console.log(`======================= Start =========================`)
  const { status, data } = error.response
  console.log("At:", at,  " | status: ", status, `| ${LOWER_ERROR} data: `, data)
  if (status === 404) {
    notification.error(data.message);
  }
  data?.errors?.length > 0 && data.errors?.forEach(item => {
    notification.error(item?.msg);
  });
  console.log( `======================= End ========================= \n\n\n\n` )
}

export const onLogOutClearAll = (naviagte = null) => {
  localStorage.removeItem(LOWER_TOKEN)
  naviagte(constRoute.login)
  resetStore()
}