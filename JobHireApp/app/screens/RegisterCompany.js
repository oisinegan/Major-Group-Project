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
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";

import * as ImagePicker from "expo-image-picker";

// Get device width
const deviceWidth = Dimensions.get("window").width;

function RegisterCompany({ navigation }) {
  //Info
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [info, setInfo] = useState("");
  const [founded, setFounded] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");

  //Image
  const [image, setImage] = useState(null);
  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);
    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  }

  function companyCreate() {
    //Submit data
    //db= databse link (database/config),
    //"company" = table name on firebase
    // username = id person being written to database,
    setDoc(doc(db, "Company", username), {
      username: username,
      pass: pass,
      email: email,
      number: number,
      address: address,
      image: image,

      info: info,
      founded: founded,
      industry: industry,
      companySize: companySize,
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
    <SafeAreaView style={styles.outerCon}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <TouchableOpacity style={styles.backButton}>
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.backButton}
        >
          back
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.titleMini}>General Information</Text>
        <TextInput
          value={username}
          maxLength = {30}
          onChangeText={(username) => setUsername(username)}
          placeholder="Company Username"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={pass}
          maxLength = {30}
          onChangeText={(pass) => setPass(pass)}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#4f5250"}
        />
        <TextInput
          value={email}
          maxLength = {30}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={number}
          maxLength = {30}
          onChangeText={(number) => setNumber(number)}
          placeholder="Number"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={address}
          maxLength = {30}
          onChangeText={(address) => setAddress(address)}
          placeholder="Address"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>

        <Text style={styles.titleMini}>Profile Picture</Text>
        <Button
          title="Pick a profile picture from camera roll"
          onPress={pickImage}
        />
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              //alignSelf: "center",
              marginVertical: 20,
              width: 200,
              height: 200,
              borderColor: "black",
              borderWidth: 3,
              marginBottom: 10,
            }}
          />
        )}

        <Text style={styles.titleMini}>Company Information</Text>
        <TextInput
          value={info}
          maxLength = {30}
          onChangeText={(info) => setInfo(info)}
          placeholder="Summary of Company"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={founded}
          maxLength = {30}
          onChangeText={(founded) => setFounded(founded)}
          placeholder="Founded"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={industry}
          maxLength = {30}
          onChangeText={(industry) => setIndustry(industry)}
          placeholder="Industry Type"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={companySize}
          maxLength = {30}
          onChangeText={(companySize) => setCompanySize(companySize)}
          placeholder="Company Size"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text
              onPress={companyCreate}
              style={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                ////fontSize: 20,
                fontWeight: "bold",
                lineHeight: 40,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={{ fontSize: 20 }}>
            Already have an account?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: "navy",
                //fontSize: 20,
              }}
              onPress={() => navigation.navigate("HomeNotLoggedIn")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  outerCon: {
    backgroundColor: "#FAF9F6",
  },
  container: {
    paddingTop: "5%",
    backgroundColor: "#FAF9F6",
  },
  backButton: {
    color: "midnightblue",
    textAlign: "left",
    //fontSize: 20,
    lineHeight: 40,
    paddingLeft: 7.5,
  },
  title: {
    marginBottom: 35,
    //fontSize: 40,
    color: "midnightblue",
    marginLeft: 10,
  },
  titleMini: {
    //fontSize: 25,
    color: "midnightblue",
    marginLeft: 20,
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "midnightblue",
    padding: 15,
    width: "82.5%",
    marginBottom: 20,
    borderRadius: 50,
    marginLeft: 30,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  button: {
    backgroundColor: "midnightblue",
    padding: 15,
    borderRadius: 50,
    paddingHorizontal: "27%",
    marginBottom: "5%",
  },
  footer: {
    paddingBottom: 100,
    //alignSelf: "center",
  },
});

export default RegisterCompany;
