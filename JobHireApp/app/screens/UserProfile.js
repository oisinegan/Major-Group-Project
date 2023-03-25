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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UserProfile({ route, navigation }) {
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [userAbout, setUserAbout] = useState([]);
  const [userSkill, setUserSkill] = useState([]);
  const [userExperience, setUserExperience] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [profilePic, setProfilePic] = useState(".");

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

  function getUserAbout() {
    setActiveTab(1);
    setUserSkill([]);
    setUserExperience([]);

    getDocs(
      query(collection(db, "Jobseekers"), where("username", "==", username))
    ).then((docSnap) => {
      let info = [];
      docSnap.forEach((doc) => {
        const {
          city,
          email,
          firstName,
          lastName,
          number,
          username,
          jobTitle,
          //  image,
        } = doc.data();

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
          //  image,
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

  useEffect(() => getImageFromStorage(), [username]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <Text style={styles.company_username}>Hi, {username}.</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("UserEditProfile", { item: username })
          }
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imgContainer}>
        <FlatList
          data={profilePic}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Image style={styles.userImg} source={{ uri: profilePic }} />
            </View>
          )}
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
          onPress={() => navigation.navigate("UserViewJobs")}
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
    backgroundColor: "ghostwhite",
    alignItems: "center",
    justifyContent: "center",
  },
  topNav: {
    flexDirection: "row",
    width: "100%",
  },
  mainContainer: {
    flex: 2,
    width: 500,
    backgroundColor: "ghostwhite",
    marginBottom: 0,
  },
  imgContainer: {
    height: 150,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 100,
  },
  innerContainer: {},
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
  userImg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 90,
    borderRadius: 100,
    width: 140,
    height: 146,
  },
  company_username: {
    alignSelf: "center",
    color: "midnightblue",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 1,
    flex: ".78",
    marginLeft: 20,
  },
  editButton: {
    backgroundColor: "midnightblue",
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "right",
    justifyContent: "flex-end",
    flex: ".22",
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
    fontSize: 20,
    textAlign: "center",
  },

  buttonsTopNav: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
  },
  profileButttons: {
    backgroundColor: "midnightblue",
    marginHorizontal: 8,
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
    height: 40,
    borderRadius: 10,
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
