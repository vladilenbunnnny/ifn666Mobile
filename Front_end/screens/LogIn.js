import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Input, Button } from "react-native-elements";

//Context import
import { AuthContext } from "../contexts/AuthContext";

function LogIn({ navigation }) {
  const [data, setData] = useState({
    userEmail: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
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

  //<Handle input validation> START
  const handleValidUser = val => {
    if (val.trim().length < 1) {
      setData({
        ...data,
        isValidUser: false,
      });
    } else {
      setData({
        ...data,
        isValidUser: true,
      });
    }
  };

  const handleValidPassword = val => {
    if (val.trim().length < 1) {
      setData({
        ...data,
        isValidPassword: false,
      });
    } else {
      setData({
        ...data,
        isValidPassword: true,
      });
    }
  };

  //<Handle input validation> END

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Log In</Text>

      <Input
        containerStyle={styles.inputFields}
        placeholder="Email"
        onChangeText={val => handleEmailChange(val)}
        onEndEditing={e => handleValidUser(e.nativeEvent.text)}
      />
      {/* Contiionatl statement for error message */}
      {!data.isValidUser && (
        <Text style={styles.errorMsg1}>Email can't be empty</Text>
      )}
      <Input
        containerStyle={styles.inputFields}
        placeholder="Password"
        onChangeText={val => handlePasswordChange(val)}
        onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
        secureTextEntry={true}
      />
      {/* Contiionatl statement for error message */}
      {!data.isValidPassword && (
        <Text style={styles.errorMsg2}>Password can't be empty</Text>
      )}

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
  errorMsg1: {
    color: "red",
    marginTop: -15,
    paddingRight: 195,
  },
  errorMsg2: {
    color: "red",
    marginTop: -15,
    paddingRight: 165,
  },
});
