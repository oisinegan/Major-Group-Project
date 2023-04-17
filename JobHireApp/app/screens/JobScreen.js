import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//Database imports
import { useState, useEffect } from "react/cjs/react.development";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../database/config";

function JobScreen({ route, navigation }) {
  const { item } = route.params;

  //Used store username read from async storage
  const [username, setUsername] = useState("");

  const [profilePic, setProfilePic] = useState("");

  function getImageFromStorage() {
    //Gets firebase storage info
    const storage = getStorage();
    getDownloadURL(ref(storage, "Company/" + item.company))
      .then((url) => {
        console.log("test");
        console.log(url);
        setProfilePic(url);
      })
      .then(() => {
        console.log("IMAGE SUCCESSFULLY LOADED");
      })
      .catch(() => {
        console.log(username);
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

  useEffect(() => {
    console.log(item.company);
    getData();
    getImageFromStorage();
  }, []);

  async function writeUserToJobAdvertDB(item) {
    const advertDocumentRef = doc(db, "Adverts", item.id);

    await updateDoc(advertDocumentRef, {
      Applicants: arrayUnion(username),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.titleNav}> {item.title}</Text>

        <Text style={styles.blank}></Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.outerContainerTop}>
          <View style={styles.innerContainerTop}>
            <View style={styles.imgContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserViewCompanyProfile", {
                    item: item.company,
                  })
                }
              >
                <Image
                  style={styles.companyImage}
                  source={{ uri: profilePic }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserViewCompanyProfile", {
                  item: item.company,
                })
              }
            >
              <Text style={styles.companyName}>{item.company}</Text>
            </TouchableOpacity>
            <Text style={styles.companyLocation}>Location</Text>
          </View>
        </View>

        <View style={styles.innerContainerBottom}>
          <Text style={styles.heading}>Job title</Text>
          <Text style={styles.info}> {item.title}</Text>

          <Text style={styles.heading}>Full Job description</Text>
          <Text style={styles.info}> {item.fullDescription}</Text>

          <Text style={styles.heading}>Job type</Text>
          <Text style={styles.info}> {item.type}</Text>

          <Text style={styles.heading}>Minimum experience</Text>
          <Text style={styles.info}> {item.experience}</Text>

          <Text style={styles.heading}>Minimum qualification</Text>
          <Text style={styles.info}>{item.qualification}</Text>

          <Text style={styles.heading}>Required knowledge</Text>
          <Text style={styles.info}>{item.knowledge}</Text>

          <Text style={styles.heading}>Work schedule</Text>
          <Text style={styles.info}>{item.schedule}</Text>

          <Text style={styles.heading}>Wage</Text>
          <Text style={styles.info}>{item.wage}</Text>

          <TouchableOpacity style={styles.applyButton}>
            <Text
              style={styles.applyText}
              onPress={() => {
                Alert.alert("Application Successful!", "GOOD LUCK!", [
                  {
                    text: "Thank you!",
                    onPress: () => writeUserToJobAdvertDB(item),
                  },
                ]);
              }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  nav: {
    backgroundColor: "white",
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
  innerContainerTop: {
    flexDirection: "column",
  },
  outerContainerTop: {
    backgroundColor: "white",
    borderBottomColor: "navy",
    borderBottomWidth: 2,
  },

  companyImage: {
    borderRadius: 50,
    height: 140,
    width: 150,
    marginVertical: 20,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
  },

  companyName: {
    fontSize: 35,
    fontWeight: "bold",
    color: "navy",
    alignSelf: "center",
    paddingTop: 5,
  },
  companyLocation: {
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "400",
    color: "black",
    alignSelf: "center",
  },
  innerContainerBottom: {
    flex: 1,
    backgroundColor: "white",
  },

  heading: {
    fontSize: 25,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 20,
    color: "navy",
  },
  info: {
    fontSize: 20,
    marginLeft: 40,
    marginTop: 10,
    fontWeight: "400",
  },
  applyButton: {
    padding: 10,
    backgroundColor: "navy",
    width: "30%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 50,
  },
  applyText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default JobScreen;
