import { observer } from "mobx-react";
import React, { memo } from "react";
import { Col, Form, Row } from "antd";
import style from "./style.module.scss";
import CustomButton from "@components/common-components/custom-button";
import { LOWER_SUBMIT } from "@utils/const";
import { ACCOUNTS, COMMISSION_REPORT, FINAL_SHEET, USER_LIST } from "../const";
import { FilterOutlined } from "@ant-design/icons";
import TitleBar from "../title-bar";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

export const BOOK_DETAIL = "Book Detail";
export const BOOK_DETAIL_2 = "Book Detail 2";
export const Daily_PL = "Daily PL";
export const Daily_Report = "Daily Report";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const onSearch = (value: string) => console.log(value);

const HeaderButtons = observer(() => {
  return (
    <>
      <div className={style.usersContainer}>
       

        <Form className="form">
          <Form.Item className="formItems">
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
            <CustomButton
              className={style.loginBtn}
              htmlType={LOWER_SUBMIT}
              loading={false}
              title={FINAL_SHEET}
            />
            <CustomButton
              className={style.loginBtn}
              htmlType={LOWER_SUBMIT}
              loading={false}
              title={ACCOUNTS}
            />
            <CustomButton
              className={style.loginBtn}
              htmlType={LOWER_SUBMIT}
              loading={false}
              title={COMMISSION_REPORT}
            />
          </Form.Item>

          {/* <TitleBar />
          <div className={style.usersContainer}>
            <Row>
              <Col span={24}>
                <div className={style.userHeader}>
                  <h4>{USER_LIST} </h4>
                </div>
              </Col>
            </Row>
            <br/>
            <Space direction="vertical" className="search">
              <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                // suffix={suffix}
                onSearch={onSearch}
              />
            </Space>
          </div> */}
        </Form>
        
      </div>
    </>
  );
});

export default memo(HeaderButtons);
