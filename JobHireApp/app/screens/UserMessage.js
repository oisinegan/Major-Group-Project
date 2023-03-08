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


import AsyncStorage from "@react-native-async-storage/async-storage";

function UserMessage({ route, navigation }) {
  //Used store username read from async storage
  const [username, setUsername] = useState("");

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
          onPress={() => navigation.navigate("UserProfile")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Profile.png")}
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
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
  },
  navButtons: {
    margin: 20,
  },
});

export default UserMessage;
