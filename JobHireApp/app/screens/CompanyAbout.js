import {StyleSheet, Text, View, Button, Alert, ScrollView, Image, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid} from "react-native";
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
    console.log(Adverts.at(0).title);
  });

  return (
    //navbar wont appear on app unless at top for this page, easy fix i'd imagine

    <View style={styles.container}>
      <View style={styles.navBar}>
        <Button
          title="Home"
          onPress={() => navigation.navigate("CompanyHome")}
        />
        <Button
          title="Post"
          onPress={() => navigation.navigate("CompanyPostJob")}
        />
        <Button
          title="Notifications"
          onPress={() => navigation.navigate("CompanyNotifications")}
        />

        <Button
          title="Profile"
          onPress={() => navigation.navigate("CompanyProfileScreen")}
        />
      </View>
      <View style={styles.outerContainer}>
        <ScrollView>
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
                {'\n'}
                About: This is some info about the company. This is some info about the company. This is some info about the company.
                {'\n'}
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
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "snow",
    alignItems: "center",
    padding: 0,
  },
  mainTitle: {
    color: "navy",
    fontSize: 25,
    textDecorationLine: "underline",
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

export default CompanyHomeScreen;
