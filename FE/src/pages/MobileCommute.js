/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "api/config";
import { useParams } from "react-router-dom";

function MobileCommute() {
  const navigate = useNavigate();

  const { type } = useParams();
  const [ischecked, setIschecked] = useState(type === "checkIn");

  const clickChecked = async () => {
    const now = new Date();
    const datetime =
      now.getFullYear() +
      "-" +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + now.getDate()).slice(-2) +
      "T" +
      ("0" + now.getHours()).slice(-2) +
      ":" +
      ("0" + now.getMinutes()).slice(-2) +
      ":" +
      ("0" + now.getSeconds()).slice(-2);

    console.log(datetime);
    console.log(typeof datetime);
    if (ischecked === true) {
      try {
        await axios.post(
          `${BASE_URL}/attendance/checkIn`,
          { startTime: String(datetime) },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.patch(
          `${BASE_URL}/attendance/checkOut`,
          { endTime: datetime },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    setIschecked(!ischecked);
    setTimeout(() => {
      navigate("/main");
    }, 500);
  };

  return (
    <>
      <div css={mainContainer}>
        <input
          id="switch"
          type="checkbox"
          checked={ischecked}
          onChange={clickChecked}
        ></input>
        <div className="app">
          <div className="body">
            <div className="phone">
              <div className="content">
                <div className="circle">
                  <div className="crescent"></div>
                </div>
                <label htmlFor="switch">
                  <div className="toggle"></div>
                  <div className="names">
                    <p className="light">출근</p>
                    <p className="dark">퇴근</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileCommute;

const mainContainer = css`
  display: flex;
  height: 100dvh;

  /* GENERAL */

  .credit {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    color: pink;
  }

  .credit a {
    color: inherit;
  }

  .app {
    height: 100%;
    width: 100%;
    height: 100dvh;
  }
  .body {
    height: 100%;
    width: 100%;
    height: 100dvh;
  }

  .phone {
    height: 100%;
    width: 100%;
    height: 100dvh;
    display: flex;
  }

  /* Main Circle */
  .main-circle {
    width: 40rem;
    height: 40rem;
    border-radius: 100%;
    background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
    position: absolute;
    z-index: 1;
    left: 50%;
    -webkit-transform: translate(-50%, -70%);
    -ms-transform: translate(-50%, -70%);
    transform: translate(-50%, -70%);
  }

  /* Middle */
  .content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    align-items: center;
    margin: auto;
    text-align: center;
    width: 100%;
    -webkit-transform: translateY(5%);
    -ms-transform: translateY(5%);
    transform: translateY(5%);
  }

  .circle {
    position: relative;
    border-radius: 100%;
    width: 8rem;
    height: 8rem;
    background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
    margin: auto;
  }

  .crescent {
    position: absolute;
    border-radius: 100%;
    right: 0;
    width: 6rem;
    height: 6rem;
    background: white;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: top right;
    -ms-transform-origin: top right;
    transform-origin: top right;
    -webkit-transition: -webkit-transform 0.6s
      cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: -webkit-transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
      -webkit-transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  label,
  .toggle {
    height: 2.8rem;
    border-radius: 100px;
  }

  label {
    width: 60%;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    position: relative;
    margin: 1.8rem 0 4rem 0;
    cursor: pointer;
  }

  .toggle {
    position: absolute;
    width: 50%;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
    -webkit-transition: -webkit-transform 0.3s
      cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition: -webkit-transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      -webkit-transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .names {
    font-size: 90%;
    font-weight: bolder;
    color: black;
    width: 65%;
    margin-left: 17.5%;
    margin-top: 6.5%;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .dark {
    opacity: 0.5;
  }

  .mark {
    border-radius: 100px;
    background-color: black;
  }

  .time {
    color: black;
  }
  /* -------- Switch Styles ------------*/
  [type="checkbox"] {
    display: none;
  }
  /* Toggle */
  [type="checkbox"]:checked + .app .toggle {
    -webkit-transform: translateX(100%);
    -ms-transform: translateX(100%);
    transform: translateX(100%);
    background-color: #34323d;
  }

  [type="checkbox"]:checked + .app .dark {
    opacity: 1;
    color: white;
  }

  [type="checkbox"]:checked + .app .light {
    opacity: 1;
    color: white;
  }

  /* App */
  [type="checkbox"]:checked + .app .body {
    background-color: #26242e;
    color: white;
  }

  /* Circle */
  [type="checkbox"]:checked + .app .crescent {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    background: #26242e;
  }

  [type="checkbox"]:checked + .app .circle {
    background: linear-gradient(40deg, #8983f7, #a3dafb 70%);
  }

  [type="checkbox"]:checked + .app .main-circle {
    background: linear-gradient(40deg, #8983f7, #a3dafb 70%);
  }

  [type="checkbox"]:checked + .time {
    color: white;
  }

  [type="checkbox"]:checked + .app .body {
    color: white;
  }

  [type="checkbox"]:checked + .app .body .phone .menu .icons .network {
    border-color: transparent transparent white transparent;
  }

  [type="checkbox"]:checked + .app .body .phone .menu .icons .battery {
    background-color: white;
  }

  [type="checkbox"]:checked + .app .body {
    width: 100%;
    border-radius: 0px;
  }

  .menu {
    font-size: 80%;
    opacity: 0.4;
    padding: 0.8rem 1.8rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
`;
