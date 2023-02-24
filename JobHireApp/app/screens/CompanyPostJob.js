import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Menu,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as React from "react";
//Database imports
import { useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CompanyPostJob({ navigation }) {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [wage, setWage] = useState("");
  const [type, setType] = useState("");

  //new text input for show job details screen
  const [fullDescription, setFullDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [knowledge, setKnowledge] = useState("");

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
        console.log("ASYNC: " + username);
      }
    } catch (e) {
      // error reading value
    }
  };

  function create() {
    getData();
    setDoc(doc(db, "Adverts", title), {
      title: title,
      info: info,
      wage: wage,
      type: type,
      company: username,
      fullDescription: fullDescription,
      schedule: schedule,
      experience: experience,
      qualification: qualification,
      knowledge: knowledge,
    })
      .then(() => {
        //Successfully written to database
        Alert.alert("Sucess", "Data Submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((error) => {
        //failed
        Alert.alert("ERROR", "Data not submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////
  const [isSelected, setSelection] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Job form</Text>
        <View style={styles.infoContent}>
          <Text style={styles.heading_2}>Title</Text>
          <TextInput
            value={title}
            onChangeText={(title) => setTitle(title)}
            placeholder="Job/Project title"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.heading_2}>Job info</Text>
          <TextInput
            value={info}
            onChangeText={(info) => setInfo(info)}
            placeholder="3 lines about the job summary"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.heading_2}>Wage</Text>
          <TextInput
            value={wage}
            onChangeText={(wage) => setWage(wage)}
            placeholder="Wage"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.heading_2}>Work type</Text>
          <TextInput
            value={type}
            onChangeText={(type) => setType(type)}
            placeholder="Type of work (Job/Project etc..)"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.heading_2}>Job description</Text>
          <TextInput
            value={fullDescription}
            onChangeText={(fullDescription) =>
              setFullDescription(fullDescription)
            }
            placeholder="Full Job description"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.heading_2}>Schedule</Text>
          <TextInput
            value={schedule}
            onChangeText={(schedule) => setSchedule(schedule)}
            placeholder="Work schedule"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.heading_2}>Experience</Text>
          <TextInput
            value={experience}
            onChangeText={(experience) => setExperience(experience)}
            placeholder="Minimum experience required"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.heading_2}>Qualification</Text>
          <TextInput
            value={qualification}
            onChangeText={(qualification) => setQualification(qualification)}
            placeholder="Required qualifications"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.heading_2}>knowledge</Text>
          <TextInput
            value={knowledge}
            onChangeText={(knowledge) => setKnowledge(knowledge)}
            placeholder="Required knowledge"
            style={styles.inputs}
          ></TextInput>

          <TouchableOpacity onPress={create} style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  title: {
    margin: 5,
    fontSize: 30,
    fontWeight: "600",
    marginTop: 50,
    textAlign: "center",
  },
  heading_1: {
    opacity: 0.5,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  heading_2: {
    opacity: 0.5,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: 10,
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
  },
  navButtons: {
    margin: 20,
  },

  infoContent: {
    flex: 2,
    marginTop: -10,
  },
  requirementContent: {
    flex: 3,
    marginTop: -10,
  },
  inputs: {
    marginLeft: 10,
    borderColor: "gray",
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
    fontSize: 15,
    width: 385,

    height: 45,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "navy",
    borderRadius: 10,
    marginTop: 35,
    width: 130,
    height: 40,
    borderWidth: 1,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 6,
  },
});

export default CompanyPostJob;
