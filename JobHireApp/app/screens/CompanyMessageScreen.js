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
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import { useState, useEffect } from "react/cjs/react.development";
import { A } from "@expo/html-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CompanyMessageScreen({ route, navigation }) {
  const { channel } = route.params;
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
    console.log(username);
    console.log(channel.id);
    setUrl("https://172.20.10.4:3000?name=" + username + "!" + channel.id);
  }

  useEffect(() => createUrl(), [username]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backButton}>
          <Text
            style={styles.backText}
            onPress={() => navigation.navigate("CompanyMessages")}
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.topNavTitle}>Messages</Text>
        <A href={url} style={styles.backButton}>
          <Text style={styles.backText}>Call</Text>
        </A>
      </View>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: "15%",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 10,
    paddingRight: 30,
  },
  backText: {
    color: "navy",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 20,
  },
  topNavTitle: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "600",
    color: "black",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CompanyMessageScreen;
