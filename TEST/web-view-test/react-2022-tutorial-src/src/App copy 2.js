// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      // <div key={t.id}>
      <h2
        id={t.id}
        onClick={(event) => {
          event.preventDefault();
          props.onChangeMode(Number(event.target.id));
          window.ReactNativeWebView.postMessage(t.type);
        }}
      >
        {t.title}
      </h2>
      // </div>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function App() {
  const [bgColor, setBgColor] = useState("white"); // 초기 배경 색
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null); // 전화번호
  const [picture, setPicture] = useState(null); // 이미지
  useEffect(() => {
    let previousEventData = null;

    const handleEvent = (e) => {
      alert(e.data);

      if (previousEventData !== e.data) {
        if (e.data === "흔들기를 감지했습니다.") {
          setBgColor("lightpink");
        }
        if (e.data === "1") {
          setSelectedPhoneNumber(e.data);
        }
        previousEventData = e.data;
      }
    };
    document.addEventListener("message", handleEvent);
    return () => {
      document.removeEventListener("message", handleEvent);
    };
  }, []);

  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 1, type: "Danu", title: "Danusys", body: "danusys is..." },
    { id: 2, type: "contact", title: "Call", body: "Call is..." },
    { id: 3, type: "Flash", title: "Camera", body: "Camera is..." },
  ]);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: "100vh",
        transition: "background-color 0.5s",
      }}
    >
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setId(_id);
        }}
      ></Nav>
      {selectedPhoneNumber && (
        <contact> 선택하신 전화번호는 {selectedPhoneNumber} 입니다.</contact>
      )}
    </div>
  );
}

export default App;
