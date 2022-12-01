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
  FlatList,
  SafeAreaView,
  Touchable,
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState, useEffect } from "react/cjs/react.development";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../database/config";

/******** FIX: Company post 1 click = writes all info to database but company field = "",
 * On 2nd click it then reads in company field from async storage from sets company field in db.
 * (Obvisously should be done on first click) *********/

function CompanyHomeScreen({ navigation }) {
  const [AdvertsCompany, setAdvertsCompany] = useState([]);
  //Used store username read from async storage
  const [username, setUsername] = useState("");
  useEffect(() => {
    //Read all data from job adverts database
    getDocs(collection(db, "Adverts")).then((docSnap) => {
      let advert = [];

      docSnap.forEach((doc) => {
        const { title, info, wage, type } = doc.data();
        advert.push({
          ...doc.data(),
          id: doc.id,
          title,
          info,
          wage,
          type,
        });
      });
      setAdvertsCompany(advert);
      //Call method to read username from async storage
      getData();
    });
  }, []);
  /******* METHOD TO READ VARIABLE FROM ASYNC STORAGE *******/
  //Pass username and store it in async storage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Username");
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
        <Button
          title="Log out"
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        />

        <Text style={styles.userNameStyle}>hello {username}</Text>
        <Text style={styles.mainTitle}>Active Job posts</Text>

        <SafeAreaView>
          <View>
            <FlatList
              data={AdvertsCompany}
              renderItem={({ item }) => (
                <View style={styles.innerContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.companyName}>
                    Posted by: {item.company}
                  </Text>
                  <Text style={styles.info}>{item.info}</Text>
                  <Text style={styles.wage}>${item.wage}</Text>
                  <Text style={styles.type}>Type: {item.type}</Text>
                  <Button
                    title="View Applicants"
                    onPress={console.log("View Applicants")}
                  />
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
    paddingTop: 20,
    paddingBottom: 5,
  },
  userNameStyle: {
    color: "navy",
    fontSize: 25,
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 5,
  },
  innerContainer: {
    backgroundColor: "lightyellow",
    borderTopColor: "snow",
    borderTopWidth: 15,
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
  companyName: {
    color: "blue",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontStyle: "bold",
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
