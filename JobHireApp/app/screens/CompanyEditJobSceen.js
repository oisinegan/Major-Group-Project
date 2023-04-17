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
  StatusBar,
} from "react-native";
import * as React from "react";
import { db } from "../database/config";
import { useState, useEffect } from "react/cjs/react.development";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

function CompanyEditJobScreen({ route, navigation }) {
  //this one works fine
  const { item } = route.params;

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

  useEffect(() => {
    getData();
    setTitle(item.title);
    setInfo(item.info);
    setWage(item.wage);
    setType(item.type);
    setLocation(item.location);
    setFullDescription(item.fullDescription);
    setSchedule(item.schedule);
    setExperience(item.experience);
    setQualification(item.qualification);
    setKnowledge(item.knowledge);
  }, []);

  function create() {
    var noInputs = 9;
    var noCorrectInputs = 0;

    //info
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

    //wage
    if (wage == "") {
      setWageErr("Wage field is empty!");
    } else if (wage.length < 2) {
      setWageErr("Wage must be longer than 2 character!");
    } else {
      noCorrectInputs++;
      setWageErr("");
    }

    //job type
    if (type == "") {
      setTypeErr("Type field is empty!");
    } else {
      noCorrectInputs++;
      setTypeErr("");
    }

    //location
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

    //schedule
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
      setQualificationErr("Industry must be longer than 3 characters!");
    } else {
      noCorrectInputs++;
      setQualificationErr("");
    }

    //knowledge
    if (knowledge == "") {
      setKnowledgeErr("Knowledge field is empty!");
    } else if (knowledge.length < 5) {
      setKnowledgeErr("Knowledge must be longer than 5 characters!");
    } else {
      noCorrectInputs++;
      setKnowledgeErr("");
    }
    console.log(noInputs);
    if (noInputs == noCorrectInputs) {
      setDoc(doc(db, "Adverts", title + "_" + item.company), {
        title: title.trim(),
        info: info.trim(),
        wage: wage.trim(),
        type: type.trim(),
        //Delte
        storageName: title + "_" + item.company,
        company: item.company.trim(),
        location: location.trim(),
        fullDescription: fullDescription.trim(),
        schedule: schedule.trim(),
        experience: experience.trim(),
        qualification: qualification.trim(),
        knowledge: knowledge.trim(),
        Applicants: item.Applicants,
      })
        .then(() => {
          //Successfully written to database
          Alert.alert("Sucess", "Data Submitted", [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("CompanyHome", { cUsername: item.company }),
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

  function deleteUserWarning() {
    Alert.alert("Are you sure?", "You won't be able to get your advert back!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      { text: "Yes delete!", onPress: () => deletePost() },
    ]);
  }
  function deletePost() {
    deleteDoc(doc(db, "Adverts", item.id));

    navigation.navigate("CompanyHome", { cUsername: item.company });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.backButton}>
          <Text
            style={styles.backText}
            onPress={() =>
              navigation.navigate("CompanyHome", { cUsername: item.company })
            }
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.titleNav}> Edit job</Text>

        <TouchableOpacity style={styles.buttonDelete}>
          <Text style={styles.buttonDeleteText} onPress={deleteUserWarning}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text style={styles.labels}>Title: {title} </Text>
        <Text style={styles.labels}>Location </Text>
        <TextInput
          value={location}
          onChangeText={(location) => setLocation(location)}
          placeholder="location"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{locationErr}</Text>
        <Text style={styles.labels}>Small description </Text>
        <TextInput
          multiline
          numberOfLines={5}
          value={info}
          onChangeText={(info) => setInfo(info)}
          placeholder="3 lines about the job summary"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{infoErr}</Text>
        <Text style={styles.labels}>Wage </Text>
        <TextInput
          value={wage}
          onChangeText={(wage) => setWage(wage)}
          placeholder="Wage"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{wageErr}</Text>
        <Text style={styles.labels}>Job type </Text>
        <TextInput
          value={type}
          onChangeText={(type) => setType(type)}
          placeholder="Type of work (Job/Project etc..)"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{typeErr}</Text>
        <Text style={styles.labels}>Full description </Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          scrollEnabled={true}
          value={fullDescription}
          onChangeText={(fullDescription) =>
            setFullDescription(fullDescription)
          }
          placeholder="Full Job description"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{descriptionErr}</Text>
        <Text style={styles.labels}>Schedule </Text>
        <TextInput
          value={schedule}
          onChangeText={(schedule) => setSchedule(schedule)}
          placeholder="Work schedule"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{scheduleErr}</Text>
        <Text style={styles.labels}>Minimum experience </Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={experience}
          onChangeText={(experience) => setExperience(experience)}
          placeholder="Minimum experience required"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{experienceErr}</Text>
        <Text style={styles.labels}>Required qualifications </Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={qualification}
          onChangeText={(qualification) => setQualification(qualification)}
          placeholder="Required qualifications"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{qualificationErr}</Text>
        <Text style={styles.labels}>knowledge and skills </Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={knowledge}
          onChangeText={(knowledge) => setKnowledge(knowledge)}
          placeholder="Required knowledge"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{knowledgeErr}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={create}>
              Update
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
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: "left",
    padding: 10,
    flex: 0.17,
  },
  errorMsg: {
    color: "red",
    paddingLeft: 40,
    marginBottom: 10,
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
    paddingLeft: 15,
    fontSize: 35,
    flex: 0.6,
  },

  buttonDelete: {
    backgroundColor: "navy",
    borderRadius: 50,
    alignSelf: "center",
    padding: 10,
    flex: 0.2,
  },
  buttonDeleteText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  labels: {
    fontSize: 25,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 20,
    color: "navy",
    marginBottom: 10,
  },
  inputBox: {
    borderWidth: 1.5,
    borderColor: "navy",
    padding: 20,
    width: "80%",
    marginBottom: 10,
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 10,
    fontSize: 17.5,
  },

  buttonContainer: {
    paddingVertical: 40,
  },
  button: {
    padding: 20,
    backgroundColor: "navy",

    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default CompanyEditJobScreen;
