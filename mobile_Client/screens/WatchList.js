import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { ListItem, Button } from "react-native-elements";
import { useWatchList } from "../contexts/WatchListContext";

function WatchList({ navigation }) {
  const { watchList } = useWatchList();

  const handlePress = ({ symbol, company }) => {
    navigation.navigate("Stock Detail", {
      symbol,
      company,
    });
  };

  return (
    <View style={styles.container}>
      {watchList.map((stock, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() =>
            handlePress({ symbol: stock.symbol, company: stock.Name })
          }
        >
          <ListItem.Content>
            <ListItem.Title style={styles.stockSymbol}>
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
    backgroundColor: "rgb(40, 44, 52)",
  },
  stockSymbol: {
    fontWeight: "bold",
  },
});
