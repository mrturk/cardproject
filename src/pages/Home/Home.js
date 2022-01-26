import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import homeStyle from "./Home.module.css";
import { Link, useHistory } from "react-router-dom";
import video from "../../assets/backgroundvideos/3.mp4";
import { Modal, Form, Input, Button } from "antd";
import { addUser } from "../../services/userAdd";
import { getAllUser } from "../../services/userList";
import Navbar from "../../components/Navbar";
export default function Home() {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);
  const state = useSelector((state) => state);
  if (state.auth.logout === true) {
    history.push("/Login");
  }
  const getData = async () => {
    setIsLoading(true);
    const response = await getAllUser();
    setIsLoading(false);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [data]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const postedData = {
        ...values,
        userAdderId: state.auth.id,
        password: "000000",
        isCustomer: true,
        isDistributor: false,
        isAdmin: false,
      };
      setIsLoading(true);
      const response = await addUser(postedData);
      console.log(response);
      await getData();
      console.log("Success:", postedData);
      setIsModalVisible(false);
    } catch {
      console.log("hata");
      setErr(true);
    } finally {
      setIsLoading(false);
      setErr(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (isloading) {
    return (
      <>
        <Navbar />
        <div className={homeStyle.main}>
          <video
            className={homeStyle.background_video}
            src={video}
            autoPlay={true}
            loop={true}
            muted={true}
          />

          <h3 style={{ color: "red" }}>YÜKLENİYOR</h3>
        </div>
      </>
    );
  }

  if (err) {
    return (
      <>
        <Navbar />
        <div className={homeStyle.main}>
          <video
            className={homeStyle.background_video}
            src={video}
            autoPlay={true}
            loop={true}
            muted={true}
          />

          <h3 style={{ color: "red" }}>YÜKLENİYOR</h3>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className={homeStyle.main}>
        <video
          className={homeStyle.background_video}
          src={video}
          autoPlay={true}
          loop={true}
          muted={true}
        />
        <div style={{ height: "100%" }} className="container-fluid row">
          <div className={`col-md-4`}>
            <span>
              <div className={`card ${homeStyle.col4style}`}>
                <div className="card-body">
                  <h3 style={{ textAlign: "center" }}>
                    TOPLAM EKLENEN KULLANICI
                  </h3>
                  <h4 style={{ textAlign: "center" }}>{data.length}</h4>
                </div>
              </div>
            </span>
          </div>
          <div className="col-md-4">
            <button className={homeStyle.button} onClick={showModal}>
              Kullanıcı Ekle
            </button>
            <Modal
              title="Kullanıcı Ekle"
              visible={isModalVisible}
              onOk={handleOk}
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
                <Form.Item
                  label="AD"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen İsim Giriniz!",
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                  label="Soyad"
                  name="surname"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen soy isim giriniz!",
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                  label="E-Posta"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen email giriniz!",
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                  label="Telefon Numarası"
                  name="telnumber"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen kullanıcı adınızı giriniz!",
                    },
                  ]}
                >
                  <Input type={"number"} autoComplete="off" />
                </Form.Item>
                <Form.Item
                  label="Kart Numarası"
                  name="cardnumber"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen kart numarasını giriniz!",
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Ekle
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className={`col-md-4`}>
            <span>
              <div className={`card ${homeStyle.col4style}`}>
                <div className="card-body">
                  <h3 style={{ textAlign: "center" }}>TOPLAM SATIŞ TUTARI</h3>
                  <h4 style={{ textAlign: "center" }}>{data.length * 50}₺</h4>
                </div>
              </div>
            </span>
          </div>
          <div className="col-12">
            <div style={{ paddingTop: "5%" }} className={`row`}>
              <div className="col-12">
                <table
                  style={{ textAlign: "center" }}
                  className={`table table-dark ${homeStyle.styledTable}`}
                >
                  <thead>
                    <tr>
                      <th scope="col">USERID</th>
                      <th scope="col">AD</th>
                      <th scope="col">SOYAD</th>
                      <th scope="col">EPOSTA</th>
                      <th scope="col">TELEFON</th>
                      <th scope="col">KART NUMARASI</th>
                      <th scope="col">Müşteri Url</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.email}</td>
                            <td>{item.telnumber}</td>
                            <td>{item.cardnumber}</td>
                            <td>
                              <Link
                                target={"_blank"}
                                to={"/CustomerInfo/" + item.customerUrl}
                              >
                                {window.location.hostname +
                                  "/" +
                                  item.customerUrl}
                              </Link>
                            </td>
                            {}
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
