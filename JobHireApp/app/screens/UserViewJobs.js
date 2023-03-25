import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.development";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../database/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UserViewJobs({ navigation }) {
  const [username, setUsername] = useState("");
  const [userJobs, setUserJobs] = useState([]);
  const [numberJobs, setNumberJobs] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  function getImageFromStorage() {
    //Gets firebase storage info
    const storage = getStorage();
    getDownloadURL(ref(storage, "Jobseeker/" + username))
      .then((url) => {
        console.log("test");
        console.log(url);
        setProfilePic(url);
      })
      .then(() => {
        console.log("IMAGE SUCCESSFULLY LOADED");
      })
      .catch(() => {
        console.log("IMAGE NOT FOUND");
      });
  }

  //Read all data from logged in company database.
  function getJobs() {
    getDocs(
      query(
        collection(db, "Adverts"),
        where("Applicants", "array-contains", username)
      )
    ).then((docSnap) => {
      let numJobs = 0;
      let jobs = [];
      docSnap.forEach((doc) => {
        jobs.push({ ...doc.data(), id: doc.id });
        numJobs += 1;
      });
      setUserJobs(jobs);
      console.log(username);
      console.log(jobs);
      setNumberJobs(numJobs);
      getData();
      getImageFromStorage();
    });
  }
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

  const flatListHeader = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.company_username}>Your job applications..</Text>
        <Text style={styles.mainTitle}>Total jobs: {numberJobs} </Text>
      </View>
    );
  };

  useEffect(() => getJobs(), [username]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text
          style={styles.backText}
          onPress={() => navigation.navigate("UserProfile")}
        >
          Back
        </Text>
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <View style={styles.flatlistContainer}>
          <FlatList
            ListHeaderComponent={flatListHeader}
            showsVerticalScrollIndicator={false}
            data={userJobs}
            renderItem={({ item }) => (
              <View style={styles.innerContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.companyName}>{item.company}</Text>
                <Text style={styles.info}>{item.info}</Text>
                <Text style={styles.wage}>${item.wage}</Text>
                <View style={styles.bottomInnerContainer}>
                  <Text style={styles.type}>Type: {item.type}</Text>

                  <Text style={styles.buttonText}>Applied</Text>
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
            style={{ width: 45, height: 45 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserMessage")}
        >
          <Image
            style={{ width: 45, height: 40 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <Image
            style={{
              width: 55,
              height: 55,

              borderColor: "black",
              borderWidth: 2,
              borderRadius: 50,
            }}
            source={{ uri: profilePic }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  mainContainer: {
    backgroundColor: "#ghostwhite",
    paddingBottom: 120,
  },
  backButton: {
    alignSelf: "left",
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  backText: {
    color: "navy",
    textAlign: "center",
    fontSize: 20,
  },
  mainTitle: {
    color: "grey",
    fontSize: 15,
    paddingLeft: "5%",
    fontWeight: "400",
  },
  company_username: {
    color: "midnightblue",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 1,
    marginTop: 10,
    paddingLeft: "4%",
  },
  innerContainer: {
    backgroundColor: "#ECE7E0",
    // borderColor: "#E1DEE9",

    marginTop: 25,
    padding: 2,
    borderWidth: 3,
    borderRadius: 15,
  },
  flatlistContainer: {
    paddingHorizontal: "4%",
  },

  companyName: {
    color: "darkblue",
    fontSize: 20,
    paddingLeft: 12.5,
    paddingBottom: 5,
    fontStyle: "bold",
    fontWeight: "500",
  },
  title: {
    color: "midnightblue",
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
    flex: 0.7,
  },
  bottomInnerContainer: {
    flex: 1,
    flexDirection: "row",
  },

  buttonText: {
    color: "midnightblue",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    flex: 0.3,
    paddingLeft: 40,
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
    borderTopWidth: 2,
    borderTopColor: "black",
  },
  navButtons: {
    marginVertical: 20,
    marginHorizontal: 40,
  },
});

export default UserViewJobs;
