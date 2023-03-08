import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  PermissionsAndroid,
  Image,
  Dimensions,
  ImageBackground,
  StatusBar,
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState } from "react/cjs/react.development";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/config";

//Stream chat api imports
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  StreamChat,
} from "stream-chat";

// Get device width
const deviceWidth = Dimensions.get("window").width;

// client-side you initialize the Chat client with your API key
const client = StreamChat.getInstance("pvj8fdby4epj", {
  timeout: 6000,
});

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [seachParam, setSearchParam] = useState("");

  //After Log in button is pressed it searches Job seeker database first,
  //IF no match found then it search company database for match
  function searchJobseekerDatabase() {
    console.log("User: " + username + ", Pass: " + pass);
    //Search database for username and password
    getDocs(
      query(
        collection(db, "Jobseekers"),
        where("username", "==", username),
        where("pass", "==", pass)
      )
    ).then((docSnap) => {
      //Store results in array
      let user = [];
      docSnap.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
      //If array is empty, Search company database
      if (user[0] == undefined) {
        searchCompanyDatabase();
      } else {
        console.log("User:", user[0].username + " pass: " + user[0].pass);
        //If array is not empty(match found), store username as string
        var userName = user[0].username.toString();
        //Send string(username) to async storage
        storeDataToAsyncStorage(userName);

        //Navigate to user home screen
        navigation.navigate("UserHomeScreen");
      }
    });
  }
  function searchCompanyDatabase() {
    //Search database for username and password
    getDocs(
      query(
        collection(db, "Company"),
        where("username", "==", username),
        where("pass", "==", pass)
      )
    ).then((docSnap) => {
      //Store results in array
      let comp = [];
      docSnap.forEach((doc) => {
        comp.push({ ...doc.data(), id: doc.id });
      });
      if (comp[0] == undefined) {
        //If array is empty, Alert user; Credentials not found
        console.log("Comp Error, Wrong username or password");
        Alert.alert("Error", "Wrong username or password", [
          {
            text: "Try again",
            onPress: () => console.log("Try again Pressed"),
          },
        ]);
      } else {
        //IF match found:
        console.log("comp:", comp[0].username + " pass: " + comp[0].pass);
        //If array is not empty(match found), store username as string
        var compName = comp[0].username.toString();
        //Send string(username) to async storage
        storeDataToAsyncStorage(compName);

        //Navigate to company home screen
        navigation.navigate("CompanyHome");
      }
    });
  }
  /******* METHOD TO STORE VARIABLE IN ASYNC STORAGE *******/
  //Pass username and store it in async storage
  const storeDataToAsyncStorage = async (value) => {
    try {
      await AsyncStorage.setItem("Username", value);
      await client.disconnectUser();
      client.connectUser(
        {
          id: username.toString(),
          name: username.toString(),
          image: "https://getstream.io/random_svg/?name=John",
        },
        client.devToken(username.toString())
      );
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.imageContainer}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <ImageBackground
        source={require("../assets/RegisterImage.webp")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Log In</Text>
          <KeyboardAvoidingView style={styles.textInput}>
            <TextInput
              value={username}
              onChangeText={(username) => setUsername(username)}
              placeholder="Username"
              placeholderTextColor={"#4f5250"}
              style={{
                borderWidth: 1,
                borderColor: "navy",
                padding: 15,
                width: 250,
                marginBottom: 20,
                borderRadius: 50,
              }}
            ></TextInput>

            <TextInput
              value={pass}
              onChangeText={(pass) => setPass(pass)}
              secureTextEntry={true}
              style={{
                borderWidth: 1,
                borderColor: "navy",
                padding: 15,
                width: 250,
                borderRadius: 50,
              }}
              placeholder="Password"
              placeholderTextColor={"#4f5250"}
            />
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.button}>
            <Text
              onPress={searchJobseekerDatabase}
              style={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={{ fontSize: 20 }}>
              Don't have an account?{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "navy",
                  fontSize: 20,
                }}
                onPress={() => navigation.navigate("Register")}
              >
                Register
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View> //end of main view
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: deviceWidth * 3,
    width: deviceWidth * 1.3,
  },

  innerContainer: {
    marginTop: 200,
    margin: 50,
    marginRight: 170,
    backgroundColor: "rgba(239, 231, 225, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
    borderRadius: 50,
    borderColor: "midnightblue",
  },
  title: {
    marginTop: 25,
    marginBottom: 35,
    fontSize: 40,
    fontStyle: "",
    color: "midnightblue",
  },
  textInput: {
    marginBottom: 50,
  },
  input: {},
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    borderRadius: 4,
    height: 40,
    backgroundColor: "midnightblue",
    marginBottom: 30,
  },
  footer: {
    fontSize: 30,
    letterSpacing: 1,
  },
});

export default LoginScreen;
