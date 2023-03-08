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
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";

// Get device width
const deviceWidth = Dimensions.get("window").width;

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function jobseekersCreate() {
    //Submit data
    //db= databse link (database/config),
    //"jobseekers" = table name on firebase
    // username = id person being written to database,
    setDoc(doc(db, "Jobseekers", username), {
      username: username,
      qualifications: qualifications,
      experience: experience,
      skills: skills,
      email: email,
      pass: pass,
    })
      .then(() => {
        //Successfully written to database
        Alert.alert("Success", "Data Submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((error) => {
        //failed
        Alert.alert("ERROR", "Data not submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  } ////end jobseekersCreate

  function companyCreate() {
    //Submit data
    //db= databse link (database/config),
    //"jobseekers" = table name on firebase
    // username = id person being written to database,
    setDoc(doc(db, "Company", username), {
      username: username,
      email: email,
      pass: pass,
    })
      .then(() => {
        //Successfully written to database
        Alert.alert("Success", "Data Submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((error) => {
        //failed
        Alert.alert("ERROR", "Data not submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  } ////end companyCreate
  /******* METHOD TO STORE VARIABLE IN ASYNC STORAGE *******/
  //Pass username and store it in async storage
  const storeDataToAsyncStorage = async (value) => {
    try {
      await AsyncStorage.setItem("Username", value);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={require("../assets/RegisterImage.webp")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Sign up!</Text>

          <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => navigation.navigate("RegisterJobseeker")}
              style={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                fontWeight: "500",
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Jobseeker
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => navigation.navigate("RegisterCompany")}
              style={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                fontWeight: "500",
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Company
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={{ fontSize: 20 }}>
              Already have an account?{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "rgba(10, 10, 50.2, 0.8)",

                  fontSize: 20,
                }}
                onPress={() => navigation.navigate("Login")}
              >
                Login
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
    marginTop: "50%",
    margin: 50,
    marginRight: 170,
    backgroundColor: "rgba(239, 231, 225, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
    borderRadius: 50,
    borderColor: "navy",
  },
  title: {
    marginTop: 25,
    marginBottom: 35,
    fontSize: 40,
    fontWeight: "600",
    color: "rgba(10, 10, 50.2, 0.8)",
  },
  textInput: {
    marginBottom: 10,
  },
  input: {},

  button: {
    backgroundColor: "navy",
    backgroundColor: "rgba(10, 10, 50.2, 0.8)",
    padding: 10,
    borderRadius: 50,
    paddingHorizontal: "20%",
    marginBottom: "5%",
  },
  footer: {
    fontSize: 30,
    letterSpacing: 1,
  },
});

export default RegisterScreen;
