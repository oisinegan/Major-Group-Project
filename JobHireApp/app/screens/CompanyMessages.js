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
  SafeAreaView,
} from "react-native";
import * as React from "react";
//Stream chat api imports
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  StreamChat,
} from "stream-chat-expo";
import { useState, useEffect } from "react/cjs/react.development";
import UserMessageScreen from "./UserMessageScreen";
import CompanyMessageScreen from "./CompanyMessageScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { chatApiKey, chatUserId } from "../config/chatConfig";

function CompanyMessages({ navigation }) {
  //Used store username read from async storage
  const [username, setUsername] = useState("");

  const [profilePic, setProfilePic] = useState("");

  function getImageFromStorage() {
    console.log("called");
    //Gets firebase storage info
    const storage = getStorage();
    getDownloadURL(ref(storage, "Company/" + username))
      .then((url) => {
        console.log("test");
        console.log(url);
        setProfilePic(url);
      })
      .then(() => {
        console.log("IMAGE SUCCESSFULLY LOADED");
      })
      .catch(() => {
        console.log("IMAGE NOT FOUND");
      });
  }

  /******* METHOD TO READ VARIABLE FROM ASYNC STORAGE *******/
  //Pass username and store it in async storage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Username");
      var usernameFromAsyncStorage = value.toString();
      if (value !== null) {
        // value previously stored
        setUsername(usernameFromAsyncStorage);
      }
    } catch (e) {
      // error reading value
    }
  };
  function getUsername() {
    getData();
    getImageFromStorage();
    console.log("Username=" + username);
  }

  const filters = {
    members: {
      $in: [username],
    },
  };

  const sort = {
    last_message_at: -1,
  };

  useEffect(() => getUsername(), [username]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <Text style={styles.topNavTitle}>Messages</Text>
      </View>
      <ChannelList
        onSelect={(channel) => {
          navigation.navigate("CompanyMessageScreen", { channel: channel });
        }}
        filters={filters}
        sort={sort}
      />
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyHome")}
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyPostJob")}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/PostJob.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyMessages")}
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyProfileScreen")}
        >
          <Image
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "black",
            }}
            source={{ uri: profilePic }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topNav: {
    padding: 20,
  },
  topNavTitle: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "600",
    color: "black",
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
    width: "100%",
    borderTopColor: "black",
    borderTopWidth: 2,
  },
  navButtons: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
});

export default CompanyMessages;
