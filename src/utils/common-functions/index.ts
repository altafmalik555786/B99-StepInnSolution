import { LOWER_ERROR } from "@utils/const";
import { notification } from "@utils/notifications";

export const addDebounce = (fn, delay) => {
  let timer;
  return (() => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  })();
}

export const catchApiError = (error, at = "_") => {
  console.log("========================================= Start ==========================================================")
  const { status, data } = error.response
  console.log("At:", at,  " | status: ", status, `| ${LOWER_ERROR}: `, data)
  if (status === 404) {
    notification.error(data.message);
  }
  data?.errors?.length > 0 && data.errors?.forEach(item => {
    notification.error(item?.msg);
  });
  console.log("========================================= End ==========================================================")
}