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

function CompanyEditProfile({ route, navigation }) {
  //this one is causing an error
  const { item } = route.params;
  console.log(item);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [address, setAddress] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [email, setEmail] = useState("");
  const [founded, setFounded] = useState("");
  const [industry, setIndustry] = useState("");
  const [info, setInfo] = useState("");
  const [number, setNumber] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [curProfilePic, setCurProfilePic] = useState("");
  const [newProfilePic, setNewProfilePic] = useState("");

  //Error messages

  const [passErr, setPassErr] = useState(" ");
  const [emailErr, setEmailErr] = useState(" ");
  const [numberErr, setNumberErr] = useState(" ");
  const [addressErr, setAddressErr] = useState(" ");
  const [infoErr, setInfoErr] = useState("");
  const [foundedErr, setFoundedErr] = useState("");
  const [industryErr, setIndustryErr] = useState("");
  const [companySizeErr, setCompanySizeErr] = useState("");

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

  function getImageFromStorage() {
    getData();
    console.log("called");
    //Gets firebase storage info
    const storage = getStorage();
    getDownloadURL(ref(storage, "Company/" + username))
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
      query(collection(db, "Company"), where("username", "==", item))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        const {
          companySize,
          email,
          address,
          number,
          founded,
          imageURL,
          username,
          pass,
          industry,
          info,
          //  image,
        } = doc.data();

        setEmail(email);
        setNumber(number);
        setPass(pass);
        setUsername(username);
        setImageURL(imageURL);
        setCompanySize(companySize);
        setAddress(address);
        setFounded(founded);
        setIndustry(industry);
        setInfo(info);
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
    deleteDoc(doc(db, "Company", item));
    navigation.navigate("HomeNotLoggedIn");
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

  async function create() {
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
    const storageRef = ref(storage, "Company/" + username);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob!");
    });

    var noInputs = 8;
    var noCorrectInputs = 0;

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
      setDoc(doc(db, "Company", item), {
        email: email,
        address: address,
        number: number,
        info: info,
        imageURL: imageURL,
        industry: industry,
        founded: founded,
        companySize: companySize,
        username: username,
        pass: pass,
      })
        .then(() => {
          //Successfully written to database
          Alert.alert("Success", "Profile updated!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("CompanyProfileScreen"),
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
      Alert.alert("Profile not updated!", "Please try again!", [
        { text: "OK", onPress: () => console.log("error msg - OK Pressed") },
      ]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.backButton}>
          <Text
            style={styles.backText}
            onPress={() => navigation.navigate("CompanyProfileScreen")}
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
        <Text style={styles.titleMini}>Information</Text>

        <Text style={styles.labels}>Address</Text>
        <TextInput
          value={address}
          onChangeText={(address) => setAddress(address)}
          placeholder="address"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{addressErr}</Text>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email.replace(/\s+/g, ""))}
          placeholder="Email"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{emailErr}</Text>
        <Text style={styles.labels}>Number</Text>
        <TextInput
          value={number}
          onChangeText={(number) => setNumber(number.replace(/\s+/g, ""))}
          placeholder="Number"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{numberErr}</Text>
        <Text style={styles.labels}>Password</Text>
        <TextInput
          value={pass}
          onChangeText={(pass) => setPass(pass.replace(/\s+/g, ""))}
          placeholder="Password"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{passErr}</Text>
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

        <Text style={styles.titleMini}>About</Text>

        <Text style={styles.labels}>About company</Text>
        <TextInput
          value={info}
          onChangeText={(info) => setInfo(info)}
          placeholder="info"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{infoErr}</Text>
        <Text style={styles.labels}>Industry</Text>
        <TextInput
          value={industry}
          onChangeText={(industry) => setIndustry(industry)}
          placeholder="industry"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{industryErr}</Text>
        <Text style={styles.labels}>Company size</Text>
        <TextInput
          value={companySize}
          onChangeText={(companySize) => setCompanySize(companySize)}
          placeholder="Company Size"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{companySizeErr}</Text>
        <Text style={styles.labels}>Founded</Text>
        <TextInput
          value={founded}
          onChangeText={(founded) => setFounded(founded)}
          placeholder="founded"
          style={styles.inputBox}
        ></TextInput>
        <Text style={styles.errorMsg}>{foundedErr}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={create}>
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
    marginTop: 10,
    color: "navy",
    marginBottom: 10,
  },
  inputBox: {
    borderWidth: 1.5,
    borderColor: "navy",
    padding: 20,
    width: "80%",

    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 10,
    fontSize: 17.5,
  },
  errorMsg: {
    color: "red",
    paddingLeft: 40,
    marginBottom: 10,
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

export default CompanyEditProfile;
