import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Styles } from "../constants/Styles";

import { SearchBar, ListItem } from "react-native-elements";

const image = { uri: "../assets/background.png " };
//<Custom hook> START
function useStocks({ search = "" }) {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search === "") {
      return;
    }
    setIsLoading(true);
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=whatever`
    )
      .then(res => res.json())
      .then(data => {
        if (data.bestMatches) {
          setStocks(data.bestMatches);
        }
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search]);

  return { stocks, isLoading, error };
}
//<Custom hook> END

function Stocks({ navigation }) {
  const [search, setSearch] = useState("");
  const { stocks, isLoading, error } = useStocks({ search });

  const handlePress = ({ symbol, company }) => {
    navigation.navigate("Stock Detail", {
      symbol,
      company,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <SearchBar
          containerStyle={styles.search}
          placeholder="Type Here..."
          onChangeText={setSearch}
          value={search}
        />
      </TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={Styles.loadingContainer}>
        {isLoading ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <>
            {stocks.map((stock, i) => (
              <TouchableHighlight
                key={i}
                onPress={() =>
                  handlePress({
                    symbol: stock["1. symbol"],
                    company: stock["2. name"],
                  })
                }
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
                      {stock["1. symbol"]}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ color: "rgb(172, 179, 173)" }}>
                      {stock["2. name"]}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ color: "rgb(172, 179, 173)" }}>
                      {stock["4. region"]}
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

export default Stocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 44, 52)",
  },
  search: {
    backgroundColor: "rgb(40, 44, 52)",
  },
  image: {},
});
