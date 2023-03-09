import { Col, Row } from 'antd'
import React, { memo } from 'react'
import { CAP_REPORT_TYPE } from '../../const'
import style from "./style.module.scss";
import classNames from "classnames";
import { observer } from 'mobx-react';


export interface titleBarPropsTypes {
  title?: string;
  icon?: string;
  className?: string;
}


const TitleBar = observer( ( {  title = CAP_REPORT_TYPE, icon, className }: titleBarPropsTypes ) => {
  return  (
    <div className={classNames(style.titleBarContainer, className)  }>
      <Row>
        <Col span={24}>
          <div className={style.titleIconContainer} >
            <img src={icon} alt="" />
            <h4>{title} </h4>
          </div>
        </Col>
      </Row>
    </div>
  )
})

export default memo(TitleBar)