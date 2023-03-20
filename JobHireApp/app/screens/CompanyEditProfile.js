import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
  StatusBar,
} from "react-native";
import * as React from "react";
import { db } from "../database/config";
import { useState, useEffect } from "react/cjs/react.development";

import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  deleteDoc,
  where,
} from "firebase/firestore";
import { add } from "react-native-reanimated";

function CompanyEditProfile({ route, navigation }) {
  //this one is causing an error
  const { item } = route.params;
  console.log(item);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [address, setAddress] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [email, setEmail] = useState("");
  const [founded, setFounded] = useState("");
  const [industry, setIndustry] = useState("");
  const [info, setInfo] = useState("");
  const [number, setNumber] = useState("");

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

  function readUserInfo() {
    getDocs(
      query(collection(db, "Company"), where("username", "==", item))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        const {
          companySize,
          email,
          address,
          number,
          founded,
          username,
          pass,
          industry,
          info,
          //  image,
        } = doc.data();

        setEmail(email);
        setNumber(number);
        setPass(pass);
        setUsername(username);
        setCompanySize(companySize);
        setAddress(address);
        setFounded(founded);
        setIndustry(industry);
        setInfo(info);
      });
    });
  }
  useEffect(() => {
    readUserInfo();
  }, []);

  function deleteUser() {
    deleteDoc(doc(db, "Company", item));
    navigation.navigate("HomeNotLoggedIn");
  }

  function create() {
    getData();
    setDoc(doc(db, "Company", item), {
      email: email,
      address: address,
      number: number,
      info: info,
      industry: industry,
      founded: founded,
      companySize: companySize,
      username: username,
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
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.backButton}>
          <Text
            style={styles.backText}
            onPress={() => navigation.navigate("CompanyProfileScreen")}
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.titleNav}>Edit profile</Text>

        <TouchableOpacity style={styles.buttonDelete} onPress={deleteUser}>
          <Text style={styles.buttonDeleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleMini}>About</Text>

        <Text style={styles.labels}>About company</Text>
        <TextInput
          value={info}
          onChangeText={(info) => setInfo(info)}
          placeholder="info"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Industry</Text>
        <TextInput
          value={industry}
          onChangeText={(industry) => setIndustry(industry)}
          placeholder="industry"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Company size</Text>
        <TextInput
          value={companySize}
          onChangeText={(companySize) => setCompanySize(companySize)}
          placeholder="Company Size"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Founded</Text>
        <TextInput
          value={founded}
          onChangeText={(founded) => setFounded(founded)}
          placeholder="founded"
          style={styles.inputBox}
        ></TextInput>

        <Text style={styles.titleMini}>Education</Text>

        <Text style={styles.labels}>Address</Text>
        <TextInput
          value={address}
          onChangeText={(address) => setAddress(address)}
          placeholder="address"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Number</Text>
        <TextInput
          value={number}
          onChangeText={(number) => setNumber(number)}
          placeholder="Number"
          style={styles.inputBox}
        ></TextInput>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={create}>
            <Text style={styles.buttonText} onPress={console.log("pressed")}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  nav: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: "left",
    padding: 10,
    flex: 0.17,
  },
  backText: {
    color: "navy",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
  titleNav: {
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "navy",
    fontWeight: "bold",
    paddingLeft: 15,
    fontSize: 30,
    flex: 0.6,
  },

  buttonDelete: {
    backgroundColor: "navy",
    borderRadius: 50,
    alignSelf: "center",
    padding: 10,
    flex: 0.2,
  },
  buttonDeleteText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  labels: {
    fontSize: 25,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 20,
    color: "navy",
    marginBottom: 10,
  },
  inputBox: {
    borderWidth: 1.5,
    borderColor: "navy",
    padding: 20,
    width: "80%",
    marginBottom: 10,
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 10,
    fontSize: 17.5,
  },

  buttonContainer: {
    paddingVertical: 40,
  },
  button: {
    padding: 20,
    backgroundColor: "navy",

    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  titleMini: {
    fontSize: 35,
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 20,
    marginVertical: 25,
  },
});

export default CompanyEditProfile;
