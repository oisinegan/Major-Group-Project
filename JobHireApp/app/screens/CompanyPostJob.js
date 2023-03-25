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
import { useState, useEffect } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ceil } from "react-native-reanimated";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CompanyPostJob({ navigation }) {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [wage, setWage] = useState("");
  const [type, setType] = useState("");

  //new text input for show job details screen
  const [location, setLocation] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [applicants, setApplicants] = useState(["blank"]);

  //Used store username read from async storage
  const [username, setUsername] = useState("");

  const [profilePic, setProfilePic] = useState("");

  function getImageFromStorage() {
    getData();
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
        console.log("ASYNC: " + username);
      }
    } catch (e) {
      // error reading value
    }
  };

  function create() {
    getData();
    getImageFromStorage();
    setDoc(doc(db, "Adverts", title), {
      title: title.trim(),
      info: info.trim(),
      wage: wage.trim(),
      type: type.trim(),
      company: username.trim(),
      location: location.trim(),
      fullDescription: fullDescription.trim(),
      schedule: schedule.trim(),
      experience: experience.trim(),
      qualification: qualification.trim(),
      knowledge: knowledge.trim(),
      Applicants: applicants,
    })
      .then(() => {
        //Successfully written to database
        Alert.alert("Sucess", "Data Submitted", [
          { text: "OK", onPress: () => navigation.navigate("CompanyHome") },
        ]);
      })
      .catch((error) => {
        //failed
        Alert.alert("ERROR", "Data not submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  }

  useEffect(() => getImageFromStorage());
  ///////////////////////////////////////////////////////////////////////////////////
  const [isSelected, setSelection] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Job form</Text>
        <View style={styles.infoContent}>
          <Text style={styles.headings}>General Information</Text>
          <TextInput
            value={title}
            onChangeText={(title) => setTitle(title)}
            placeholder="Job/Project title"
            style={styles.inputs}
          ></TextInput>

          <TextInput
            value={info}
            onChangeText={(info) => setInfo(info)}
            placeholder="3 lines about the job summary"
            style={styles.inputs}
          ></TextInput>

          <TextInput
            value={wage}
            onChangeText={(wage) => setWage(wage)}
            placeholder="Wage"
            style={styles.inputs}
          ></TextInput>

          <TextInput
            value={type}
            onChangeText={(type) => setType(type)}
            placeholder="Type of work (Job/Project etc..)"
            style={styles.inputs}
          ></TextInput>

          <TextInput
            value={fullDescription}
            onChangeText={(fullDescription) =>
              setFullDescription(fullDescription)
            }
            placeholder="Full Job description"
            style={styles.inputs}
          ></TextInput>

          <TextInput
            value={location}
            onChangeText={(location) => setLocation(location)}
            placeholder="Location"
            style={styles.inputs}
          ></TextInput>

          <Text style={styles.headings}>Work Requirements</Text>
          <TextInput
            value={schedule}
            onChangeText={(schedule) => setSchedule(schedule)}
            placeholder="Work schedule"
            style={styles.inputs}
          ></TextInput>

          <TextInput
            value={experience}
            onChangeText={(experience) => setExperience(experience)}
            placeholder="Minimum experience required"
            style={styles.inputs}
          ></TextInput>

          <TextInput
            value={qualification}
            onChangeText={(qualification) => setQualification(qualification)}
            placeholder="Required qualifications"
            style={styles.inputs}
          ></TextInput>

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
            style={{ width: 35, height: 35 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyPostJob")}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/PostJob.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyMessages")}
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyProfileScreen")}
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
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  title: {
    margin: 5,
    fontSize: 20,
    textDecorationLine: "underline",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  headings: {
    opacity: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 30,
    color: "navy",
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
  inputs: {
    borderWidth: 1,
    borderColor: "navy",
    padding: 15,
    width: "82.5%",
    marginBottom: 20,
    borderRadius: 50,
    marginLeft: 30,
    opacity: 1,
  },
  button: {
    backgroundColor: "navy",
    padding: 15,
    width: 200,
    alignSelf: "center",
    borderRadius: 50,
    marginBottom: 80,
    opacity: 0.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CompanyPostJob;
