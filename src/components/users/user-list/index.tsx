import { observer } from "mobx-react";
import { memo } from "react";
import { CAP_REPORT_TYPE } from "../const";
import HeaderButtons from "../common-components/header-buttons";
import TitleBar from "../common-components/title-bar";
import style from "./style.module.scss";
import FilterIcon from "@assets/icons/filter-icon.png";
import { HeaderBtnList } from "../json-data";
import CustomButton from "@components/common-components/custom-button";
import { LOWER_SUBMIT } from "@utils/const";
import { constRoute } from "@utils/route";
import { useNavigate } from "react-router-dom";

const UserList = observer(() => {
  
  const navigate = useNavigate()

  return (
    <div className={style.userListMainContainer}>
      <div className={style.userListContainer}>
        <TitleBar
          icon={FilterIcon}
          title={CAP_REPORT_TYPE}
          className={style.titleBarBorder}
        />
        <HeaderButtons btnList={HeaderBtnList} />
        <CustomButton
          htmlType={LOWER_SUBMIT}
          loading={false}
          onClick={() => navigate(constRoute?.createUser)}
          title={"create User"}
        />
      </div>
    </div>
  );
});

export default memo(UserList);
