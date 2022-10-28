import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';


function CompanyPostJob({ navigation }) {
  return (
    <View style={styles.container}>
  <Text>Company Profile Screen</Text>

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

  export default CompanyPostJob;