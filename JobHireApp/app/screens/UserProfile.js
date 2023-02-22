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

function UserProfile({ navigation }) {
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  //main error happening here is that when i load this page up on the app, I don't see the database information until i refresh.
  //something with async i imagine, tried loads of things.
  function getUserInfo() {
    //Read all data from logged in company database.
    getDocs(
      query(collection(db, "Jobseekers"), where("username", "==", username))
    ).then((docSnap) => {
      let info = [];
      docSnap.forEach((doc) => {
        const {
          knowledge,
          city,
          collegeName,
          email,
          firstName,
          jobTitle,
          lastName,
          number,
          pass,
          qualificationLevel,
          qualificationName,
          skills,
          username,
          yearEnd,
          yearStart,
          yearsExperience,
        } = doc.data();

        info.push({
          ...doc.data(),
          id: doc.id,
          knowledge,
          city,
          collegeName,
          email,
          firstName,
          jobTitle,
          lastName,
          number,
          pass,
          qualificationLevel,
          qualificationName,
          skills,
          username,
          yearEnd,
          yearStart,
          yearsExperience,
        });
      });

      setUserInfo(info);
      getData();
    });
  }

  useEffect(() => getUserInfo(), [username]);

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
  //note: the image of the horizontal line in the flatlist for structure is temporary until better styling is done. looks bad in code.
  return (
    <View style={styles.container}>
      <Text style={styles.company_username}>{username}</Text>

      <View style={styles.userImg}>
        <Image
          style={{ width: 100, height: 110, marginTop: 20 }}
          source={require("../assets/company_profile.png")}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        >
          <Text style={styles.buttonTopNavText}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTopNav}
          onPress={() => navigation.navigate("UserViewJobs")}
        >
          <Text style={styles.buttonTopNavText}>View active applicaitons</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={userInfo}
          scrollEnabled={scroll}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Text style={styles.experience_Head}>User Information</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />

              <Text style={styles.info_titles}>First name</Text>
              <Text style={styles.company_info}>{item.firstName}</Text>

              <Text style={styles.info_titles}>Last name</Text>
              <Text style={styles.company_info}>{item.lastName}</Text>

              <Text style={styles.info_titles}>Username</Text>
              <Text style={styles.company_info}>{item.username}</Text>

              <Text style={styles.info_titles}>email</Text>
              <Text style={styles.company_info}>{item.email}</Text>

              <Text style={styles.info_titles}>Number</Text>
              <Text style={styles.company_info}>{item.number}</Text>

              <Text style={styles.experience_Head}>User experience</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />

              <Text style={styles.info_titles}>Skills</Text>
              <Text style={styles.company_info}>{item.skills}</Text>

              <Text style={styles.info_titles}>Qualification Level</Text>
              <Text style={styles.company_info}>{item.qualificationLevel}</Text>

              <Text style={styles.info_titles}>Qualification Name</Text>
              <Text style={styles.company_info}>{item.qualificationName}</Text>

              <Text style={styles.info_titles}>Years experience</Text>
              <Text style={styles.company_info}>{item.yearsExperience}</Text>

              <Text style={styles.info_titles}>Current Employment</Text>
              <Text style={styles.company_info}>{item.jobTitle}</Text>

              <Text style={styles.info_titles}>College</Text>
              <Text style={styles.company_info}>{item.collegeName}</Text>
            </View>
          )}
        />
      </View>

      <View style={{ flex: 0.5 }}></View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 2,
    width: 350,
    margin: 15,
    backgroundColor: "ghostwhite",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "navy",
  },
  navBar: {
    flexDirection: "row",
    flex: 4,
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
  userImg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 10,
  },
  company_username: {
    textAlign: "center",
    color: "navy",
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 40,
  },
  buttonTopNav: {
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: "navy",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttons: {
    flexDirection: "row",
  },
  buttonTopNavText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  company_info: {
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  info_titles: {
    fontSize: 20,
    opacity: 0.5,
    marginTop: 15,
    marginLeft: 8,
    textAlign: "center",
  },
  logOutButton: {
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: "navy",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    marginLeft: 10,
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  experience_Head: {
    textAlign: "center",
    fontWeight: "bold",
    color: "navy",
    fontSize: 20,
    paddingTop: 15,
  },
});

export default UserProfile;
