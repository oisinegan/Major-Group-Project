import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from "react-native";
import * as React from "react";
//Database imports
import { useState } from "react/cjs/react.development";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../database/config";

function CompanyHomeScreen({ navigation }) {
  let Adverts = [];

  //Read all data
  getDocs(collection(db, "Adverts")).then((docSnap) => {
    docSnap.forEach((doc) => {
      Adverts.push({ ...doc.data(), id: doc.id });
    });
    console.log(Adverts);
    console.log(Adverts[0].title);
  });

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>CompanyName</Text>
        <View style={styles.image}>
          <Image
            style={{ width: 150, height: 150, margin: 20 }}
            source={require("../assets/login_symbol.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Date Founded: DD/MM/YYYY
            {"\n"}
            About: This is some info about the company. This is some info about
            the company. This is some info about the company.
            {"\n"}
            Positions Available: 123
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Edit"
            onPress={() => navigation.navigate("CompanyEditJobScreen")}
          />
          <Button title="View"></Button>
        </View>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyHome")}
        >
          <Image
            style={{ width: 30, height: 30, margin: 15 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyPostJob")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/PostJob.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyMessages")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyProfileScreen")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Profile.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    padding: 0,
    flex: 1,
  },
  mainTitle: {
    color: "navy",
    fontSize: 25,
    textDecorationLine: "underline",
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: "lightyellow",
    borderTopColor: "snow",
    borderTopWidth: 15,
    borderWidth: 20,
    borderColor: "snow",
  },
  title: {
    color: "white",
    backgroundColor: "navy",
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  textContainer: {
    padding: 20,
  },
  text: {
    color: "black",
    fontSize: 15,
  },
  buttons: {
    backgroundColor: "lightyellow",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
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

export default CompanyHomeScreen;
