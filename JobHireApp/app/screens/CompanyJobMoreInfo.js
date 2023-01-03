import { StyleSheet, Text, View, Button, Alert, Pressable } from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Database imports
import { useState, useEffect } from "react/cjs/react.development";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../database/config";

function CompanyJobMoreInfo({ route, navigation }) {
  const { item } = route.params;

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
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Job title: {item.id}</Text>
      <Text>Company: {item.company}</Text>
      <Text>Full Job description: {item.fullDescription}</Text>
      <Text>Job type: {item.type}</Text>
      <Text>Minimum experience: {item.experience}</Text>
      <Text>Minimum qualification: {item.qualification}</Text>
      <Text>Required knowledge: {item.knowledge}</Text>
      <Text>Work schedule: {item.schedule}</Text>
      <Text>Wage: {item.wage} euros</Text>

      <Button
        title="Edit"
        onPress={() =>
          navigation.navigate("CompanyEditJobScreen", { item: item })
        }
      />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => readApplicantsOnAdvert(item)}
      ></Pressable>
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

export default CompanyJobMoreInfo;
