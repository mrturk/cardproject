/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserMedia } from "../../services/media";
import customerInfoStyle from "./CustomerInfo.module.css";
import instagram from "../../assets/icons/instagram.png";
import twitter from "../../assets/icons/twitter.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import linkedin from "../../assets/icons/linkedin.png";
import facebook from "../../assets/icons/facebook.png";
import website from "../../assets/icons/website.png";
export default function CustomerInfo() {
  const { key } = useParams();
  const [data, setData] = useState([]);
  const getData = async (key) => {
    const response = await getUserMedia(key);
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    getData(key);
  }, [key]);
  const returnImage = (key) => {
    switch (key) {
      case "instagram":
        return instagram;
      case "twitter":
        return twitter;
      case "whatsapp":
        return whatsapp;
      case "linkedin":
        return linkedin;
      case "website":
        return website;
      case "facebook":
        return facebook;
      default:
        break;
    }
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand mb-0 h1">DİGİSCARD</span>
        </div>
      </nav>
      <div style={{ paddingTop: "7%" }} className="container">
        <div className="row">
          {data.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5em",
                }}
                key={index}
                className="col-6"
              >
                <a target={"_blank"} href={item.url}>
                  <img
                    className={customerInfoStyle.iconStyle}
                    src={returnImage(item.mediacontent)}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
