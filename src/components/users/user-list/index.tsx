import { observer } from "mobx-react";
import { memo } from "react";
import { CAP_REPORT_TYPE } from "../const";
import HeaderButtons from "../common-components/header-buttons";
import TitleBar from "../common-components/title-bar";
import style from "./style.module.scss";
import FilterIcon from "@assets/icons/filter-icon.png";
import { HeaderBtnList } from "../json-data";


const UserList = observer(() => {
  return (
    <div className={style.userListMainContainer}>
      <div className={style.userListContainer}>
        <TitleBar icon={FilterIcon} title={CAP_REPORT_TYPE} className={style.titleBarBorder} />
        <HeaderButtons btnList={HeaderBtnList} />
      </div>
    </div>
  );
});

export default memo(UserList);
