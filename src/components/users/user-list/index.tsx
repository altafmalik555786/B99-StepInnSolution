import { observer } from "mobx-react";
import React, { memo } from "react";
import HeaderButtons from "../header-buttons";
import TitleBar from "../title-bar";
import style from "./style.module.scss";

const UserList = observer(() => {
  return (
    <div className={style.userListMainContainer} >
      <div className={style.userListContainer}>
        <TitleBar />
        <p>p tag</p>

        
      </div>
    </div>
  );
});

export default memo(UserList);
