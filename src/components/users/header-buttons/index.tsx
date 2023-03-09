import { observer } from 'mobx-react';
import React, { memo } from 'react'
import { Col, Form, Row} from "antd";
import style from "./style.module.scss";
import CustomButton from '@components/common-components/custom-button';
import {LOWER_SUBMIT, USER_LIST } from '@utils/const';

export const BOOK_DETAIL = "Book Detail";
export const BOOK_DETAIL_2 = "Book Detail 2";
export const Daily_PL = "Daily PL";
export const Daily_Report = "Daily Report";

const HeaderButtons = observer(() => {
  return (
    <>

<div className={style.usersContainer}>
      <Row>
        <Col span={24}>
          <div className={style.userHeader}>
            <h4>{USER_LIST} </h4>
          </div>
        </Col>
      </Row>
<Form className='form'>

<Form.Item>
          <CustomButton
            className={style.loginBtn}
            htmlType={LOWER_SUBMIT}
            loading={false}
            title={BOOK_DETAIL} 
          />
           <CustomButton
            className={style.loginBtn}
            htmlType={LOWER_SUBMIT}
            loading={false}
            title={BOOK_DETAIL_2} 
          />
          <CustomButton
            className={style.loginBtn}
            htmlType={LOWER_SUBMIT}
            loading={false}
            title={Daily_PL} 
          />
           <CustomButton
            className={style.loginBtn}
            htmlType={LOWER_SUBMIT}
            loading={false}
            title={Daily_Report} 
          />
        </Form.Item>


</Form>
<div className={style.userFooter}></div>
</div>

    </>
  )
})

export default memo(HeaderButtons);