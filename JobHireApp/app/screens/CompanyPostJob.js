import {StyleSheet, Text, View, Button, Alert, ScrollView, Image, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid} from "react-native";
import * as React from "react";
//Database imports
import { useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";

function CompanyPostJob({ navigation }) {
  //////////////////////////////////////////////////////////
  //Line 14 - 47 will be deleted from this page its just
  // an example of writing to the database

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function create() {
    //Submit data
    //db= databse link (database/config),
    //"jobseekers" = table name on firebae
    // username = id person being written to database,
    setDoc(doc(db, "Jobseekers", username), {
      username: username,
      email: email,
      pass: pass,
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

  return (
    <View style={styles.container}>
      <Text>Company Post job Screen</Text>
      <Text>Test: Writing to database</Text>
      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder="Username"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <TextInput
        value={pass}
        onChangeText={(pass) => setPass(pass)}
        placeholder="Password"
        secureTextEntry={true}
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
