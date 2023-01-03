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
} from "react-native";
import * as React from "react";

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

/******** FIX: Company post 1 click = writes all info to database but company field = "",
 * On 2nd click it then reads in company field from async storage from sets company field in db.
 * (Obvisously should be done on first click) *********/

function CompanyHomeScreen({ navigation }) {
  const [AdvertsCompany, setAdvertsCompany] = useState([]);
  const [Applicants, setApplicants] = useState([]);

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

  //Read logged in Company job posts
  function readCompanyAdverts() {
    //Call method to read username from async storage
    getData();
    //Read  data from job adverts database where username(Gotten from login) equals company in adverts
    getDocs(
      query(collection(db, "Adverts"), where("company", "==", username))
    ).then((docSnap) => {
      let advert = [];

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
      });
      setAdvertsCompany(advert);
    });
  }

  //Read applicants on selected job
  function readApplicantsOnAdvert(item) {
    //Read  data from job adverts database where username(Gotten from login) equals company in adverts
    getDocs(
      query(collection(db, "Adverts"), where("title", "==", item.id))
    ).then((docSnap) => {
      let applicantsForAd = [];

      docSnap.forEach((doc) => {
        applicantsForAd.push({ ...doc.data(), id: doc.id });
      });
      setApplicants(applicantsForAd[0].Applicants);
    });

    setModalVisible(true);
  }

  useEffect(() => readCompanyAdverts(), [username]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Button
        title="Log out"
        onPress={() => navigation.navigate("HomeNotLoggedIn")}
      />
      <Text style={styles.userNameStyle}>hello {username}</Text>

      <Text style={styles.mainTitle}>Your Active Job posts</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
          </View>
        </View>
      </Modal>

      <View style={styles.flatlistContainer}>
        <FlatList
          data={AdvertsCompany}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.companyName}>Posted by: {item.company}</Text>
              <Text style={styles.info}>{item.info}</Text>
              <Text style={styles.wage}>${item.wage}</Text>
              <Text style={styles.type}>Type: {item.type}</Text>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => readApplicantsOnAdvert(item)}
              >
                <Text style={styles.textStyle}>View Applicants</Text>
              </Pressable>
              <Button
                title="More info"
                onPress={() =>
                  navigation.navigate("CompanyJobMoreInfo", { item: item })
                }
              />
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
  outerContainer: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    padding: 0,
  },
  mainTitle: {
    color: "navy",
    fontSize: 25,
    textDecorationLine: "underline",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 5,
  },
  userNameStyle: {
    color: "navy",
    fontSize: 25,
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 5,
  },
  innerContainer: {
    backgroundColor: "lightyellow",
    borderTopColor: "snow",
    borderTopWidth: 15,
    borderColor: "snow",
  },
  flatlistContainer: {
    backgroundColor: "#F1F1F1",
    borderBottomWidth: 210,
  },
  textContainer: {
    padding: 20,
  },
  text: {
    color: "black",
    fontSize: 15,
  },
  buttons: {
    backgroundColor: "lightyellow",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
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
  },
  navButtons: {
    margin: 20,
  },
  companyName: {
    color: "blue",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontStyle: "bold",
  },
  title: {
    color: "white",
    backgroundColor: "navy",
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  info: {
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontStyle: "italic",
  },
  wage: {
    textAlign: "right",
    paddingRight: 5,
    fontWeight: "bold",
  },
  type: {
    textAlign: "right",
    paddingRight: 5,
    paddingBottom: 5,
    textDecorationLine: "underline",
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
