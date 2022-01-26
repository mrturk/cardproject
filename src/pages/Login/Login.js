import React, { useEffect } from "react";
import loginStyle from "./Login.module.css";
import video from "../../assets/backgroundvideos/3.mp4";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../../store/Action/auth";
import { useHistory } from "react-router-dom";
import { login } from "../../services/auth";
export default function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);
  const onFinish = async (values) => {
    const response = await login(values);
    dispatch(loginAction(response.data));
    history.push("/home");
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className={loginStyle.main}>
        <video
          className={loginStyle.background_video}
          src={video}
          autoPlay={true}
          loop={true}
          muted={true}
        />
        <div className={loginStyle.formStyle}>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="E-Mail:"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Lütfen kullanıcı adınızı giriniz!",
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
              label="Şifre:"
              name="password"
              rules={[{ required: true, message: "Lütfen şifrenizi giriniz" }]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Giriş
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
