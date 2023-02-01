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
  StatusBar,
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
  const [numberJobs, setNumberJobs] = useState([]);

  //Used store username read from async storage
  const [username, setUsername] = useState("");
  useEffect(() => {
    //Read all data from job adverts database
    getDocs(collection(db, "Adverts")).then((docSnap) => {
      let advert = [];
      let numJobs = 0;
      docSnap.forEach((doc) => {
        const { title, info, wage, type } = doc.data();
        advert.push({ ...doc.data(), id: doc.id, title, info, wage, type });
        numJobs += 1;
      });
      setNumberJobs(numJobs);
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

  const flatListHeader = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.userNameStyle}>Hello {username}</Text>
        <Text style={styles.mainTitle}>Total results: {numberJobs} </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.topNav}>
        <View style={styles.seachBarContainer}>
          <TextInput
            style={styles.seachBar}
            placeholder="Search Jobs"
          ></TextInput>
        </View>

        <TouchableOpacity
          style={styles.buttonTopNav}
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        >
          <Text style={styles.buttonTopNavText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.flatlistContainer}>
          <FlatList
            ListHeaderComponent={flatListHeader}
            showsVerticalScrollIndicator={false}
            data={AdvertsUser}
            renderItem={({ item }) => (
              <View style={styles.innerContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.companyName}>{item.company}</Text>
                <Text style={styles.info}>{item.info}</Text>
                <Text style={styles.wage}>${item.wage}</Text>
                <Text style={styles.type}>Type: {item.type}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.buttonApply}
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
    backgroundColor: "white",
    padding: 0,
  },
  topNav: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    padding: 10,
  },
  seachBarContainer: {
    width: "75%",
    alignSelf: "center",
  },
  seachBar: {
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
    verticalAlign: "center",
    placeholder: "Search bar",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "navy",
    backgroundColor: "white",
    padding: 10,
  },
  buttonTopNav: {
    backgroundColor: "navy",
    padding: 10,
    borderRadius: 50,
    marginLeft: 7,
  },
  buttonTopNavText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  mainTitle: {
    color: "grey",
    fontSize: 15,
    paddingLeft: "5%",
    fontWeight: "400",
  },
  userNameStyle: {
    color: "navy",
    fontWeight: "bold",
    padding: "5%",
    fontSize: "30%",
  },
  flatlistContainer: {
    paddingHorizontal: "4%",
  },
  mainContainer: {
    backgroundColor: "#FCFCFF",
    paddingBottom: 120,
  },
  innerContainer: {
    backgroundColor: "#ECE7E0",
    borderColor: "#E1DEE9",
    marginTop: 15,
    padding: 2,
    borderWidth: 3,
    borderRadius: 30,
  },

  companyName: {
    color: "darkblue",
    fontSize: 20,
    paddingLeft: 12.5,
    paddingBottom: 5,
    fontStyle: "bold",
    fontWeight: "500",
  },
  textContainer: {
    padding: 20,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  button: {
    backgroundColor: "navy",
    padding: 15,
    borderRadius: 50,
    marginLeft: 10,
  },
  buttonApply: {
    backgroundColor: "navy",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  title: {
    color: "navy",
    fontWeight: "bold",
    fontSize: 25,
    padding: 12,
  },
  info: {
    fontSize: 19,
    paddingTop: 7.5,
    paddingBottom: 7.5,
    paddingLeft: 15,
    fontWeight: "400",
  },
  wage: {
    textAlign: "left",
    paddingRight: 5,
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 2,
  },
  type: {
    textAlign: "left",
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingTop: 7.5,
    fontSize: 19,
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
    alignSelf: "center",
    width: "100%",
  },
  navButtons: {
    margin: 20,
  },
});
export default UserHomeScreen;
