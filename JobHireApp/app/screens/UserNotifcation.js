import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';
import UserNotificationScreen from './UserNotificationScreen';


function UserNotification({ navigation }) {
  return (
    <View style={styles.container}>
  <Text>user notification page</Text>

  <View>
  <Button
        title="clicks on notification screen"
        onPress={() => navigation.navigate('UserNotificationScreen')}
      />
</View>

<View  style={styles.navBar}>

<Button
        title="Home"
        onPress={() => navigation.navigate('UserHomeScreen')}
      />
      <Button
        title="Messages"
        onPress={() => navigation.navigate('UserMessage')}
      />
      <Button
        title="Notifications"
        onPress={() => navigation.navigate('UserNotification')}
      />
      <Button
        title="Profile"
        onPress={() => navigation.navigate('UserProfile')}
      />

  </View>

  </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },

    navBar:{
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      justifyContent: "space-around",

      
  
    },
  });

  export default UserNotification;