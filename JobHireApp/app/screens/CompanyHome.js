import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  FlatList,
  SafeAreaView,
  Touchable,
} from "react-native";
import * as React from "react";
//Database imports
import { useState } from "react/cjs/react.development";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../database/config";

function CompanyHomeScreen({ navigation }) {
  const [Adverts, setAdverts] = useState([]);

  //Read all data
  getDocs(collection(db, "Adverts")).then((docSnap) => {
    const Adverts = [];
    docSnap.forEach((doc) => {
      const { title, info, wage, type } = doc.data();
      Adverts.push({ ...doc.data(), id: doc.id, title, info, wage, type });
    });
    setAdverts(Adverts);
  });

  return (
    //navbar wont appear on app unless at top for this page, easy fix i'd imagine

    <View style={styles.container}>
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
          title="Notifications"
          onPress={() => navigation.navigate("CompanyNotifications")}
        />

        <Button
          title="Profile"
          onPress={() => navigation.navigate("CompanyProfileScreen")}
        />
      </View>
      <View style={styles.outerContainer}>
        <Text style={styles.mainTitle}>Active Job posts (5)</Text>
        <SafeAreaView>
          <View style={styles.innerContainer}>
            <FlatList
              data={Adverts}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.info}>{item.info}</Text>
                  <Text style={styles.wage}>${item.wage}</Text>
                  <Text style={styles.type}>Type: {item.type}</Text>
                  <Button
                    title="Edit"
                    onPress={() => navigation.navigate("CompanyEditJobScreen")}
                  />
                </View>
              )}
            />
          </View>
        </SafeAreaView>
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
  navBar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  title: {
    color: "white",
    backgroundColor: "navy",
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  info: {
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontStyle: "italic",
  },
  wage: {
    textAlign: "right",
    paddingRight: 5,
    fontWeight: "bold",
  },
  type: {
    textAlign: "right",
    paddingRight: 5,
    paddingBottom: 5,
    textDecorationLine: "underline",
  },
});

export default CompanyHomeScreen;
