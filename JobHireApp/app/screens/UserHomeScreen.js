import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
  FlatList,
  SafeAreaView,
  Touchable,
  StatusBar,
  RefreshControl,
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState, useEffect } from "react/cjs/react.development";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  arrayUnion,
  where,
  or,
} from "firebase/firestore";
import { db } from "../database/config";
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

// client-side you initialize the Chat client with your API key
const client = StreamChat.getInstance("hwbnu4agqppp", {
  timeout: 6000,
});

function UserHomeScreen({ navigation }) {
  const [AdvertsUser, setAdvertsUser] = useState([]);
  const [numberJobs, setNumberJobs] = useState([]);
  const [searchParam, setSearchParam] = useState([]);

  //Used store username read from async storage
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    searchJobs();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(searchJobs, []);
  useEffect(() => addImageURLtoFireStore());

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

  //addImageURLtoFireStore
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

  //ADD image url to user firestore
  function addImageURLtoFireStore() {
    var isUrlReady = false;
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
    console.log("called");
    console.log(username);
    console.log(profilePic);
    setDoc(
      doc(db, "Jobseekers", username),
      {
        imageURL: profilePic,
      },
      { merge: true }
    )
      .then(() => {
        console.log("IMAGE ADDED TO USER JOBSEEKER STORAGE!");
      })
      .catch((error) => {
        //failed
        console.log("ERROR adding image url to firestore!");
      });
  }

  function readAllJobs() {
    //Read all data from job adverts database
    getDocs(collection(db, "Adverts")).then((docSnap) => {
      let advert = [];
      let numJobs = 0;
      docSnap.forEach((doc) => {
        const { title, info, wage, type } = doc.data();
        advert.push({ ...doc.data(), id: doc.id, title, info, wage, type });
        numJobs += 1;
      });
      setNumberJobs(numJobs);
      setAdvertsUser(advert);

      //Call method to read username from async storage
      getData();
    });
  }

  //Search job titles, if none found search company names
  function searchJobs() {
    addImageURLtoFireStore();
    if (searchParam.toString() === "") {
      readAllJobs();
    } else {
      setAdvertsUser([]);
      //Read  data from job adverts database where title = search parameter
      getDocs(
        query(
          collection(db, "Adverts"),
          or(
            where("title", "==", searchParam.trim()),
            where("company", "==", searchParam.trim())
          )
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

        setAdvertsUser(advert);

        if (numberJobs === 0) {
          searchCompany();
        }
      });
    }
  }
  function searchCompany() {
    getDocs(
      query(
        collection(db, "Adverts"),
        where("company", "==", searchParam.trim())
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
      setAdvertsUser(advert);
    });
  }

  async function writeUserToJobAdvertDB(item) {
    const advertDocumentRef = doc(db, "Adverts", item.id);

    await updateDoc(advertDocumentRef, {
      Applicants: arrayUnion(username),
    });
  }

  const flatListHeader = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.userNameStyle}>Hello {username}</Text>
        <Text style={styles.mainTitle}>Total results: {numberJobs} </Text>
        <Text style={styles.mainTitle}>Pull down to refresh page! </Text>
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
            data={AdvertsUser}
            renderItem={({ item }) => (
              <View style={styles.innerContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UserViewCompanyProfile", {
                      item: item.company,
                    })
                  }
                >
                  <Text style={styles.companyName}>{item.company}</Text>
                </TouchableOpacity>
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
      </View>
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
  flatlistContainer: {
    paddingHorizontal: "4%",
  },
  mainContainer: {
    backgroundColor: "#FCFCFF",
    paddingBottom: 135,
  },
  innerContainer: {
    backgroundColor: "#ECE7E0",
    borderColor: "#E1DEE9",
    marginTop: 15,
    padding: 2,
    borderWidth: 3,
    borderRadius: 30,
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
    padding: 10,
  },
  button: {
    backgroundColor: "midnightblue",
    padding: 15,
    borderRadius: 50,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});
export default UserHomeScreen;
