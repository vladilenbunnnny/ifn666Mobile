import React from "react";
import { Input } from "react-native-elements";

export const InputEmail = props => {
  const [isValid, setIsValid] = useState({
    validEmail: true,
    validPassword: true,
    validPassword2: true,
  });

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

  return (
    <Input
      onChangeText={val =>
        setEmail(val.replace(/\s+/g, "").trim().toLowerCase())
      }
      onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
      containerStyle={styles.inputFields}
      placeholder="Email"
      errorMessage={!isValid.validEmail && "Email field can't be empty"}
    />
  );
};

export const InputPassword = props => {
  return;
};
