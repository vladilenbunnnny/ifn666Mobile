import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Input, Button } from "react-native-elements";
import { scaleSize } from "../constants/Layout";

function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isValid, setIsValid] = useState({
    validEmail: true,
    validPassword: true,
    validPassword2: true,
  });

  // const handleChangeEmail = val =>

  // < Validation if the field is empty> START
  const handleValidEmail = val => {
    val.trim().length < 1
      ? setIsValid({ ...isValid, validEmail: false })
      : setIsValid({ ...isValid, validEmail: true });
  };

  const handleValidPassword = val => {
    val.trim().length < 1
      ? setIsValid({ ...isValid, validPassword: false })
      : setIsValid({ ...isValid, validPassword: true });
  };

  const handleValidPassword2 = val => {
    val.trim().length < 1
      ? setIsValid({ ...isValid, validPassword2: false })
      : setIsValid({ ...isValid, validPassword2: true });
  };
  // < Validation if the field is empty> END

  const handleSubmit = async () => {
    console.log(email, password);
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

    if (password.trim() !== password2.trim()) {
      alert("Passwords do not match");
    } else if (!pattern.test(email)) {
      alert("email is incorrect");
    } else {
      let status;
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then(res => {
          status = res.status;
          return res.json();
        })
        .then(data => {
          if (!String(status).match(/^[23]/)) {
            throw new Error(data.message);
          } else {
            alert(`Account for ${data.email} has been successfully created!`);
            navigation.navigate("Log In");
          }
        })
        .catch(alert);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Create you account</Text>
      <Input
        onChangeText={val =>
          setEmail(val.replace(/\s+/g, "").trim().toLowerCase())
        }
        onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
        containerStyle={styles.inputFields}
        placeholder="Email"
        errorMessage={!isValid.validEmail && "Email field can't be empty"}
      />
      <Input
        onChangeText={val => setPassword(val.replace(/\s+/g, "").trim())}
        onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
        containerStyle={styles.inputFields}
        placeholder="Password"
        secureTextEntry={true}
        errorMessage={!isValid.validPassword && "Password field can't be empty"}
      />
      <Input
        onChangeText={val => setPassword2(val.replace(/\s+/g, "").trim())}
        onEndEditing={e => handleValidPassword2(e.nativeEvent.text)}
        containerStyle={styles.inputFields}
        placeholder="Confirm Password"
        secureTextEntry={true}
        errorMessage={
          !isValid.validPassword2 && "Confirmation field can't be empty"
        }
      />
      <Button
        title="Create"
        type="clear"
        titleStyle={styles.button}
        onPress={handleSubmit}
      />
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
    maxWidth: scaleSize(300),
  },
  titleText: {
    fontSize: scaleSize(26),
    paddingBottom: scaleSize(18),
  },
  button: {
    color: "rgb(0, 147, 129)",
    fontSize: scaleSize(20),
  },
});
