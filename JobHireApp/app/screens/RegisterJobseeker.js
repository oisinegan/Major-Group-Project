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
import { useState, useEffect } from "react/cjs/react.development";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../database/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

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

  //Image
  const [image, setImage] = useState(null);

  //Error messages
  //Info
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastnameErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [numberErr, setNumberErr] = useState("");
  const [cityErr, setCityErr] = useState("");
  const [countryErr, setCountryErr] = useState("");
  //Qualifications
  const [qualificationNameErr, setQualificationNameErr] = useState("");
  const [qualificationLevelErr, setQualificationLevelErr] = useState("");
  const [collegeNameErr, setCollegeNameErr] = useState("");
  const [yearStartErr, setYearStartErr] = useState("");
  const [yearEndErr, setYearEndErr] = useState("");
  //Experience
  const [jobTitleErr, setJobTitleErr] = useState("");
  const [yearsExperienceErr, setYearsExperienceErr] = useState("");
  //Skills
  const [skillsErr, setSkillsErr] = useState("");
  const [KnowledgeErr, setKnowledgeErr] = useState("");

  //Image
  const [imageErr, setImageErr] = useState(null);

  //Taken  usernames
  const [jobseekerNames, setJobseekerNames] = useState("");
  const [compNames, setCompNames] = useState("");

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      //Assigning response to image user picked
      const response = await fetch(result.uri);
      //convert image to blob to be stored in firebase
      const blob = await response.blob();
      //Gets firebase storage info
      const storage = getStorage();
      //Upload image to firebase
      const storageRef = ref(storage, "Jobseeker/" + username);
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob!");
      });
      setImage(result.uri);
      console.log();
    }
  }

  function readAllJobseekerNames() {
    getDocs(collection(db, "Jobseekers")).then((docSnap) => {
      let names = [];
      docSnap.forEach((doc) => {
        const { username } = doc.data();
        names.push(username);
      });
      console.log(names);
      setJobseekerNames(names);
    });
  }
  useEffect(readAllJobseekerNames, []);

  function readAllCompanyNames() {
    getDocs(collection(db, "Company")).then((docSnap) => {
      let names = [];
      docSnap.forEach((doc) => {
        const { username } = doc.data();
        names.push(username);
      });
      console.log(names);
      setCompNames(names);
    });
  }
  useEffect(readAllCompanyNames, []);

  function checkIfUsernameExists(usr) {
    if (
      jobseekerNames
        .toString()
        .toUpperCase()
        .includes(usr.toString().toUpperCase())
    ) {
      console.log("exists");
      return true;
    } else {
      console.log("Doesn't exist");
      return false;
    }
  }

  function checkIfUsernameExistsInCompany(usr) {
    if (
      compNames.toString().toUpperCase().includes(usr.toString().toUpperCase())
    ) {
      console.log("exists");
      return true;
    } else {
      console.log("Doesn't exist");
      return false;
    }
  }

  //Specific tests - methods return true/false
  function upperCaseTest(string) {
    //If string contains at least one  Upper case letter
    return /[A-Z]/.test(string);
  }
  function numberTest(string) {
    //If string contains at least one number
    return /[1-9]/.test(string);
  }
  function validEmail(string) {
    var res1 = /[@]/.test(string);
    var res2 = /[.]/.test(string);

    if (res1 && res2) {
      return true;
    }
    return false;
  }

  function jobseekersCreate() {
    var noInputs = 18;
    var noCorrectInputs = 0;

    //first name
    if (firstName == "") {
      setFirstNameErr("First name field is empty!");
    } else if (firstName.length < 2) {
      setFirstNameErr("First name must be longer than 2 characters!");
    } else {
      noCorrectInputs++;
      setFirstNameErr("");
    }

    //last name
    if (lastName == "") {
      setLastnameErr("Last name field is empty!");
    } else if (lastName.length < 2) {
      setLastnameErr("Last name must be longer than 2 characters!");
    } else {
      noCorrectInputs++;
      setLastnameErr("");
    }

    //Username
    if (username == "") {
      setUsernameErr("Username field is empty");
    } else if (username.length < 4) {
      setUsernameErr("Username must be longer than 5 characters!");
    } else if (checkIfUsernameExists(username)) {
      setUsernameErr("Username already exists! Please choose another!");
    } else if (checkIfUsernameExistsInCompany(username)) {
      setUsernameErr("Username already exists! Please choose another!");
    } else {
      noCorrectInputs++;
      setUsernameErr("");
    }

    //Email
    if (email == "") {
      setEmailErr("Email field is empty!");
    } else if (validEmail(email) == false) {
      setEmailErr("Invalid email!");
    } else {
      noCorrectInputs++;
      setEmailErr("");
    }

    //Password
    if (pass == "") {
      setPassErr("Password field is empty!");
    } else if (pass.length < 6) {
      setPassErr("password must be longer than 6 characters!");
      console.log("test1");
    } else if (upperCaseTest(pass) == false) {
      console.log("test2");
      setPassErr("Password must contain a capital!");
    } else if (numberTest(pass) == false) {
      setPassErr("Password must contain a number!");
    } else {
      noCorrectInputs++;
      setPassErr("");
    }

    //Number
    if (number == "") {
      setNumberErr("Number field is empty!");
    } else if (number.length < 7) {
      setNumberErr("Number must be longer than 7 digits!");
    } else {
      noCorrectInputs++;
      setNumberErr("");
    }

    //City
    if (city == "") {
      setCityErr("City field is empty");
    } else if (city.length < 2) {
      setCityErr("City must be longer than 2 characters!");
    } else {
      noCorrectInputs++;
      setCityErr("");
    }

    //Country
    if (country == "") {
      setCountryErr("Country field is empty");
    } else if (country.length < 3) {
      setCountryErr("Country must be longer than 3 characters!");
    } else {
      noCorrectInputs++;
      setCountryErr("");
    }

    //Profile picutre
    if (image == null) {
      setImageErr("Please choose a profile picture!");
    } else {
      noCorrectInputs++;
      setImageErr("");
    }

    //Qual name
    if (qualificationName == "") {
      setQualificationNameErr("Qualification name field is empty!");
    } else if (qualificationName.length < 3) {
      setQualificationNameErr(
        "Qualification name cannot be less than 3 characters!"
      );
    } else {
      noCorrectInputs++;
      setQualificationNameErr("");
    }

    //Qual level
    if (qualificationLevel == "") {
      setQualificationLevelErr("Qualification level field is empty!");
    } else {
      noCorrectInputs++;
      setQualificationLevelErr("");
    }

    //College name
    if (collegeName == "") {
      setCollegeNameErr("College name field is empty!");
    } else if (collegeName.length < 3) {
      setCollegeNameErr("College name cannot be less than 3 characters!");
    } else {
      noCorrectInputs++;
      setCollegeNameErr("");
    }

    //Year start
    if (yearStart == "") {
      setYearStartErr("Year started field is empty!");
    } else if (yearStart.trim().length > 4) {
      setYearStartErr("Year cannot be more than 4 characters!");
    } else {
      noCorrectInputs++;
      setYearStartErr("");
    }

    //Year end
    if (yearEnd == "") {
      setYearEndErr("Year ended field is empty!");
    } else if (yearEnd.trim().length > 4) {
      setYearEndErr("Year cannot be more than 4 characters!");
    } else {
      noCorrectInputs++;
      setYearEndErr("");
    }

    //Job title
    if (jobTitle == "") {
      setJobTitleErr("Job title field is empty!");
    } else if (jobTitle.length < 5) {
      setJobTitleErr("Job title cannot be less than 5 characters!");
    } else {
      noCorrectInputs++;
      setJobTitleErr("");
    }

    //Yrs experience
    if (yearsExperience == "") {
      setYearsExperienceErr("Experience field is empty!");
    } else {
      noCorrectInputs++;
      setYearsExperienceErr("");
    }

    //Skills
    if (skills == "") {
      setSkillsErr("Skills field is empty!");
    } else if (skills.length < 5) {
      setSkillsErr("Skills cannot be less than 5 characters!");
    } else {
      noCorrectInputs++;
      setSkillsErr("");
    }

    //Knowledge
    if (Knowledge == "") {
      setKnowledgeErr("Knowledge field is empty!");
    } else if (Knowledge.length < 5) {
      setKnowledgeErr("Knowledge cannot be less than 5 characters!");
    } else {
      noCorrectInputs++;
      setKnowledgeErr("");
    }

    console.log(noInputs);
    console.log(noCorrectInputs);
    if (noInputs == noCorrectInputs) {
      setDoc(doc(db, "Jobseekers", username), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        email: email.trim(),
        pass: pass.trim(),
        number: number.trim(),
        city: city.trim(),
        country: country.trim(),

        qualificationName: qualificationName.trim(),
        qualificationLevel: qualificationLevel.trim(),
        collegeName: collegeName.trim(),
        yearStart: yearStart.trim(),
        yearEnd: yearEnd.trim(),

        jobTitle: jobTitle.trim(),
        yearsExperience: yearsExperience.trim(),

        skills: skills.trim(),
        Knowledge: Knowledge.trim(),
      })
        .then(() => {
          //Successfully written to database
          Alert.alert("Success", "You have successfully signed up!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("HomeNotLoggedIn"),
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
      Alert.alert("Create account unsucessful!", "Please try again!", [
        { text: "OK", onPress: () => console.log("error msg - OK Pressed") },
      ]);
    }
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
      <ScrollView
        style={styles.container}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.titleMini}>General Information</Text>
        <TextInput
          value={firstName}
          maxLength={30}
          onChangeText={(firstName) =>
            setFirstName(firstName.replace(/\s+/g, ""))
          }
          placeholder="First Name"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{firstNameErr}</Text>
        <TextInput
          value={lastName}
          maxLength={30}
          onChangeText={(lastName) => setLastname(lastName.replace(/\s+/g, ""))}
          placeholder="Last Name"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{lastNameErr}</Text>
        <TextInput
          value={username}
          maxLength={30}
          onChangeText={(username) => setUsername(username.replace(/\s+/g, ""))}
          placeholder="Username"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{usernameErr}</Text>
        <TextInput
          value={email}
          maxLength={30}
          onChangeText={(email) => setEmail(email.replace(/\s+/g, ""))}
          placeholder="Email"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{emailErr}</Text>
        <TextInput
          value={pass}
          maxLength={30}
          onChangeText={(pass) => setPass(pass.replace(/\s+/g, ""))}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#4f5250"}
        />
        <Text style={styles.errorMsg}>{passErr}</Text>
        <TextInput
          value={number}
          maxLength={30}
          onChangeText={(number) => setNumber(number.replace(/\s+/g, ""))}
          placeholder="Number"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{numberErr}</Text>
        <TextInput
          value={city}
          maxLength={30}
          onChangeText={(city) => setCity(city)}
          placeholder="City"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{cityErr}</Text>
        <TextInput
          value={country}
          maxLength={30}
          onChangeText={(country) => setCountry(country)}
          placeholder="Country"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{countryErr}</Text>
        <Text style={styles.titleMini}>Profile Picture</Text>
        <Button
          title="Pick a profile picture from camera roll"
          onPress={pickImage}
        />
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              alignSelf: "center",
              marginVertical: 20,
              width: 200,
              height: 200,
              borderColor: "black",
              borderWidth: 3,
            }}
          />
        )}
        <Text style={styles.errorMsg}>{imageErr}</Text>

        <Text style={styles.titleMini}>Qualification</Text>
        <TextInput
          value={qualificationName}
          maxLength={30}
          onChangeText={(qualificationName) =>
            setQualificationName(qualificationName)
          }
          placeholder="Qualification Name"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{qualificationNameErr}</Text>
        <TextInput
          value={qualificationLevel}
          maxLength={30}
          onChangeText={(qualificationLevel) =>
            setQualificationLevel(qualificationLevel)
          }
          placeholder="Level"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{qualificationLevelErr}</Text>
        <TextInput
          value={collegeName}
          maxLength={30}
          onChangeText={(collegeName) => setCollegeName(collegeName)}
          placeholder="University/School Name"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{collegeNameErr}</Text>
        <TextInput
          value={yearStart}
          maxLength={30}
          onChangeText={(yearStart) => setYearStart(yearStart)}
          placeholder="Start Year"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{yearStartErr}</Text>
        <TextInput
          value={yearEnd}
          maxLength={30}
          onChangeText={(yearEnd) => setYearEnd(yearEnd)}
          placeholder="Start End"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{yearEndErr}</Text>

        <Text style={styles.titleMini}>Experience</Text>
        <TextInput
          value={jobTitle}
          maxLength={30}
          onChangeText={(jobTitle) => setJobTitle(jobTitle)}
          placeholder="Job Title"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{jobTitleErr}</Text>
        <TextInput
          value={yearsExperience}
          maxLength={30}
          onChangeText={(yearsExperience) =>
            SetYearsExperience(yearsExperience)
          }
          placeholder="Years Experience"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{yearsExperienceErr}</Text>
        <Text style={styles.titleMini}>Knowledge and Skills</Text>
        <TextInput
          value={skills}
          maxLength={30}
          onChangeText={(skills) => setSkills(skills)}
          placeholder="Skills"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{skillsErr}</Text>
        <TextInput
          value={Knowledge}
          maxLength={30}
          onChangeText={(Knowledge) => setKnowledge(Knowledge)}
          placeholder="Knowledge"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{KnowledgeErr}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={jobseekersCreate}>
            <Text
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
                //fontSize: 20,
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
  errorMsg: {
    color: "red",
    paddingLeft: 40,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "midnightblue",
    padding: 15,
    width: "82.5%",

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
