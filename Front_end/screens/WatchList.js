import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { ListItem, Button } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import { useWatchList } from "../contexts/WatchListContext";

function WatchList({ navigation }) {
  const { watchList } = useWatchList();

  function handleSubmit() {
    alert("Button pressed");
  }

  return (
    <View>
      {watchList.map((stock, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={handleSubmit}
          // containerStyle={{ backgroundColor: "rgb(40, 44, 52)" }}
        >
          <ListItem.Content>
            <ListItem.Title
            // style={{
            //   color: "rgb(172, 179, 173)",
            //   fontWeight: "bold",
            // }}
            >
              {stock.symbol}
            </ListItem.Title>
            <ListItem.Subtitle>{stock.company}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
