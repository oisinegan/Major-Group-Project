import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  PermissionsAndroid,
  Image,
  Dimensions,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";

// Get device width
const deviceWidth = Dimensions.get("window").width;

function RegisterJobseeker({ navigation }) {
  //Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  //Qualifications
  const [qualificationName, setQualificationName] = useState("");
  const [qualificationLevel, setQualificationLevel] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");
  //Experience
  const [jobTitle, setJobTitle] = useState("");
  const [yearsExperience, SetYearsExperience] = useState("");
  //Skills
  const [skills, setSkills] = useState("");
  const [Knowledge, setKnowledge] = useState("");

  function jobseekersCreate() {
    //Submit data
    //db= databse link (database/config),
    //"jobseekers" = table name on firebase
    // username = id person being written to database,
    setDoc(doc(db, "Jobseekers", username), {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      pass: pass,
      number: number,
      city: city,
      country: country,

      qualificationName: qualificationName,
      qualificationLevel: qualificationLevel,
      collegeName: collegeName,
      yearStart: yearStart,
      yearEnd: yearEnd,

      jobTitle: jobTitle,
      yearsExperience: yearsExperience,

      skills: skills,
      Knowledge: Knowledge,
    })
      .then(() => {
        //Successfully written to database
        Alert.alert("Success", "You have successfully signed up!", [
          { text: "OK", onPress: () => navigation.navigate("HomeNotLoggedIn") },
        ]);
      })
      .catch((error) => {
        //failed
        Alert.alert("ERROR", "Data not submitted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  } ////end jobseekersCreate

  /******* METHOD TO STORE VARIABLE IN ASYNC STORAGE *******/
  //Pass username and store it in async storage
  const storeDataToAsyncStorage = async (value) => {
    try {
      await AsyncStorage.setItem("Username", value);
    } catch (e) {
      // saving error
    }
  };

  return (
    <SafeAreaView style={styles.outerCon}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <TouchableOpacity style={styles.backButton}>
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.backButton}
        >
          back
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.titleMini}>General Information</Text>
        <TextInput
          value={firstName}
          onChangeText={(firstName) => setFirstName(firstName)}
          placeholder="First Name"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={lastName}
          onChangeText={(lastName) => setLastname(lastName)}
          placeholder="Last Name"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={username}
          onChangeText={(username) => setUsername(username)}
          placeholder="Username"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>

        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>

        <TextInput
          value={pass}
          onChangeText={(pass) => setPass(pass)}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#4f5250"}
        />
        <TextInput
          value={number}
          onChangeText={(number) => setNumber(number)}
          placeholder="Number"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={city}
          onChangeText={(city) => setCity(city)}
          placeholder="City"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={country}
          onChangeText={(country) => setCountry(country)}
          placeholder="Country"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>

        <Text style={styles.titleMini}>Qualification</Text>
        <TextInput
          value={qualificationName}
          onChangeText={(qualificationName) =>
            setQualificationName(qualificationName)
          }
          placeholder="Qualification Name"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={qualificationLevel}
          onChangeText={(qualificationLevel) =>
            setQualificationLevel(qualificationLevel)
          }
          placeholder="Level"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={collegeName}
          onChangeText={(collegeName) => setCollegeName(collegeName)}
          placeholder="University/School Name"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={yearStart}
          onChangeText={(yearStart) => setYearStart(yearStart)}
          placeholder="Start Year"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={yearEnd}
          onChangeText={(yearEnd) => setYearEnd(yearEnd)}
          placeholder="Start End"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>

        <Text style={styles.titleMini}>Experience</Text>
        <TextInput
          value={jobTitle}
          onChangeText={(jobTitle) => setJobTitle(jobTitle)}
          placeholder="Job Title"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={yearsExperience}
          onChangeText={(yearsExperience) =>
            SetYearsExperience(yearsExperience)
          }
          placeholder="Years Experience"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.titleMini}>Knowledge and Skills</Text>
        <TextInput
          value={skills}
          onChangeText={(skills) => setSkills(skills)}
          placeholder="Skills"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={Knowledge}
          onChangeText={(Knowledge) => setKnowledge(Knowledge)}
          placeholder="Knowledge"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text
              onPress={jobseekersCreate}
              style={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={{ fontSize: 20 }}>
            Already have an account?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: "midnightblue",
                fontSize: 20,
              }}
              onPress={() => navigation.navigate("HomeNotLoggedIn")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  outerCon: {
    backgroundColor: "#FAF9F6",
  },
  container: {
    paddingTop: "5%",
    backgroundColor: "#FAF9F6",
  },
  backButton: {
    color: "midnightblue",
    textAlign: "left",
    fontSize: 20,
    lineHeight: 40,
    paddingLeft: 7.5,
  },
  title: {
    marginBottom: 35,
    fontSize: 40,
    color: "midnightblue",
    marginLeft: 10,
  },
  titleMini: {
    fontSize: 25,
    color: "midnightblue",
    marginLeft: 20,
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "midnightblue",
    padding: 15,
    width: "82.5%",
    marginBottom: 20,
    borderRadius: 50,
    marginLeft: 30,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  button: {
    backgroundColor: "midnightblue",
    padding: 15,
    borderRadius: 50,
    paddingHorizontal: "27%",
    marginBottom: "5%",
  },

  footer: {
    paddingBottom: 100,
    alignSelf: "center",
  },
});

export default RegisterJobseeker;
