import { Col, Row } from "antd";
import { observer } from "mobx-react";
import React, { memo } from "react";
import { dashboardIcons } from "./icons";
import style from "./style.module.scss";
import StatusCard from "@components/common-components/status-card";

const Dashboard = observer(() => {
  const cardsData = [
    {
      icon: dashboardIcons.credit,
      label: "Credit",
      value: 120,
    },
    {
      icon: dashboardIcons.dollorSign,
      label: "Balance",
      value: "$500.00",
    },
    {
      icon: dashboardIcons.liable,
      label: "Liable",
      value: "01",
    },
    {
      icon: dashboardIcons.bet,
      label: "Active Bet",
      value: "04",
    },
  ];

  return (
    <div className={style.dashboardPageContainer}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={style.cardsContainer} >
        {cardsData?.map((item, index) => {
          return (
            <Col md={12} lg={12}  xl={6} className={style.cardCol} >
              <StatusCard key={index} item={item} />;
            </Col>
          );
        })}
      </Row>
    </div>
  );
});

export default memo(Dashboard);
