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
import { set } from "react-native-reanimated";

function UserProfile({ navigation }) {
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [userAbout, setUserAbout] = useState([]);
  const [userSkill, setUserSkill] = useState([]);
  const [userExperience, setUserExperience] = useState([]);

  function getUserAbout() {
    setUserSkill([]);
    setUserExperience([]);
    //Read all data from logged in company database.
    getDocs(
      query(collection(db, "Jobseekers"), where("username", "==", username))
    ).then((docSnap) => {
      let info = [];
      docSnap.forEach((doc) => {
        const { city, email, firstName, lastName, number, username, jobTitle } =
          doc.data();

        info.push({
          ...doc.data(),
          id: doc.id,
          city,
          email,
          firstName,
          lastName,
          number,
          username,
          jobTitle,
        });
      });

      setUserAbout(info);
      getData();
    });
  }

  function getUserSkill() {
    setUserAbout([]);
    setUserExperience([]);
    getDocs(
      query(collection(db, "Jobseekers"), where("username", "==", username))
    ).then((docSnap) => {
      let info = [];
      docSnap.forEach((doc) => {
        const { skills, Knowledge } = doc.data();

        info.push({
          ...doc.data(),
          id: doc.id,
          skills,
          Knowledge,
        });
      });

      setUserSkill(info);
      getData();
    });
  }
  function getUserExperience() {
    setUserAbout([]);
    setUserSkill([]);
    getDocs(
      query(collection(db, "Jobseekers"), where("username", "==", username))
    ).then((docSnap) => {
      let info = [];
      docSnap.forEach((doc) => {
        const {
          qualificationLevel,
          qualificationName,
          yearsExperience,
          collegeName,
          yearStart,
          yearEnd,
        } = doc.data();

        info.push({
          ...doc.data(),
          id: doc.id,
          qualificationLevel,
          qualificationName,
          yearsExperience,
          collegeName,
          yearStart,
          yearEnd,
        });
      });

      setUserExperience(info);
      getData();
    });
  }

  useEffect(() => getUserAbout(), [username]);

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
      <Text style={styles.company_username}>{username}</Text>

      <View style={styles.userImg}>
        <Image
          style={{ width: 100, height: 110, marginTop: 20 }}
          source={require("../assets/company_profile.png")}
        />
      </View>
      <View style={styles.profileButttons1}>
        <TouchableOpacity
          style={styles.logout_b}
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        >
          <Text style={styles.buttonText2}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewjobs_b}
          onPress={() => navigation.navigate("UserViewJob")}
        >
          <Text style={styles.buttonText2}>View Jobs</Text>
        </TouchableOpacity>
      </View>

      <Image
        style={{
          width: 500,
          opacity: 0.4,
          height: 2,
          marginRight: 40,
          alignSelf: "center",
          marginTop: 5,
        }}
        source={require("../assets/line.png")}
      />

      <View style={styles.profileButttons2}>
        <TouchableOpacity style={styles.pb1} onPress={() => getUserAbout()}>
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pb2} onPress={() => getUserSkill()}>
          <Text style={styles.buttonText}>Skills</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pb3}
          onPress={() => getUserExperience()}
        >
          <Text style={styles.buttonText}>Experience</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={userAbout}
          scrollEnabled={scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
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

              <Text style={styles.info_titles}>City</Text>
              <Text style={styles.company_info}>{item.city}</Text>
            </View>
          )}
        />
        <FlatList
          data={userSkill}
          scrollEnabled={scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Text style={styles.info_titles}>Skills</Text>
              <Text style={styles.company_info}>{item.skills}</Text>

              <Text style={styles.info_titles}>knowledge</Text>
              <Text style={styles.company_info}>{item.Knowledge}</Text>
            </View>
          )}
        />

        <FlatList
          data={userExperience}
          scrollEnabled={scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Text style={styles.info_titles}>Qualification Level</Text>
              <Text style={styles.company_info}>{item.qualificationLevel}</Text>

              <Text style={styles.info_titles}>Qualification Name</Text>
              <Text style={styles.company_info}>{item.qualificationName}</Text>

              <Text style={styles.info_titles}>Years experience</Text>
              <Text style={styles.company_info}>{item.yearsExperience}</Text>

              <Text style={styles.info_titles}>College</Text>
              <Text style={styles.company_info}>{item.collegeName}</Text>

              <Text style={styles.info_titles}>Year start</Text>
              <Text style={styles.company_info}>{item.yearStart}</Text>

              <Text style={styles.info_titles}>Year finished</Text>
              <Text style={styles.company_info}>{item.yearEnd}</Text>
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
    backgroundColor: "ghostwhite",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 3,
    width: 500,
    margin: 15,
    backgroundColor: "ghostwhite",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "grey",
  },
  innerContainer: {},
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
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 70,
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
  profileButttons1: {
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "left",
  },
  profileButttons2: {
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "left",
    marginLeft: 10,
  },
  pb1: {
    padding: 5,
    backgroundColor: "navy",
    borderRadius: 0,
    borderColor: "white",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    width: 120,
  },
  pb2: {
    padding: 5,
    backgroundColor: "navy",
    borderRadius: 0,
    borderColor: "white",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    width: 120,
    marginLeft: 5,
  },
  pb3: {
    padding: 5,
    backgroundColor: "navy",
    borderRadius: 0,
    borderColor: "white",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    width: 120,
    marginLeft: 5,
  },
  pb4: {
    padding: 5,
    backgroundColor: "navy",
    borderRadius: 40,
    borderColor: "white",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  logout_b: {
    backgroundColor: "grey",
    borderRadius: 40,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    width: 120,
    height: 25,
    marginLeft: 10,
  },
  viewjobs_b: {
    backgroundColor: "grey",
    borderRadius: 40,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    width: 120,
    marginLeft: 130,
  },
  buttonText2: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});

export default UserProfile;
