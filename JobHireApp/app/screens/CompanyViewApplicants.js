import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as React from "react";
import {
  useState,
  useEffect,
  useLayoutEffect,
} from "react/cjs/react.development";
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

function CompanyViewApplicants({ route, navigation }) {
  const { item } = route.params;
  const [Applicants, setApplicants] = useState([]);
  const [ApplicantData, setApplicantData] = useState([]);

  //Used store username read from async storage
  const [username, setUsername] = useState("");

  const [profilePic, setProfilePic] = useState("");

  function getImageFromStorage() {
    console.log("called");
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

  function readApplicantData() {
    getData();

    let info = [];
    let test = [];
    console.log("Before loop");
    console.log(ApplicantData);
    for (var i = 0; i < item.Applicants.length; i++) {
      getDocs(
        query(
          collection(db, "Jobseekers"),
          where("username", "==", item.Applicants[i])
        )
      ).then((docSnap) => {
        docSnap.forEach((doc) => {
          const {
            city,
            email,
            firstName,
            lastName,
            number,
            username,
            jobTitle,
            imageURL,
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
            imageURL,
          });
        });

        setApplicantData(info);
      });
    }
    console.log("Outsude if loop");
    console.log(ApplicantData);
    console.log(username);
  }

  function createTextChannel(user) {
    console.log("Create channel with: " + user + " by: " + username);
    // client-side you initialize the Chat client with your API key
    const client = StreamChat.getInstance("83shajg3euaq", {
      timeout: 6000,
    });
    //Write User to stream chat api to allow for messaging
    const chanName = username + "_" + user;
    const channel = client.channel("messaging", chanName.toString(), {
      name: chanName.toString(),
      members: [username.toString(), user.toString()],
    });

    // fetch the channel state, subscribe to future updates
    const state = channel.watch();

    navigation.navigate("CompanyMessageScreen", { channel: channel });
  }

  //With one use effect, the applicants display for a second then disappears
  useEffect(readApplicantData, []);
  useEffect(readApplicantData, []);
  useEffect(() => getImageFromStorage());

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.backButton}>
          <Text
            style={styles.backText}
            onPress={() =>
              navigation.navigate("CompanyHome", { cUsername: username })
            }
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.titleNav}>{item.id}</Text>

        <Text style={styles.blank}></Text>
      </View>
      <ScrollView style={styles.mainContainer}>
        {ApplicantData.map((data) => {
          return (
            <View style={styles.innerContainer}>
              <View style={styles.infoContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.companyImage}
                    source={{ uri: data.imageURL }}
                  />
                </View>
                <View style={styles.innerInfoContainer}>
                  <Text style={styles.applicantName}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text style={styles.applicantEmail}>{data.email}</Text>
                  <Text style={styles.applicantEmail}>{data.city}</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonViewApplicants}
                  onPress={() => createTextChannel(data.username.toString())}
                >
                  <Text style={styles.buttonText}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonViewApplicants}
                  onPress={() =>
                    navigation.navigate("CompanyViewApplicantProfile", {
                      item: data.username,
                    })
                  }
                  //CompanyViewApplicantProfile
                >
                  <Text style={styles.buttonText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

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
    backgroundColor: "white",
  },
  innerContainer: {
    backgroundColor: "#ECE7E0",
    borderColor: "black",
    marginTop: 15,
    padding: 2,
    borderWidth: 3,
    borderRadius: 30,
    marginHorizontal: "5%",
  },
  infoContainer: {
    flexDirection: "row",
  },
  innerInfoContainer: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  applicantName: {
    fontSize: 25,
    fontWeight: "500",
  },
  applicantEmail: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "300",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
  },
  buttonViewApplicants: {
    padding: 10,
    backgroundColor: "navy",
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  imageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  companyImage: {
    width: 110,
    height: 110,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "black",
  },
  nav: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
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
  titleNav: {
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "navy",
    fontWeight: "bold",
    fontSize: 25,
    flex: 0.7,
  },
  blank: {
    flex: 0.2,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: "20%",
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
});

export default CompanyViewApplicants;

/*
//Read applicants on selected job
  function readApplicantsOnAdvert() {
    //Read  data from job adverts database where username(Gotten from login) equals company in adverts
    getDocs(
      query(collection(db, "Adverts"), where("title", "==", item.id))
    ).then((docSnap) => {
      let applicantsForAd = [];

      docSnap.forEach((doc) => {
        applicantsForAd.push({ ...doc.data(), id: doc.id });
      });
      setApplicants(applicantsForAd[0].Applicants);
      console.log(applicantsForAd[0].Applicants);
      console.log(Applicants);
    });

  }

*/
