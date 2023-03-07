import React, { useState } from "react";
import Routing from "../../../../router-service";
import { observer } from "mobx-react";
import style from "../../style.module.scss";
import Header from "../../Sidebar/header";
import { Layout } from "antd";
import Sider from "antd/lib/layout/Sider";
import Sidebar from "../../Sidebar/sidebar";
import classNames from "classnames";

const PrivateLayout = observer(() => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={style.layoutSetting}>
      <Sider
        className={
          !collapsed
            ? classNames(style.mobileHide, style.sidebarSetting)
            : classNames(style.mobileshow, style.sidebarSetting)
        }
        collapsible
        collapsed={collapsed}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Routing />
      </Layout>
    </Layout>
  );
});
export default PrivateLayout;
