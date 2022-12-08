import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as React from "react";
import { useState } from "react/cjs/react.development";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../database/config";
// - 08/12: there is an error happening when this page is loaded for me(adam), it's "Please report: Excessive number of pending callbacks: 501."
//and it freezes the whole app, i have to reload it to get it to work.
//Think it is something to do with aysnc, not 100% sure.

//^^ Fixed but really bad implementation Reading in whole database to call the getData async function, but it'll do for now

function UserProfile({ navigation }) {
  const [Users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  //Read all data
  getDocs(collection(db, "Jobseekers")).then((docSnap) => {
    /*   const Users = [];

    docSnap.forEach((doc) => {
      const { About, Age, Name, appliedJobs } = doc.data();
      Users.push({
        ...doc.data(),
        id: doc.id,
        About,
        Age,
        Name,
        appliedJobs,
      });
    });
    setUsers(Users); */
    getData();
  });
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
  //unsure currently how to get specific details to display on profile page,
  //it is only displaying everything that's there in order at the moment
  return (
    <View style={styles.container}>
      <Text>user profile page</Text>
      <Text style={styles.title}>Name: {username}</Text>

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

export default UserProfile;
