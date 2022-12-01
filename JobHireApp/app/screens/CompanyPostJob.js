import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Menu,
} from "react-native";
import * as React from "react";
//Database imports
import { useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CompanyPostJob({ navigation }) {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [wage, setWage] = useState("");
  const [type, setType] = useState("");

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
        console.log("ASYNC: " + username);
      }
    } catch (e) {
      // error reading value
    }
  };

  function create() {
    getData();
    setDoc(doc(db, "Adverts", title), {
      title: title,
      info: info,
      wage: wage,
      type: type,
      company: username,
    })
      .then(() => {
        //Successfully written to database
        Alert.alert("Sucess", "Data Submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((error) => {
        //failed
        Alert.alert("ERROR", "Data not submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      <Text>Company Post job Screen</Text>
      <Text>Test: Writing to database</Text>
      <TextInput
        value={title}
        onChangeText={(title) => setTitle(title)}
        placeholder="Job/Project title"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <TextInput
        value={info}
        onChangeText={(info) => setInfo(info)}
        placeholder="More information"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <TextInput
        value={wage}
        onChangeText={(wage) => setWage(wage)}
        placeholder="Wage"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <TextInput
        value={type}
        onChangeText={(type) => setType(type)}
        placeholder="Type of work (Job/Project etc..)"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>

      <Button title="Submit" onPress={create}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CompanyPostJob;
