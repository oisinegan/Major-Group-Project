import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
  _ScrollView,
} from "react-native";
import * as React from "react";
import UserNotificationScreen from "./UserNotificationScreen";
import { WebView } from "react-native-webview";
import { A } from "@expo/html-elements";
import { useState, useEffect } from "react/cjs/react.development";

import AsyncStorage from "@react-native-async-storage/async-storage";

function UserNotification({ navigation }) {
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  
  /******* METHOD TO READ VARIABLE FROM ASYNC STORAGE *******/
  //Pass username and store it in async storage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Username");
      console.log("test");
      var usernameFromAsyncStorage = value.toString();
      if (value !== null) {
        // value previously stored
        setUsername(usernameFromAsyncStorage);
        console.log("test");
      }
    } catch (e) {
      // error reading value
      console.log("NOT WORKING-ERROR");
    }
  };

  function createUrl() {
    getData();
  
    setUrl("https://192.168.0.7:3000?name=" + username);
  }

  useEffect(() => createUrl(), [username]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Hellos</Text>

        <A href={url}>Go to Factime</A>

        <Text>Hellos</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserNotificationScreen")}
        >
          <Text>Go to webView test</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserHomeScreen")}
        >
          <Image
            style={{ width: 30, height: 30, margin: 15 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserMessage")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserNotification")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Noti.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Profile.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  webView: {
    backgroundColor: "red",
    width: "100%",
    flex: "1",
  },
  navBar: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 999,
  },
  navButtons: {
    margin: 20,
  },
});

export default UserNotification;
