import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Input, Button } from "react-native-elements";

//Context import
import { AuthContext } from "../contexts/AuthContext";

function LogIn({ navigation }) {
  const [data, setData] = useState({
    userEmail: "",
    password: "",
  });
  const { logIn } = useContext(AuthContext);

  //<Handle all submits> START
  function handleSubmit(userEmail, password) {
    logIn(userEmail, password);
  }

  const handleEmailChange = val => {
    setData({
      ...data,
      userEmail: val,
    });
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };
  //<Handle all submits/> END

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Log In</Text>

      <Input
        containerStyle={styles.inputFields}
        // errorMessage="ENTER A VALID ERROR HERE"
        placeholder="Email"
        onChangeText={val => handleEmailChange(val)}
      />
      <Input
        containerStyle={styles.inputFields}
        placeholder="Password"
        onChangeText={val => handlePasswordChange(val)}
        secureTextEntry={true}
      />

      <Button
        title="Submit"
        type="clear"
        onPress={() => handleSubmit(data.userEmail, data.password)}
      />
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
