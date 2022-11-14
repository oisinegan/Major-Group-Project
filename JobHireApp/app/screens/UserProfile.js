import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import * as React from "react";
import { useState } from "react/cjs/react.development";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../database/config";

function UserProfile({ navigation }) {
  const [Users, setUsers] = useState([]);

  //Read all data
  getDocs(collection(db, "Users")).then((docSnap) => {
    const Users = [];
    docSnap.forEach((doc) => {
      const { About, Age, Name, appliedJobs } = doc.data();
      Users.push({
        ...doc.data(),
        id: doc.id,
        About,
        Age,
        Name,
        appliedJobs,
      });
    });
    setUsers(Users);
  });
  //unsure currently how to get specific details to display on profile page,
  //it is only displaying everything that's there in order at the moment
  return (
    <View style={styles.container}>
      <Text>user profile page</Text>

      <FlatList
        data={Users}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>Name: {item.Name}</Text>
            <Text style={styles.title}>Age: {item.Age}</Text>
            <Text style={styles.title}>About: {item.About}</Text>
            <Text style={styles.title}>
              Applied to jobs: {item.appliedJobs}
            </Text>
          </View>
        )}
      />

      <View style={styles.navBar}>
        <Button
          title="Home"
          onPress={() => navigation.navigate("UserHomeScreen")}
        />
        <Button
          title="Messages"
          onPress={() => navigation.navigate("UserMessage")}
        />
        <Button
          title="Notifications"
          onPress={() => navigation.navigate("UserNotification")}
        />
        <Button
          title="Profile"
          onPress={() => navigation.navigate("UserProfile")}
        />
      </View>
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
  navBar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around",
  },
});

export default UserProfile;
