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
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function UserEditProfile({ route, navigation }) {
  //this one is causing an error
  //const { item } = route.params;

  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [qualificationLevel, setQualificationLevel] = useState("");
  const [qualificationName, setQualificationName] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");

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
    setEmail(item.email);
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setNumber(item.number);
    setUsername(item.username);
    setJobTitle(item.jobTitle);
    setSkills(item.skills);
    setKnowledge(item.knowledge);
    setQualificationLevel(item.qualificationLevel);
    setQualificationName(item.qualificationName);
    setYearsExperience(item.yearsExperience);
    setCollegeName(item.collegeName);
    setYearStart(item.yearStart);
    setYearEnd(item.yearEnd);
  }, []);

  function create() {
    getData();
    setDoc(doc(db, "Jobseekers", username), {
      email: email,
      firstName: firstName,
      lastName: lastName,
      number: number,
      username: username,
      jobTitle: jobTitle,
      skills: skills,
      knowledge: Knowledge,
      qualificationLevel: qualificationLevel,
      qualificationName: qualificationName,
      yearsExperience: yearsExperience,
      collegeName: collegeName,
      yearStart: yearStart,
      yearEnd: yearEnd,
    })
      .then(() => {
        //Successfully written to database
        Alert.alert("Success", "Data Submitted", [
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.backButton}>
          <Text
            style={styles.backText}
            onPress={() => navigation.navigate("UserProfile")}
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.titleNav}>Edit profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.labels}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={(title) => setFirstName(firstName)}
          placeholder="First name"
          style={styles.inputBox}
        ></TextInput>

        <Text style={styles.labels}>Last Name</Text>
        <TextInput
          placeholder="Last name"
          onChangeText={(title) => setLastName(lastName)}
          style={styles.inputBox}
        ></TextInput>

        <Text style={styles.labels}>Username</Text>
        <TextInput
          multiline
          numberOfLines={5}
          value={username}
          onChangeText={(username) => setUsername(username)}
          placeholder="Username"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Number</Text>
        <TextInput
          value={number}
          onChangeText={(number) => setNumber(number)}
          placeholder="Number"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>City</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          scrollEnabled={true}
          value={city}
          onChangeText={(city) => setCity(city)}
          placeholder="City"
          style={styles.inputBox}
        ></TextInput>

        <Text style={styles.labels}>Skills</Text>
        <TextInput
          value={skills}
          onChangeText={(skills) => setSkills(skills)}
          placeholder="Skills"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Knowledge</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={knowledge}
          onChangeText={(knowledge) => setKnowledge(knowledge)}
          placeholder="Knowledge"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Qualification Level</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={qualificationLevel}
          onChangeText={(qualificationLevel) =>
            setQualificationLevel(qualificationLevel)
          }
          placeholder="Qualification level"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>Qualification Name</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={qualificationName}
          onChangeText={(qualificationName) =>
            setQualificationName(qualificationName)
          }
          placeholder="Name of qualification"
          style={styles.inputBox}
        ></TextInput>

        <Text style={styles.labels}>Years Experience</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={yearsExperience}
          onChangeText={(yearsExperience) =>
            setYearsExperience(yearsExperience)
          }
          placeholder="Years of experience"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.labels}>College</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={collegeName}
          onChangeText={(collegeName) => setCollegeName(collegeName)}
          placeholder="College name"
          style={styles.inputBox}
        ></TextInput>

        <Text style={styles.labels}>Year start</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={yearStart}
          onChangeText={(yearStart) => setYearStart(yearStart)}
          placeholder="Year started"
          style={styles.inputBox}
        ></TextInput>

        <Text style={styles.labels}>Year end</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={yearEnd}
          onChangeText={(yearEnd) => setYearEnd(yearEnd)}
          placeholder="Year ended"
          style={styles.inputBox}
        ></TextInput>

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

export default UserEditProfile;
