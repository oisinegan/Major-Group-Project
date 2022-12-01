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
import { useState, useEffect } from "react/cjs/react.development";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../database/config";

function UserHomeScreen({ navigation }) {
  const [AdvertsUser, setAdvertsUser] = useState([]);
  const [compName, setCompName] = useState();
  const [adName, setAdName] = useState();

  //Used store username read from async storage
  const [username, setUsername] = useState("");
  useEffect(() => {
    //Read all data from job adverts database
    getDocs(collection(db, "Adverts")).then((docSnap) => {
      let advert = [];
      docSnap.forEach((doc) => {
        const { title, info, wage, type } = doc.data();
        advert.push({ ...doc.data(), id: doc.id, title, info, wage, type });
      });

      //console.log(advert);
      setAdvertsUser(advert);
      console.log(AdvertsUser);
      console.log("done");
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

  async function writeUserToJobAdvertDB(item) {
    //console.log(item.id);
    // console.log(item.wage);
    // console.log("Submitted");
    const advertDocumentRef = doc(db, "Adverts", item.id);

    await updateDoc(advertDocumentRef, {
      Applicants: arrayUnion(username),
    });
  }
  return (
    <SafeAreaView style={styles.outerContainer}>
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
      <View>
        <Button
          title="Log out"
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        />
        <Text style={styles.userNameStyle}>Hello {username}</Text>
        <Text style={styles.mainTitle}>Job posts</Text>
        <View>
          <FlatList
            data={AdvertsUser}
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
                  title="Apply"
                  onPress={() => {
                    writeUserToJobAdvertDB(item);
                  }}
                />
                <Button
                  title="More Info"
                  onPress={() => navigation.navigate("JobScreen")}
                />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
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
  companyName: {
    color: "blue",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontStyle: "bold",
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
