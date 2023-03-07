import { observer } from "mobx-react";
import { memo, useState } from "react";
import style from "./style.module.scss";
import loginLogo from "@assets/icons/logo-2.png";
import loginCoin from "@assets/icons/logo.png";
import CustomButton from "@components/common-components/custom-button";
import {
  CAMEL_ON_BLUR,
  CAP_EMAIL,
  CAP_LOGO,
  INITIAL_VALUES,
  LOWER_BASIC,
  LOWER_EMAIL,
  LOWER_IS_REQUIRED,
  LOWER_LABEL_NOT_VALID,
  LOWER_LABLE_BETWEEN_MIN_MAX,
  LOWER_LABLE_REQUIRED,
  LOWER_OFF,
  LOWER_NOT_VALID,
  UPPER_OUR_POLICIES,
  LOWER_NUMBER,
  EMAIL_PLACE_HOLDER,
  LOWER_DARK,
  LOWER_TEXT,
  CAMEL_PASSWORD,
  LOWER_PASSWORD,
  LOWER_SUBMIT,
} from "@utils/const";
import { Form } from "antd";
import { CommonInput } from "@components/common-components/input";
import DarkUserLogo from "@assets/icons/dark-user-logo.png"
import DarkLock from "@assets/icons/dark-lock.png"

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

const Login = observer(() => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = (values) => {
 
  };


  const LoginForm = () => {
    return (
      <Form
        form={form}
        name={LOWER_BASIC}
        initialValues={INITIAL_VALUES}
        onFinish={onLogin}
        autoComplete={LOWER_OFF}
        validateMessages={validateMessages}
        className={style.loginPanelForm}
      >
        <Form.Item
          name={LOWER_EMAIL}
          className={style.emailFormItem}
          validateTrigger={[CAMEL_ON_BLUR]}
          rules={[
            { type: LOWER_EMAIL, message: `${CAP_EMAIL} ${LOWER_NOT_VALID}` },
            { required: true, message: CAP_EMAIL + " " + LOWER_IS_REQUIRED },
          ]}
        >
          <CommonInput
            placeholder={EMAIL_PLACE_HOLDER}
            variant={LOWER_DARK}
            inputType={LOWER_TEXT}
            prefix={<img src={DarkUserLogo} alt="" />}
            onFocus={() => form.setFields([{ name: LOWER_EMAIL, errors: [] }])}
          />
        </Form.Item>
        <Form.Item
          className={style.passwordFormItem}
          name={CAMEL_PASSWORD}
          rules={[{ required: true }]}
        >
          <CommonInput
            variant={LOWER_DARK}
            inputType={LOWER_PASSWORD}
            prefix={<img src={DarkLock} alt="" />}
            placeholder={CAMEL_PASSWORD}
            onInput={(e) => {
              e.target.value = e.target.value.trim();
            }}
          />
        </Form.Item>
        <Form.Item>
          <CustomButton
            className={style.loginBtn}
            htmlType={LOWER_SUBMIT}
            loading={isLoading}
            title="Login"
           />
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className={style.loginPageContainer}>
      <div className={style.loginPageWrapper}>
        <img className={style.logoLogin} src={loginLogo} alt={CAP_LOGO} />
        {LoginForm()}
        <div className={style.coinLogoContainer}>
          <img src={loginCoin} alt={CAP_LOGO} />
        </div>
        <CustomButton
          title={UPPER_OUR_POLICIES}
          className={style.ourPoliciesBtn}
        />
      </div>
    </div>
  );
});

export default memo(Login);
