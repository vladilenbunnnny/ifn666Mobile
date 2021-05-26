import * as React from "react";
import { StyleSheet, Text, View, useColorScheme, Button } from "react-native";

function WatchList({ navigation }) {
  function handleSubmit() {
    alert("Button pressed");
  }
  return (
    <View style={styles.container}>
      <Text>Watch List to be created</Text>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999999",
  },
});
