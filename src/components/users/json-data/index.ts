import { CAP_ACCOUNT, CAP_ADMIN, CAP_BETTOR, CAP_COMPANY, CAP_MASTER, CAP_SUPER_ADMIN, CAP_SUPER_MASTER, NUM_STR_0, NUM_STR_1, NUM_STR_2, NUM_STR_3, NUM_STR_4, NUM_STR_5 } from "@utils/const";
import {
    BOOK_DETAIL,
    BOOK_DETAIL_2,
    CAP_COMMISSION_REPORT,
    CAP_DAILY_PL,
    CAP_DAILY_REPORT,
    CAP_FINAL_SHEET,
  } from "../const";

  export const roleTypeOptionsList = [
    {
      name: CAP_COMPANY,
      role: NUM_STR_0,
    },
    {
      name: CAP_SUPER_ADMIN,
      role: NUM_STR_1,
    },
    {
      name: CAP_ADMIN,
      role: NUM_STR_2,
    },
    {
      name: CAP_SUPER_MASTER,
      role: NUM_STR_3,
    },
    {
      name: CAP_MASTER,
      role: NUM_STR_4,
    },
    {
      name: CAP_BETTOR,
      role: NUM_STR_5,
    },
  ];


export const HeaderBtnList = [
    {
      btnTitle: BOOK_DETAIL,
      loading: false,
    },
    {
      btnTitle: BOOK_DETAIL_2,
      loading: false,
    },
    {
      btnTitle: CAP_DAILY_PL,
      loading: false,
    },
    {
      btnTitle: CAP_DAILY_REPORT,
      loading: false,
    },
    {
      btnTitle: CAP_FINAL_SHEET,
      loading: false,
    },
    {
      btnTitle: CAP_ACCOUNT,
      loading: false,
    },
    {
      btnTitle: CAP_COMMISSION_REPORT,
      loading: false,
    },
  ];


