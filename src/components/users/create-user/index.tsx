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
  CAP_SHARE,
  LOWER_SHARE,
  LOWER_MUST_BE_LESS_THAN,
  LOWER_MUST_BE_GREATER_THAN,
  CAP_NOTES,
  LOWER_NOTES,
  LOWER_CHECKED,
  CAP_SUPER_MASTER,
  CAP_BETTOR,
  CAP_TYPE,
  CAMEL_USER_TYPE,
} from "@utils/const";
import { memo, useCallback } from "react";
import style from "./style.module.scss";
import { Checkbox, Col, Form, Radio, Row } from "antd";
import { observer } from "mobx-react";
import { CommonInput } from "@components/common-components/input";
import { useStore } from "@stores/root-store";
import { useNavigate } from "react-router-dom";
import CustomButton from "@components/common-components/custom-button";
import {
  CAMEL_IS_ACTIVE,
  CAP_DOWNLINE,
  CAP_REFERENCE,
  LOWER_REFERENCE,
  NUM_STR_0,
  NUM_STR_85,
} from "../const";
import TextArea from "antd/es/input/TextArea";
import { constRoute } from "@utils/route";

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
    user: { createUser, isLoadingCreateUser },
  } = useStore(null);

  const onSubmit = useCallback( async (values) => {
    const payload = {
      role: values.userType,
      password: values?.password,
      userName: values?.userName,
      reference: values?.reference,
      phone: values?.phone,
      notes: values?.notes,
      isActive: values.isActive,
      balance: 5000
    }
   const res =  await createUser(payload)
   res.success && navigate(constRoute.dashboard)
  }, []);


  return (
    <div className={style.usersContainerLayout}>
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
              onValuesChange={(e) => console.log("e.target.value", e)}
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
                rules={[{ required: true,  }]}
              >
                <CommonInput
                  variant={LOWER_TRANSPARENT}
                  inputType={LOWER_PASSWORD}
                  onInput={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
              <Form.Item label={CAP_REFERENCE} name={LOWER_REFERENCE}  
               rules={[
                {
                  required: true,
                  message: CAP_REFERENCE + " " + LOWER_IS_REQUIRED,
                },
              ]}
              >
                <CommonInput
                  variant={LOWER_TRANSPARENT}
                  inputType={LOWER_TEXT}
                  onInput={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                  
                />
              </Form.Item>
              <Form.Item label={CAP_PHONE} name={LOWER_PHONE}
               rules={[
                {
                  required: true,
                  message: CAP_PHONE + " " + LOWER_IS_REQUIRED,
                },
              ]}
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
                label={`${CAP_DOWNLINE} ${CAP_SHARE}`}
                name={"downlineShare"}
                rules={[
                  { required: true },
                  {
                    max: Number(NUM_STR_85),
                    message: `${CAP_DOWNLINE} ${LOWER_SHARE} ${LOWER_MUST_BE_LESS_THAN} ${NUM_STR_85}`,
                  },
                  {
                    min: Number(NUM_STR_0),
                    message: `${CAP_DOWNLINE} ${LOWER_SHARE} ${LOWER_MUST_BE_GREATER_THAN} ${NUM_STR_0}`,
                  },
                ]}
              >
                <CommonInput
                  variant={LOWER_TRANSPARENT}
                  inputType={LOWER_NUMBER}
                  min={"0"}
                  max={"85"}
                  onInput={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Form.Item>
              <Form.Item label={CAP_NOTES} name={LOWER_NOTES}
              rules={[
                {
                  required: true,
                  message: CAP_NOTES + " " + LOWER_IS_REQUIRED,
                },
              ]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item name={CAMEL_USER_TYPE} label={CAP_TYPE} 
              rules={[
                {
                  required: true,
                  message: CAP_TYPE + " " + LOWER_IS_REQUIRED,
                },
              ]}
              >
                <Radio.Group>
                  <Radio value={"1"}>{CAP_SUPER_MASTER}</Radio>
                  <Radio value={"5"}>{CAP_BETTOR}</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name={CAMEL_IS_ACTIVE}
                label={CAMEL_IS_ACTIVE}
                valuePropName={LOWER_CHECKED}
                rules={[
                  {
                    required: true,
                    message: CAMEL_IS_ACTIVE + " " + LOWER_IS_REQUIRED,
                  },
                ]}
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <div className={style.userFooter}>
          <Form
            form={form}
            onFinish={onSubmit}
            onValuesChange={(e) => console.log("e.target.value", e)}
            name={LOWER_BASIC}
            initialValues={INITIAL_VALUES}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout={LOWER_HORIZONTAL}
            autoComplete={LOWER_OFF}
            validateMessages={validateMessages}
          >
            <CustomButton
              className={style.submitBtn}
              htmlType={LOWER_SUBMIT}
              loading={isLoadingCreateUser}
              title={CAP_SUBMIT}
            />
          </Form>
        </div>
      </div>
    </div>
  );
});

export default memo(Users);
