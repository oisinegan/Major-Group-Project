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
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState } from "react/cjs/react.development";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/config";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  var isLoggedIn = false;

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
      let user = [];
      docSnap.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
      if (user[0] == undefined) {
        searchCompanyDatabase();
      } else {
        console.log("User:", user[0].username + " pass: " + user[0].pass);
        var userName = user[0].username.toString();
        storeDataCompany(userName);

        var successMsg = "Hello " + user[0].username;
        Alert.alert("USER", successMsg, [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),
          },
        ]);
        isLoggedIn = true;
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
      let comp = [];
      docSnap.forEach((doc) => {
        comp.push({ ...doc.data(), id: doc.id });
      });
      if (comp[0] == undefined) {
        console.log("Comp Error, Wrong username or password");
        Alert.alert("Error", "Wrong username or password", [
          {
            text: "Try again",
            onPress: () => console.log("Try again Pressed"),
          },
        ]);
      } else {
        console.log("comp:", comp[0].username + " pass: " + comp[0].pass);

        var compName = comp[0].username.toString();
        storeDataCompany(compName);

        var successMsg = "Hello " + comp[0].username;
        Alert.alert("COMPANY", successMsg, [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),
          },
        ]);
        isLoggedIn = true;
        navigation.navigate("CompanyHome");
      }
    });
  }

  const storeDataCompany = async (value) => {
    try {
      await AsyncStorage.setItem("Test", value);
    } catch (e) {
      // saving error
    }
  };
  const storeDataJobseeker = async (value) => {
    try {
      await AsyncStorage.setItem("Test", value);
    } catch (e) {
      // saving error
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={{ width: 150, height: 150, margin: 20 }}
          source={require("../assets/login_symbol.png")}
        />
      </View>

      <View style={styles.title}>
        <Text style={{ fontSize: 30, letterSpacing: 1 }}>Log In</Text>
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

        <Text>Password:</Text>
        <TextInput
          value={pass}
          onChangeText={(pass) => setPass(pass)}
          secureTextEntry={true}
          style={{
            borderWidth: 1,
            borderColor: "#777",
            padding: 5,
            width: 250,
          }}
          placeholder="Password"
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
        <Text style={{ fontSize: 15, marginBottom: 5 }}>Forgot password?</Text>
        <Text style={{ fontSize: 15 }}>
          Don't have an account?{" "}
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("Register")}
          >
            Register
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

export default LoginScreen;
