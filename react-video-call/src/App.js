import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  redirect,
} from "react-router-dom";

import Login from "./pages/login";
import VideoChat from "./pages/videochat";

import React, { useEffect, useState } from "react";

import { ReactSession } from "react-client-session";

function App() {
  function checkUrl() {
    //Url of page sent from expo app
    const url = window.location.href;

    //Get username from url
    const startIndex = url.indexOf("=") + 1;
    const endIndex = url.indexOf("!");

    //Get channel name from url
    const channelStartIndex = url.indexOf("!") + 1;
    const channelEndIndex = url.length;

    //Username
    const name = url.substring(startIndex, endIndex);

    //Channel Name
    const channelName = url.substring(channelStartIndex, channelEndIndex);

    //Store username in session storage
    ReactSession.set("Username", name);
    ReactSession.set("ChannelName", channelName);

    //Redirect to home page
    redirect("/");
  }
  useEffect(checkUrl);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/videochat" element={<VideoChat />} />
    </Routes>
  );
}

export default App;
