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

//<Custom hook> START
function useStocks() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/nasdaq_stock_list.json")
      .then(res => res.json())
      .then(data => {
        setStocks(data);
        setFilteredStocks(data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { stocks, filteredStocks, isLoading, error };
}
//<Custom hook> END

function Stocks({ navigation }) {
  const [search, setSearch] = useState("");
  const { stocks, filteredStocks, isLoading, error } = useStocks();

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=process.env.STOCKS_API_KEY`
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       setStocks(data);
  //       setFilteredStocks(data);
  //     })
  //     .catch(err => {
  //       setError(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // const updateSearch = search => {
  //   if (search) {
  //     const newData = stocks.map(stock => {
  //       stock.Symbol.filter(symbol => {
  //         const stockData = symbol ? symbol.toUpperCase() : "".toUpperCase();
  //         const searchData = search.toUpperCase();
  //         return stockData.indexOf(searchData) > -1;
  //       });
  //     });
  //     setSearch(search);
  //     setFilteredStocks(newData);
  //   } else {
  //     setFilteredStocks(stocks);
  //     setSearch(search);
  //   }
  //   console.log(stocks[0].Symbol);
  // };aap

  // const updateSearch = search => {
  //   setSearch(search);
  //   // const formattedQuery = search.toUpperCase();
  //   // const stocksFormatted = stocks.map(stock => stock.Name.toUpperCase());
  //   // console.log(formattedQuery);
  //   // console.log(stocksFormatted);
  //   // const data = stocksFormatted.filter(name => {
  //   //   if (name.includes("APPLE")) {
  //   //     return true;
  //   //   }
  //   //   return false;
  //   // });
  // };

  const handleSubmit = () => {
    alert("Pressed");
  };

  const handlePress = ({ symbol, company }) => {
    navigation.navigate("Stock Detail", {
      symbol,
      company,
    });
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleSubmit}>
        <SearchBar
          containerStyle={styles.search}
          placeholder="Type Here..."
          onChangeText={setSearch}
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
            {stocks.slice(1, 20).map(
              (stock, i) =>
                stock.Name.toLowerCase().includes(search.toLowerCase()) && (
                  <TouchableHighlight
                    key={i}
                    onPress={() =>
                      handlePress({ symbol: stock.Symbol, company: stock.Name })
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
                          {stock.Symbol}
                        </ListItem.Title>
                        <ListItem.Subtitle
                          style={{ color: "rgb(172, 179, 173)" }}
                        >
                          {stock.Name}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle
                          style={{ color: "rgb(172, 179, 173)" }}
                        >
                          {stock.Sector}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </TouchableHighlight>
                )
            )}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999999",
  },
  search: {
    backgroundColor: "rgb(40, 44, 52)",
  },
});
