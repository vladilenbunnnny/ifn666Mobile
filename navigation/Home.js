import * as React from "react";
import { StyleSheet, Text, View, useColorScheme, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen to be done</Text>
      <Button title="Sign In" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999999",
  },
});
