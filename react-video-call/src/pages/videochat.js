import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import AgoraUIKit from "agora-react-uikit";
import { VIDEO_CHAT_URL } from "../VideoChatUrl/config";

export function VideoChat() {
  const [name, setName] = useState("");
  const [channel, setChannelName] = useState("");
  const [url, setUrl] = useState("");

  function getNameFromSession() {
    const value = ReactSession.get("Username");
    const value1 = ReactSession.get("ChannelName");
    setName(value);
    setChannelName(value1);
    console.log("CHANNEL" + channel);
    console.log("NAME" + name);
    setUrl(VIDEO_CHAT_URL + "?name=" + name + "!" + channel);
  }
  useEffect(getNameFromSession);

  const [videoCall, setVideoCall] = useState(true);

  const rtcProps = {
    appId: "62cbe9f442384f1f89ce5d8dc97de70e",
    channel: channel,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <div
      style={{
        backgroundColour: "red",
        display: "flex",
        width: "100%",
        height: "90vh",
      }}
    >
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "ghostWhite",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <p style={{ fontSize: 20, fontWeight: "bold", color: "navy" }}>
        We hope your interview went well!
      </p>
      <a
        href={url}
        style={{
          fontWeight: "bold",
          textDecoration: "none",
          backgroundColor: "navy",
          paddingLeft: 20,
          paddingRight: 20,
          padding: 10,
          fontSize: 15,
          borderRadius: 40,
          color: "white",
        }}
      >
        Go back home
      </a>
    </div>
  );
}

export default VideoChat;
