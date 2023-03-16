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
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../database/config";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react/cjs/react.development";

function CompanyProfileScreen({ navigation }) {
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [companyInfo, setCompanyInfo] = useState([]);
  const [companyAbout, setCompanyAbout] = useState([]);
  const [companyContact, setCompanyContact] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [profilePic, setProfilePic] = useState(".");

  function loadImage() {
    getDocs(
      query(collection(db, "Company"), where("username", "==", username))
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

  function getCompanyAbout() {
    setActiveTab(1);

    setCompanyContact([]);

    getDocs(
      query(collection(db, "Company"), where("username", "==", username))
    ).then((docSnap) => {
      let infor = [];
      docSnap.forEach((doc) => {
        const { address, founded, companySize, industry, info } = doc.data();

        infor.push({
          ...doc.data(),
          id: doc.id,
          address,
          founded,
          companySize,
          industry,
          info,
        });
      });

      setCompanyAbout(infor);
      getData();
    });
  }

  function getCompanyContact() {
    setActiveTab(2);

    setCompanyAbout([]);
    getDocs(
      query(collection(db, "Company"), where("username", "==", username))
    ).then((docSnap) => {
      let info = [];
      docSnap.forEach((doc) => {
        const { email, number } = doc.data();

        info.push({
          ...doc.data(),
          id: doc.id,
          email,
          number,
        });
      });

      setCompanyContact(info);
      getData();
    });
  }

  useEffect(() => getCompanyAbout(), [username]);
  useEffect(() => loadImage(), [username]);

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
      <Text style={styles.company_username}>Welcome, {username}.</Text>

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
      <View style={styles.buttonsTopNav}>
        <TouchableOpacity
          style={styles.profileButttons}
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        >
          <Text style={styles.buttonTextTop}>Log out</Text>
        </TouchableOpacity>
      </View>

      <Image
        style={{ width: 600, height: 1, marginBottom: 10 }}
        source={require("../assets/line.png")}
      />
      <View style={styles.profileTabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 1 && styles.activeButton]}
          onPress={() => getCompanyAbout()}
        >
          <Text style={styles.tabText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 2 && styles.activeButton]}
          onPress={() => getCompanyContact()}
        >
          <Text style={styles.tabText}>Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={companyAbout}
          scrollEnabled={scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Text style={styles.info_titles}>Company title</Text>
              <Text style={styles.company_info}>{username}</Text>

              <Text style={styles.info_titles}>About {username}</Text>
              <Text style={styles.company_info}>{item.info}</Text>

              <Text style={styles.info_titles}>Industry</Text>
              <Text style={styles.company_info}>{item.industry}</Text>

              <Text style={styles.info_titles}>Company Size</Text>
              <Text style={styles.company_info}>{item.companySize}</Text>

              <Text style={styles.info_titles}>Founded</Text>
              <Text style={styles.company_info}>{item.founded}</Text>
            </View>
          )}
        />
        <FlatList
          data={companyContact}
          scrollEnabled={scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Text style={styles.info_titles}>Address</Text>
              <Text style={styles.company_info}>{item.address}</Text>

              <Text style={styles.info_titles}>Number</Text>
              <Text style={styles.company_info}>{item.number}</Text>

              <Text style={styles.info_titles}>Email</Text>
              <Text style={styles.company_info}>{item.email}</Text>
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
   // margin: 15,
    backgroundColor: "ghostwhite",
    marginBottom: 100,
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
  imgContainer: {
    height: 150,
    marginTop: 40,
    borderWidth: 2,
  },
  userImg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 90,

    width: 150,
    height: 150,
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
    marginTop: 20,
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

export default CompanyProfileScreen;
