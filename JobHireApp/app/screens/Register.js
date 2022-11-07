import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  View,
  Button,
  TextInput,
  PermissionsAndroid,
  Image,
  Alert,
} from "react-native";
import * as React from "react";
//Database imports
import { useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";

function RegisterScreen({ navigation }) {
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
  } ////end create

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={{ width: 150, height: 150, margin: 20 }}
          source={require("../assets/login_symbol.png")}
        />
      </View>

      <View style={styles.title}>
        <Text style={{ fontSize: 30, letterSpacing: 1 }}>
          Create an Account
        </Text>
      </View>

      <KeyboardAvoidingView style={styles.textInput}>
        <Text>Username:</Text>
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

        <Text>Email:</Text>
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

        <Text>Password:</Text>
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

        <Button
          title="Sign up"
          onPress={create}
          style={{
            color: "white",
            textAlign: "center",
            justifyContent: "center",
            fontSize: 20,
            lineHeight: 40,
          }}
        ></Button>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Text style={{ fontSize: 15 }}>
          Already have an account?{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View> //end of main view
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    //  justifyContent: 'center',
    textAlign: "left",
  },

  image: {
    marginBottom: 15,
  },

  title: {
    marginBottom: 15,
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
    backgroundColor: "grey",
    marginBottom: 50,
  },
  footer: {
    fontSize: 30,
    letterSpacing: 1,
  },
});

export default RegisterScreen;
