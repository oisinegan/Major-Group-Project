import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";

export function Login() {
  const [name, setName] = useState("");
  const [channelName, setChannel] = useState("");
  const [channelmemberOne, setChannelMemberOne] = useState("");
  const [channelmemberTwo, setChannelMemberTwo] = useState("");
  const [url, setUrl] = useState("");

  function getNameFromSession() {
    const value = ReactSession.get("Username");
    const value1 = ReactSession.get("ChannelName");
    setName(value);
    setChannel(value1);
    setUrl("/videochat?=" + name + "!" + channelName);
    GetChannelMemebers();
  }
  function GetChannelMemebers() {
    const member1 = channelName.substring(0, channelName.indexOf("_"));
    const member2 = channelName.substring(
      channelName.indexOf("_") + 1,
      channelName.length
    );
    setChannelMemberOne(member1);
    setChannelMemberTwo(member2);
  }
  useEffect(getNameFromSession);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "ghostWhite",
        height: "100vh",
      }}
    >
      <p
        style={{
          marginTop: "20%",
          fontSize: 30,
          fontWeight: "bold",
          color: "navy",
        }}
      >
        Job hire - VideoChat
      </p>

      <p style={{ fontSize: 20, fontWeight: "bold", color: "navy" }}>User</p>
      <p>{name}</p>
      <p
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "navy",
        }}
      >
        Channe lName
      </p>
      <p>{channelName}</p>
      <p style={{ fontSize: 20, fontWeight: "bold", color: "navy" }}>
        Channel members
      </p>

      <p>
        {channelmemberOne} , {channelmemberTwo}
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
          fontSize: 25,
          borderRadius: 40,
          color: "white",
          marginTop: 35,
        }}
      >
        Join call
      </a>
    </div>
  );
}

export default Login;
