import { LOWER_ERROR } from "@utils/const";
import { notification } from "@utils/notifications";

export const addDebounce = (fn, delay) =>{
    let timer;
    return (() => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(), delay);
    })();
}

export const catchApiError = (error, at = "_") => {
    console.log("At:", at,  `| : ${LOWER_ERROR}`, error)
    const { status, data } = error.response
        if (status === 404) {
          notification.error(data.message);
        }
        data?.errors?.length > 0 && data.errors?.forEach(item => {
          notification.error(item?.msg);
        });
}