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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  deleteDoc,
  where,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

function UserEditProfile({ route, navigation }) {
  //this one is causing an error
  const { item } = route.params;
  console.log(item);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [qualificationLevel, setQualificationLevel] = useState("");
  const [qualificationName, setQualificationName] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [cityErr, setCityErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [numberErr, setNumberErr] = useState("");
  const [imageURLErr, setImageURLErr] = useState("");
  const [jobTitleErr, setJobTitleErr] = useState("");
  const [skillsErr, setSkillsErr] = useState("");
  const [knowledgeErr, setKnowledgeErr] = useState("");
  const [qualificationLevelErr, setQualificationLevelErr] = useState("");
  const [qualificationNameErr, setQualificationNameErr] = useState("");
  const [yearsExperienceErr, setYearsExperienceErr] = useState("");
  const [collegeNameErr, setCollegeNameErr] = useState("");
  const [yearStartErr, setYearStartErr] = useState("");
  const [yearEndErr, setYearEndErr] = useState("");

  const [curProfilePic, setCurProfilePic] = useState("");
  const [newProfilePic, setNewProfilePic] = useState("");

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setNewProfilePic(result.uri);
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

  async function editProfile() {
    //Assing response to image user picked
    var response;
    if (newProfilePic === "") {
      response = await fetch(curProfilePic);
    } else {
      response = await fetch(newProfilePic);
    }

    //convert image to blob to be stored in firebase
    const blob = await response.blob();
    //Gets firebase storage info
    const storage = getStorage();
    //Upload image to firebase
    const storageRef = ref(storage, "Jobseeker/" + username);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob!");
    });

    var noInputs = 15;
    var noCorrectInputs = 0;

    if (pass == "") {
      setPassErr("Password field is empty!");
    } else if (pass.length < 6) {
      setPassErr("password must be longer than 6 characters!");
    } else if (upperCaseTest(pass) == false) {
      setPassErr("Password must contain a capital!");
    } else if (numberTest(pass) == false) {
      setPassErr("Password must contain a number!");
    } else {
      noCorrectInputs++;
      setPassErr("");
    }

    if (email == "") {
      setEmailErr("Email field is empty!");
    } else if (validEmail(email) == false) {
      setEmailErr("Invalid email!");
    } else {
      noCorrectInputs++;
      setEmailErr("");
    }

    if (firstName == "") {
      setFirstNameErr("First name field is empty");
    } else if (firstName.length < 2) {
      setFirstNameErr("First name cannot be less than 2 characters!");
    } else {
      noCorrectInputs++;
      setFirstNameErr("");
    }

    if (lastName == "") {
      setLastNameErr("Last name field is empty");
    } else if (lastName.length < 2) {
      setLastNameErr("Last name cannot be less than 2 characters!");
    } else {
      noCorrectInputs++;
      setLastNameErr("");
    }

    if (number == "") {
      setNumberErr("Number field is empty");
    } else if (number.length > 11) {
      setNumberErr("Number cannot be more than 11 characters!");
    } else {
      noCorrectInputs++;
      setNumberErr("");
    }

    if (city == "") {
      setCityErr("City field is empty");
    } else if (city.length < 3) {
      setCityErr("City cannot be less than 3 characters!");
    } else {
      noCorrectInputs++;
      setCityErr("");
    }

    if (jobTitle == "") {
      setJobTitleErr("Job title field is empty!");
    } else if (jobTitle.length < 5) {
      setJobTitleErr("Job title cannot be less than 5 characters!");
    } else {
      noCorrectInputs++;
      setJobTitleErr("");
    }

    if (skills == "") {
      setSkillsErr("Skills field is empty!");
    } else if (skills.length < 5) {
      setSkillsErr("Skills cannot be less than 5 characters!");
    } else {
      noCorrectInputs++;
      setSkillsErr("");
    }

    if (knowledge == "") {
      setKnowledgeErr("Knowledge field is empty!");
    } else if (knowledge.length < 5) {
      setKnowledgeErr("Knowledge cannot be less than 5 characters!");
    } else {
      noCorrectInputs++;
      setKnowledgeErr("");
    }

    if (qualificationLevel == "") {
      setQualificationLevelErr("Qualification level field is empty!");
    } else {
      noCorrectInputs++;
      setQualificationLevelErr("");
    }

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

    if (yearsExperience == "") {
      setYearsExperienceErr("Experience field is empty!");
    } else {
      noCorrectInputs++;
      setYearsExperienceErr("");
    }

    if (collegeName == "") {
      setCollegeNameErr("College name field is empty!");
    } else if (collegeName.length < 3) {
      setCollegeNameErr("College name cannot be less than 3 characters!");
    } else {
      noCorrectInputs++;
      setCollegeNameErr("");
    }

    if (yearStart == "") {
      setYearStartErr("Year started field is empty!");
    } else if (yearStart.trim().length > 4) {
      setYearStartErr("Year cannot be more than 4 characters!");
    } else {
      noCorrectInputs++;
      setYearStartErr("");
    }

    if (yearEnd == "") {
      setYearEndErr("Year ended field is empty!");
    } else if (yearEnd.trim().length > 4) {
      setYearEndErr("Year cannot be more than 4 characters!");
    } else {
      noCorrectInputs++;
      setYearEndErr("");
    }

    console.log(noInputs);
    console.log(noCorrectInputs);
    if (noInputs == noCorrectInputs) {
      setDoc(doc(db, "Jobseekers", item), {
        email: email.trim(),
        city: city.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        number: number.trim(),
        jobTitle: jobTitle.trim(),
        skills: skills.trim(),
        imageURL: imageURL.trim(),
        Knowledge: knowledge.trim(),
        qualificationLevel: qualificationLevel.trim(),
        qualificationName: qualificationName.trim(),
        yearsExperience: yearsExperience.trim(),
        collegeName: collegeName.trim(),
        yearStart: yearStart.trim(),
        yearEnd: yearEnd.trim(),
        username: username.trim(),
        pass: pass.trim(),
      })
        .then(() => {
          //Successfully written to database
          Alert.alert("Success", "Your profile has been updated!", [
            { text: "OK", onPress: () => navigation.navigate("UserProfile") },
          ]);
        })
        .catch((error) => {
          //failed
          Alert.alert("ERROR", "Data not submitted", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        });
    } else {
      Alert.alert("Update profile unsucessful!", "Please try again!", [
        { text: "OK", onPress: () => console.log("error msg - OK Pressed") },
      ]);
    }
  } ////end

  function getImageFromStorage() {
    getData();
    console.log("called");
    //Gets firebase storage info
    const storage = getStorage();
    getDownloadURL(ref(storage, "Jobseeker/" + username))
      .then((url) => {
        console.log("test");
        console.log(url);
        setCurProfilePic(url);
      })
      .then(() => {
        console.log("IMAGE SUCCESSFULLY LOADED");
      })
      .catch(() => {
        console.log("IMAGE NOT FOUND");
      });
  }

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

  function readUserInfo() {
    getDocs(
      query(collection(db, "Jobseekers"), where("username", "==", item))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        const {
          city,
          email,
          firstName,
          lastName,
          number,
          jobTitle,
          imageURL,
          skills,
          Knowledge,
          qualificationLevel,
          qualificationName,
          yearsExperience,
          collegeName,
          yearStart,
          yearEnd,
          username,
          pass,
          //  image,
        } = doc.data();

        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setNumber(number);
        setJobTitle(jobTitle);
        setSkills(skills);
        setCity(city);
        setImageURL(imageURL);
        setKnowledge(Knowledge);
        setQualificationLevel(qualificationLevel);
        setQualificationName(qualificationName);
        setYearsExperience(yearsExperience);
        setCollegeName(collegeName);
        setYearStart(yearStart);
        setYearEnd(yearEnd);
        setPass(pass);
        setUsername(username);
      });
    });
  }
  useEffect(() => {
    readUserInfo();
  }, []);
  useEffect(() => getImageFromStorage());

  function deleteUserWarning() {
    Alert.alert(
      "Are you sure?",
      "You won't be able to get your account back!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Yes delete!", onPress: () => deleteUser() },
      ]
    );
  }
  function deleteUser() {
    deleteDoc(doc(db, "Jobseekers", item));
    navigation.navigate("HomeNotLoggedIn");
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

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={deleteUserWarning}
        >
          <Text style={styles.buttonDeleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text style={styles.titleMini}>General Information</Text>
        <Text style={styles.labels}>First Name</Text>

        <TextInput
          value={firstName}
          onChangeText={(firstName) =>
            setFirstName(firstName.replace(/\s+/g, ""))
          }
          placeholder="First name"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{firstNameErr}</Text>

        <Text style={styles.labels}>Last Name</Text>
        <TextInput
          value={lastName}
          placeholder="Last name"
          onChangeText={(lastName) => setLastName(lastName.replace(/\s+/g, ""))}
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{lastNameErr}</Text>

        <Text style={styles.labels}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email.replace(/\s+/g, ""))}
          placeholder="Email"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{emailErr}</Text>

        <Text style={styles.labels}>Password</Text>
        <TextInput
          value={pass}
          onChangeText={(pass) => setPass(pass.replace(/\s+/g, ""))}
          placeholder="password"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{passErr}</Text>

        <Text style={styles.labels}>Number</Text>
        <TextInput
          value={number}
          onChangeText={(number) => setNumber(number.replace(/\s+/g, ""))}
          placeholder="Number"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{numberErr}</Text>

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
        <Text style={styles.errorMsg}>{cityErr}</Text>

        <Text style={styles.titleMini}>Profile Picture</Text>
        <Text style={styles.labels}>Current Profile Picture</Text>
        <Image
          source={{ uri: curProfilePic }}
          style={{
            alignSelf: "center",
            marginVertical: 20,
            width: 200,
            height: 200,
            borderColor: "black",
            borderWidth: 3,
            marginBottom: 10,
          }}
        />
        <Button title="Change profile picture" onPress={pickImage} />
        <Text style={styles.labels}>New Profile Picture</Text>
        {newProfilePic && (
          <Image
            source={{ uri: newProfilePic }}
            style={{
              alignSelf: "center",
              marginVertical: 20,
              width: 200,
              height: 200,
              borderColor: "black",
              borderWidth: 3,
              marginBottom: 10,
            }}
          />
        )}

        <Text style={styles.titleMini}>Skills and experience</Text>

        <Text style={styles.labels}>Skills</Text>
        <TextInput
          value={skills}
          onChangeText={(skills) => setSkills(skills)}
          placeholder="Skills"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{skillsErr}</Text>

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
        <Text style={styles.errorMsg}>{knowledgeErr}</Text>

        <Text style={styles.labels}>Job title</Text>
        <TextInput
          multiline
          maxLength={1000}
          numberOfLines={5}
          value={jobTitle}
          onChangeText={(jobTitle) => setJobTitle(jobTitle)}
          placeholder="Job title"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{jobTitleErr}</Text>

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
        <Text style={styles.errorMsg}>{yearsExperienceErr}</Text>

        <Text style={styles.titleMini}>Education</Text>

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
        <Text style={styles.errorMsg}>{qualificationNameErr}</Text>

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
        <Text style={styles.errorMsg}>{qualificationLevelErr}</Text>

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
        <Text style={styles.errorMsg}>{collegeNameErr}</Text>

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
        <Text style={styles.errorMsg}>{yearStartErr}</Text>

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
        <Text style={styles.errorMsg}>{yearEndErr}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={editProfile}>
            <Text style={styles.buttonText} onPress={console.log("pressed")}>
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
  errorMsg: {
    color: "red",
    paddingLeft: 40,
  },
  backButton: {
    alignSelf: "left",
    padding: 10,
    flex: 0.17,
  },
  backText: {
    color: "navy",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
  titleNav: {
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "navy",
    fontWeight: "bold",
    paddingLeft: 15,
    fontSize: 30,
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
  titleMini: {
    fontSize: 35,
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 20,
    marginVertical: 25,
  },
});

export default UserEditProfile;
