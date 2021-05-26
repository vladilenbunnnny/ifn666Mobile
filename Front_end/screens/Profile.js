import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

function Profile({ navigation }) {
  //   const { signIn } = useContext(AuthContext);
  function handleSubmit() {
    alert("Button pressed");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Hello, user</Text>

      <Text style={{ fontSize: 20, paddingTop: 30 }}>
        To log out press the submit button
      </Text>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#999999",
    alignItems: "center",
    justifyContent: "center",
  },
});
