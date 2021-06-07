import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Input, Button } from "react-native-elements";
import { StylesAuth } from "../constants/Styles";
import { SERVER_HOSTNAME } from "@env";

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
      fetch(`http://${SERVER_HOSTNAME}:5000/users`, {
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
    <View style={StylesAuth.container}>
      <Text style={StylesAuth.titleText}>Create your account</Text>
      <Input
        onChangeText={val =>
          setEmail(val.replace(/\s+/g, "").trim().toLowerCase())
        }
        onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
        containerStyle={StylesAuth.inputFields}
        placeholder="Email"
        errorMessage={!isValid.validEmail && "Email field can't be empty"}
      />
      <Input
        onChangeText={val => setPassword(val.replace(/\s+/g, "").trim())}
        onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
        containerStyle={StylesAuth.inputFields}
        placeholder="Password"
        secureTextEntry={true}
        errorMessage={!isValid.validPassword && "Password field can't be empty"}
      />
      <Input
        onChangeText={val => setPassword2(val.replace(/\s+/g, "").trim())}
        onEndEditing={e => handleValidPassword2(e.nativeEvent.text)}
        containerStyle={StylesAuth.inputFields}
        placeholder="Confirm Password"
        secureTextEntry={true}
        errorMessage={
          !isValid.validPassword2 && "Confirmation field can't be empty"
        }
      />
      <Button
        title="Create"
        type="clear"
        titleStyle={StylesAuth.button}
        onPress={handleSubmit}
      />
    </View>
  );
}

export default SignUp;
