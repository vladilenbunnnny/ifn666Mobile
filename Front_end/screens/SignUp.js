import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

function SignUp({ navigation }) {
  //   const { signIn } = useContext(AuthContext);
  const handleSubmit = "";
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Create you account</Text>

      <Text style={{ fontSize: 20, paddingTop: 30 }}>Sign Up form Here</Text>
      <Button
        title="Submit"
        // onPress={handleSubmit}
      />
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#999999",
    alignItems: "center",
    justifyContent: "center",
  },
});
