import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

function Profile({ navigation }) {
  const { logOut } = useContext(AuthContext);

  function handleSubmit() {
    logOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, user</Text>

      <Button title="Log Out" onPress={() => handleSubmit()} />
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
  text: {
    fontSize: 20,
    paddingBottom: 30,
  },
});
