import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';


function UserHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
  <Text>user home</Text>

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
  });

  export default UserHomeScreen;