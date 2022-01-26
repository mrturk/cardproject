import React, { useState } from "react";
import customerStyle from "./Customer.module.css";
import video from "../../assets/backgroundvideos/3.mp4";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import instagram from "../../assets/icons/instagram.png";
import twitter from "../../assets/icons/twitter.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import linkedin from "../../assets/icons/linkedin.png";
import facebook from "../../assets/icons/facebook.png";
import website from "../../assets/icons/website.png";
import { Form, Modal, Input, Spin } from "antd";
import { addMedia } from "../../services/media";
export default function Customer() {
  const history = useHistory();
  const state = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (state.auth.logout === true) {
    history.push("/Login");
  }
  const addUrl = (key) => {
    setModalTitle(key);
    setKey(key);
    setIsModalVisible(true);
  };
  const onFinish = async (values) => {
    setIsModalVisible(false);
    try {
      setIsLoading(true);
      const passData = {
        ...values,
        key: key,
        userId: state.auth.id,
      };
      await addMedia(passData);
      setIsLoading(false);
    } catch {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (isLoading) {
    return (
      <>
        <Navbar />

        <div className={customerStyle.main}>
          <video
            className={customerStyle.background_video}
            src={video}
            autoPlay={true}
            loop={true}
            muted={true}
          />
          <Spin />
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />

      <Modal
        title={<h1>{modalTitle}</h1>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label={key} name="url">
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item>
            <button className={customerStyle.button} htmlType="submit">
              Giriş
            </button>
          </Form.Item>
        </Form>
      </Modal>
      <div className={customerStyle.main}>
        <video
          className={customerStyle.background_video}
          src={video}
          autoPlay={true}
          loop={true}
          muted={true}
        />
        <div className="container">
          <div className={`row ${customerStyle.marginbottom}`}>
            <div className={`col-md-6 ${customerStyle.colflex}`}>
              <img
                className={customerStyle.iconStyle}
                src={instagram}
                alt="instagram"
                onClick={(e) => addUrl(e.target.alt)}
              />
            </div>
            <div className={`col-md-6 ${customerStyle.colflex}`}>
              <img
                className={customerStyle.iconStyle}
                src={twitter}
                alt="twitter"
                onClick={(e) => addUrl(e.target.alt)}
              />
            </div>
          </div>
          <div className={`row ${customerStyle.marginbottom}`}>
            <div className={`col-md-6 ${customerStyle.colflex}`}>
              <img
                className={customerStyle.iconStyle}
                src={whatsapp}
                alt="whatsapp"
                onClick={(e) => addUrl(e.target.alt)}
              />
            </div>
            <div className={`col-md-6 ${customerStyle.colflex}`}>
              <img
                className={customerStyle.iconStyle}
                src={linkedin}
                alt="linkedin"
                onClick={(e) => addUrl(e.target.alt)}
              />
            </div>
          </div>
          <div className={`row`}>
            <div className={`col-md-6 ${customerStyle.colflex}`}>
              <img
                className={customerStyle.iconStyle}
                src={facebook}
                alt="facebook"
                onClick={(e) => addUrl(e.target.alt)}
              />
            </div>
            <div className={`col-md-6 ${customerStyle.colflex}`}>
              <img
                className={customerStyle.iconStyle}
                src={website}
                alt="website"
                onClick={(e) => addUrl(e.target.alt)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
