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

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CompanyProfileScreen({ navigation }) {
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [companyInfo, setCompanyInfo] = useState([]);
  const [companyAbout, setCompanyAbout] = useState([]);
  const [companyContact, setCompanyContact] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [profilePic, setProfilePic] = useState(".");

  function getImageFromStorage() {
    //Gets firebase storage info
    const storage = getStorage();
    getDownloadURL(ref(storage, "Company/" + username))
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
        <Text style={styles.company_username}>Welcome, {username}.</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("CompanyEditProfile", { item: username })
          }
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.userImg} source={{ uri: profilePic }} />
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
          onPress={() =>
            navigation.navigate("CompanyHome", { cUsername: username })
          }
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() =>
            navigation.navigate("CompanyPostJob", { cUsername: username })
          }
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/PostJob.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() =>
            navigation.navigate("CompanyMessages", { cUsername: username })
          }
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() =>
            navigation.navigate("CompanyProfileScreen", { cUsername: username })
          }
        >
          <Image
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "black",
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
    marginBottom: 80,
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
    width: "100%",
    borderTopColor: "black",
    borderTopWidth: 2,
  },
  navButtons: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  imgContainer: {
    height: 155,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 100,
  },
  userImg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 90,
    borderRadius: 100,
    width: 150,
    height: 150,
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

export default CompanyProfileScreen;
