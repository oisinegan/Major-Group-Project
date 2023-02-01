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

function CompanyViewApplicants({ route, navigation }) {
  const { item } = route.params;
  const [Applicants, setApplicants] = useState([]);

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
      console.log(Applicants);
    });
  }

  useEffect(() => readApplicantsOnAdvert(), []);

  //Company home -> more info and view applicants
  // regardless of number of applicants redirect to companyViewApplicants and display msg

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.backButton}>
          <Text
            style={styles.backText}
            onPress={() => navigation.navigate("CompanyHome")}
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.titleNav}>{item.id}</Text>

        <Text style={styles.blank}></Text>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={Applicants}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <View style={styles.infoContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.companyImage}
                    source={require("../assets/Profile.png")}
                  />
                </View>
                <View style={styles.innerInfoContainer}>
                  <Text style={styles.applicantName}>{item}</Text>
                  <Text style={styles.applicantEmail}>Email@email.com</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonViewApplicants}
                  onPress={() => console.log("View Applicant: " + item)}
                >
                  <Text style={styles.buttonText}>View Profile</Text>
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
          onPress={() => navigation.navigate("UserNotification")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Noti.png")}
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
    backgroundColor: "white",

    padding: 0,
  },
  innerContainer: {
    backgroundColor: "#ECE7E0",
    borderColor: "#E1DEE9",
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
    padding: 20,
  },
  companyImage: {
    width: 60,
    height: 60,
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
});

export default CompanyViewApplicants;
