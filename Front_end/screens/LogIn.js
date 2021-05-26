import * as React from "react";
import { StyleSheet, Text, View, useColorScheme, Button } from "react-native";

function LogIn({ navigation }) {
  function handleSubmit() {
    alert("Button pressed");
  }

  return (
    <View style={styles.container}>
      <Text>Log In form to be created</Text>
      <Button title="Submit" onPress={handleSubmit} />
      <Text>Need an account?</Text>
      <Button
        title="Create account"
        onPress={() => navigation.navigate("Sign Up")}
      />
    </View>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999999",
  },
});
