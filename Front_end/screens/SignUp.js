import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Input, Button } from "react-native-elements";

function SignUp({ navigation }) {
  //   const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async () => {
    // console.log(email, password);

    // TODO: validation;
    // axios
    //   .post("http://localhost:5000/users", { email, password })
    //   .then(res => {
    //     alert("Success", JSON.stringify(data, null, 2));
    //     navigation.navigate("Log In");
    //   })
    //   .catch(err => {
    //     if (err.response) {
    //       alert("Error", err.response.status + " " + err.response.statusText);
    //     }
    //   });
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
          alert("Success", JSON.stringify(data, null, 2));
          navigation.navigate("Log In");
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Create you account</Text>
      <Input
        // value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputFields}
        placeholder="Email"
      />
      <Input
        // value={password}
        onChangeText={setPassword}
        containerStyle={styles.inputFields}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Input
        // value={password2}
        onChangeText={setPassword2}
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
