/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import logontext from "./../../assets/logontext.png";
import growth from "./../../assets/introbackground.png";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { Partners } from "./Partners";
import IntroUpper from "./IntroUpper";
import { PC } from "components/common/Responsive";

function Intro() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  var startCount = { var: 827 };

  gsap.to(startCount, {
    var: 1529,
    duration: 1,
    ease: "none",
    onUpdate: changeNumber,
    scrollTrigger: {
      trigger: "#number",
      toggleActions: "restart none reverse none",
    },
  });

  function changeNumber() {
    var numberElement = document.getElementById("number");
    if (numberElement) {
      numberElement.innerHTML = startCount.var.toFixed();
    }
  }

  return (
    <>
      <PC>
        <div css={containerStyles}>
          {/* <header css={headerStyles}> */}
          <header className="header">
            <img className="headerimg" src={logontext} alt="" />
          </header>
          <div className="topsection">
            <IntroUpper></IntroUpper>
          </div>
          <div className="midsection growth">
            <div className="growthment">
              <div id="number">827</div>
              <div>명과 함께하고 있습니다.</div>
            </div>
            <p>2024-01-31 기준</p>
          </div>
          <div className="bottomsection">
            <p className="partnertitle">협력사</p>
            <div className="partners">
              {Partners.map((item) => {
                return (
                  <div className="partner" key={item.id}>
                    <div className="imageWrapper">
                      <img
                        className="partnerimg"
                        src={item.link}
                        alt={item.name}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PC>
    </>
  );
}

export default Intro;

const containerStyles = css`
  width: 100vw;
  display: flex;
  flex-direction: column;

  .header {
    height: 10vh;
  }

  .headerimg {
    height: 10vh;
    object-fit: fill;
  }
  .topsection {
    height: 60vh;
    background-color: #f9f9f9;
  }

  .midsection {
    height: 100vh;
  }

  .growth {
    background-image: url(${growth});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .growthment {
    font-size: 30px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444444;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #number {
    font-size: 50px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444444;
    margin-right: 10px;
  }

  .bottomsection {
    height: 70vh;
    background-color: rgb(237, 242, 249);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .partners {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 70%;
  }

  .partner {
    width: 30%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center; /* 추가: 이미지를 세로 중앙 정렬 */
    background-color: grey;
    border: 3px solid grey;
    margin: 5px;
  }

  .imageWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .partnerimg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .partnertitle {
    font-size: 50px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444444;
    margin-bottom: 30px;
  }
`;
