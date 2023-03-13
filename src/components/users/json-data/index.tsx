import { CAMEL_CLIENT_PL, CAMEL_USER_NAME, CAP_ACCOUNT, CAP_BALANCE, CAP_CLIENT_PL, CAP_CREDIT, CAP_EXPOSURE, CAP_OPTIONS, CAP_SHARE, CAP_TYPE, CAP_USER_NAME, LOWER_BALANCE, LOWER_CREDIT, LOWER_EXPOSURE, LOWER_ROLE, LOWER_SHARE } from "@utils/const";
import {
  BOOK_DETAIL,
  BOOK_DETAIL_2,
  CAP_COMMISSION_REPORT,
  CAP_DAILY_PL,
  CAP_DAILY_REPORT,
  CAP_FINAL_SHEET,
} from "../const";
import { Tooltip} from "antd";
import { roleNameTypeUserList } from "@utils/json-data";
import { tableColumnsTextCheck } from "@components/common-components/export-common-components/table-columns-text-check";


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

export const allUsersColumnsData = [
  {
    width: 90,
    title: "#",
    render: (text, row, index) => {
      console.log("row", row);
      return <div>adflaskdf</div>;
    },
  },
  {
    title: CAP_USER_NAME,
    dataIndex: CAMEL_USER_NAME,
    render: (text) => <Tooltip title={text}>{text || "--"}</Tooltip>,
  },
  {
    title: CAP_TYPE,
    dataIndex: LOWER_ROLE,
    render: (role) => (
      <p>
        {roleNameTypeUserList?.find((item) => item?.role === role)?.name || "--"}
      </p>
    ),
  },
  {
    title: CAP_CREDIT,
    dataIndex: LOWER_CREDIT,
    render: tableColumnsTextCheck,
  },
  {
    title: CAP_BALANCE,
    dataIndex: LOWER_BALANCE,
    render: tableColumnsTextCheck,
  },
  {
    title: CAP_CLIENT_PL,
    dataIndex: CAMEL_CLIENT_PL,
    render: tableColumnsTextCheck,
  },
  {
    title: CAP_SHARE,
    dataIndex: LOWER_SHARE,
    render: tableColumnsTextCheck,
  },
  {
    title: CAP_EXPOSURE,
    dataIndex: LOWER_EXPOSURE,
    render: tableColumnsTextCheck,
  },
  {
    title: CAP_BALANCE,
    dataIndex: LOWER_BALANCE,
    render: tableColumnsTextCheck,
  },
  {
    width: 100,
    title: CAP_OPTIONS,
    render: (text, row) => (
      <>
        <button>icons</button>
      </>
    ),
  },
];
