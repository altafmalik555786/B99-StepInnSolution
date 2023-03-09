import { Col, Row } from 'antd'
import React, { memo } from 'react'
import { USER_LIST } from '../const'
import style from "./style.module.scss";
import classNames from "classnames";
import { observer } from 'mobx-react';




const TitleBar = observer( (  ) => {
  return  (
    <div className={classNames(style.titleBarContainer,  )  }>
      <Row>
        <Col span={24}>
          <div >
            <h4 className="uList">{USER_LIST} </h4>
          </div>
        </Col>
      </Row>
    </div>
  )
})

export default memo(TitleBar)