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
//Stream chat api imports
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  StreamChat,
} from "stream-chat";

function CompanyViewApplicantProfile({ route, navigation }) {
  const { item } = route.params;
  // console.log(item);
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [compUsername, setCompUsername] = useState("");
  const [userAbout, setUserAbout] = useState([]);
  const [userSkill, setUserSkill] = useState([]);
  const [userExperience, setUserExperience] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [profilePic, setProfilePic] = useState(".");

  //when I try to pass the item variable to the edit job screen with, { item: item }, it gives me an error saying item is undefined.
  //If I define it with '  const { item } = route.params;', it gives me the first error I showed you.

  function loadImage() {
    getDocs(
      query(collection(db, "Jobseekers"), where("username", "==", username))
    ).then((docSnap) => {
      let info = [];
      docSnap.forEach((doc) => {
        const { image } = doc.data();

        info.push({
          ...doc.data(),
          id: doc.id,

          image,
        });
      });
      setProfilePic(info);
      getData();
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

  function createTextChannel(user) {
    console.log("Create channel with: " + user + " by: " + compUsername);
    // client-side you initialize the Chat client with your API key
    const client = StreamChat.getInstance("83shajg3euaq", {
      timeout: 6000,
    });
    //Write User to stream chat api to allow for messaging
    const chanName = compUsername + "_" + user;
    const channel = client.channel("messaging", chanName.toString(), {
      name: chanName.toString(),
      members: [compUsername.toString(), user.toString()],
    });

    // fetch the channel state, subscribe to future updates
    const state = channel.watch();

    navigation.navigate("CompanyMessageScreen", { channel: channel });
  }

  useEffect(() => getUserAbout(), [username]);

  useEffect(() => loadImage(), [username]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Username");
      var usernameFromAsyncStorage = value.toString();
      if (value !== null) {
        // value previously stored
        setCompUsername(usernameFromAsyncStorage);
      }
    } catch (e) {
      // error reading value
    }

    setUsername(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navButton1}>
          <Text style={styles.navText} onPress={() => navigation.goBack()}>
            Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.navButtonEmpty}></Text>

        <TouchableOpacity style={styles.navButton2}>
          <Text
            style={styles.navText}
            onPress={() => createTextChannel(username)}
          >
            Message
          </Text>
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
              <Image style={styles.userImg} source={{ uri: item.image }} />
            </View>
          )}
        />
      </View>
      <Text style={styles.username}>{username}</Text>

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

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyHome")}
        >
          <Image
            style={{ width: 30, height: 30, margin: 15 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyPostJob")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/PostJob.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyMessages")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyProfileScreen")}
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
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    backgroundColor: "ghostwhite",
    width: "100%",
    flexDirection: "row",
  },
  navButton1: {
    alignSelf: "left",
    padding: 10,
    backgroundColor: "midnightblue",
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,

    flex: 0.25,
  },
  navButtonEmpty: {
    flex: 0.6,
  },
  navButton2: {
    alignSelf: "right",
    padding: 10,
    backgroundColor: "midnightblue",
    margin: 8,

    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    flex: 0.25,
  },
  navText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17.5,
    textAlign: "center",
  },
  titleNav: {
    marginTop: 50,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "navy",
    fontWeight: "bold",
    fontSize: 40,
    flex: 0.55,
  },
  username: {
    alignSelf: "center",
    color: "midnightblue",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 1,
    marginBottom: 10,
  },
  mainContainer: {
    flex: 2,
    width: 500,
    margin: 0,
    paddingBottom: 80,
    backgroundColor: "ghostwhite",
  },
  imgContainer: {
    height: 150,
    marginVertical: 15,
    borderWidth: 2,
  },
  innerContainer: {},
  navBar: {
    flexDirection: "row",
    flex: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    marginBottom: 40,
    width: 150,
    height: 150,
  },

  buttonsTopNav: {
    flexDirection: "row",
    marginBottom: 20,
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
    height: 50,
    borderRadius: 10,
    backgroundColor: "darkgrey",
    margin: 5,
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

export default CompanyViewApplicantProfile;
