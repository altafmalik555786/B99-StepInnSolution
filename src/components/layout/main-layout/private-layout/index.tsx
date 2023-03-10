import { memo, useEffect, useState } from "react";
import Routing from "../../../../router-service";
import { observer } from "mobx-react";
import style from "../../style.module.scss";
import Header from "../../Sidebar/header";
import { Layout } from "antd";
import Sider from "antd/lib/layout/Sider";
import Sidebar from "../../Sidebar/sidebar";
import classNames from "classnames";
import { useStore } from "@stores/root-store";
import { useNavigate } from "react-router-dom";

const PrivateLayout = observer(() => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    user: { loadUserInfo, getUserInfo },
  } = useStore(null);

  useEffect(() => {
    if (getUserInfo == null) {
      loadUserInfo(navigate);
    }
  }, []);

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
        <div className={style.routingPagesContainer}>
          <Routing />
        </div>
      </Layout>
    </Layout>
  );
});
export default memo(PrivateLayout);
