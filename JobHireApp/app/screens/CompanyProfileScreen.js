import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../database/config";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react/cjs/react.development";

function CompanyProfileScreen({ navigation }) {
  const [scroll, setScroll] = useState(true);
  const [username, setUsername] = useState("");
  const [companyInfo, setCompanyInfo] = useState([]);

  function getCompanyInfo() {
    getData();
    //Read all data from logged in company database.
    getDocs(
      query(collection(db, "Company"), where("username", "==", username))
    ).then((docSnap) => {
      let info = [];
      docSnap.forEach((doc) => {
        const { address, email, founded, companySize, industry, number } =
          doc.data();
        info.push({
          ...doc.data(),
          id: doc.id,
          address,
          email,
          founded,
          companySize,
          industry,
          number,
        });
      });

      setCompanyInfo(info);
    });
  }

  useEffect(() => getCompanyInfo(), [username]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Username");
      var usernameFromAsyncStorage = value.toString();
      if (value !== null) {
        // value previously stored
        setUsername(usernameFromAsyncStorage);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.company_username}>{username}</Text>

      <View style={styles.userImg}>
        <Image
          style={{ width: 100, height: 110, marginTop: 20 }}
          source={require("../assets/company_profile.png")}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => navigation.navigate("HomeNotLoggedIn")}
        >
          <Text style={styles.buttonTopNavText}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTopNav}
          onPress={() => navigation.navigate("CompanyViewJobs")}
        >
          <Text style={styles.buttonTopNavText}>View listed jobs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={companyInfo}
          scrollEnabled={scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <Text style={styles.company_info_title}></Text>

              <Text style={styles.info_titles}>Company name</Text>
              <Text style={styles.company_info}>{username}</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />

              <Text style={styles.info_titles}>Address</Text>
              <Text style={styles.company_info}>{item.address}</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />
              <Text style={styles.info_titles}>Email</Text>
              <Text style={styles.company_info}>{item.email}</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />
              <Text style={styles.info_titles}>Founded</Text>
              <Text style={styles.company_info}>{item.founded}</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />
              <Text style={styles.info_titles}>About</Text>
              <Text style={styles.company_info}>{item.info}</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />

              <Text style={styles.info_titles}>Compant Size</Text>
              <Text style={styles.company_info}>{item.companySize}</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />

              <Text style={styles.info_titles}>Industry</Text>
              <Text style={styles.company_info}>{item.industry}</Text>

              <Image
                style={{
                  width: 400,
                  opacity: 0.2,
                  height: 1,
                  marginRight: 35,
                  alignSelf: "center",
                  marginTop: 5,
                }}
                source={require("../assets/line.png")}
              />

              <Text style={styles.info_titles}>Number</Text>
              <Text style={styles.company_info}>{item.number}</Text>
            </View>
          )}
        />
      </View>

      <View style={{ flex: 0.5 }}></View>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyHome")}
        >
          <Image
            style={{ width: 30, height: 30, margin: 15 }}
            source={require("../assets/Home.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyPostJob")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/PostJob.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyMessages")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Msg.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("CompanyProfileScreen")}
        >
          <Image
            style={{ width: 25, height: 25, margin: 15 }}
            source={require("../assets/Profile.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 2,
    width: 350,
    margin: 15,
    backgroundColor: "ghostwhite",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "navy",
  },
  navBar: {
    flexDirection: "row",
    flex: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 999,
  },
  navButtons: {
    margin: 20,
  },
  userImg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 10,
  },
  company_username: {
    textAlign: "center",
    color: "navy",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 70,
  },
  buttonTopNav: {
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: "navy",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttons: {
    flexDirection: "row",
  },
  buttonTopNavText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  company_info: {
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    margin: 2,
    fontWeight: "bold",
    fontSize: 15,
  },
  info_titles: {
    fontSize: 20,
    opacity: 0.5,
    marginTop: 15,
    textAlign: "center",
  },
  logOutButton: {
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: "navy",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    marginLeft: 10,
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default CompanyProfileScreen;
