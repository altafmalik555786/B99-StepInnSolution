import {
  CAMEL_ON_BLUR,
  CAP_PASSWORD,
  CAP_CREATE_NEW,
  CAP_SUBMIT,
  CAP_USER,
  CAP_USER_NAME,
  INITIAL_VALUES,
  LOWER_BASIC,
  LOWER_EMAIL,
  LOWER_HORIZONTAL,
  LOWER_IS_REQUIRED,
  LOWER_LABEL_NOT_VALID,
  LOWER_LABLE_BETWEEN_MIN_MAX,
  LOWER_LABLE_REQUIRED,
  LOWER_NUMBER,
  LOWER_OFF,
  LOWER_PASSWORD,
  LOWER_SUBMIT,
  LOWER_TEXT,
  LOWER_TRANSPARENT,
  LOWER_USER_NAME,
  CAP_PHONE,
  LOWER_PHONE,
} from "@utils/const";
import { memo, useCallback } from "react";
import style from "./style.module.scss";
import { Col, Form, Row } from "antd";
import { observer } from "mobx-react";
import { CommonInput } from "@components/common-components/input";
import { useStore } from "@stores/root-store";
import { useNavigate } from "react-router-dom";
import CustomButton from "@components/common-components/custom-button";
import { CAP_REFERENCE, LOWER_REFERENCE } from "./const";

const validateMessages = {
  required: LOWER_LABLE_REQUIRED,
  types: {
    email: `${LOWER_LABEL_NOT_VALID} ${LOWER_EMAIL}!"`,
    number: `${LOWER_LABEL_NOT_VALID} ${LOWER_NUMBER}!`,
  },
  number: {
    range: LOWER_LABLE_BETWEEN_MIN_MAX,
  },
};

const Users = observer(() => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {
    user: { isLoading },
  } = useStore(null);

  const onSubmit = useCallback((values) => {
    console.log("values", values);
  }, []);

  return (
    <div className={style.usersContainer}>
      <Row>
        <Col span={24}>
          <div className={style.userHeader}>
            <h4>{CAP_CREATE_NEW + CAP_USER} </h4>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form
            form={form}
            name={LOWER_BASIC}
            initialValues={INITIAL_VALUES}
            onFinish={onSubmit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout={LOWER_HORIZONTAL}
            autoComplete={LOWER_OFF}
            validateMessages={validateMessages}
            className={style.userForm}
          >
            <Form.Item
              name={LOWER_USER_NAME}
              label={CAP_USER_NAME}
              className={style.emailFormItem}
              validateTrigger={[CAMEL_ON_BLUR]}
              rules={[
                {
                  required: true,
                  message: CAP_USER_NAME + " " + LOWER_IS_REQUIRED,
                },
              ]}
            >
              <CommonInput
                variant={LOWER_TRANSPARENT}
                inputType={LOWER_TEXT}
                onFocus={() =>
                  form.setFields([{ name: LOWER_EMAIL, errors: [] }])
                }
              />
            </Form.Item>
            <Form.Item
              className={style.passwordFormItem}
              label={CAP_PASSWORD}
              name={LOWER_PASSWORD}
              rules={[{ required: true }]}
            >
              <CommonInput
                variant={LOWER_TRANSPARENT}
                inputType={LOWER_PASSWORD}
                onInput={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </Form.Item>
            <Form.Item
              className={style.refFormItem}
              label={CAP_REFERENCE}
              name={LOWER_REFERENCE}
            >
              <CommonInput
                variant={LOWER_TRANSPARENT}
                inputType={LOWER_TEXT}
                onInput={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </Form.Item>
            <Form.Item
              className={style.phoneFormItem}
              label={CAP_PHONE}
              name={LOWER_PHONE}
            >
              <CommonInput
                variant={LOWER_TRANSPARENT}
                inputType={LOWER_TEXT}
                onInput={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div className={style.userFooter}>
          <CustomButton
            className={style.submitBtn}
            htmlType={LOWER_SUBMIT}
            loading={isLoading}
            title={CAP_SUBMIT}
          />
      </div>
    </div>
  );
});

export default memo(Users);
