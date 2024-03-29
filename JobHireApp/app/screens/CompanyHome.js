import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
  FlatList,
  SafeAreaView,
  Touchable,
  Modal,
  StatusBar,
  RefreshControl,
} from "react-native";
import * as React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState, useEffect } from "react/cjs/react.development";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../database/config";
import { useReducer } from "react";
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  StreamChat,
} from "stream-chat";

// client-side you initialize the Chat client with your API key
const client = StreamChat.getInstance("anvgamycbbnt", {
  timeout: 6000,
});

import {} from "react-native";
function CompanyHomeScreen({ route, navigation }) {
  const { cUsername } = route.params;

  const [AdvertsCompany, setAdvertsCompany] = useState([]);
  const [Applicants, setApplicants] = useState([]);
  const [numberJobs, setNumberJobs] = useState([]);
  const [searchParam, setSearchParam] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  //Model
  const [modalVisible, setModalVisible] = useState(false);

  //Used store username read from async storage
  const [username, setUsername] = useState("");

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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    searchJobs();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => searchJobs(), [username]);
  useEffect(() => addImageURLtoFireStore());

  //Read logged in Company job posts
  async function readCompanyAdverts() {
    console.log("3");
    //Read  data from job adverts database where username(Gotten from login) equals company in adverts
    getDocs(
      query(collection(db, "Adverts"), where("company", "==", cUsername))
    ).then((docSnap) => {
      let advert = [];
      let numJobs = 0;

      docSnap.forEach((doc) => {
        const { title, info, wage, type, Applicants } = doc.data();
        advert.push({
          ...doc.data(),
          id: doc.id,
          title,
          info,
          wage,
          type,
          Applicants,
        });
        numJobs += 1;
      });
      console.log(4);
      setNumberJobs(numJobs);
      setAdvertsCompany(advert);
    });
    //("Username2=" + username);
  }
  async function updateStreamChatImage() {
    const user = client.user;

    console.log(user);

    const update = {
      id: user.id,
      set: {
        image: profilePic,
      },
    };

    await client.partialUpdateUser(update);
  }

  //ADD image url to user firestore
  function addImageURLtoFireStore() {
    getData();
    var isUrlReady = false;
    //Gets firebase storage info
    const storage = getStorage();
    getDownloadURL(ref(storage, "Company/" + username))
      .then((url) => {
        setProfilePic(url);
      })
      .then(() => {
        isUrlReady = true;
        writeURLtoFireStore();
        updateStreamChatImage();
      })
      .catch((e) => {
        console.log("IMAGE NOT FOUND");
        console.log(e);
      });
  }

  function writeURLtoFireStore() {
    setDoc(
      doc(db, "Company", username),
      {
        imageURL: profilePic,
      },
      { merge: true }
    )
      .then(() => {})
      .catch((error) => {
        //failed
        console.log("ERROR adding image url to firestore!");
      });
  }

  //Search job titles, if none found search company names
  function searchJobs() {
    console.log("1");
    console.log(username);
    if (searchParam.toString() === "") {
      readCompanyAdverts();
      console.log("2");
    } else {
      console.log("-2");
      setAdvertsCompany([]);
      //Read  data from job adverts database where title = search parameter
      getDocs(
        query(
          collection(db, "Adverts"),
          where("title", "==", searchParam.trim())
        )
      ).then((docSnap) => {
        let advert = [];
        let numJobs = 0;
        docSnap.forEach((doc) => {
          const { title, info, wage, type } = doc.data();
          advert.push({ ...doc.data(), id: doc.id, title, info, wage, type });
          numJobs += 1;
        });

        setNumberJobs(numJobs);

        setAdvertsCompany(advert);
      });
    }
  }

  const flatListHeader = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.userNameStyle}>Hello {username}</Text>
        <Text style={styles.mainTitle}>Total results: {numberJobs} </Text>
        {/* <Text style={styles.mainTitle}>Pull down to refresh page! </Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.topNav}>
        <View style={styles.seachBarContainer}>
          <TextInput
            value={searchParam}
            onChangeText={(searchParam) => setSearchParam(searchParam)}
            style={styles.seachBar}
            placeholder="Search Jobs"
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.buttonTopNav} onPress={searchJobs}>
          <Text style={styles.buttonTopNavText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.flatlistContainer}>
          <FlatList
            ListHeaderComponent={flatListHeader}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={AdvertsCompany}
            renderItem={({ item }) => (
              <View style={styles.innerContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.companyName}>{item.company}</Text>
                <Text style={styles.info}>{item.info}</Text>
                <Text style={styles.wage}>${item.wage}</Text>
                <Text style={styles.type}>Type: {item.type}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.buttonViewApplicants}
                    onPress={() =>
                      navigation.navigate("CompanyViewApplicants", {
                        item: item,
                        cUsername: cUsername,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>View Applicants</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonInfo}
                    onPress={() =>
                      navigation.navigate("CompanyJobMoreInfo", { item: item })
                    }
                  >
                    <Text style={styles.buttonText}>More info</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
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
  outerContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 0,
  },

  topNav: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    padding: 10,
  },
  seachBarContainer: {
    width: "75%",
    alignSelf: "center",
  },
  seachBar: {
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
    verticalAlign: "center",
    placeholder: "Search bar",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "midnightblue",
    backgroundColor: "white",
    padding: 10,
  },
  buttonTopNav: {
    backgroundColor: "midnightblue",
    padding: 10,
    borderRadius: 50,
    marginLeft: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTopNavText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  mainTitle: {
    color: "grey",
    fontSize: 15,
    paddingLeft: "5%",
    fontWeight: "400",
  },
  userNameStyle: {
    color: "midnightblue",
    fontWeight: "bold",
    padding: "5%",
    fontSize: "30%",
  },
  mainContainer: {
    backgroundColor: "#FCFCFF",
    paddingBottom: 120,
  },
  innerContainer: {
    backgroundColor: "#ECE7E0",
    borderColor: "#E1DEE9",
    marginTop: 15,
    padding: 2,
    borderWidth: 3,
    borderRadius: 30,
  },
  flatlistContainer: {
    paddingHorizontal: "4%",
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
    padding: 10,
  },

  buttonViewApplicants: {
    backgroundColor: "midnightblue",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 10,
  },
  buttonInfo: {
    backgroundColor: "midnightblue",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
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
  },

  //MODEL DESIGN
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "salmon",
  },
  buttonOpenCustom: {
    marginTop: 50,
    padding: 15,
    backgroundColor: "salmon",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default CompanyHomeScreen;

/*
<View style={styles.container}>
              {Applicants.map((Applicant) => {
                return (
                  <View>
                    <Text style={styles.modalText}>{Applicant}</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => console.log("Applicant: " + Applicant)}
                    >
                      <Text style={styles.textStyle}>View Profile</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
            <Pressable
              style={[styles.button, styles.buttonOpenCustom]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            */
