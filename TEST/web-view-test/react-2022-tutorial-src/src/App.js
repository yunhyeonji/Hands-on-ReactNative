// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { FaCamera, FaInternetExplorer } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { MdOutlineSos } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";

function App() {
  const [sosState, setSosState] = useState(false); // sos 상태
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null); // 전화번호
  const [text, setText] = useState(""); // 초기 상태는 빈 문자열

  useEffect(() => {
    const handleEvent = (e) => {
      // alert(e.data);
      const event = e.data;
      if (event === "흔들기를 감지했습니다.") {
        setSosState(true);
        setText(event);
      }
      if (event.indexOf("010") !== -1) {
        setSelectedPhoneNumber(event);
        setText("선택한 전화번호 : " + event);
      }
      if (event.indexOf("네이티브") !== -1) {
        setText("앱에서 이벤트를 보냈습니다.");
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
        flex: 1,
        backgroundColor: sosState ? "lightpink" : "white",
        height: "100vh",
        transition: "background-color 0.5s",
      }}
    >
      {/* 이미지 띄우기 */}
      <div id="image-container"></div>
      {/* 앱쪽에서 보낸 이벤트 확인*/}
      <h2 className="pushH2">{text}</h2>
      {/* 내비게이션  */}
      <nav className="wrapper">
        <div
          onClick={() => {
            window.ReactNativeWebView.postMessage("Y,Flash");
          }}
        >
          <FaCamera size="27" color="#000000" />
        </div>
        <div
          onClick={() => {
            window.ReactNativeWebView.postMessage("Y,contact");
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
            window.ReactNativeWebView.postMessage("Y,Danu");
          }}
        >
          <FaInternetExplorer size="27" color="#000000" />
        </div>
        <div
          onClick={() => {
            window.ReactNativeWebView.postMessage("N,Notifi");
            setText("HELLO");
          }}
        >
          <AiFillNotification size="27" color="#000000" />
        </div>
      </nav>
    </div>
  );
}

export default App;
