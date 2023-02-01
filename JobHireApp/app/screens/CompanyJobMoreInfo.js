import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Pressable,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState, useEffect } from "react/cjs/react.development";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../database/config";

function CompanyJobMoreInfo({ route, navigation }) {
  const { item } = route.params;

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

  useEffect(() => {
    getData();
  }, []);

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

        <Text style={styles.titleNav}> {item.id}</Text>

        <Text style={styles.blank}></Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.outerContainerTop}>
          <View style={styles.innerContainerTop}>
            <TouchableOpacity
              style={styles.companyImageContainer}
              onPress={() => navigation.navigate("JobScreen")}
            >
              <Image
                style={styles.companyImage}
                source={require("../assets/Profile.png")}
              />
            </TouchableOpacity>
            <Text style={styles.companyName}>{item.company}</Text>
            <Text style={styles.companyLocation}>Location</Text>
          </View>
        </View>

        <View style={styles.innerContainerBottom}>
          <Text style={styles.heading}>Job title</Text>
          <Text style={styles.info}> {item.id}</Text>

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
              onPress={() =>
                navigation.navigate("CompanyEditJobScreen", { item: item })
              }
            >
              Edit
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
    backgroundColor: "white",
    alignSelf: "center",
  },
  outerContainerTop: {
    backgroundColor: "white",
    borderBottomColor: "navy",
    borderBottomWidth: 2,
  },

  companyImageContainer: {
    borderRadius: 100,
    borderWidth: 3,
    padding: 40,
    marginTop: 20,
    borderColor: "navy",
  },
  companyImage: {
    width: 100,
    height: 100,
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

export default CompanyJobMoreInfo;
