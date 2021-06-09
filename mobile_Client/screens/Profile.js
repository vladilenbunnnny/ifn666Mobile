import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "react-native-elements";
import { scaleSize } from "../constants/Layout";

function Profile({ navigation }) {
  const { user, logOut } = useContext(AuthContext);
  const name = user.email.split("@")[0];
  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {nameUpper}</Text>
      <Button
        buttonStyle={styles.button1}
        titleStyle={styles.button}
        type="outline"
        title="Log Out"
        onPress={logOut}
      />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 44, 52)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    paddingBottom: 30,
    color: "rgb(172, 179, 173)",
  },
  button: {
    color: "rgb(0, 147, 129)",
    flex: 1,
    textAlign: "center",
  },
  button1: {
    width: scaleSize(170),
    color: "white",
    backgroundColor: "rgb(40, 44, 52)",
    borderColor: "rgb(0, 147, 129)",
  },
});
