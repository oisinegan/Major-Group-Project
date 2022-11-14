import {StyleSheet, Text, View, Button, Alert, ScrollView, Image, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid} from "react-native";
import * as React from "react";
//Database imports
import { useState } from "react/cjs/react.development";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/config";

function UserHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.outerContainer}>
        <ScrollView>
          <Text style={styles.mainTitle}>Active Job posts (6)</Text>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 1</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
              </Text>
            </View>

            <Button
              title="Go to job screen screen"
              onPress={() => navigation.navigate("JobScreen")}
            />
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 2</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
              </Text>
            </View>
            <Button
              title="Go to job screen screen"
              onPress={() => navigation.navigate("JobScreen")}
            />
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 3 </Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
              </Text>
            </View>
            <Button
              title="Go to job screen screen"
              onPress={() => navigation.navigate("JobScreen")}
            />
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 4</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
              </Text>
            </View>
            <Button
              title="Go to job screen screen"
              onPress={() => navigation.navigate("JobScreen")}
            />
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 5</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
              </Text>
            </View>
            <Button
              title="Go to job screen screen"
              onPress={() => navigation.navigate("JobScreen")}
            />
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Job title 6</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                This is some info about the job. This is some info about the
                job. This is some info about the job.
              </Text>
            </View>
            <Button
              title="Go to job screen screen"
              onPress={() => navigation.navigate("JobScreen")}
            />
          </View>
        </ScrollView>
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
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "snow",
    alignItems: "center",
    padding: 0,
  },
  mainTitle: {
    color: "navy",
    fontSize: 25,
    textDecorationLine: "underline",
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
  },
  innerContainer: {
    backgroundColor: "lightyellow",
    borderTopColor: "snow",
    borderTopWidth: 15,
    borderWidth: 20,
    borderColor: "snow",
  },
  title: {
    color: "white",
    backgroundColor: "navy",
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  textContainer: {
    padding: 20,
  },
  text: {
    color: "black",
    fontSize: 15,
  },
  buttons: {
    backgroundColor: "lightyellow",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",

    textAlign: "left",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    justifyContent: "space-around",
  },
});

export default UserHomeScreen;
