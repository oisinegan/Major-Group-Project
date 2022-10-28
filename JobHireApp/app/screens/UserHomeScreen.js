import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./app/screens/UserHomeScreen";
import MessageScreen from './app/screens/UserMessage';
import UserNotificationScreen from './app/screens/UserNotification';
import UserProfileScreen from './app/screens/UserProfileScreen';


function Home({ navigation }) {
  return (
  <Text>user home</Text>
    );
  }




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
