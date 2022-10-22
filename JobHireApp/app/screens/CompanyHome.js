import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';

function CompanyHomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Company Home Screen</Text>      
      </View>
    );
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default CompanyHomeScreen;