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

  return (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={require("../assets/LoginImage.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <KeyboardAvoidingView style={styles.textInput}>
          <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => navigation.navigate("HomeNotLoggedIn")}
              style={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Sign Up as a Jobseeker
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => navigation.navigate("HomeNotLoggedIn")}
              style={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Sign Up as a Company
            </Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>

          <View style={styles.footer}>
            <Text style={{ fontSize: 20 }}>
              Already have an account?{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "navy",
                  fontSize: 20,
                }}
                onPress={() => navigation.navigate("HomeNotLoggedIn")}
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
    borderBottomColor: "black",
    borderBottomWidth: 10,
    borderTopColor: "black",
    borderTopWidth: 40,

    //  justifyContent: 'center',
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
    borderColor: "navy",
  },
  title: {
    marginTop: 25,
    marginBottom: 35,
    fontSize: 40,
    fontStyle: "",
    color: "navy",
  },
  textInput: {
    marginBottom: 50,
  },
  input: {},
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    borderRadius: 4,
    height: 40,
    backgroundColor: "navy",
    marginBottom: 30,
  },
  footer: {
    fontSize: 30,
    letterSpacing: 1,
  },
});

export default RegisterScreen;
