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
import { ceil, exp } from "react-native-reanimated";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CompanyPostJob({ route, navigation }) {
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

  //errors
  const [titleErr, setTitleErr] = useState(" ");
  const [infoErr, setInfoErr] = useState(" ");
  const [wageErr, setWageErr] = useState(" ");
  const [typeErr, setTypeErr] = useState(" ");
  const [companyErr, setCompanyErr] = useState(" ");
  const [locationErr, setLocationErr] = useState(" ");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [scheduleErr, setScheduleErr] = useState("");
  const [experienceErr, setExperienceErr] = useState("");
  const [qualificationErr, setQualificationErr] = useState("");
  const [knowledgeErr, setKnowledgeErr] = useState("");

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

  async function jobCreate() {
    var isFormCorrect = false;
    var noInputs = 10;
    var noCorrectInputs = 0;

    var errorMsg = "";

    //Title
    if (title == "") {
      setTitleErr("Title field is empty");
    } else if (title.length < 4) {
      setTitleErr("Title cannot be less than 4 characters!");
    } else {
      noCorrectInputs++;
      setTitleErr("");
    }

    //Info
    if (info == "") {
      setInfoErr("Information field is empty");
    } else if (info.length < 10) {
      setInfoErr("Provide more information!");
    } else if (info.length > 120) {
      setInfoErr("Too much information! (Max 120 char)");
    } else {
      noCorrectInputs++;
      setInfoErr("");
    }

    //Wage
    if (wage == "") {
      setWageErr("Wage field is empty!");
    } else if (wage.length < 2) {
      setWageErr("Wage must be longer than 2 character!");
    } else {
      noCorrectInputs++;
      setWageErr("");
    }

    //Type
    if (type == "") {
      setTypeErr("Job type field is empty!");
    } else {
      noCorrectInputs++;
      setTypeErr("");
    }

    //Location
    if (location == "") {
      setLocationErr("Location field is empty!");
    } else {
      noCorrectInputs++;
      setLocationErr("");
    }

    //Full description
    if (fullDescription == "") {
      setDescriptionErr("Description field is empty!");
    } else if (fullDescription.length < 15) {
      setDescriptionErr("Description must be longer than 15 characters!");
    } else {
      noCorrectInputs++;
      setDescriptionErr("");
    }

    //Schedule
    if (schedule == "") {
      setScheduleErr("Schedule field is empty!");
    } else if (schedule.length < 3) {
      setScheduleErr("Schedule must be longer than 3 characters!");
    } else {
      noCorrectInputs++;
      setScheduleErr("");
    }

    //experience
    if (experience == "") {
      setExperienceErr("Experience field is empty!");
    } else if (experience.length < 3) {
      setExperienceErr("Experience must be longer than 3 characters!");
    } else {
      noCorrectInputs++;
      setExperienceErr("");
    }

    //qual
    if (qualification == "") {
      setQualificationErr("Qualification field is empty!");
    } else if (qualification.length < 3) {
      setQualificationErr("Qualification must be longer than 3 characters!");
    } else {
      noCorrectInputs++;
      setQualificationErr("");
    }

    //Knowledge
    if (knowledge == "") {
      setKnowledgeErr("Knowledge field is empty!");
    } else if (knowledge.length < 5) {
      setKnowledgeErr("Knowledge must be longer than 5 characters!");
    } else {
      noCorrectInputs++;
      setKnowledgeErr("");
    }

    if (noInputs == noCorrectInputs) {
      setDoc(doc(db, "Adverts", title), {
        title: title,
        info: info,
        wage: wage,
        type: type,
        company: username,
        location: location,
        fullDescription: fullDescription,
        schedule: schedule,
        experience: experience,
        qualification: qualification,
        knowledge: knowledge,
        Applicants: applicants,
      })
        .then(() => {
          //Successfully written to database
          Alert.alert("Sucess", "Data Submitted", [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("CompanyHome", { cUsername: username }),
            },
          ]);
        })
        .catch((error) => {
          //failed
          Alert.alert("ERROR", "Data not submitted", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        });
    } else {
      Alert.alert("Job post unsucessful!", "Please try again!", [
        { text: "OK", onPress: () => console.log("error msg - OK Pressed") },
      ]);
    }
  } ////end companyCreate

  useEffect(() => getImageFromStorage());
  ///////////////////////////////////////////////////////////////////////////////////
  const [isSelected, setSelection] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <Text style={styles.title}>Job form</Text>
        <View style={styles.infoContent}>
          <Text style={styles.headings}>General Information</Text>
          <TextInput
            value={title}
            onChangeText={(title) => setTitle(title)}
            placeholder="Job/Project title"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{titleErr}</Text>
          <TextInput
            value={info}
            onChangeText={(info) => setInfo(info)}
            placeholder="3 lines about the job summary"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{infoErr}</Text>
          <TextInput
            value={wage}
            onChangeText={(wage) => setWage(wage)}
            placeholder="Wage"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{wageErr}</Text>
          <TextInput
            value={type}
            onChangeText={(type) => setType(type)}
            placeholder="Type of work (Job/Project etc..)"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{typeErr}</Text>
          <TextInput
            value={fullDescription}
            onChangeText={(fullDescription) =>
              setFullDescription(fullDescription)
            }
            placeholder="Full Job description"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{descriptionErr}</Text>
          <TextInput
            value={location}
            onChangeText={(location) => setLocation(location)}
            placeholder="Location"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{locationErr}</Text>
          <Text style={styles.headings}>Work Requirements</Text>
          <TextInput
            value={schedule}
            onChangeText={(schedule) => setSchedule(schedule)}
            placeholder="Work schedule"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{scheduleErr}</Text>
          <TextInput
            value={experience}
            onChangeText={(experience) => setExperience(experience)}
            placeholder="Minimum experience required"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{experienceErr}</Text>
          <TextInput
            value={qualification}
            onChangeText={(qualification) => setQualification(qualification)}
            placeholder="Required qualifications"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{qualificationErr}</Text>

          <TextInput
            value={knowledge}
            onChangeText={(knowledge) => setKnowledge(knowledge)}
            placeholder="Required knowledge"
            style={styles.inputs}
          ></TextInput>
          <Text style={styles.errorMsg}>{knowledgeErr}</Text>

          <TouchableOpacity onPress={jobCreate} style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  title: {
    margin: 5,
    fontSize: 30,
    fontWeight: "600",
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
  errorMsg: {
    color: "red",
    paddingLeft: 40,
    marginBottom: 10,
    marginBottom: 20,
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
