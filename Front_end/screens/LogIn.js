import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Input, Button } from "react-native-elements";
import { scaleSize } from "../constants/Layout";

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
    console.log(password.replace(/\s+/g, "").trim());
    let status;
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password }),
    })
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(data => {
        if (String(status).match(/^[45]/)) {
          throw new Error(data.message);
        } else {
          logIn(data.token);
        }
      })
      .catch(alert);
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

  //<Handle input validation/> END

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Log In</Text>

      <Input
        containerStyle={styles.inputFields}
        placeholder="Email"
        onChangeText={val =>
          handleEmailChange(val.replace(/\s+/g, "").trim().toLowerCase())
        }
        onEndEditing={e => handleValidUser(e.nativeEvent.text)}
      />
      {/* Contiionatl statement for error message */}
      {!data.isValidUser && (
        <Text style={styles.errorMsg1}>Email can't be empty</Text>
      )}
      <Input
        containerStyle={styles.inputFields}
        placeholder="Password"
        onChangeText={val =>
          handlePasswordChange(val.replace(/\s+/g, "").trim())
        }
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
        titleStyle={styles.button}
        onPress={() => handleSubmit(data.userEmail, data.password)}
      />
      <Text>Need an account </Text>
      <Button
        title="Create account"
        type="clear"
        titleStyle={styles.button}
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
    maxWidth: scaleSize(300),
  },
  titleText: {
    fontSize: scaleSize(28),
    paddingBottom: scaleSize(18),
  },
  errorMsg1: {
    color: "red",
    marginTop: scaleSize(-15),
    paddingRight: scaleSize(160),
  },
  errorMsg2: {
    color: "red",
    marginTop: scaleSize(-15),
    paddingRight: scaleSize(135),
  },
  button: {
    color: "rgb(0, 147, 129)",
    fontSize: scaleSize(18),
  },
});
