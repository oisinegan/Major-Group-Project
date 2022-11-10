import {StyleSheet, Text, View, Button, Alert, ScrollView, Image, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid} from "react-native";
import * as React from "react";

function CompanyProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Company Profile Screen</Text>

      <View style={styles.navBar}>
        <Button
          title="About"
          onPress={() => navigation.navigate("CompanyAbout")}
        />
        <Button
          title="Jobs"
          onPress={() => navigation.navigate("CompanyPostedJobs")}
        />
      </View>

      <View style={styles.navBar}>
        <Button
          title="Home"
          onPress={() => navigation.navigate("CompanyHome")}
        />
        <Button
          title="Post"
          onPress={() => navigation.navigate("CompanyPostJob")}
        />
        <Button
          title="Messages"
          onPress={() => navigation.navigate("CompanyMessages")}
        />

        <Button
          title="Profile"
          onPress={() => navigation.navigate("CompanyProfileScreen")}
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
    padding: 5,
  },
});

export default CompanyProfileScreen;
