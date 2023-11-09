// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { FaCamera, FaInternetExplorer } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { MdOutlineSos } from "react-icons/md";

function App() {
  const [sosState, setSosState] = useState(false); // sos 상태
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null); // 전화번호
  const [picture, setPicture] = useState(null); // 이미지
  useEffect(() => {
    const handleEvent = (e) => {
      alert(e.data);
      const event = e.data;
      if (event === "흔들기를 감지했습니다.") {
        setSosState(true);
      }
      if (event.indexOf("010") !== -1) {
        setSelectedPhoneNumber(event);
      }
      // 이미지 데이터인 경우
      if (event.startsWith("data:image/jpeg;base64")) {
        // 이미지 컨테이너에 이미지 엘리먼트 추가
        const imageContainer = document.getElementById("image-container");
        const imageElement = document.createElement("img");
        imageElement.src = event;
        imageContainer.appendChild(imageElement);
      }
    };
    document.addEventListener("message", handleEvent);
    return () => {
      document.removeEventListener("message", handleEvent);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: sosState ? "lightpink" : "white",
        height: "100vh",
        transition: "background-color 0.5s",
      }}
    >
      {/* 이미지 띄우기 */}
      <div id="image-container"></div>
      {/* 선택한 전화번호 띄우기 */}
      {selectedPhoneNumber && (
        <contact> 선택하신 전화번호는 {selectedPhoneNumber} 입니다.</contact>
      )}
      {/* 내비게이션  */}
      <nav className="wrapper">
        <div
          onClick={() => {
            window.ReactNativeWebView.postMessage("Flash");
          }}
        >
          <FaCamera size="27" color="#000000" />
        </div>
        <div
          onClick={() => {
            window.ReactNativeWebView.postMessage("contact");
          }}
        >
          <BiSolidContact size="27" color="#000000" />
        </div>
        <div
          onClick={() => {
            setSosState((sosState) => {
              if (sosState) {
                return false;
              } else {
                return true;
              }
            });
          }}
        >
          <MdOutlineSos size="27" color="#000000" />
        </div>
        <div
          onClick={() => {
            window.ReactNativeWebView.postMessage("Danu");
          }}
        >
          <FaInternetExplorer size="27" color="#000000" />
        </div>
      </nav>
    </div>
  );
}

export default App;
