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
} from "react-native";
import * as React from "react";
import { db } from "../database/config";
import { useState, useEffect } from "react/cjs/react.development";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

function CompanyEditJobScreen({ route, navigation }) {
  const { item } = route.params;

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

  useEffect(() => {
    getData();
    setTitle(item.title);
    setInfo(item.info);
    setWage(item.wage);
    setType(item.type);
    setFullDescription(item.fullDescription);
    setSchedule(item.schedule);
    setExperience(item.experience);
    setQualification(item.qualification);
    setKnowledge(item.knowledge);
  }, []);

  function create() {
    getData();
    setDoc(doc(db, "Adverts", title), {
      title: title,
      info: info,
      wage: wage,
      type: type,
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

  function deletePost() {
    deleteDoc(doc(db, "Adverts", title));
    navigation.navigate("CompanyHome");
  }

  return (
    <View style={styles.container}>
      <Text>Edit job post</Text>
      <Text>Title: </Text>
      <TextInput
        value={title}
        onChangeText={(title) => setTitle(title)}
        placeholder="Job/Project title"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <Text>Small description: </Text>
      <TextInput
        value={info}
        onChangeText={(info) => setInfo(info)}
        placeholder="3 lines about the job summary"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <Text>Wage: </Text>
      <TextInput
        value={wage}
        onChangeText={(wage) => setWage(wage)}
        placeholder="Wage"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <Text>Job type: </Text>
      <TextInput
        value={type}
        onChangeText={(type) => setType(type)}
        placeholder="Type of work (Job/Project etc..)"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <Text>Full description: </Text>
      <TextInput
        value={fullDescription}
        onChangeText={(fullDescription) => setFullDescription(fullDescription)}
        placeholder="Full Job description"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>

      <Text>Schedule: </Text>
      <TextInput
        value={schedule}
        onChangeText={(schedule) => setSchedule(schedule)}
        placeholder="Work schedule"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <Text>Minimum experience: </Text>
      <TextInput
        value={experience}
        onChangeText={(experience) => setExperience(experience)}
        placeholder="Minimum experience required"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <Text>Required qualifications: </Text>
      <TextInput
        value={qualification}
        onChangeText={(qualification) => setQualification(qualification)}
        placeholder="Required qualifications"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>
      <Text>knowledge and skills: </Text>
      <TextInput
        value={knowledge}
        onChangeText={(knowledge) => setKnowledge(knowledge)}
        placeholder="Required knowledge"
        style={{
          borderWidth: 1,
          borderColor: "#777",
          padding: 5,
          width: 250,
          marginBottom: 20,
        }}
      ></TextInput>

      <Button title="Update" onPress={create}></Button>
      <Button title="Delete Job post" onPress={deletePost}></Button>
      <Button
        title="Home"
        onPress={() => navigation.navigate("CompanyHome", { item: item })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CompanyEditJobScreen;
