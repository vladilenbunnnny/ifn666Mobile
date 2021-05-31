import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

function Profile({ navigation }) {
  const { user, logOut } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {user.email}</Text>
      <Button title="Log Out" onPress={logOut} />
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
