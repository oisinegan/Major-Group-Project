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
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";

// Get device width
const deviceWidth = Dimensions.get("window").width;

function RegisterCompany({ navigation }) {
  const [username, setUsername] = useState("");
  const [founded, setFounded] = useState("");
  const [info, setInfo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function companyCreate() {
    //Submit data
    //db= databse link (database/config),
    //"jobseekers" = table name on firebase
    // username = id person being written to database,
    setDoc(doc(db, "Company", username), {
      username: username,
      founded: founded,
      info: info,
      address: address,
      email: email,
      pass: pass,
    })
      .then(() => {
        //Successfully written to database
        Alert.alert("Success", "You have successfully signed up!", [
          { text: "OK", onPress: () => navigation.navigate("HomeNotLoggedIn") },
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
        source={require("../assets/CompanyRegister.webp")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create an Account</Text>
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
              value={founded}
              onChangeText={(founded) => setFounded(founded)}
              placeholder="Founded"
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
              value={info}
              onChangeText={(info) => setInfo(info)}
              placeholder="Info"
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
              value={address}
              onChangeText={(address) => setAddress(address)}
              placeholder="Address"
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
              value={email}
              onChangeText={(email) => setEmail(email)}
              placeholder="example@mail.com"
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
              onPress={companyCreate}
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

    //  justifyContent: 'center',
  },

  innerContainer: {
    margin: 50,
    alignSelf: "center",
    marginRight: "30%",
    marginTop: "20%",
    padding: 5,

    backgroundColor: "rgba(239, 231, 225, .9)",
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

export default RegisterCompany;
