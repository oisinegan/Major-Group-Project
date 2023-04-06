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
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

function RegisterCompany({ navigation }) {
  //Info
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [info, setInfo] = useState("");
  const [founded, setFounded] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");

  //Image
  const [image, setImage] = useState(null);

  //Error messages
  const [usernameErr, setUsernameErr] = useState(" ");
  const [passErr, setPassErr] = useState(" ");
  const [emailErr, setEmailErr] = useState(" ");
  const [numberErr, setNumberErr] = useState(" ");
  const [addressErr, setAddressErr] = useState(" ");
  const [infoErr, setInfoErr] = useState("");
  const [foundedErr, setFoundedErr] = useState("");
  const [industryErr, setIndustryErr] = useState("");
  const [companySizeErr, setCompanySizeErr] = useState("");
  const [imageErr, setImageErr] = useState("");

  //Taken Company usernames
  const [compNames, setCompNames] = useState("");

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      //Assing response to image user picked
      const response = await fetch(result.uri);
      //convert image to blob to be stored in firebase
      const blob = await response.blob();
      //Gets firebase storage info
      const storage = getStorage();
      //Upload image to firebase
      const storageRef = ref(storage, "Company/" + username);
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob!");
      });
      setImage(result.uri);

      console.log();
    }
  }

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

  async function companyCreate() {
    var noInputs = 10;
    var noCorrectInputs = 0;

    //Username
    if (username == "") {
      setUsernameErr("Username field is empty");
    } else if (username.length < 4) {
      setUsernameErr("Username must be longer than 5 characters!");
    } else if (checkIfUsernameExists(username)) {
      setUsernameErr("Username already exists! Please choose another!");
    } else {
      noCorrectInputs++;
      setUsernameErr("");
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

    //Email
    if (email == "") {
      setEmailErr("Email field is empty!");
    } else if (validEmail(email) == false) {
      setEmailErr("Invalid email!");
    } else {
      noCorrectInputs++;
      setEmailErr("");
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

    //Profile picutre
    if (image == null) {
      setImageErr("Please choose a profile picture!");
    } else {
      noCorrectInputs++;
      setImageErr("");
    }

    //Address
    if (address == "") {
      setAddressErr("Address field is empty!");
    } else if (address.length < 10) {
      setAddressErr("Address must be longer than 10 characters!");
    } else {
      noCorrectInputs++;
      setAddressErr("");
    }

    //Info
    if (info == "") {
      setInfoErr("Summary field is empty!");
    } else if (info.length < 10) {
      setInfoErr("Summary must be longer than 10 characters!");
    } else {
      noCorrectInputs++;
      setInfoErr("");
    }

    //Founded
    if (founded == "") {
      setFoundedErr("Founded field is empty!");
    } else if (founded.length < 4) {
      setFoundedErr("Founded must be longer than 3 digits!");
    } else {
      noCorrectInputs++;
      setFoundedErr("");
    }

    //Industry
    if (industry == "") {
      setIndustryErr("Industry field is empty!");
    } else if (industry.length < 5) {
      setIndustryErr("Industry must be longer than 5 characters!");
    } else {
      noCorrectInputs++;
      setIndustryErr("");
    }

    //Company
    if (companySize == "") {
      setCompanySizeErr("Company size field is empty!");
    } else if (industry.length < 4) {
      setCompanySizeErr("Company size must be longer than 4 characters!");
    } else {
      noCorrectInputs++;
      setCompanySizeErr("");
    }

    if (noInputs == noCorrectInputs) {
      setDoc(doc(db, "Company", username.trim()), {
        username: username.trim(),
        pass: pass.trim(),
        email: email.trim(),
        number: number.trim(),
        address: address.trim(),

        info: info.trim(),
        founded: founded.trim(),
        industry: industry.trim(),
        companySize: companySize.trim(),
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
      Alert.alert("Sign up unsucessful!", "Please try again!", [
        { text: "OK", onPress: () => console.log("error msg - OK Pressed") },
      ]);
    }
  } ////end companyCreate

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
          value={username}
          maxLength={30}
          onChangeText={(username) => setUsername(username.replace(/\s+/g, ""))}
          placeholder="Company Username"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{usernameErr}</Text>
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
          value={email}
          maxLength={30}
          onChangeText={(email) => setEmail(email.replace(/\s+/g, ""))}
          placeholder="Email"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{emailErr}</Text>
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
          value={address}
          maxLength={30}
          onChangeText={(address) => setAddress(address)}
          placeholder="Address"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{addressErr}</Text>

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
              marginBottom: 10,
            }}
          />
        )}
        <Text style={styles.errorMsg}>{imageErr}</Text>
        <Text style={styles.titleMini}>Company Information</Text>

        <TextInput
          value={info}
          maxLength={30}
          onChangeText={(info) => setInfo(info)}
          placeholder="Summary of Company"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{infoErr}</Text>
        <TextInput
          value={founded}
          maxLength={30}
          onChangeText={(founded) => setFounded(founded)}
          placeholder="Founded"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{foundedErr}</Text>
        <TextInput
          value={industry}
          maxLength={30}
          onChangeText={(industry) => setIndustry(industry)}
          placeholder="Industry Type"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{industryErr}</Text>
        <TextInput
          value={companySize}
          maxLength={30}
          onChangeText={(companySize) => setCompanySize(companySize)}
          placeholder="Company Size"
          placeholderTextColor={"#4f5250"}
          style={styles.input}
        ></TextInput>
        <Text style={styles.errorMsg}>{companySizeErr}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={companyCreate}>
            <Text
              onPress={companyCreate}
              style={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
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
                color: "navy",
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
  errorMsg: {
    color: "red",
    paddingLeft: 40,
    marginBottom: 10,
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

export default RegisterCompany;
