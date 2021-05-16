import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

function SignIn({ navigation }) {
  //   const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Sign In Screen</Text>

      <Text style={{ fontSize: 20, paddingTop: 30 }}>
        Is Amina smoking again?
      </Text>
      <Button
        title="Create Account"
        onPress={() => navigation.push("CreateAccount")}
      />
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
