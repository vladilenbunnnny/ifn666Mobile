import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
} from "react-native";

import { SearchBar, ListItem } from "react-native-elements";

function useStocks() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/nasdaq_stock_list.json")
      .then(res => res.json())
      .then(data => {
        setStocks(data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { stocks, isLoading, error };
}

function Stocks({ navigation }) {
  const [search, setSearch] = useState("");
  const { stocks, isLoading, error } = useStocks();

  const updateSearch = search => {
    setSearch(search);
  };

  const handleSubmit = () => {
    alert("Pressed");
  };

  const handlePress = symbol => {
    navigation.navigate("Stock Detail", {
      symbol,
    });
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleSubmit}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
        />
      </TouchableWithoutFeedback>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <>
            {stocks.slice(1, 30).map((stock, i) => (
              <TouchableHighlight
                key={i}
                onPress={() => handlePress(stock.Symbol)}
              >
                <ListItem
                  bottomDivider
                  containerStyle={{ backgroundColor: "rgb(40, 44, 52)" }}
                >
                  <ListItem.Content>
                    <ListItem.Title
                      style={{
                        color: "rgb(172, 179, 173)",
                        fontWeight: "bold",
                      }}
                    >
                      {stock.Symbol}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ color: "rgb(172, 179, 173)" }}>
                      {stock.Name}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ color: "rgb(172, 179, 173)" }}>
                      {stock.Sector}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableHighlight>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

/////https://reactnative.dev/docs/network
// 1. create an endpoint on backend, that returns the list of stocks. (external api or own api)

// /stocks -> [{symbol, date, b....}]

// 2. store list of stocks with app in file.

export default Stocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999999",
  },
});
