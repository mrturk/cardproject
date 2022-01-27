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
import vcard from "../../assets/icons/vcard.png";
import { Form, Modal, Input, Spin } from "antd";
import { addMedia, addVcard } from "../../services/media";
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
    if (key === "qr") {
      try {
        setIsLoading(true);
        const passData = {
          userId: state.auth.id,
          FirstName: values.FirstName,
          LastName: values.LastName,
          Organization:
            values.Organization === undefined || "" ? "" : values.Organization,
          JobTitle: values.JobTitle === undefined || "" ? "" : values.JobTitle,
          Mobile: values.Mobile,
          Phone: values.Phone === undefined || "" ? "" : values.Phone,
          Email: values.Email,
          StreetAddress: "",
          City: "",
          CountryName: "",
          fileName: "",
        };
        await addVcard(passData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
        return;
      }
    }
    if (key === "whatsapp") {
      const wpUrl = `https://wa.me/9${values.url}`;
      values.url = wpUrl;
    }
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

  const elektronicCardModal = () => {
    return (
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label={"AD"} name="FirstName">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label={"SOYAD"} name="LastName">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label={"MESLEK"} name="JobTitle">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label={"ŞİRKET"} name="Organization">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label={"CEP"} name="Mobile">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label={"İŞCEP"} name="Phone">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item label={"EMAİL"} name="Email">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <button
            style={{ marginTop: "20px" }}
            className={customerStyle.button}
            htmlType="submit"
          >
            Giriş
          </button>
        </Form.Item>
      </Form>
    );
  };
  const mediaModal = () => {
    return (
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
    );
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
        title={
          key === "qr" ? (
            <h1>{"ELEKTRONİK KARTVİZİT"}</h1>
          ) : (
            <h1>{modalTitle}</h1>
          )
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        {key === "qr" ? elektronicCardModal() : mediaModal()}
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
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="col-md-12"
            >
              <img
                className={customerStyle.iconStyle}
                src={vcard}
                alt="qr"
                onClick={() => {
                  setKey("qr");
                  setIsModalVisible(true);
                }}
              />
            </div>
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
