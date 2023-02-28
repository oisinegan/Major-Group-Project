import "./App.css";
import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

function App() {
  const [videoCall, setVideoCall] = useState(true);

  const rtcProps = {
    appId: "62cbe9f442384f1f89ce5d8dc97de70e",
    channel: "Test",
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <h2>Camera not working</h2>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Join</h3>
  );
}

export default App;
