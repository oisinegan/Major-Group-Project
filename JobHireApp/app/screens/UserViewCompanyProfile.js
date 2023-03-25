import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../database/config";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react/cjs/react.development";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UserViewCompanyProfile({ route, navigation }) {
  const { item } = route.params;
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [jobseekerUserName, setJobseekerUserName] = useState("");
  const [companyInfo, setCompanyInfo] = useState([]);
  const [companyAbout, setCompanyAbout] = useState([]);
  const [companyContact, setCompanyContact] = useState([]);
  const [numberJobs, setNumberJobs] = useState([]);
  const [AdvertsCompany, setAdvertsCompany] = useState([]);
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
    setAdvertsCompany([]);

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
    setAdvertsCompany([]);
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

  function getCompanyJobs() {
    setActiveTab(3);
    console.log("Username1=" + username);

    setCompanyAbout([]);
    setCompanyContact([]);
    //Read  data from job adverts database where username(Gotten from login) equals company in adverts
    getDocs(
      query(collection(db, "Adverts"), where("company", "==", username))
    ).then((docSnap) => {
      let advert = [];
      let numJobs = 0;

      docSnap.forEach((doc) => {
        const { title, info, wage, type } = doc.data();
        advert.push({
          ...doc.data(),
          id: doc.id,
          title,
          info,
          wage,
          type,
        });
        numJobs += 1;
      });
      setNumberJobs(numJobs);
      setAdvertsCompany(advert);
    });
    console.log("Username2=" + username);
  }

  async function writeUserToJobAdvertDB(item) {
    const advertDocumentRef = doc(db, "Adverts", item.id);

    await updateDoc(advertDocumentRef, {
      Applicants: arrayUnion(jobseekerUserName),
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
        setJobseekerUserName(usernameFromAsyncStorage);
      }
    } catch (e) {
      // error reading value
    }
    setUsername(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nameComp}>
          <Text style={styles.nameCompText}>{username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.userImg} source={{ uri: profilePic }} />
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

        <TouchableOpacity
          style={[styles.tab, activeTab === 3 && styles.activeButton]}
          onPress={() => getCompanyJobs()}
        >
          <Text style={styles.tabText}>View Jobs</Text>
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

        <FlatList
          showsVerticalScrollIndicator={false}
          data={AdvertsCompany}
          renderItem={({ item }) => (
            <View style={styles.innerContainerJobs}>
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
    width: "100%",
    backgroundColor: "ghostwhite",
    marginBottom: 80,
  },
  nav: {
    backgroundColor: "ghostwhite",
    width: "100%",
    flexDirection: "row",
    padding: 0,
  },
  backButton: {
    alignSelf: "left",
    padding: 10,
    flex: 0.17,
  },
  backText: {
    color: "navy",
    textAlign: "center",
    fontSize: 20,
  },
  nameComp: {
    paddingHorizontal: 10,
    flex: 0.83,
  },
  nameCompText: {
    color: "navy",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 35,
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
    width: "100%",
  },
  navButtons: {
    margin: 20,
  },
  imgContainer: {
    height: 155,
    marginVertical: 15,
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
  innerContainerJobs: {
    backgroundColor: "#ECE7E0",
    borderColor: "#E1DEE9",
    marginTop: 15,
    padding: 2,
    borderWidth: 3,
    borderRadius: 30,
    marginHorizontal: 15,
  },

  companyName: {
    color: "midnightblue",
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
  },
  button: {
    backgroundColor: "midnightblue",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 10,
  },
  buttonApply: {
    backgroundColor: "midnightblue",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "center",
    alignSelf: "center",
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
  },
});

export default UserViewCompanyProfile;
