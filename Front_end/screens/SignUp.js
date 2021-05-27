import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Input, Button } from "react-native-elements";

function SignUp({ navigation }) {
  //   const { signIn } = useContext(AuthContext);
  const handleSubmit = () => {
    alert("pressed");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Create you account</Text>
      <Input containerStyle={styles.inputFields} placeholder="Email" />
      <Input
        containerStyle={styles.inputFields}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Input
        containerStyle={styles.inputFields}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />

      <Button title="Create" type="clear" onPress={handleSubmit} />
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputFields: {
    maxWidth: "85%",
  },
  titleText: {
    fontSize: 30,
    paddingBottom: 20,
  },
});
