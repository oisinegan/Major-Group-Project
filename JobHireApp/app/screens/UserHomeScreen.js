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
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState } from "react/cjs/react.development";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../database/config";

function UserHomeScreen({ navigation }) {
  const [Adverts, setAdverts] = useState([]);
  //Used store username read from async storage
  const [username, setUsername] = useState("");
  //Read all data from job adverts database
  getDocs(collection(db, "Adverts")).then((docSnap) => {
    docSnap.forEach((doc) => {
      const { title, info, wage, type } = doc.data();
      Adverts.push({ ...doc.data(), id: doc.id, title, info, wage, type });
    });
    setAdverts(Adverts);
    //Call method to read username from async storage
    getData();
  });
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
    <View style={styles.container}>
      <View style={styles.outerContainer}>
        <View style={styles.navBar}>
          <Button
            title="Home"
            onPress={() => navigation.navigate("UserHomeScreen")}
          />
          <Button
            title="Messages"
            onPress={() => navigation.navigate("UserMessage")}
          />
          <Button
            title="Notifications"
            onPress={() => navigation.navigate("UserNotification")}
          />
          <Button
            title="Profile"
            onPress={() => navigation.navigate("UserProfile")}
          />
        </View>
        <SafeAreaView>
          <Button
            title="Log out"
            onPress={() => navigation.navigate("HomeNotLoggedIn")}
          />
          <Text style={styles.mainTitle}>Active Job posts (6)</Text>
          <Text style={styles.mainTitle}>Hello {username}</Text>
          <View style={styles.innerContainer}>
            <FlatList
              data={Adverts}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.info}>{item.info}</Text>
                  <Text style={styles.wage}>${item.wage}</Text>
                  <Text style={styles.type}>Type: {item.type}</Text>
                  <Button title="Apply" />
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
export default UserHomeScreen;
