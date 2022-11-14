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
<<<<<<< Updated upstream
  FlatList,
  SafeAreaView,
  Touchable,
=======
>>>>>>> Stashed changes
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState } from "react/cjs/react.development";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../database/config";

function CompanyHomeScreen({ navigation }) {
<<<<<<< Updated upstream
  const [Adverts, setAdverts] = useState([]);
  const [username, setUsername] = useState("");

=======
  let Adverts = [];
  const [username, setUsername] = useState("");
>>>>>>> Stashed changes
  //Read all data
  getDocs(collection(db, "Adverts")).then((docSnap) => {
    const Adverts = [];
    docSnap.forEach((doc) => {
      const { title, info, wage, type } = doc.data();
      Adverts.push({ ...doc.data(), id: doc.id, title, info, wage, type });
    });
    setAdverts(Adverts);
    console.log(Adverts);
    console.log(Adverts.at(0).title);
    getData();
  });
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Test");
      var usernameFromAsyncStorage = value.toString();
      if (value !== null) {
        // value previously stored
        setUsername(usernameFromAsyncStorage);
      }
    } catch (e) {
      // error reading value
    }
  };

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
<<<<<<< Updated upstream
        <Button
          title="Log out"
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        />
=======
        <ScrollView>
          <Button
            title="Log out"
            onPress={() => navigation.navigate("HomeNotLoggedIn")}
          />

          <Text style={styles.mainTitle}>Active Job posts (5)</Text>
          <Text style={styles.mainTitle}>hello {username}</Text>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 1</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
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

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 1</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
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

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 1</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
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

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 1</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
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
>>>>>>> Stashed changes

        <Text style={styles.mainTitle}>Active Job posts (5)</Text>
        <Text style={styles.mainTitle}>hello {username}</Text>

        <SafeAreaView>
          <View style={styles.innerContainer}>
            <FlatList
              data={Adverts}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.info}>{item.info}</Text>
                  <Text style={styles.wage}>${item.wage}</Text>
                  <Text style={styles.type}>Type: {item.type}</Text>
                  <Button
                    title="Edit"
                    onPress={() => navigation.navigate("CompanyEditJobScreen")}
                  />
                </View>
              )}
            />
          </View>
        </SafeAreaView>
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
  title: {
    color: "white",
    backgroundColor: "navy",
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  info: {
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontStyle: "italic",
  },
  wage: {
    textAlign: "right",
    paddingRight: 5,
    fontWeight: "bold",
  },
  type: {
    textAlign: "right",
    paddingRight: 5,
    paddingBottom: 5,
    textDecorationLine: "underline",
  },
});

export default CompanyHomeScreen;
