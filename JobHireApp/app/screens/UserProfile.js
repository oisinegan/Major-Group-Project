import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableHighlight,
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
import { exp, set } from "react-native-reanimated";

function UserProfile({ route, navigation }) {
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [userAbout, setUserAbout] = useState([]);
  const [userSkill, setUserSkill] = useState([]);
  const [userExperience, setUserExperience] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  //when I try to pass the item variable to the edit job screen with, { item: item }, it gives me an error saying item is undefined.
  //If I define it with '  const { item } = route.params;', it gives me the first error I showed you.

  function getUserAbout() {
    setActiveTab(1);
    setUserSkill([]);
    setUserExperience([]);

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
    setActiveTab(2);

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
    setActiveTab(3);
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
      <Text style={styles.company_username}>Hi, {username}.</Text>
      <View style={styles.userImg}>
        <View style={styles.EditNav}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("UserEditProfile")}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Image
          style={{
            width: 110,
            height: 110,
            marginTop: 20,
          }}
          source={require("../assets/profilepic.png")}
        />
      </View>
      <View style={styles.buttonsTopNav}>
        <TouchableOpacity
          style={styles.profileButttons}
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        >
          <Text style={styles.buttonTextTop}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButttons}
          onPress={() => navigation.navigate("UserViewJob")}
        >
          <Text style={styles.buttonTextTop}>View Jobs</Text>
        </TouchableOpacity>
      </View>

      <Image
        style={{ width: 600, height: 2, marginBottom: 10 }}
        source={require("../assets/line.png")}
      />

      <View style={styles.profileTabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 1 && styles.activeButton]}
          onPress={() => getUserAbout()}
        >
          <Text style={styles.tabText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 2 && styles.activeButton]}
          onPress={() => getUserSkill()}
        >
          <Text style={styles.tabText}>Skills</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 3 && styles.activeButton]}
          onPress={() => getUserExperience()}
        >
          <Text style={styles.tabText}>Experience</Text>
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
    flex: 2,
    width: 500,
    margin: 15,
    backgroundColor: "ghostwhite",
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
    alignSelf: "left",
    color: "midnightblue",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 1,
    marginTop: 60,
    marginLeft: 20,
  },
  buttonsTopNav: {
    flexDirection: "row",
    marginBottom: 20,
  },
  profileButttons: {
    backgroundColor: "midnightblue",
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    width: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextTop: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "midnightblue",
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    width: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  EditNav: { justifyContent: "flex-end" },

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
    fontFamily: "Cochin",
  },

  experience_Head: {
    textAlign: "center",
    fontWeight: "bold",
    color: "navy",
    fontSize: 20,
    paddingTop: 15,
  },

  profileTabs: {
    flexDirection: "row",
  },
  activeButton: {
    backgroundColor: "midnightblue",
  },
  tab: {
    borderWidth: 0,
    width: 100,
    height: 80,
    borderRadius: 0,
    backgroundColor: "darkgrey",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default UserProfile;
