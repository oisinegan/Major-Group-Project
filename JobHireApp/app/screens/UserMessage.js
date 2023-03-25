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
import UserMessageScreen from "./UserMessageScreen";
import { useState, useEffect } from "react/cjs/react.development";
import { ChannelList } from "stream-chat-expo";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

function UserMessage({ route, navigation }) {
  //Used store username read from async storage
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  function getImageFromStorage() {
    //Gets firebase storage info
    const storage = getStorage();
    getDownloadURL(ref(storage, "Jobseeker/" + username))
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
          navigation.navigate("UserMessageScreen", { channel: channel });
        }}
        filters={filters}
        sort={sort}
      />

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserHomeScreen")}
        >
          <Image
            style={{ width: 45, height: 45 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserMessage")}
        >
          <Image
            style={{ width: 45, height: 40 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <Image
            style={{
              width: 55,
              height: 55,

              borderColor: "black",
              borderWidth: 2,
              borderRadius: 50,
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
    width: "100%",
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
    alignSelf: "center",
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: "black",
  },
  navButtons: {
    marginVertical: 20,
    marginHorizontal: 40,
  },
});

export default UserMessage;
