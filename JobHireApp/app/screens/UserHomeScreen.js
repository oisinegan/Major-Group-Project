import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
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

      setAdvertsUser(advert);

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
    const advertDocumentRef = doc(db, "Adverts", item.id);

    await updateDoc(advertDocumentRef, {
      Applicants: arrayUnion(username),
    });
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Button
        title="Log out"
        onPress={() => navigation.navigate("HomeNotLoggedIn")}
      />

      <Text style={styles.userNameStyle}>Hello {username}</Text>

      <Text style={styles.mainTitle}>Job posts</Text>

      <View style={styles.flatlistContainer}>
        <FlatList
          data={AdvertsUser}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.companyName}>Posted by: {item.company}</Text>
              <Text style={styles.info}>{item.info}</Text>
              <Text style={styles.wage}>${item.wage}</Text>
              <Text style={styles.type}>Type: {item.type}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    Alert.alert("Application Successful!", "GOOD LUCK!", [
                      {
                        text: "Thank you!",
                        onPress: () => writeUserToJobAdvertDB(item),
                      },
                    ]);
                  }}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("JobScreen", { item: item })
                  }
                >
                  <Text style={styles.buttonText}>More info</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserHomeScreen")}
        >
          <Image
            style={{ width: 30, height: 30, margin: 15 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserMessage")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserNotification")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Noti.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserProfile")}
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
    flex: 1,
    backgroundColor: "#F1F1F1",
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
    borderTopColor: "#F1F1F1",
    borderTopWidth: 15,
    borderColor: "snow",
  },
  flatlistContainer: {
    borderBottomWidth: 238,
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  button: {
    backgroundColor: "navy",
    padding: 1,
    borderRadius: 50,
    mar
  },
  buttonText: {
    color: "white",
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
