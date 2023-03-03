import { observer } from "mobx-react";
import React, { memo } from "react";
import { Card, Col, Row } from "antd";
import style from "./style.module.scss";

export interface StatusCardsPropsTypes {
  item: items[];
}

export interface items {
  icon: string;
  label: string;
  value: number | string;
}

const StatusCard = observer(({ item }) => {
  return (
    <Card className={style.statusCardContainer}>
      <Row className={style.statusCardRow} >
        <Col md={11}>
          <div className={style.iconContainer}>
            <img src={item?.icon} alt="card icon" />
          </div>
        </Col>
        <Col md={10} className={style.cardTextContainer}>
          <p>{item?.label || "-"}</p>
          <span> {item?.value || 0} </span>
        </Col>
      </Row>
    </Card>
  );
});

export default memo(StatusCard);
