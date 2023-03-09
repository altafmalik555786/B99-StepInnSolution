import { observer } from "mobx-react";
import { memo } from "react";
import { Col, Form, Row } from "antd";
import style from "./style.module.scss";
import CustomButton from "@components/common-components/custom-button";
import { LOWER_SUBMIT } from "@utils/const";

export interface HeaderBtnPropsTypes {
  btnList?: []
}

const HeaderButtons = observer(( {btnList = [] } ) => {
  return (
    <>
      <div className={style.usersHeaderBtnContainer}>
        <Row>
          <Col span={24} >
            <div className={style.btnContainer} >
                {btnList?.length > 0 &&
                  btnList?.map((item) => {
                    return (
                      <CustomButton
                        className={style.loginBtn}
                        htmlType={LOWER_SUBMIT}
                        loading={item?.loading}
                        title={item?.btnTitle}
                      />
                    );
                  })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default memo(HeaderButtons);
