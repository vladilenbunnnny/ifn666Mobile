import * as React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Input, Button } from "react-native-elements";

function LogIn({ navigation }) {
  function handleSubmit() {
    alert("Button pressed");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Log In</Text>

      <Input
        containerStyle={styles.inputFields}
        // errorMessage="ENTER A VALID ERROR HERE"
        placeholder="Email"
      />
      <Input
        containerStyle={styles.inputFields}
        placeholder="Password"
        secureTextEntry={true}
      />

      <Button title="Submit" type="clear" onPress={handleSubmit} />
      <Text>Need an account?</Text>
      <Button
        title="Create account"
        type="clear"
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
    backgroundColor: "white",
  },
  inputFields: {
    maxWidth: "85%",
  },
  titleText: {
    fontSize: 30,
    paddingBottom: 20,
  },
});
